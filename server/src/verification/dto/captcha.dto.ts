import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CaptchaResponseDto {
  @ApiProperty({
    description: '验证码 SVG 图片',
    example: '<svg>...</svg>',
  })
  captcha: string;

  @ApiProperty({
    description: '验证码 ID',
    example: 'abc123',
  })
  captchaId: string;
}

export class VerifyCaptchaDto {
  @ApiProperty({
    description: '验证码 ID',
    example: 'abc123',
  })
  @IsString({ message: '验证码 ID 必须是字符串' })
  @IsNotEmpty({ message: '验证码 ID 不能为空' })
  captchaId: string;

  @ApiProperty({
    description: '验证码',
    example: '1a2b3c',
  })
  @IsString({ message: '验证码必须是字符串' })
  @IsNotEmpty({ message: '验证码不能为空' })
  captchaCode: string;
}
