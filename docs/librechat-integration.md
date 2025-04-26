# LibreChat 集成指南

本文档描述了如何将 ShineGold 主站与 LibreChat 子模块进行集成，实现单点登录（SSO）和共享用户系统。

## 架构概述

![集成架构](https://via.placeholder.com/800x400?text=ShineGold+%2B+LibreChat+集成架构)

主站与 LibreChat 集成采用以下策略：

1. **共享用户体系**：使用相同的 `userId` 作为用户唯一标识
2. **单点登录 (SSO)**：通过共享 JWT 令牌实现系统间无缝认证
3. **分离部署**：两个系统独立部署，通过 API 和重定向进行通信

## 配置步骤

### 1. 环境变量设置

在主站项目根目录创建 `.env.local` 文件，添加以下配置：

```env
# 认证相关配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# LibreChat集成（重要：JWT_SECRET必须与LibreChat一致）
JWT_SECRET=your-shared-jwt-secret
LIBRECHAT_URL=http://localhost:3080
```

在 LibreChat 项目中配置相同的 JWT 密钥：

```env
# LibreChat .env
JWT_SECRET=your-shared-jwt-secret
```

### 2. JWT 令牌格式

确保生成的 JWT 令牌包含 LibreChat 需要的字段：

```json
{
  "userId": "用户唯一ID",
  "email": "用户邮箱",
  "username": "用户名",
  "expiresAt": 1234567890,
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 3. 用户体系对接

按照 `librechat.md` 文档中的用户表结构，确保两个系统的用户信息兼容：

- 主站使用 `userId` 作为用户唯一标识
- LibreChat 使用相同的 `userId` 关联用户数据
- JWT 令牌中的 `userId` 字段是关键连接点

## 前端集成

主站前端包含以下组件：

1. `src/components/librechat-link.tsx` - 提供跳转到 LibreChat 的按钮组件
2. `src/app/api/sso/route.ts` - 处理 SSO 重定向逻辑
3. `src/lib/auth-options.ts` - 配置 NextAuth 生成兼容的 JWT 令牌

### SSO 流程

1. 用户在主站登录，获取包含 `userId` 的 JWT 令牌
2. 用户点击"进入 AI 对话"按钮，触发 SSO 重定向
3. `/api/sso` 路由创建 LibreChat 兼容的 JWT 令牌
4. 重定向到 LibreChat 的 `/api/auth/callback` 端点，携带 JWT 令牌
5. LibreChat 验证令牌并创建会话

## LibreChat 配置

LibreChat 需要进行以下配置：

1. 在 `.env` 文件中设置：

```env
# 与主站共享相同的JWT密钥
JWT_SECRET=your-shared-jwt-secret

# 启用JWT SSO
ALLOW_SOCIAL_LOGIN=true
```

2. 确保 LibreChat 数据库中的用户表与主站兼容

## 故障排除

### 常见问题

1. **无法跳转或登录**：检查两个系统的 JWT_SECRET 是否一致
2. **重定向后仍需登录**：检查 JWT 令牌格式，确保包含 `userId` 字段
3. **LibreChat 认证失败**：检查 LibreChat 是否正确配置了 JWT_SECRET

### 诊断工具

- 使用 [jwt.io](https://jwt.io/) 检查令牌格式
- 查看浏览器开发者工具中的网络请求和重定向流程
- 检查 LibreChat 和主站的服务器日志

## 功能扩展

未来可以扩展以下功能：

1. 会员权限同步（从主站同步到 LibreChat）
2. 聊天历史统一管理
3. 跨系统内容推荐
