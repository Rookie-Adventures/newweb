import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * 处理GET请求
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'GET');
}

/**
 * 处理POST请求
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'POST');
}

/**
 * 处理DELETE请求
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'DELETE');
}

/**
 * 处理PUT请求
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PUT');
}

/**
 * 处理PATCH请求
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PATCH');
}

/**
 * 统一请求处理函数
 * @param request Next.js请求对象
 * @param pathSegments 路径片段
 * @param method HTTP方法
 * @returns Next.js响应对象
 */
async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  // 1. 获取JWT令牌（如果有的话）
  const token = await getToken({ req: request });
  
  // 2. 构建后端API URL
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const path = pathSegments.join('/');
  const queryString = new URL(request.url).search;
  const url = `${backendUrl}/integration/librechat/${path}${queryString}`;
  
  // 调试日志
  console.log(`[LibreChat代理] 请求: ${method} ${url}`);
  console.log(`[LibreChat代理] 认证状态: ${token ? '已认证' : '未认证'}`);
  
  // 3. 构建请求选项
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 携带cookie
    cache: 'no-store',
  };
  
  // 4. 添加认证头（如果令牌存在）
  if (token) {
    // 使用正确的token格式
    let authToken = '';
    
    // 优先使用后端返回的认证token
    if (token.authToken) {
      authToken = token.authToken;
      console.log('[LibreChat代理] 使用后端认证token');
    }
    // 其次使用自定义生成的token
    else if (token.token) {
      // 使用我们自定义生成的token字符串
      authToken = token.token;
      console.log('[LibreChat代理] 使用自定义token');
    } else {
      // 构建兼容LibreChat的token
      authToken = JSON.stringify({
        userId: token.userId || token.id,
        username: token.username || token.name,
        email: token.email,
        role: token.role || 'user',
      });
      console.log('[LibreChat代理] 使用构建的token');
    }
    
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
    };
  }
  
  // 5. 添加请求体（适用于POST、PUT等方法）
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      options.body = await request.text();
    } catch (error) {
      console.error('解析请求体失败:', error);
    }
  }
  
  try {
    // 6. 发送请求到中间层API
    console.log(`[LibreChat代理] 调用后端API: ${url}`);
    const response = await fetch(url, options);
    
    // 7. 提取响应数据
    const data = await response.text();
    console.log(`[LibreChat代理] 响应状态: ${response.status}`);
    
    // 8. 构建响应
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      headers.set(key, value);
    });
    
    // 9. 返回响应
    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    // 10. 错误处理
    console.error('API代理请求失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误', message: (error as Error).message },
      { status: 500 }
    );
  }
} 