'use client';

import { useState, useEffect, useCallback } from 'react';

interface VerificationCodeInputProps {
  identifier: string;
  identifierType: 'email' | 'phone' | 'unknown';
  onSendCode: (identifier: string, type: 'email' | 'phone') => Promise<boolean>;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
}

export default function VerificationCodeInput({
  identifier,
  identifierType,
  onSendCode,
  value,
  onChange,
  label = '验证码',
  error,
}: VerificationCodeInputProps) {
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);

  // 倒计时逻辑
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // 发送验证码
  const handleSendCode = useCallback(async () => {
    if (countdown > 0 || isSending) return;
    if (!identifier) {
      return;
    }

    if (identifierType === 'unknown') {
      return;
    }

    try {
      setIsSending(true);
      const success = await onSendCode(identifier, identifierType === 'email' ? 'email' : 'phone');
      setIsSending(false);

      if (success) {
        setCountdown(60); // 60秒倒计时
      }
    } catch (error) {
      setIsSending(false);
    }
  }, [identifier, identifierType, onSendCode, countdown, isSending]);

  // 获取按钮文本
  const getButtonText = () => {
    if (isSending) return '发送中...';
    if (countdown > 0) return `${countdown}秒后重发`;
    return '获取验证码';
  };

  // 获取按钮禁用状态
  const isButtonDisabled = () => {
    return !identifier || identifierType === 'unknown' || countdown > 0 || isSending;
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

      <div className="flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="请输入验证码"
          className={`appearance-none block w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-800`}
        />

        <button
          type="button"
          onClick={handleSendCode}
          disabled={isButtonDisabled()}
          className="shrink-0 inline-flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {getButtonText()}
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
