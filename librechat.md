1. 用户体系与认证

    子模块（如 LibreChat）与主站共用同一数据库和用户表（user/userId）。
    认证统一采用 JWT，token 由主站后端颁发，子模块用相同密钥校验。
    用户注册、登录、鉴权逻辑保持一致，支持单点登录（SSO）。

LibreChat 用户表结构（packages/data-schemas/src/schema/user.ts）

    主要字段：
        username：用户名，字符串，唯一，小写
        email：邮箱，必填，唯一，小写
        password：密码（hash），8-128位，可选（如三方登录则为空）
        provider：登录方式（local、google、github等），必填
        role：角色，默认 user，可扩展
        avatar：头像URL，可选
        emailVerified：邮箱是否验证，布尔
        googleId/githubId/discordId等：三方登录ID，唯一，稀疏
        plugins：插件配置，数组，可选
        twoFactorEnabled：是否开启二步验证
        totpSecret/backupCodes：二步验证相关
        refreshToken：刷新token数组
        expiresAt：账户过期时间（如有），7天自动过期
        termsAccepted：是否接受条款
        createdAt/updatedAt：自动时间戳
    关联表建议全部用 userId 作为主键

认证与登录逻辑

    JWT token 结构：{ userId, ... }，签名密钥建议与主站一致，7天有效期
    支持本地账号密码、邮箱、三方 OAuth 登录（Google、GitHub、Discord 等）
    密码要求 8-128 位，bcrypt 加密
    支持邮箱验证、二步验证（可选）
    登录成功返回 token + 用户基本信息
    所有受保护接口需携带 Authorization: Bearer {token}

2. 会话与消息体系
Conversation（会话表结构）

    字段：
        conversationId：唯一主键，字符串
        title：会话标题，默认 New Chat
        user：userId，关联用户
        messages：消息ID数组，关联 Message
        agentOptions、endpoint、model、tags、files、isArchived 等丰富业务字段
        createdAt/updatedAt：自动时间戳
    业务说明：所有会话均与 userId 关联，支持归档、标签、模型参数、文件等扩展

Message（消息表结构）

    字段：
        messageId：唯一主键，字符串
        conversationId：会话ID，字符串
        user：userId，关联用户
        text：消息内容
        sender：发送方（user/assistant）
        parentMessageId：父消息ID，支持多轮对话树
        model、endpoint、tokenCount、summary、files、plugin 等扩展字段
        isCreatedByUser：是否用户发出
        createdAt/updatedAt：自动时间戳
    业务说明：支持多轮对话、消息树、插件调用、文件/图片/富媒体等

3. 会员、交易与权限体系
Transaction（交易/积分/计费表结构）

    字段：
        user：userId，关联用户
        conversationId：关联会话
        tokenType：prompt/completion/credits
        model/context/valueKey/rate/tokenValue 等业务参数
        inputTokens/writeTokens/readTokens：分项计量
        createdAt/updatedAt：自动时间戳
    业务说明：可支持积分、配额、计费、会员消耗等多种业务

Role（角色与权限表结构）

    字段：
        name：角色名，唯一
        permissions：权限对象，支持书签、提示词、Agent、多会话、临时对话、代码执行等多维权限
    业务说明：支持多角色、多权限粒度分配，所有权限均可按需扩展

4. 主要子模块目录结构（以 LibreChat 为例）

    代码根目录：d:/LibreChat
    后端 API 目录：d:/LibreChat/api
    前端目录：d:/LibreChat/client
    配置文件：.env, librechat.example.yaml, docker-compose.yml 等

5. 关键业务对接点

    用户注册/登录接口：与主站保持参数和返回格式兼容
    用户唯一标识：全部用 userId 作为主键
    会员、权限、订单等表结构可直接通过 userId 关联
    如需扩展字段，建议采用扩展表或 JSON 字段，避免破坏原有兼容性

4. JWT 配置

    建议主站和子模块统一 JWT_SECRET
    token 结构 { userId, ... }，有效期建议 7 天

5. 未来扩展建议

    新增子模块时，优先共用主站用户体系和认证逻辑
    如需独立微服务，仍可通过 API 网关或统一认证中台实现 SSO
