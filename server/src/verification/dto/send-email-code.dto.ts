import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum EmailPurpose {
  REGISTER = 'register',
  LOGIN = 'login',
  RESET_PASSWORD = 'reset_password',
  CHANGE_EMAIL = 'change_email',
}

export class SendEmailCodeDto {
  @ApiProperty({
    description: '邮箱地址',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '请提供有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱地址不能为空' })
  email: string;

  @ApiProperty({
    description: '验证目的',
    enum: EmailPurpose,
    example: EmailPurpose.REGISTER,
  })
  @IsEnum(EmailPurpose, { message: '验证目的必须是有效的枚举值' })
  @IsNotEmpty({ message: '验证目的不能为空' })
  purpose: EmailPurpose;
}
