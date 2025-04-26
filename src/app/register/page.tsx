'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import SmartIdentifierInput, { IdentifierType } from '@/components/smart-identifier-input';
import VerificationCodeInput from '@/components/verification-code-input';

export default function RegisterPage() {
  const { register, isLoading, error: authError, redirectIfAuthenticated } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState<IdentifierType>('unknown');
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // 检查用户是否已登录，如果已登录则重定向
  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError('');
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerificationError('');

    // 验证是否填写昵称
    if (!formData.nickname.trim()) {
      setError('请输入您的昵称');
      return;
    }

    // 验证账号是否填写
    if (!identifier) {
      setError('请输入手机号或电子邮箱');
      return;
    }

    // 验证验证码是否填写
    if (!verificationCode) {
      setVerificationError('请输入验证码');
      return;
    }

    // 验证密码是否填写
    if (!formData.password) {
      setError('请输入密码');
      return;
    }

    // 验证密码是否匹配
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不匹配');
      return;
    }

    // 验证是否同意条款
    if (!agreeTerms) {
      setError('请同意用户协议和隐私政策');
      return;
    }

    try {
      await register({
        name: formData.nickname,
        email: identifierType === 'email' ? identifier : undefined,
        phone: identifierType === 'phone' ? identifier : undefined,
        password: formData.password,
        type: identifierType === 'email' ? 'email' : 'phone',
        verificationCode: verificationCode,
      });
    } catch (_) {
      setError('注册失败，请稍后再试');
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
            注册新账户
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            已有账户？{' '}
            <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
              登录
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

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  昵称
                </label>
                <div className="mt-1">
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    autoComplete="nickname"
                    required
                    value={formData.nickname}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      error && error.includes('昵称')
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white dark:bg-gray-800`}
                    placeholder="请输入您的昵称"
                  />
                  {error && error.includes('昵称') && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                  )}
                </div>
              </div>

              <SmartIdentifierInput
                value={identifier}
                onChange={handleIdentifierChange}
                label="手机号或电子邮箱"
                placeholder="请输入手机号或电子邮箱"
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  密码
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
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
                  确认密码
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
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

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className={`h-4 w-4 text-primary focus:ring-primary ${
                    error && error.includes('协议')
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-700'
                  } rounded`}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  我已阅读并同意{' '}
                  <Link href="/terms" className="font-medium text-primary hover:text-primary-dark">
                    用户协议
                  </Link>{' '}
                  和{' '}
                  <Link
                    href="/privacy"
                    className="font-medium text-primary hover:text-primary-dark"
                  >
                    隐私政策
                  </Link>
                </label>
              </div>
              {error && error.includes('协议') && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '注册中...' : '注册'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
