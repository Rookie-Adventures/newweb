import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '请提供有效的电子邮件地址' })
  email: string;

  @ApiProperty({
    description: '用户密码',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
