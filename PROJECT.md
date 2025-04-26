# shinegold 主站项目开发指南

## 项目概述

这是 shinegold 主站的全栈项目，采用模块化架构设计。主站提供统一的用户系统和共享数据库，通过 JWT 单点登录（SSO）机制，使用共享 userId 做身份标识，为未来可能的子模块集成做好准备。

## 技术栈

### 前端
- Next.js 15
- React 19
- TailwindCSS 4
- TypeScript

### 后端
- NestJS
- Prisma ORM
- TypeScript

## 项目结构

```
e:\newweb\                  # 项目根目录（主站前端）
├── src\                    # 主站前端源代码
│   └── app\                # Next.js App Router
└── server\                 # 主站后端（NestJS）
    ├── src\                # 后端源代码
    └── prisma\             # Prisma 模型和迁移
```

## 开发流程

### 前端开发（Next.js）
1. 在项目根目录执行 `npm run dev` 启动前端开发服务器
2. 前端代码位于 `src/app` 目录，使用 App Router 路由系统
3. 遵循 React Server Components 和 SSR 原则，Client 组件仅用于交互逻辑

### 后端开发（NestJS）
1. 在 `server` 目录执行 `npm run start:dev` 启动后端开发服务器
2. 后端代码位于 `server/src` 目录，遵循 NestJS 模块化结构
3. 数据库交互通过 Prisma ORM 进行，模型定义在 `server/prisma/schema.prisma`

## 编码规范

1. 文件命名统一为 `kebab-case`（例如 `user-profile-card.tsx`）
2. 使用 TailwindCSS 完成全部样式编写，不使用自定义 CSS
3. 使用语义化 HTML 元素，避免 `div` 滥用与嵌套混乱
4. 所有功能组件必须完整实现，不允许 placeholder、todo、未完成逻辑
5. 所有数据组件必须包含 Loading 状态、Error 处理、类型定义和 Error Logging

## 认证与用户体系

- JWT 签发由主站完成，使用相同密钥校验
- 登录返回结构：`{ token, user: { userId, username, ... } }`
- 用户字段、消息结构、权限模型参照项目文档
