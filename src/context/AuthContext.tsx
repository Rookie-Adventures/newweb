'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type User = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
} | null;

type LoginCredentials = {
  identifier: string; // 可以是邮箱或手机号
  password: string;
  type: 'email' | 'phone';
};

type RegisterData = {
  name: string;
  email?: string;
  phone?: string;
  country?: string;
  password: string;
  type: 'email' | 'phone';
  verificationCode: string;
};

type ResetPasswordData = {
  email?: string;
  phone?: string;
  password: string;
  verificationCode: string;
};

interface AuthContextType {
  user: User;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  sendVerificationCode: (identifier: string, type: 'email' | 'phone') => Promise<boolean>;
  logout: () => void;
  error: string | null;
  redirectIfAuthenticated: (redirectUrl?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 需要登录才能访问的路由
const PROTECTED_ROUTES = ['/dashboard', '/profile'];
// 已登录用户不应该访问的路由
const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 检查本地存储中的用户信息
    const checkUserLoggedIn = () => {
      setIsLoading(true);
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if (isLoggedIn === 'true') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (_) {
            // 处理解析错误
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // 自动路由保护逻辑
  useEffect(() => {
    // 在页面加载后，检查路由权限
    if (!isLoading) {
      // 如果用户未登录且尝试访问受保护的路由
      if (!user && PROTECTED_ROUTES.some((route) => pathname?.startsWith(route))) {
        const returnUrl = encodeURIComponent(pathname || '/');
        router.push(`/login?returnUrl=${returnUrl}`);
      }

      // 如果用户已登录且尝试访问认证路由（登录/注册）
      if (user && AUTH_ROUTES.some((route) => pathname === route)) {
        router.push('/dashboard');
      }
    }
  }, [isLoading, user, pathname, router]);

  // 如果已认证，重定向到指定的URL或默认页面
  const redirectIfAuthenticated = (redirectUrl?: string) => {
    if (user) {
      const returnUrl =
        redirectUrl || new URLSearchParams(window.location.search).get('returnUrl') || '/dashboard';
      router.push(decodeURIComponent(returnUrl));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // 这里可以添加实际的登录API调用
      // 目前只是模拟登录过程
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟登录成功
      localStorage.setItem('isLoggedIn', 'true');
      let newUser: User;

      if (credentials.type === 'email') {
        newUser = { email: credentials.identifier };
      } else {
        newUser = {
          phone: credentials.identifier,
          country: credentials.identifier.startsWith('+')
            ? credentials.identifier.substring(0, 3)
            : '+86', // 默认中国
        };
      }

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      // 自动跳转到返回URL（如果有）
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
      if (returnUrl) {
        router.push(decodeURIComponent(returnUrl));
      } else {
        router.push('/dashboard');
      }
    } catch (_) {
      setError('登录失败，请检查您的登录信息');
      throw new Error('登录失败，请检查您的登录信息');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 这里可以添加实际的注册API调用
      // 目前只是模拟注册过程
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟注册成功
      localStorage.setItem('isLoggedIn', 'true');
      const newUser: User = {
        name: data.name,
      };

      if (data.type === 'email') {
        newUser.email = data.email;
      } else {
        newUser.phone = data.phone;
        newUser.country = data.country;
      }

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      router.push('/dashboard');
    } catch (_) {
      setError('注册失败，请稍后再试');
      throw new Error('注册失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const resetPassword = async (_data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 这里可以添加实际的密码重置API调用
      // 目前只是模拟重置过程
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟重置成功
      router.push('/login?message=密码重置成功，请使用新密码登录');
    } catch (_) {
      setError('密码重置失败，请稍后再试');
      throw new Error('密码重置失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  // 发送验证码函数
  const sendVerificationCode = async (
    identifier: string,
    _type: 'email' | 'phone',
  ): Promise<boolean> => {
    setError(null);

    try {
      // 这里可以添加实际的发送验证码API调用
      // 目前只是模拟发送过程
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`验证码已发送到${_type === 'email' ? '邮箱' : '手机'}: ${identifier}`);

      // 模拟发送成功
      return true;
    } catch (error) {
      setError(`发送验证码失败，请稍后再试`);
      console.error('发送验证码错误:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        resetPassword,
        sendVerificationCode,
        logout,
        error,
        redirectIfAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
