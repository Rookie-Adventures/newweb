'use client';

import Link from 'next/link';

interface LibreChatLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LibreChatLink({ className, children }: LibreChatLinkProps) {
  return (
    <Link
      href="/api/sso"
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        className || 'bg-primary hover:bg-primary-dark text-secondary'
      }`}
    >
      {children || '进入AI对话'}
    </Link>
  );
}
