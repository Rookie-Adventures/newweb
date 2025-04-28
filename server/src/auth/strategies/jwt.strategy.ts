import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * 从请求中提取JWT的自定义函数
 * 优先级：AuthHeader > Cookie
 */
const extractJWT = (req: Request) => {
  let token = null;
  
  // 1. 尝试从Authorization头提取
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // 2. 如果没有Authorization头，尝试从Cookie提取
  if (!token && req.cookies && req.cookies.auth_token) {
    token = req.cookies.auth_token;
  }
  
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: extractJWT, // 使用自定义提取函数
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException('用户不存在或未授权');
    }
    return user;
  }
}
