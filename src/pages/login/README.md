# GitHub SSO 登录配置说明

## 功能说明

已实现 GitHub OAuth 登录功能，采用三层架构：
- `LoginUI.tsx` - 纯展示组件
- `useLogin.ts` - 登录逻辑 Hook
- `LoginComponent.tsx` - 组合组件

## 配置步骤

### 1. 创建 GitHub OAuth App

1. 访问 GitHub Settings → Developer settings → OAuth Apps
2. 点击 "New OAuth App"
3. 填写信息：
   - **Application name**: 你的应用名称
   - **Homepage URL**: `http://localhost:5000` (开发环境)
   - **Authorization callback URL**: `http://localhost:5000/auth/github/callback`
4. 点击 "Register application"
5. 复制 **Client ID**

### 2. 配置环境变量

在项目根目录创建 `.env` 文件（如果还没有）：

```env
REACT_APP_GITHUB_CLIENT_ID=你的_GitHub_Client_ID
```

### 3. 后端接口实现

需要实现以下后端接口：

**POST `/api/auth/github`**

请求体：
```json
{
  "code": "从GitHub回调获取的code"
}
```

响应：
```json
{
  "id": 123456,
  "login": "username",
  "name": "User Name",
  "email": "user@example.com",
  "avatar_url": "https://avatars.githubusercontent.com/u/123456",
  "bio": "User bio",
  "company": "Company",
  "location": "Location"
}
```

### 4. 后端实现示例（Node.js/Express）

```javascript
app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  const GITHUB_REDIRECT_URI = 'http://localhost:5000/auth/github/callback';

  try {
    // 1. 用 code 换取 access_token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    // 2. 用 access_token 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const userData = await userResponse.json();

    // 3. 获取用户邮箱（需要 user:email scope）
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const emails = await emailResponse.json();
    const primaryEmail = emails.find((email: any) => email.primary)?.email || emails[0]?.email;

    // 4. 返回用户信息
    res.json({
      id: userData.id,
      login: userData.login,
      name: userData.name || userData.login,
      email: primaryEmail || userData.email,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      company: userData.company,
      location: userData.location
    });
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

## 使用流程

1. 用户点击 "使用 GitHub 登录" 按钮
2. 跳转到 GitHub 授权页面
3. 用户授权后，GitHub 回调到 `/auth/github/callback?code=xxx`
4. `GitHubCallback` 组件处理回调，跳转回登录页并带上 code
5. `useLogin` Hook 检测到 code，调用后端接口 `/api/auth/github`
6. 后端用 code 换取 token，获取用户信息并返回
7. 前端保存用户信息到 localStorage，跳转到首页

## 注意事项

1. **安全性**：
   - Client Secret 必须保存在后端，不能暴露在前端
   - 生产环境必须使用 HTTPS
   - 建议添加 state 参数防止 CSRF 攻击

2. **环境变量**：
   - 开发环境：`.env`
   - 生产环境：需要配置相应的环境变量

3. **回调 URL**：
   - 开发环境：`http://localhost:5000/auth/github/callback`
   - 生产环境：需要更新为实际域名

4. **用户信息存储**：
   - 当前使用 localStorage 存储
   - 生产环境建议使用更安全的存储方式（如 httpOnly cookie）

## 文件结构

```
src/pages/login/
├── index.tsx              # 导出入口
├── LoginComponent.tsx     # 组合组件
├── LoginUI.tsx            # 纯展示组件
├── useLogin.ts            # 登录逻辑 Hook
├── types.ts               # 类型定义
├── GitHubCallback.tsx     # GitHub 回调处理组件
├── index.module.less      # 样式文件
└── README.md             # 本文件
```

