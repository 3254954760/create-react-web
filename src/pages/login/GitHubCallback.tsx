import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { PATH } from '@router/routes';

/**
 * GitHub OAuth 回调处理组件
 * 这个组件负责处理 GitHub 授权回调，获取 code 并调用后端接口
 */
const GitHubCallback: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            // 如果授权被拒绝，跳转回登录页并显示错误
            const errorDescription = searchParams.get('error_description') || '授权失败';
            history.replace({
                pathname: PATH.LOGIN,
                state: { error: errorDescription }
            });
            return;
        }

        if (code) {
            // code 会在 LoginComponent 中处理
            // 这里只需要跳转回登录页，让 LoginComponent 的 useEffect 处理
            history.replace(PATH.LOGIN + `?code=${code}`);
        } else {
            // 没有 code 也没有 error，可能是直接访问，跳转回登录页
            history.replace(PATH.LOGIN);
        }
    }, [location.search, history]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" tip="正在处理授权..." />
        </div>
    );
};

export default GitHubCallback;
