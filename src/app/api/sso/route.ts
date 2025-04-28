import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session as _Session } from 'next-auth';
import jwt from 'jsonwebtoken';
import { authOptions } from '@/lib/auth-options';
import { cookies } from 'next/headers';

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
    // 1. 尝试获取NextAuth会话
    const session = await getServerSession(authOptions);
    
    // 2. 如果NextAuth会话存在，使用它创建JWT
    if (session?.user?.id) {
      // 优先使用 authToken，如果存在
      if (session.user.authToken) {
        return createAndRedirectWithRawToken(req, session.user.authToken);
      }
      
      return createAndRedirectWithToken(req, {
        userId: session.user.id,
        email: session.user.email,
        username: session.user.username || session.user.name || (session.user.email ? session.user.email.split('@')[0] : undefined),
      });
    }
    
    // 3. 如果NextAuth会话不存在，检查cookie中的自定义认证令牌
    const cookiesList = await cookies();
    const authToken = cookiesList.get('auth_token')?.value;
    
    if (authToken) {
      try {
        // 解析自定义认证令牌以获取用户信息
        const userData = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
        
        if (userData.userId || userData.id) {
          return createAndRedirectWithToken(req, {
            userId: userData.userId || userData.id,
            email: userData.email,
            username: userData.username || userData.name || (userData.email ? userData.email.split('@')[0] : undefined),
          });
        }
      } catch (error) {
        console.error('解析自定义认证令牌失败:', error);
      }
    }
    
    // 4. 如果没有找到有效的会话，重定向到错误页面
    console.error('SSO失败: 用户未登录');
    return redirectToErrorPage(req, 'user_not_found', '用户未登录，请先登录');
  } catch (error) {
    // 捕获并记录所有未处理的错误
    console.error('SSO重定向错误:', error);
    return redirectToErrorPage(req, 'server_error', '服务器处理错误，请稍后再试');
  }
}

/**
 * 创建LibreChat JWT并重定向
 * @param req 请求对象
 * @param userData 用户数据
 * @returns 重定向响应
 */
function createAndRedirectWithToken(
  req: NextRequest,
  userData: { userId: string; email?: string | null; username?: string | null }
): NextResponse {
  // 1. 构建LibreChat兼容的JWT载荷
  const jwtPayload: LibreChatJwtPayload = {
    userId: userData.userId,
    email: userData.email || `user-${userData.userId}@example.com`,
    username: userData.username || `user-${userData.userId}`,
    expiresAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7天过期
  };

  // 2. 签发JWT令牌
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('SSO失败: JWT密钥未配置');
    return redirectToErrorPage(req, 'config_error', 'JWT密钥未配置，请联系管理员');
  }

  const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: '7d' });

  // 3. 构建重定向URL
  const libreChatUrl = process.env.LIBRECHAT_URL || 'http://localhost:3080';
  const redirectUrl = new URL('/api/auth/callback', libreChatUrl);
  redirectUrl.searchParams.append('token', token);

  // 4. 重定向到LibreChat
  return NextResponse.redirect(redirectUrl);
}

/**
 * 使用现有的认证token创建重定向
 * @param req 请求对象
 * @param token 现有的认证token
 * @returns 重定向响应
 */
function createAndRedirectWithRawToken(
  req: NextRequest,
  token: string
): NextResponse {
  // 构建重定向URL
  const libreChatUrl = process.env.LIBRECHAT_URL || 'http://localhost:3080';
  const redirectUrl = new URL('/api/auth/callback', libreChatUrl);
  redirectUrl.searchParams.append('token', token);

  // 重定向到LibreChat
  return NextResponse.redirect(redirectUrl);
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
