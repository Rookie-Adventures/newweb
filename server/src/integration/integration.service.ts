import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * 生成与LibreChat兼容的JWT令牌
   * @param user 用户信息
   * @returns JWT令牌
   */
  generateLibreChatToken(user: any): string {
    const payload = {
      userId: user.userId,
      email: user.email,
      username: user.username || user.email.split('@')[0],
      role: user.role || 'user',
      provider: 'shinegold',
    };
    
    // 使用相同的JWT密钥，确保与LibreChat兼容
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      // 如果需要与LibreChat使用不同的密钥，可在这里配置
      // secret: this.configService.get<string>('LIBRECHAT_JWT_SECRET'),
    });
  }

  /**
   * 检查用户是否在LibreChat系统中存在
   * @param userId 用户ID
   * @returns 用户是否存在
   */
  async checkUserExistsInLibreChat(userId: string): Promise<boolean> {
    try {
      const libreChatApiUrl = this.configService.get<string>('LIBRECHAT_API_URL', 'http://localhost:3100');
      
      // 使用axios直接调用，避免rxjs类型问题
      const response = await fetch(
        `${libreChatApiUrl}/api/user/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.generateServiceToken()}`,
          },
        }
      );
      
      return response.status === 200;
    } catch (error) {
      // 404表示用户不存在
      if (error.response?.status === 404) {
        return false;
      }
      
      // 其他错误视为请求失败，默认返回false
      console.error('检查LibreChat用户出错:', error.message);
      return false;
    }
  }

  /**
   * 在LibreChat系统中创建用户
   * @param userData 用户数据
   * @returns 创建结果
   */
  async createUserInLibreChat(userData: any): Promise<any> {
    try {
      const libreChatApiUrl = this.configService.get<string>('LIBRECHAT_API_URL', 'http://localhost:3100');
      
      // 准备用户数据
      const newUser = {
        userId: userData.userId,
        email: userData.email,
        username: userData.username || userData.email.split('@')[0],
        name: userData.name,
        password: userData.password || crypto.randomBytes(16).toString('hex'), // 随机密码
        provider: 'shinegold',
        role: userData.role || 'user',
      };
      
      // 使用fetch直接调用，避免rxjs类型问题
      const response = await fetch(
        `${libreChatApiUrl}/api/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.generateServiceToken()}`,
          },
          body: JSON.stringify(newUser),
        }
      );
      
      if (!response.ok) {
        throw new Error(`创建用户失败: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('创建LibreChat用户出错:', error.message);
      throw new Error(`创建LibreChat用户失败: ${error.message}`);
    }
  }

  /**
   * 确保用户在LibreChat系统中存在，不存在则创建
   * @param user 用户信息
   */
  async ensureUserInLibreChat(user: any): Promise<void> {
    try {
      const userExists = await this.checkUserExistsInLibreChat(user.userId);
      
      if (!userExists) {
        await this.createUserInLibreChat({
          userId: user.userId,
          email: user.email,
          username: user.username || user.email.split('@')[0],
          name: user.name,
          password: crypto.randomBytes(16).toString('hex'), // 随机密码
          provider: 'shinegold',
          role: user.role || 'user',
        });
        console.log(`用户 ${user.userId} 已自动同步到LibreChat系统`);
      }
    } catch (error) {
      console.error('同步用户到LibreChat系统失败:', error);
      // 可以选择失败时继续，或抛出错误中断请求
    }
  }

  /**
   * 生成服务间通信用的管理员令牌
   * 仅用于服务间API调用，如用户同步等管理功能
   */
  private generateServiceToken(): string {
    const payload = {
      userId: 'system',
      role: 'admin',
      provider: 'shinegold',
    };
    
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
  }
} 