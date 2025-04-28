'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoading = status === 'loading';

  return (
    <header className="bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gradient">ShineGold</span>
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                首页
              </Link>
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/about'
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                关于我们
              </Link>
              <Link
                href="/services"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/services'
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                服务
              </Link>
            </nav>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isLoading ? (
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            ) : session ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-md font-medium bg-secondary hover:bg-secondary-dark text-white"
              >
                控制台
              </Link>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md font-medium bg-transparent border border-secondary hover:bg-secondary/10 text-secondary dark:text-white"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-md font-medium bg-secondary hover:bg-secondary-dark text-white"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="主菜单"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <nav className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/'
                  ? 'border-primary text-primary-dark bg-primary/10'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              首页
            </Link>
            <Link
              href="/about"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/about'
                  ? 'border-primary text-primary-dark bg-primary/10'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              关于我们
            </Link>
            <Link
              href="/services"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/services'
                  ? 'border-primary text-primary-dark bg-primary/10'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              服务
            </Link>

            {isLoading ? (
              <div className="mx-3 mt-4 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            ) : session ? (
              <Link
                href="/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                控制台
              </Link>
            ) : (
              <div className="mt-4 px-3 space-y-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2 rounded-md font-medium bg-transparent border border-secondary hover:bg-secondary/10 text-secondary dark:text-white text-center"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="block w-full px-4 py-2 rounded-md font-medium bg-secondary hover:bg-secondary-dark text-white text-center"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
