import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { VerificationService } from '../verification.service';
import { VerificationCode } from '../schemas/verification-code.schema';
import { VerificationType, VerificationPurpose, VerifyCodeDto } from '../dto/verify-code.dto';
import { EmailPurpose, SendEmailCodeDto } from '../dto/send-email-code.dto';
import { SmsPurpose, SendSmsCodeDto } from '../dto/send-sms-code.dto';
import { VerifyCaptchaDto } from '../dto/captcha.dto';

// 模拟 nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true),
  }),
}));

// 模拟 svg-captcha
jest.mock('svg-captcha', () => ({
  create: jest.fn().mockReturnValue({
    text: 'abcd',
    data: '<svg>mock captcha</svg>',
  }),
}));

describe('VerificationService', () => {
  let service: VerificationService;

  // 可 new 的 mock Model
  const mockVerificationCodeModel: any = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      codeId: 'test-code-id',
      code: '123456',
      target: 'test@example.com',
      type: 'email',
      purpose: 'register',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      isUsed: false,
      toObject: () => ({
        codeId: 'test-code-id',
        code: '123456',
        target: 'test@example.com',
        type: 'email',
        purpose: 'register',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        isUsed: false,
      }),
    }),
  }));
  mockVerificationCodeModel.findOne = jest.fn(() => ({
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(null), // 可按需调整 mock 数据
  }));

  // 模拟 ConfigService
  const mockConfigService = {
    get: jest.fn((key: string): string | number | boolean => {
      const configs: Record<string, string | number | boolean> = {
        EMAIL_HOST: 'smtp.example.com',
        EMAIL_PORT: 587,
        EMAIL_SECURE: false,
        EMAIL_USER: 'test@example.com',
        EMAIL_PASS: 'password',
      };
      return configs[key] || '';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerificationService,
        {
          provide: getModelToken(VerificationCode.name),
          useValue: mockVerificationCodeModel,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<VerificationService>(VerificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateCaptcha', () => {
    it('should generate a captcha', () => {
      const result = service.generateCaptcha();
      expect(result).toBeDefined();
      expect(result.captcha).toBeDefined();
      expect(result.captchaId).toBeDefined();
    });

    it('should generate a captcha and cache it', () => {
      const result = service.generateCaptcha();
      expect(result).toHaveProperty('captchaId');
      expect(result).toHaveProperty('captcha');
      // 验证缓存已存储
      const cacheEntry = (service as any).captchaCache.get(result.captchaId);
      expect(cacheEntry).toBeDefined();
      expect(typeof cacheEntry.code).toBe('string');
    });
  });

  describe('verifyCaptcha', () => {
    it('should return false for invalid captcha', () => {
      const dto: VerifyCaptchaDto = {
        captchaId: 'invalid-id',
        captchaCode: 'invalid-code',
      };
      const result = service.verifyCaptcha(dto);
      expect(result).toBe(false);
    });

    it('should verify a valid captcha', () => {
      // 首先生成一个验证码
      const captcha = service.generateCaptcha();

      // 使用正确的验证码进行验证
      const dto: VerifyCaptchaDto = {
        captchaId: captcha.captchaId,
        captchaCode: 'abcd', // 使用模拟的验证码
      };

      // 手动设置缓存
      const captchaCache = service['captchaCache'] as Map<
        string,
        { code: string; expiresAt: Date }
      >;
      captchaCache.set(captcha.captchaId, {
        code: 'abcd',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      const result = service.verifyCaptcha(dto);
      expect(result).toBe(true);
    });

    it('should return true for valid captcha', () => {
      const { captchaId } = service.generateCaptcha();
      const cacheEntry = (service as any).captchaCache.get(captchaId);
      const dto = { captchaId, captchaCode: cacheEntry.code };
      expect(service.verifyCaptcha(dto)).toBe(true);
    });

    it('should return false for invalid captcha', () => {
      const { captchaId } = service.generateCaptcha();
      const dto = { captchaId, captchaCode: 'wrong' };
      expect(service.verifyCaptcha(dto)).toBe(false);
    });

    it('should return false for expired captcha', () => {
      const { captchaId } = service.generateCaptcha();
      const cacheEntry = (service as any).captchaCache.get(captchaId);
      cacheEntry.expiresAt = new Date(Date.now() - 1000); // 过期
      const dto = { captchaId, captchaCode: cacheEntry.code };
      expect(service.verifyCaptcha(dto)).toBe(false);
    });

    it('should return false for non-existent captcha', () => {
      const dto = { captchaId: 'not-exist', captchaCode: '1234' };
      expect(service.verifyCaptcha(dto)).toBe(false);
    });
  });

  describe('getEmailSubject', () => {
    it('should return correct subject for all purposes', () => {
      expect((service as any).getEmailSubject(EmailPurpose.REGISTER)).toMatch(/注册/);
      expect((service as any).getEmailSubject(EmailPurpose.LOGIN)).toMatch(/登录/);
      expect((service as any).getEmailSubject(EmailPurpose.RESET_PASSWORD)).toMatch(/重置密码/);
      expect((service as any).getEmailSubject(EmailPurpose.CHANGE_EMAIL)).toMatch(/更换邮箱/);
      expect((service as any).getEmailSubject('unknown')).toMatch(/验证码/);
    });
  });

  describe('getEmailTemplate', () => {
    it('should return html string containing code', () => {
      const html = (service as any).getEmailTemplate('123456', EmailPurpose.REGISTER);
      expect(html).toContain('123456');
      expect(html).toContain('ShineGold');
    });
  });

  describe('generateCode', () => {
    it('should generate a 6-digit code', () => {
      const code = (service as any).generateCode();
      expect(code).toMatch(/^\d{6}$/);
    });
  });

  describe('createVerificationCode', () => {
    it('should save and return a verification code doc', async () => {
      const save = jest.fn().mockResolvedValue(true);
      const modelMock = jest
        .spyOn(service as any, 'verificationCodeModel', 'get')
        .mockReturnValue(function (this: any, doc: any) {
          Object.assign(this, doc);
          this.save = save;
        });
      const result = await (service as any).createVerificationCode('target', 'email', 'register');
      expect(result).toHaveProperty('codeId');
      expect(result).toHaveProperty('code');
      expect(result.save).toBeDefined();
      modelMock.mockRestore();
    });
  });

  describe('findLatestValidCode', () => {
    it('should return code doc when found', async () => {
      const exec = jest.fn().mockResolvedValue({ code: '123456' });
      const findOne = jest.fn().mockReturnValue({ sort: jest.fn().mockReturnValue({ exec }) });
      jest.spyOn(service as any, 'verificationCodeModel', 'get').mockReturnValue({ findOne });
      const result = await service.findLatestValidCode('target', 'email', 'register');
      expect(result).toEqual({ code: '123456' });
    });

    it('should return null and log error on exception', async () => {
      const findOne = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('fail')) }),
      });
      jest.spyOn(service as any, 'verificationCodeModel', 'get').mockReturnValue({ findOne });
      const loggerSpy = jest.spyOn((service as any).logger, 'error').mockImplementation();
      const result = await service.findLatestValidCode('target', 'email', 'register');
      expect(result).toBeNull();
      expect(loggerSpy).toHaveBeenCalled();
      loggerSpy.mockRestore();
    });
  });

  describe('sendEmailCode', () => {
    it('should send email verification code', async () => {
      // 模拟 findOne 返回 null（没有未过期的验证码）
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const dto: SendEmailCodeDto = {
        email: 'test@example.com',
        purpose: EmailPurpose.REGISTER,
      };

      const result = await service.sendEmailCode(dto);
      expect(result).toEqual({ message: '验证码已发送到您的邮箱' });
    });

    it('should throw error when send email failed', async () => {
      jest
        .spyOn(service as any, 'findLatestValidCode')
        .mockRejectedValueOnce(new Error('Send email failed'));
      await expect(
        service.sendEmailCode({ email: 'test@example.com', purpose: EmailPurpose.REGISTER } as any),
      ).rejects.toThrow('发送验证码失败，请稍后再试');
    });
  });

  describe('verifyCode', () => {
    it('should return invalid for used code', async () => {
      // 模拟 findOne 返回 null（验证码已被使用或不存在）
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const dto: VerifyCodeDto = {
        target: 'test@example.com',
        code: '123456',
        type: VerificationType.EMAIL,
        purpose: VerificationPurpose.REGISTER,
      };

      const result = await service.verifyCode(dto);
      expect(result).toEqual({ valid: false, message: '验证码不存在或已过期' });
    });

    it('should return invalid for mismatched purpose', async () => {
      // 模拟 findOne 返回一个验证码，但用途不匹配
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce({
          code: '123456',
          isUsed: false,
          purpose: 'login',
          save: jest.fn().mockResolvedValue(true),
        }),
      });

      const dto: VerifyCodeDto = {
        target: 'test@example.com',
        code: '123456',
        type: VerificationType.EMAIL,
        purpose: VerificationPurpose.REGISTER,
      };

      const result = await service.verifyCode(dto);
      expect(result).toEqual({ valid: false, message: '验证码用途不匹配' });
    });

    it('should verify a valid code', async () => {
      // 模拟 findOne 返回一个有效的验证码
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce({
          code: '123456',
          isUsed: false,
          purpose: 'register',
          save: jest.fn().mockResolvedValue(true),
        }),
      });

      const dto: VerifyCodeDto = {
        target: 'test@example.com',
        code: '123456',
        type: VerificationType.EMAIL,
        purpose: VerificationPurpose.REGISTER,
      };

      const result = await service.verifyCode(dto);
      expect(result).toEqual({ valid: true, message: '验证成功' });
    });

    it('should return invalid for expired code', async () => {
      // 模拟 findOne 返回 null（没有未过期的验证码）
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const dto: VerifyCodeDto = {
        target: 'test@example.com',
        code: '123456',
        type: VerificationType.EMAIL,
        purpose: VerificationPurpose.REGISTER,
      };

      const result = await service.verifyCode(dto);
      expect(result).toEqual({ valid: false, message: '验证码不存在或已过期' });
    });

    it('should return invalid for incorrect code', async () => {
      // 模拟 findOne 返回一个有效的验证码，但验证码不匹配
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce({
          code: '654321', // 不同的验证码
          isUsed: false,
          save: jest.fn().mockResolvedValue(true),
        }),
      });

      const dto: VerifyCodeDto = {
        target: 'test@example.com',
        code: '123456',
        type: VerificationType.EMAIL,
        purpose: VerificationPurpose.REGISTER,
      };

      const result = await service.verifyCode(dto);
      expect(result).toEqual({ valid: false, message: '验证码错误' });
    });
  });

  describe('sendSmsCode', () => {
    it('should send sms verification code', async () => {
      const dto: SendSmsCodeDto = {
        phone: '13800138000',
        purpose: SmsPurpose.REGISTER,
      };

      const result = await service.sendSmsCode(dto);
      expect(result).toEqual({ message: '验证码已发送到您的手机' });
    });

    it('should throw error when send sms failed', async () => {
      const dto: SendSmsCodeDto = {
        phone: '13800138000',
        purpose: SmsPurpose.REGISTER,
      };

      jest
        .spyOn(service as any, 'createVerificationCode')
        .mockRejectedValueOnce(new Error('Send sms failed'));
      await expect(service.sendSmsCode(dto)).rejects.toThrow('发送验证码失败，请稍后再试');
    });
  });
});
