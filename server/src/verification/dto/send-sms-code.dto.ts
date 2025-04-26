import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export enum SmsPurpose {
  REGISTER = 'register',
  LOGIN = 'login',
  RESET_PASSWORD = 'reset_password',
  CHANGE_PHONE = 'change_phone',
}

export class SendSmsCodeDto {
  @ApiProperty({
    description: '手机号码',
    example: '13800138000',
  })
  @IsString({ message: '手机号码必须是字符串' })
  @IsNotEmpty({ message: '手机号码不能为空' })
  @Matches(/^1[3-9]\d{9}$/, { message: '请提供有效的手机号码' })
  phone: string;

  @ApiProperty({
    description: '验证目的',
    enum: SmsPurpose,
    example: SmsPurpose.REGISTER,
  })
  @IsEnum(SmsPurpose, { message: '验证目的必须是有效的枚举值' })
  @IsNotEmpty({ message: '验证目的不能为空' })
  purpose: SmsPurpose;
}
