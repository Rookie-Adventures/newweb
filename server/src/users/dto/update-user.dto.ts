import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: '请提供有效的电子邮件地址' })
  email?: string;

  @ApiProperty({
    description: '用户名',
    example: 'johndoe',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: '用户姓名',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: '密码，至少6个字符',
    example: 'password123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: '密码长度至少为6个字符' })
  password?: string;

  @ApiProperty({
    description: '会员等级',
    example: 'premium',
    required: false,
  })
  @IsOptional()
  @IsString()
  membershipLevel?: string;
}
