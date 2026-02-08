import React from 'react';
import { useHistory } from 'react-router-dom';
import { PATH } from '@router/routes';
import { useLogin } from './useLogin';
import { LoginUI } from './LoginUI';

const LoginComponent: React.FC = () => {
    const history = useHistory();

    const loginState = useLogin({
        onLoginSuccess: user => {
            console.log('登录成功:', user);
            // 登录成功后跳转到首页
            history.push(PATH.HOME);
        },
        onLoginError: error => {
            console.error('登录失败:', error);
        }
    });

    return (
        <LoginUI
            state={{
                loading: loginState.loading,
                error: loginState.error,
                user: loginState.user
            }}
            actions={{
                handleGitHubLogin: loginState.handleGitHubLogin,
                handleLogout: loginState.handleLogout
            }}
        />
    );
};

export default LoginComponent;
