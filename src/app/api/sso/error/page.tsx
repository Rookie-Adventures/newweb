'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SsoErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // 从URL参数中获取错误信息
  const error = searchParams.get('error') || 'unknown_error';
  const message = searchParams.get('message') || '认证过程中发生未知错误';

  // 错误类型与说明映射
  const errorMessages: Record<string, string> = {
    user_not_found: '用户不存在或未登录',
    invalid_token: 'Token无效或已过期',
    config_error: '服务器配置错误',
    server_error: '服务器处理错误',
    unknown_error: '发生未知错误',
  };

  // 自动倒计时返回
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <section className="w-full max-w-md mx-auto p-6 bg-white dark:bg-secondary rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500 dark:text-red-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">认证失败</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-4">{errorMessages[error] || message}</p>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {countdown}秒后自动返回首页
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
          >
            返回首页
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-secondary rounded-md hover:bg-primary-dark transition-colors"
          >
            重新登录
          </Link>
        </div>
      </section>
    </main>
  );
}
