import { NextRequest, NextResponse } from 'next/server';

/**
 * 处理登录请求
 * 此API是本地开发环境使用的模拟登录服务
 * 在生产环境中应该连接到实际的认证服务
 */
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();
    const { email, password } = body;

    // 验证请求数据
    if (!email || !password) {
      return NextResponse.json(
        { message: '邮箱和密码不能为空' },
        { status: 400 }
      );
    }

    console.log('登录请求:', { email, passwordLength: password?.length });

    // 开发环境模拟用户
    if (email === 'admin@example.com' && password === 'password') {
      console.log('登录成功: 管理员账户');
      return NextResponse.json({
        user: {
          id: '1',
          name: '管理员',
          email: 'admin@example.com',
          role: 'admin',
        },
        message: '登录成功',
      });
    }

    // 添加更多测试账户
    if (email === 'test@example.com' && password === 'password') {
      console.log('登录成功: 测试账户');
      return NextResponse.json({
        user: {
          id: '2',
          name: '测试用户',
          email: 'test@example.com',
          role: 'user',
        },
        message: '登录成功',
      });
    }

    // 任何邮箱加上 "dev" 密码都能登录（仅开发环境）
    if (process.env.NODE_ENV === 'development' && password === 'dev') {
      console.log('登录成功: 开发模式通用账户');
      return NextResponse.json({
        user: {
          id: '999',
          name: email.split('@')[0],
          email: email,
          role: 'user',
        },
        message: '登录成功',
      });
    }

    // 登录失败
    console.log('登录失败: 邮箱或密码不正确');
    return NextResponse.json(
      { message: '邮箱或密码不正确' },
      { status: 401 }
    );
  } catch (error) {
    console.error('登录处理错误:', error);
    return NextResponse.json(
      { message: '服务器内部错误' },
      { status: 500 }
    );
  }
} 