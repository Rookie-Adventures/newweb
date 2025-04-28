import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 服务集成类型
 */
export enum IntegrationType {
  LIBRECHAT = 'librechat',
  // 未来可添加其他集成类型
}

/**
 * 创建用户同步DTO
 */
export class UserSyncDto {
  @ApiProperty({ description: '用户ID', required: true })
  @IsString()
  userId: string;

  @ApiProperty({ description: '电子邮箱', required: true })
  @IsString()
  email: string;

  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '姓名', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '密码', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: '认证提供者', required: false, default: 'shinegold' })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiProperty({ description: '用户角色', required: false, default: 'user' })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ description: '额外属性', required: false })
  @IsObject()
  @IsOptional()
  extraAttributes?: Record<string, any>;
}

/**
 * 集成服务配置DTO
 */
export class IntegrationConfigDto {
  @ApiProperty({
    description: '集成类型',
    enum: IntegrationType,
    example: IntegrationType.LIBRECHAT
  })
  @IsEnum(IntegrationType)
  type: IntegrationType;

  @ApiProperty({ description: '服务API URL', example: 'http://localhost:3100' })
  @IsString()
  apiUrl: string;

  @ApiProperty({ description: '服务API密钥', required: false })
  @IsString()
  @IsOptional()
  apiKey?: string;

  @ApiProperty({ description: '额外配置', required: false })
  @IsObject()
  @IsOptional()
  extraConfig?: Record<string, any>;
} 