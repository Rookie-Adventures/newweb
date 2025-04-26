'use client';

import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';

// 定义输入类型
export type IdentifierType = 'phone' | 'email' | 'unknown';

interface SmartIdentifierInputProps {
  value: string;
  onChange: (value: string, type: IdentifierType) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  label?: string;
  error?: string;
}

export default function SmartIdentifierInput({
  value,
  onChange,
  placeholder = '手机号或电子邮箱',
  className = '',
  autoFocus = false,
  label,
  error,
}: SmartIdentifierInputProps) {
  const [inputType, setInputType] = useState<IdentifierType>('unknown');
  const [internalValue, setInternalValue] = useState(value);

  // 识别输入类型的函数
  const identifyType = (val: string): IdentifierType => {
    // 邮箱正则
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 手机号正则 (简化版，实际应更复杂)
    const phoneRegex = /^\+?[0-9]{6,15}$/;

    if (emailRegex.test(val)) {
      return 'email';
    } else if (phoneRegex.test(val.replace(/\s/g, ''))) {
      return 'phone';
    }

    // 初步判断输入倾向
    if (val.includes('@')) {
      return 'email';
    } else if (/^\+?\d/.test(val)) {
      return 'phone';
    }

    return 'unknown';
  };

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    const newType = identifyType(newValue);
    setInputType(newType);
    onChange(newValue, newType);
  };

  // 处理手机号输入变化
  const handlePhoneChange = (newValue: string | undefined) => {
    const val = newValue || '';
    setInternalValue(val);
    onChange(val, 'phone');
  };

  // 初始识别
  useEffect(() => {
    if (value) {
      setInputType(identifyType(value));
    }
  }, [value]);

  // 监听外部value变化
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // 根据识别到的类型显示不同输入框
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}

      {(inputType === 'unknown' || inputType === 'email') && (
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`appearance-none block w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-800 ${className}`}
          autoFocus={autoFocus}
        />
      )}

      {inputType === 'phone' && (
        <PhoneInput
          international
          defaultCountry="CN"
          value={internalValue}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={`appearance-none block w-full border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 ${className}`}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
