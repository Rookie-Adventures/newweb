'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface LibreChatLinkProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'button' | 'link' | 'card';
  size?: 'sm' | 'md' | 'lg';
}

export default function LibreChatLink({ 
  className, 
  children,
  variant = 'button',
  size = 'md' 
}: LibreChatLinkProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: _session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 根据variant和size决定样式
  let baseStyles = '';
  if (variant === 'button') {
    baseStyles = `inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none ${
      isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-primary-dark'
    } ${className || 'bg-primary text-secondary'}`;
    
    // 应用不同的尺寸
    if (size === 'sm') {
      baseStyles += ' px-3 py-1.5 text-sm';
    } else if (size === 'lg') {
      baseStyles += ' px-6 py-3 text-lg';
    } else {
      baseStyles += ' px-4 py-2';
    }
  } else if (variant === 'card') {
    baseStyles = `block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
      className || 'bg-white dark:bg-secondary'
    }`;
  } else {
    baseStyles = `text-primary hover:underline flex items-center ${className || ''}`;
  }

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果用户未登录，阻止默认跳转并显示错误
    if (status !== 'authenticated') {
      e.preventDefault();
      setErrorMessage('请先登录后再访问AI对话');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    // 不需要其他处理，Link会处理跳转
  };

  return (
    <div className="relative">
      <Link
        href="/api/sso"
        onClick={handleClick}
        className={baseStyles}
        aria-disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            跳转中...
          </span>
        ) : (
          <>
            {variant === 'link' ? (
              <>{children || '进入AI对话'}</>
            ) : (
              <span className="flex items-center">
                <svg 
                  className="mr-2 h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {children || '进入AI对话'}
              </span>
            )}
          </>
        )}
      </Link>
      
      {errorMessage && (
        <div className="absolute top-full left-0 mt-2 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm shadow-md z-10">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
