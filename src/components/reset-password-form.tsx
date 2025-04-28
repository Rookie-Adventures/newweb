'use client';

import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function ResetPasswordForm() {
  const { resetPassword,isLoading, error } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    identifier: '',
    type: 'email' as 'email' | 'phone',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const [_codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);

  // 处理输入变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理手机号输入
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, identifier: value }));
  };

  // 处理输入类型变化
  const handleTypeChange = (type: 'email' | 'phone') => {
    setFormData((prev) => ({ ...prev, type, identifier: '' }));
  };

  // 发送验证码
  const handleSendCode = useCallback(async () => {
    if (!formData.identifier) {
      setLocalError('请输入邮箱或手机号');
      return;
    }

    // 验证邮箱或手机号格式
    if (formData.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier)) {
      setLocalError('请输入有效的邮箱地址');
      return;
    }

    if (
      formData.type === 'phone' &&
      !/^\+?[0-9]{8,15}$/.test(formData.identifier.replace(/\s+/g, ''))
    ) {
      setLocalError('请输入有效的手机号码');
      return;
    }

    try {
      // 发送验证码
      if (formData.type === 'email' || formData.type === 'phone') {
        setCodeSent(true);
        setCountdown(60);

        // 创建定时器
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        toast({
          title: '验证码已发送',
          description: `验证码已发送到您的${formData.type === 'email' ? '邮箱' : '手机'}`,
        });
      }
    } catch (_err) {
      toast({
        variant: 'destructive',
        title: '发送验证码失败',
        description: '请稍后再试',
      });
    }
  }, [formData.identifier, formData.type, toast]);

  // 验证表单
  const validateForm = () => {
    if (!formData.identifier) {
      setLocalError('请输入邮箱或手机号');
      return false;
    }

    if (!formData.verificationCode) {
      setLocalError('请输入验证码');
      return false;
    }

    if (!formData.password) {
      setLocalError('请输入新密码');
      return false;
    }

    if (formData.password.length < 8) {
      setLocalError('密码长度至少为8个字符');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('两次输入的密码不一致');
      return false;
    }

    return true;
  };

  // 提交表单
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (!validateForm()) return;

    try {
      const resetData = {
        ...(formData.type === 'email'
          ? { email: formData.identifier }
          : { phone: formData.identifier }),
        password: formData.password,
        verificationCode: formData.verificationCode,
      };

      await resetPassword(resetData);

      toast({
        title: '密码重置成功',
        description: '请使用新密码登录',
      });
    } catch (_err) {
      toast({
        variant: 'destructive',
        title: '密码重置失败',
        description: error || '请稍后再试',
      });
    }
  };

  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">重置密码</h1>
        <p className="text-sm text-muted-foreground">
          输入您的邮箱或手机号，我们将发送验证码帮助您重置密码
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex gap-4">
          <Button
            type="button"
            variant={formData.type === 'email' ? 'default' : 'outline'}
            className="w-1/2"
            onClick={() => handleTypeChange('email')}
          >
            邮箱
          </Button>
          <Button
            type="button"
            variant={formData.type === 'phone' ? 'default' : 'outline'}
            className="w-1/2"
            onClick={() => handleTypeChange('phone')}
          >
            手机号
          </Button>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="identifier">{formData.type === 'email' ? '邮箱地址' : '手机号码'}</Label>
          {formData.type === 'email' ? (
            <Input
              id="identifier"
              name="identifier"
              type="email"
              placeholder="name@example.com"
              value={formData.identifier}
              onChange={handleChange}
              autoComplete="email"
            />
          ) : (
            <PhoneInput
              id="identifier"
              value={formData.identifier}
              onChange={handlePhoneChange}
              placeholder="输入手机号码"
            />
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="verificationCode">验证码</Label>
          </div>
          <div className="flex gap-2">
            <Input
              id="verificationCode"
              name="verificationCode"
              type="text"
              placeholder="6位验证码"
              value={formData.verificationCode}
              onChange={handleChange}
              className="flex-1"
              maxLength={6}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleSendCode}
              disabled={countdown > 0 || isLoading}
              className="w-32"
            >
              {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">新密码</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="输入新密码"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="再次输入新密码"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        {(localError || error) && (
          <div className="text-sm text-red-500 mt-2">{localError || error}</div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? '处理中...' : '重置密码'}
        </Button>
      </form>
    </div>
  );
}
