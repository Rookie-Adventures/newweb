import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from '../users/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterWithCodeDto } from './dto/register-with-code.dto';
import { RequestResetPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { VerificationService } from '../verification/verification.service';
import { EmailPurpose } from '../verification/dto/send-email-code.dto';

// 登录响应DTO
export class LoginResponseDto {
  token: string;
  user: UserWithoutPassword;
}

// 用户信息（不含密码）
export class UserWithoutPassword {
  userId: string;
  email: string;
  username: string;
  name?: string;
  role: string;
  membershipLevel: string;
  isActive: boolean;
  profile?: Record<string, any>;
  permissions?: string[];
  membershipExpiry?: Date;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationService: VerificationService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: '邮箱或密码错误' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginWithPassword(loginUserDto);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({
    status: 201,
    description: '注册成功',
    type: UserWithoutPassword,
  })
  @ApiResponse({ status: 400, description: '请求参数验证失败' })
  @ApiResponse({ status: 409, description: '邮箱已被注册' })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('register-with-code')
  @ApiOperation({ summary: '使用验证码注册' })
  @ApiResponse({
    status: 201,
    description: '注册成功',
    type: UserWithoutPassword,
  })
  @ApiResponse({ status: 400, description: '验证码无效或已过期' })
  @ApiResponse({ status: 409, description: '邮箱已被注册' })
  async registerWithCode(@Body() registerWithCodeDto: RegisterWithCodeDto) {
    return await this.authService.registerWithCode(registerWithCodeDto);
  }

  @Post('request-reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '请求重置密码（发送验证码）' })
  @ApiResponse({
    status: 200,
    description: '验证码发送成功',
  })
  @ApiResponse({ status: 400, description: '请求参数验证失败或发送失败' })
  async requestResetPassword(@Body() requestResetPasswordDto: RequestResetPasswordDto) {
    // 发送重置密码验证码
    return await this.verificationService.sendEmailCode({
      email: requestResetPasswordDto.email,
      purpose: EmailPurpose.RESET_PASSWORD,
    });
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '重置密码' })
  @ApiResponse({
    status: 200,
    description: '密码重置成功',
  })
  @ApiResponse({ status: 400, description: '验证码无效或已过期' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({
    status: 200,
    description: '用户信息',
    type: UserWithoutPassword,
  })
  getProfile(@Request() req: { user: UserWithoutPassword }) {
    // 使用类型注解确保类型安全
    return req.user;
  }
}
