import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerificationCode, VerificationCodeDocument } from './schemas/verification-code.schema';
import { SendEmailCodeDto, EmailPurpose } from './dto/send-email-code.dto';
import { SendSmsCodeDto } from './dto/send-sms-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as svgCaptcha from 'svg-captcha';
import { CaptchaResponseDto, VerifyCaptchaDto } from './dto/captcha.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);
  private readonly captchaCache = new Map<string, { code: string; expiresAt: Date }>();

  constructor(
    @InjectModel(VerificationCode.name)
    private verificationCodeModel: Model<VerificationCodeDocument>,
    private configService: ConfigService,
  ) {
    // 每5分钟清理一次过期的图形验证码
    setInterval(() => this.cleanExpiredCaptchas(), 5 * 60 * 1000);
  }

  /**
   * 清理过期的图形验证码
   */
  private cleanExpiredCaptchas(): void {
    const now = new Date();

    let expiredCount = 0;

    for (const [captchaId, data] of this.captchaCache.entries()) {
      if (data.expiresAt < now) {
        this.captchaCache.delete(captchaId);
        expiredCount++;
      }
    }

    this.logger.debug(
      `已清理 ${expiredCount} 个过期的图形验证码，当前缓存数量: ${this.captchaCache.size}`,
    );
  }

  /**
   * 生成图形验证码
   */
  generateCaptcha(): CaptchaResponseDto {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      noise: 2,
      color: true,
      background: '#f0f0f0',
    });

    const captchaId = uuidv4();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    this.captchaCache.set(captchaId, {
      code: captcha.text.toLowerCase(),
      expiresAt,
    });

    return {
      captchaId,
      captcha: captcha.data,
    };
  }

  /**
   * 验证图形验证码
   */
  verifyCaptcha(dto: VerifyCaptchaDto): boolean {
    const { captchaId, captchaCode } = dto;
    const captchaData = this.captchaCache.get(captchaId);

    if (!captchaData) {
      return false;
    }

    const { code, expiresAt } = captchaData;
    const now = new Date();

    if (expiresAt < now) {
      this.captchaCache.delete(captchaId);
      return false;
    }

    const isValid = code === captchaCode.toLowerCase();
    if (isValid) {
      this.captchaCache.delete(captchaId);
    }

    return isValid;
  }

  /**
   * 生成验证码
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * 创建验证码记录
   */
  private async createVerificationCode(
    target: string,
    type: string,
    purpose: string,
  ): Promise<VerificationCodeDocument> {
    const code = this.generateCode();
    const codeId = uuidv4();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const verificationCode = new this.verificationCodeModel({
      codeId,
      code,
      target,
      type,
      purpose,
      expiresAt,
      isUsed: false,
    });

    await verificationCode.save();
    return verificationCode;
  }

  /**
   * 发送邮箱验证码
   */
  async sendEmailCode(sendEmailCodeDto: SendEmailCodeDto): Promise<{ message: string }> {
    const { email, purpose } = sendEmailCodeDto;

    try {
      const existingCode = await this.findLatestValidCode(email, 'email', purpose);

      if (existingCode) {
        const lastSentTime = existingCode.createdAt || new Date();
        const now = new Date();
        const diffSeconds = Math.floor((now.getTime() - lastSentTime.getTime()) / 1000);

        if (diffSeconds < 60) {
          return {
            message: `请等待 ${60 - diffSeconds} 秒后再次请求验证码`,
          };
        }
      }

      const verificationCode = await this.createVerificationCode(email, 'email', purpose);

      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('EMAIL_HOST'),
        port: this.configService.get<number>('EMAIL_PORT'),
        secure: this.configService.get<boolean>('EMAIL_SECURE'),
        auth: {
          user: this.configService.get<string>('EMAIL_USER'),
          pass: this.configService.get<string>('EMAIL_PASS'),
        },
      });

      const mailOptions = {
        from: `"ShineGold" <${this.configService.get<string>('EMAIL_USER')}>`,
        to: email,
        subject: this.getEmailSubject(purpose),
        html: this.getEmailTemplate(verificationCode.code, purpose),
      };

      await transporter.sendMail(mailOptions);
      this.logger.log(`验证码邮件已发送至 ${email}`);

      return { message: '验证码已发送到您的邮箱' };
    } catch (error) {
      this.logger.error(`发送邮件验证码失败: ${(error as Error).message}`, (error as Error).stack);
      throw new BadRequestException('发送验证码失败，请稍后再试');
    }
  }

  /**
   * 获取邮件主题
   */
  private getEmailSubject(purpose: string): string {
    const subjects: Record<string, string> = {
      [EmailPurpose.REGISTER]: 'ShineGold - 注册验证码',
      [EmailPurpose.LOGIN]: 'ShineGold - 登录验证码',
      [EmailPurpose.RESET_PASSWORD]: 'ShineGold - 重置密码验证码',
      [EmailPurpose.CHANGE_EMAIL]: 'ShineGold - 更换邮箱验证码',
    };

    return subjects[purpose] || 'ShineGold - 验证码';
  }

  /**
   * 获取邮件模板
   */
  private getEmailTemplate(code: string, purpose: string): string {
    this.logger.debug(`生成验证码邮件模板，目的: ${purpose}`);

    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333; text-align: center;">ShineGold 验证码</h2>
        <p>您好，</p>
        <p>您的验证码是：</p>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${code}
        </div>
        <p>验证码有效期为15分钟，请勿将验证码泄露给他人。</p>
        <p>如果您没有请求此验证码，请忽略此邮件。</p>
        <p>谢谢！</p>
        <p>ShineGold 团队</p>
      </div>
    `;
  }

  /**
   * 发送短信验证码
   */
  async sendSmsCode(sendSmsCodeDto: SendSmsCodeDto): Promise<{ message: string }> {
    const { phone, purpose } = sendSmsCodeDto;
    try {
      const verificationCode = await this.createVerificationCode(phone, 'sms', purpose);
      this.logger.log(`模拟发送短信验证码 ${verificationCode.code} 到 ${phone}`);
      return { message: '验证码已发送到您的手机' };
    } catch (error) {
      this.logger.error(`发送短信验证码失败: ${(error as Error).message}`, (error as Error).stack);
      throw new Error('发送验证码失败，请稍后再试');
    }
  }

  /**
   * 验证验证码
   */
  async verifyCode(verifyCodeDto: VerifyCodeDto): Promise<{ valid: boolean; message: string }> {
    const { target, code, type, purpose } = verifyCodeDto;

    const verificationCode = await this.verificationCodeModel
      .findOne({
        target,
        type,
        purpose,
        expiresAt: { $gt: new Date() },
        isUsed: false,
      })
      .sort({ createdAt: -1 })
      .exec();

    if (!verificationCode) {
      return { valid: false, message: '验证码不存在或已过期' };
    }

    if (verificationCode.code !== code) {
      return { valid: false, message: '验证码错误' };
    }
    if (verificationCode.purpose !== purpose) {
      return { valid: false, message: '验证码用途不匹配' };
    }
    verificationCode.isUsed = true;
    verificationCode.usedAt = new Date();
    await verificationCode.save();

    return { valid: true, message: '验证成功' };
  }

  /**
   * 查询最新的有效验证码
   */
  async findLatestValidCode(
    target: string,
    type: string,
    purpose: string,
  ): Promise<VerificationCodeDocument | null> {
    try {
      return await this.verificationCodeModel
        .findOne({
          target,
          type,
          purpose,
          expiresAt: { $gt: new Date() },
          isUsed: false,
        })
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      this.logger.error(`查询验证码失败: ${(error as Error).message}`, (error as Error).stack);
      return null;
    }
  }
}
