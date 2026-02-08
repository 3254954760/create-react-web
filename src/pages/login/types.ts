// 登录相关类型定义

export interface GitHubUser {
    id: number;
    login: string;
    name: string;
    email: string;
    avatar_url: string;
    bio?: string;
    company?: string;
    location?: string;
}

export interface LoginState {
    loading: boolean;
    error: string | null;
    user: GitHubUser | null;
}

export interface LoginActions {
    handleGitHubLogin: () => void;
    handleLogout: () => void;
}

export interface LoginHandlers {
    onLoginSuccess?: (user: GitHubUser) => void;
    onLoginError?: (error: string) => void;
}

