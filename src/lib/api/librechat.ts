/**
 * LibreChat API客户端
 * 通过中间层API访问LibreChat服务
 */

import { getSession } from 'next-auth/react';

// API基础路径
const API_BASE_URL = '/api/integration/librechat';

/**
 * LibreChat API客户端
 */
export const libreChatClient = {
  /**
   * 获取对话列表
   * @returns 对话列表
   */
  async getConversations() {
    return await fetchWithAuth(`${API_BASE_URL}/convos`);
  },

  /**
   * 获取单个对话
   * @param conversationId 对话ID
   * @returns 对话详情
   */
  async getConversation(conversationId: string) {
    return await fetchWithAuth(`${API_BASE_URL}/convos/${conversationId}`);
  },
  
  /**
   * 创建新对话
   * @param title 对话标题（可选）
   * @returns 新创建的对话
   */
  async createConversation(title?: string) {
    return await fetchWithAuth(`${API_BASE_URL}/convos`, {
      method: 'POST',
      body: JSON.stringify({ title: title || '新对话' }),
    });
  },
  
  /**
   * 发送消息
   * @param conversationId 对话ID
   * @param message 消息内容
   * @param options 其他选项
   * @returns 发送结果
   */
  async sendMessage(conversationId: string, message: string, options?: any) {
    return await fetchWithAuth(`${API_BASE_URL}/message`, {
      method: 'POST',
      body: JSON.stringify({
        conversationId,
        message,
        ...options,
      }),
    });
  },
  
  /**
   * 获取消息列表
   * @param conversationId 对话ID
   * @returns 消息列表
   */
  async getMessages(conversationId: string) {
    return await fetchWithAuth(`${API_BASE_URL}/messages/${conversationId}`);
  },
  
  /**
   * 删除对话
   * @param conversationId 对话ID
   * @returns 删除结果
   */
  async deleteConversation(conversationId: string) {
    return await fetchWithAuth(`${API_BASE_URL}/convos/${conversationId}`, {
      method: 'DELETE',
    });
  },
  
  /**
   * 获取当前用户信息
   * @returns 用户信息
   */
  async getUserInfo() {
    return await fetchWithAuth(`${API_BASE_URL}/user/info`);
  },
  
  /**
   * 检查LibreChat服务状态
   * @returns 服务状态
   */
  async checkHealth() {
    return await fetch(`${API_BASE_URL}/health`).then(res => res.json());
  },
};

/**
 * 带认证的请求工具函数
 * @param url 请求URL
 * @param options 请求选项
 * @returns 响应数据
 */
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // 确保包含认证信息
  // 注意：如果使用Cookie认证，可能不需要设置Authorization头
  const session = await getSession();
  
  // 设置请求头
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  // 如果有session且没有使用Cookie认证，则添加Authorization头
  if (session?.user) {
    // 通常不需要显式设置，因为我们使用Cookie，但为了兼容性保留此代码
    // headers.set('Authorization', `Bearer ${session.user.token}`);
  }
  
  // 发送请求
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // 重要：携带Cookie
  });
  
  // 处理非成功响应
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: '请求失败' }));
    throw new Error(error.message || `请求失败: ${response.status}`);
  }
  
  // 解析响应数据
  return response.json();
} 