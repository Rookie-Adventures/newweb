import { Test, TestingModule } from '@nestjs/testing';
import { VerificationController } from '../verification.controller';
import { VerificationService } from '../verification.service';
import { AppThrottlerGuard } from '../../common/guards/throttler.guard';
import { Reflector } from '@nestjs/core';
import { ThrottlerStorage } from '@nestjs/throttler';

describe('VerificationController', () => {
  let controller: VerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationController],
      providers: [
        {
          provide: AppThrottlerGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
        {
          provide: 'THROTTLER:MODULE_OPTIONS',
          useValue: {},
        },
        {
          provide: ThrottlerStorage,
          useValue: jest.fn().mockImplementation(() => ({})),
        },
        {
          provide: Reflector,
          useValue: {},
        },
        {
          provide: VerificationService,
          useValue: {
            sendEmailCode: jest.fn(),
            sendSmsCode: jest.fn(),
            verifyCode: jest.fn(),
            verifyCaptcha: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VerificationController>(VerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
