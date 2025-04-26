import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session as _Session } from 'next-auth';
import jwt from 'jsonwebtoken';
import { authOptions } from '@/lib/auth-options';

// LibreChat JWT用户类型
interface LibreChatJwtPayload {
  userId: string;
  email?: string | null;
  username?: string | null;
  expiresAt?: number;
}

/**
 * SSO重定向处理函数
 * 获取当前用户会话，创建符合LibreChat要求的JWT令牌，并重定向到LibreChat
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. 获取当前用户会话
    const session = await getServerSession(authOptions);

    // 2. 验证用户是否已登录
    if (!session?.user) {
      console.error('SSO失败: 用户未登录');
      return redirectToErrorPage(req, 'user_not_found', '用户未登录，请先登录');
    }

    // 3. 确认用户对象包含所需字段
    if (!session.user.id) {
      console.error('SSO失败: 用户ID缺失', { user: session.user });
      return redirectToErrorPage(req, 'user_not_found', '用户信息不完整，请重新登录');
    }

    // 4. 构建LibreChat兼容的JWT载荷
    const jwtPayload: LibreChatJwtPayload = {
      userId: session.user.id,
      // 添加对手机号的处理逻辑
      email: session.user.email || `user-${session.user.id}@example.com`,
      // 如果有手机号，可以用手机号作为用户名，否则使用其他标识
      username:
        session.user.username ||
        session.user.name ||
        (session.user.email ? session.user.email.split('@')[0] : `user-${session.user.id}`),
      // 设置7天过期时间
      expiresAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };

    // 5. 签发JWT令牌
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('SSO失败: JWT密钥未配置');
      return redirectToErrorPage(req, 'config_error', 'JWT密钥未配置，请联系管理员');
    }

    const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: '7d' });

    // 6. 构建重定向URL
    const libreChatUrl = process.env.LIBRECHAT_URL || 'http://localhost:3080';
    const redirectUrl = new URL('/api/auth/callback', libreChatUrl);
    redirectUrl.searchParams.append('token', token);

    // 7. 重定向到LibreChat
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    // 捕获并记录所有未处理的错误
    console.error('SSO重定向错误:', error);
    return redirectToErrorPage(req, 'server_error', '服务器处理错误，请稍后再试');
  }
}

/**
 * 重定向到错误页面
 */
function redirectToErrorPage(req: NextRequest, error: string, message: string): NextResponse {
  // 使用当前请求的origin构建错误页面URL
  const errorUrl = new URL('/api/sso/error', req.nextUrl.origin);
  errorUrl.searchParams.append('error', error);
  errorUrl.searchParams.append('message', message);
  return NextResponse.redirect(errorUrl);
}
