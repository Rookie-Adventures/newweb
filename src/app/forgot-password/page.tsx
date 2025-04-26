'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import SmartIdentifierInput, { IdentifierType } from '@/components/smart-identifier-input';
import VerificationCodeInput from '@/components/verification-code-input';

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading, error: authError, redirectIfAuthenticated } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState<IdentifierType>('unknown');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: 填写账号 2: 设置新密码
  const [verificationError, setVerificationError] = useState('');

  // 检查用户是否已登录，如果已登录则重定向
  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  const handleIdentifierChange = (value: string, type: IdentifierType) => {
    setIdentifier(value);
    setIdentifierType(type);
    if (error) setError('');
    if (verificationError) setVerificationError('');
  };

  // 发送验证码的处理函数
  const handleSendCode = async (id: string, type: 'email' | 'phone'): Promise<boolean> => {
    try {
      // 这里需要调用后端API发送验证码
      console.log(`向${type === 'email' ? '邮箱' : '手机号'} ${id} 发送验证码`);

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 成功返回true
      return true;
    } catch (error) {
      setVerificationError('验证码发送失败，请稍后再试');
      return false;
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerificationError('');

    if (!identifier) {
      setError('请输入手机号或电子邮箱');
      return;
    }

    if (!verificationCode) {
      setVerificationError('请输入验证码');
      return;
    }

    // 模拟验证码验证成功，进入下一步
    setStep(2);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('请输入新密码');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不匹配');
      return;
    }

    try {
      await resetPassword({
        email: identifierType === 'email' ? identifier : undefined,
        phone: identifierType === 'phone' ? identifier : undefined,
        password,
        verificationCode,
      });
    } catch (_) {
      setError('重置密码失败，请稍后再试');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/">
            <Image
              src="/shinegold-logo.svg"
              alt="ShineGold AI Logo"
              width={180}
              height={40}
              className="mx-auto dark:invert"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            重置密码
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            想起密码了？{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
              立即登录
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {authError && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-sm text-red-700 dark:text-red-200">{authError}</p>
              </div>
            )}

            {step === 1 ? (
              <form className="space-y-6" onSubmit={handleVerifyCode}>
                <SmartIdentifierInput
                  value={identifier}
                  onChange={handleIdentifierChange}
                  label="手机号或电子邮箱"
                  placeholder="请输入您的手机号或电子邮箱"
                  error={error && error.includes('手机号或电子邮箱') ? error : undefined}
                />

                <VerificationCodeInput
                  identifier={identifier}
                  identifierType={identifierType}
                  onSendCode={handleSendCode}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  error={verificationError}
                />

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '验证中...' : '下一步'}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    新密码
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        error && error.includes('密码') && !error.includes('两次')
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-800`}
                    />
                    {error && error.includes('密码') && !error.includes('两次') && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    确认新密码
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        error && error.includes('两次输入的密码')
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-800`}
                    />
                    {error && error.includes('两次输入的密码') && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    返回上一步
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '重置中...' : '重置密码'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
