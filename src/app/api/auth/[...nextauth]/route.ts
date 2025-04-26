import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-options';

/**
 * NextAuth API路由处理程序
 * 使用从lib/auth-options导入的配置
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
