'use client';

import Link from 'next/link';
import { useState } from 'react';

interface LibreChatLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LibreChatLink({ className, children }: LibreChatLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // 点击后显示加载状态，实际跳转由Link组件处理
  };

  return (
    <Link
      href="/api/sso"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none ${
        isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-primary-dark'
      } ${className || 'bg-primary text-secondary px-4 py-2'}`}
      aria-disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-secondary"
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
        children || '进入AI对话'
      )}
    </Link>
  );
}
