import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { VerificationService } from '../verification/verification.service';
import { VerificationType, VerificationPurpose } from '../verification/dto/verify-code.dto';
import { RegisterWithCodeDto } from './dto/register-with-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from '../users/dto';

export interface UserResponse {
  userId: string;
  email: string;
  username: string;
  role: string;
  membershipLevel: string;
  isActive: boolean;
  name?: string;
  profile?: Record<string, any>;
  permissions?: string[];
  membershipExpiry?: Date;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pwd, ...userData } = user.toObject() as Record<string, unknown>;
      return userData as UserResponse;
    }
    return null;
  }

  // 移除 async 关键字，因为这个方法不需要异步操作
  login(user: UserResponse): LoginResponse {
    const payload = { sub: user.userId, email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async loginWithPassword(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('邮箱或密码错误');
    }
    return this.login(user);
  }

  /**
   * 常规注册（不需要验证码）
   * @param createUserDto 用户创建DTO
   * @returns 创建的用户（不含密码）
   */
  async register(createUserDto: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('该邮箱已被注册');
    }

    const newUser = await this.usersService.create(createUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...userData } = newUser.toObject() as Record<string, unknown>;
    return userData as UserResponse;
  }

  /**
   * 使用验证码注册新用户
   * @param registerWithCodeDto 注册数据（包含验证码）
   * @returns 注册成功的用户（不含密码）
   */
  async registerWithCode(registerWithCodeDto: RegisterWithCodeDto): Promise<UserResponse> {
    const { email, username, password, code } = registerWithCodeDto;

    const verifyResult = await this.verificationService.verifyCode({
      target: email,
      code,
      type: VerificationType.EMAIL,
      purpose: VerificationPurpose.REGISTER,
    });

    if (!verifyResult.valid) {
      throw new BadRequestException(verifyResult.message || '验证码无效或已过期');
    }

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('该邮箱已被注册');
    }

    const newUser = await this.usersService.create({
      email,
      username,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...userData } = newUser.toObject() as Record<string, unknown>;
    return userData as UserResponse;
  }

  /**
   * 重置密码
   * @param resetPasswordDto 重置密码数据（包含验证码）
   * @returns 操作结果
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { email, password, code } = resetPasswordDto;

    const verifyResult = await this.verificationService.verifyCode({
      target: email,
      code,
      type: VerificationType.EMAIL,
      purpose: VerificationPurpose.RESET_PASSWORD,
    });

    if (!verifyResult.valid) {
      throw new BadRequestException(verifyResult.message || '验证码无效或已过期');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.usersService.updatePassword(user.userId, hashedPassword);

    return { message: '密码重置成功' };
  }
}
