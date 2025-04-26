import type { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      async authorize(credentials) {
        // 这里应该实现实际的用户验证逻辑
        // 暂时返回一个模拟用户，实际应用中替换为数据库验证
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password') {
          return {
            id: '1',
            name: '管理员',
            email: 'admin@example.com',
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // 自定义JWT回调以确保与LibreChat的兼容性
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // 首次登录时，将用户信息合并到token中
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        // 添加LibreChat需要的字段
        token.userId = user.id; // 重要：确保userId与LibreChat一致
        token.username = user.name || (user.email ? user.email.split('@')[0] : undefined);
      }
      return token;
    },

    // 自定义session回调，确保session中包含所需的用户信息
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;

        // 确保session中包含LibreChat需要的字段
        session.user.userId = token.userId as string;
        session.user.username = token.username as string | undefined;
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
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// 扩展JWT类型，以便TypeScript识别我们添加的自定义字段
declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    username?: string;
  }
}
