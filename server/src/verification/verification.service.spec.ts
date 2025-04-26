import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { VerificationService } from './verification.service';
import { VerificationCode } from './schemas/verification-code.schema';
import { VerificationType, VerificationPurpose } from './dto/verify-code.dto';
import { SendEmailCodeDto, EmailPurpose } from './dto/send-email-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { VerifyCaptchaDto } from './dto/captcha.dto';

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

  // 模拟 VerificationCode 模型
  const mockVerificationCodeModel = {
    findOne: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    }),
    new: jest.fn().mockImplementation(() => ({
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
    })),
  };

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
  });

  describe('sendEmailCode', () => {
    it('should send email verification code', async () => {
      // 模拟 findOne 返回 null（没有未过期的验证码）
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const dto: SendEmailCodeDto = {
        email: 'test@example.com',
        purpose: EmailPurpose.REGISTER,
      };

      const result = await service.sendEmailCode(dto);
      expect(result).toEqual({ message: '验证码已发送到您的邮箱' });
    });
  });

  describe('verifyCode', () => {
    it('should verify a valid code', async () => {
      // 模拟 findOne 返回一个有效的验证码
      mockVerificationCodeModel.findOne.mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce({
          code: '123456',
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
});
