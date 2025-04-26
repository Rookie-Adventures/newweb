import { Body, Controller, Post, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AppThrottlerGuard } from '../common/guards/throttler.guard';
import { VerificationService } from './verification.service';
import { SendEmailCodeDto } from './dto/send-email-code.dto';
import { SendSmsCodeDto } from './dto/send-sms-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { CaptchaResponseDto, VerifyCaptchaDto } from './dto/captcha.dto';

@ApiTags('verification')
@Controller('verification')
@UseGuards(AppThrottlerGuard)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('email/send')
  @Throttle({ default: { ttl: 60, limit: 3 } }) // 60秒内最多3次请求
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '发送邮箱验证码' })
  @ApiResponse({ status: 200, description: '验证码发送成功' })
  @ApiResponse({ status: 400, description: '请求参数验证失败或发送失败' })
  @ApiResponse({ status: 429, description: '请求过于频繁，请稍后再试' })
  async sendEmailCode(@Body() sendEmailCodeDto: SendEmailCodeDto) {
    return this.verificationService.sendEmailCode(sendEmailCodeDto);
  }

  @Post('sms/send')
  @Throttle({ default: { ttl: 60, limit: 3 } }) // 60秒内最多3次请求
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '发送短信验证码' })
  @ApiResponse({ status: 200, description: '验证码发送成功' })
  @ApiResponse({ status: 400, description: '请求参数验证失败或发送失败' })
  @ApiResponse({ status: 429, description: '请求过于频繁，请稍后再试' })
  async sendSmsCode(@Body() sendSmsCodeDto: SendSmsCodeDto) {
    return this.verificationService.sendSmsCode(sendSmsCodeDto);
  }

  @Post('verify')
  @Throttle({ default: { ttl: 60, limit: 5 } }) // 60秒内最多5次请求
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '验证验证码' })
  @ApiResponse({ status: 200, description: '验证结果' })
  @ApiResponse({ status: 400, description: '请求参数验证失败或验证失败' })
  @ApiResponse({ status: 429, description: '请求过于频繁，请稍后再试' })
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.verificationService.verifyCode(verifyCodeDto);
  }

  @Get('captcha')
  @Throttle({ default: { ttl: 60, limit: 5 } }) // 60秒内最多5次请求
  @ApiOperation({ summary: '获取图形验证码' })
  @ApiResponse({
    status: 200,
    description: '图形验证码',
    type: CaptchaResponseDto,
  })
  @ApiResponse({ status: 429, description: '请求过于频繁，请稍后再试' })
  getCaptcha(): CaptchaResponseDto {
    return this.verificationService.generateCaptcha();
  }

  @Post('captcha/verify')
  @Throttle({ default: { ttl: 60, limit: 5 } }) // 60秒内最多5次请求
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '验证图形验证码' })
  @ApiResponse({ status: 200, description: '验证结果' })
  @ApiResponse({ status: 400, description: '请求参数验证失败或验证失败' })
  @ApiResponse({ status: 429, description: '请求过于频繁，请稍后再试' })
  verifyCaptcha(@Body() verifyCaptchaDto: VerifyCaptchaDto) {
    const isValid = this.verificationService.verifyCaptcha(verifyCaptchaDto);
    return { valid: isValid, message: isValid ? '验证成功' : '验证码错误或已过期' };
  }
}
