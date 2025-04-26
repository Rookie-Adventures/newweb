import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '请提供有效的电子邮件地址' })
  email: string;

  @ApiProperty({
    description: '用户名',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    description: '密码，至少6个字符',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: '密码长度至少为6个字符' })
  password: string;

  @ApiProperty({
    description: '用户姓名',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  name?: string;
}
