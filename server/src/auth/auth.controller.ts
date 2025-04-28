import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from '../users/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterWithCodeDto } from './dto/register-with-code.dto';
import { RequestResetPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { VerificationService } from '../verification/verification.service';
import { EmailPurpose } from '../verification/dto/send-email-code.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginResponse, UserResponse } from './auth.service';

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
    private readonly configService: ConfigService,
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
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.loginWithPassword(loginUserDto);
    
    // 设置认证Cookie
    this.setCookies(res, result.token);

    return result;
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
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // 先进行普通注册
    const userResult = await this.authService.register(createUserDto);
    
    // 使用注册结果进行登录，获取token
    const loginResult = this.authService.login(userResult);
    
    // 设置Cookie
    this.setCookies(res, loginResult.token);
    
    // 返回完整的登录结果，包含token和用户信息
    return loginResult;
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
  async registerWithCode(
    @Body() registerWithCodeDto: RegisterWithCodeDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // 先进行验证码注册
    const userResult = await this.authService.registerWithCode(registerWithCodeDto);
    
    // 使用注册结果进行登录，获取token
    const loginResult = this.authService.login(userResult);
    
    // 设置Cookie
    this.setCookies(res, loginResult.token);
    
    // 返回完整的登录结果，包含token和用户信息
    return loginResult;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '用户登出' })
  @ApiResponse({ status: 200, description: '登出成功' })
  async logout(@Res({ passthrough: true }) res: Response) {
    // 清除认证相关的所有Cookie
    this.clearCookies(res);
    
    return { message: '登出成功' };
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
  getProfile(@Request() req: { user: UserResponse }) {
    // 使用类型注解确保类型安全
    return req.user;
  }

  /**
   * 设置认证相关的Cookie
   * @param res Express响应对象
   * @param token JWT令牌
   */
  private setCookies(res: Response, token: string): void {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const domain = isProduction 
      ? this.configService.get<string>('COOKIE_DOMAIN', '.shinegold.com') 
      : undefined;
    
    // 主认证Cookie，用于API认证
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
    });
    
    // 前端可读的登录状态Cookie
    res.cookie('is_logged_in', 'true', {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
    });
  }

  /**
   * 清除认证相关的所有Cookie
   * @param res Express响应对象
   */
  private clearCookies(res: Response): void {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const domain = isProduction 
      ? this.configService.get<string>('COOKIE_DOMAIN', '.shinegold.com') 
      : undefined;
    
    // 清除主认证Cookie
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain,
    });
    
    // 清除前端登录状态Cookie
    res.clearCookie('is_logged_in', {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain,
    });
  }
}
