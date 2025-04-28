'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // 检查用户是否已登录
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">欢迎回来，{session?.user?.name || '用户'}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            当前登录身份: {session?.user?.email}
          </p>
          
          {session?.user?.role && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              用户角色: {session.user.role}
            </p>
          )}
          
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h2 className="text-lg font-semibold mb-2">会话信息</h2>
            <pre className="text-xs overflow-auto p-2 bg-gray-100 dark:bg-gray-900 rounded">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">快速链接</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary hover:underline">个人资料设置</a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">账户安全</a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">通知中心</a>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">最近活动</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">登录成功</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">刚刚</p>
              </div>
              {/* 更多活动记录 */}
            </div>
          </div>
          
          <div className="bg-white dark:bg-secondary rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">系统状态</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">API 连接</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">正常</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">LibreChat 集成</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">配置中</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 