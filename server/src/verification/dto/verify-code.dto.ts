import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum VerificationType {
  EMAIL = 'email',
  SMS = 'sms',
}

export enum VerificationPurpose {
  REGISTER = 'register',
  LOGIN = 'login',
  RESET_PASSWORD = 'reset_password',
  CHANGE_EMAIL = 'change_email',
  CHANGE_PHONE = 'change_phone',
}

export class VerifyCodeDto {
  @ApiProperty({
    description: '验证目标（邮箱或手机号）',
    example: 'user@example.com 或 13800138000',
  })
  @IsString({ message: '验证目标必须是字符串' })
  @IsNotEmpty({ message: '验证目标不能为空' })
  target: string = '';

  @ApiProperty({
    description: '验证码',
    example: '123456',
  })
  @IsString({ message: '验证码必须是字符串' })
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string = '';

  @ApiProperty({
    description: '验证类型',
    enum: VerificationType,
    example: VerificationType.EMAIL,
  })
  @IsEnum(VerificationType, { message: '验证类型必须是有效的枚举值' })
  @IsNotEmpty({ message: '验证类型不能为空' })
  type: VerificationType = VerificationType.EMAIL;

  @ApiProperty({
    description: '验证目的',
    enum: VerificationPurpose,
    example: VerificationPurpose.REGISTER,
  })
  @IsEnum(VerificationPurpose, { message: '验证目的必须是有效的枚举值' })
  @IsNotEmpty({ message: '验证目的不能为空' })
  purpose: VerificationPurpose = VerificationPurpose.REGISTER;
}
