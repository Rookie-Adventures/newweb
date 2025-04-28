import type { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * 获取API基础URL
 * 优先使用环境变量，如果不存在则构建基于当前域名的URL
 */
const getApiBaseUrl = () => {
  // 如果设置了环境变量，则使用环境变量
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 在服务器端，使用默认URL
  if (typeof window === 'undefined') {
    return 'http://localhost:3000';
  }
  
  // 在客户端，使用当前域名
  return window.location.origin;
};

/**
 * NextAuth配置选项
 * 配置为生成与LibreChat兼容的JWT令牌
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '邮箱', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) {
          console.log('认证失败: 缺少邮箱或密码');
          return null;
        }

        console.log('尝试登录:', { email: credentials.email });

        // 1. 先尝试通过API登录 - 优先使用后端真实数据
        try {
          // 获取正确的API基础URL
          const apiBaseUrl = getApiBaseUrl();
          
          // 后端接口是 /auth/login
          const loginUrl = `${apiBaseUrl}/auth/login`;
          
          console.log(`尝试调用登录API: ${loginUrl}`);
          
          // 调用API进行验证
          const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          // 如果API响应成功，使用API返回的用户信息
          if (response.ok) {
            let data;
            try {
              const text = await response.text();
              data = text ? JSON.parse(text) : {};
              console.log('登录API返回:', { 
                success: !!data.user, 
                user: data.user ? `${data.user.name || data.user.email}` : '无用户数据'
              });
              
              if (data.user) {
                // 返回从API获取的用户信息，同时包含authToken
                console.log('✅ API登录成功:', data.user.name || data.user.email);
                return {
                  id: data.user.userId,
                  name: data.user.name,
                  email: data.user.email,
                  role: data.user.role || 'user',
                  authToken: data.token, // 保存后端生成的token
                };
              }
            } catch (parseError) {
              console.error('🔴 解析响应数据失败:', parseError);
            }
          } else {
            console.error('🔴 登录请求失败:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('🔴 API登录过程中发生错误:', error);
        }

        // 2. 如果API登录失败或开发环境，则尝试本地测试账户
        if (process.env.NODE_ENV === 'development') {
          console.log('API登录失败，尝试使用本地测试账户');
          
          // 开发模式通用密码: 任何邮箱 + "dev" 密码都能通过
          if (credentials.password === 'dev') {
            console.log('✅ 开发模式通用登录成功（仅用于紧急调试）');
            return {
              id: `dev-${Date.now()}`,
              name: credentials.email.split('@')[0],
              email: credentials.email,
              role: 'user',
            };
          }
        }

        // 3. 所有认证方式都失败
        console.log('❌ 所有认证方式都失败');
        return null;
      },
    }),
  ],
  callbacks: {
    // 自定义JWT回调以确保与LibreChat的兼容性
    async jwt({ token, user, account, trigger }) {
      // 仅在初次登录或更新时修改token
      if (user) {
        console.log('JWT回调: 用户登录 - 生成token');
        
        // 首次登录时，将用户信息合并到token中
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        // 添加LibreChat需要的字段
        token.userId = user.id; // 重要：确保userId与LibreChat一致
        token.username = user.name || (user.email ? user.email.split('@')[0] : undefined);
        
        // 添加其他用户字段，如角色、权限等
        if ('role' in user) {
          token.role = user.role;
        }

        // 保存后端返回的认证token - 这是新增的关键代码
        if ('authToken' in user) {
          token.authToken = user.authToken as string;
        }

        // 生成JWT token供外部API使用（如LibreChat）
        const tokenPayload = {
          userId: user.id,
          username: user.name || (user.email ? user.email.split('@')[0] : undefined),
          email: user.email,
          role: user.role || 'user',
          timestamp: new Date().getTime(),
        };
        
        token.token = JSON.stringify(tokenPayload);
        console.log('JWT token生成成功', { userId: tokenPayload.userId, username: tokenPayload.username });
      } else if (trigger === 'update') {
        console.log('JWT回调: 会话更新');
      }
      
      // 未使用的参数 account
      void account;
      
      return token;
    },

    // 自定义session回调，确保session中包含所需的用户信息
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        // 基础用户信息
        session.user.id = token.id as string;
        session.user.email = token.email as string | undefined;
        session.user.name = token.name as string | undefined;

        // 确保session中包含LibreChat需要的字段
        session.user.userId = token.userId as string;
        session.user.username = token.username as string | undefined;
        
        // 添加其他字段
        if (token.role) {
          session.user.role = token.role as string;
        }

        // 添加JWT token
        if (token.token) {
          session.user.token = token.token as string;
        }

        // 添加后端认证token - 这是新增的关键代码
        if (token.authToken) {
          session.user.authToken = token.authToken as string;
        }

        // 记录会话状态，用于调试
        console.log('Session已更新:', { 
          userId: session.user.id,
          username: session.user.username,
          isAuthenticated: true
        });
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7天过期，与LibreChat保持一致
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
};

/**
 * 扩展默认Session类型，添加LibreChat需要的字段
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userId: string;
      username?: string;
      role?: string;
      token?: string; // JWT token
      authToken?: string; // 后端认证token
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

// 扩展JWT类型，以便TypeScript识别我们添加的自定义字段
declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    username?: string;
    role?: string;
    token?: string; // 序列化的JWT token
    authToken?: string; // 后端认证token
  }
}
