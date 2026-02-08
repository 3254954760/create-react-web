import React from 'react';
import { Button, Card, Typography, Space, Alert } from 'antd';
import { GithubOutlined, LogoutOutlined } from '@ant-design/icons';
import type { LoginState, LoginActions } from './types';
import styles from './index.module.less';

const { Title, Text } = Typography;

interface LoginUIProps {
    state: LoginState;
    actions: LoginActions;
}

export const LoginUI: React.FC<LoginUIProps> = ({ state, actions }) => {
    const { loading, error, user } = state;
    const { handleGitHubLogin, handleLogout } = actions;

    // 如果已登录，显示用户信息
    if (user) {
        return (
            <div className={styles.container}>
                <Card className={styles.card}>
                    <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
                        <img src={user.avatar_url} alt={user.name} className={styles.avatar} />
                        <Title level={3}>{user.name || user.login}</Title>
                        <Text type="secondary">@{user.login}</Text>
                        {user.email && <Text type="secondary">{user.email}</Text>}
                        {user.bio && <Text>{user.bio}</Text>}
                        <Button type="default" icon={<LogoutOutlined />} onClick={handleLogout} size="large">
                            退出登录
                        </Button>
                    </Space>
                </Card>
            </div>
        );
    }

    // 未登录，显示登录按钮
    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
                    <Title level={2}>欢迎登录</Title>
                    <Text type="secondary">使用 GitHub 账号登录</Text>

                    {error && (
                        <Alert
                            message="登录失败"
                            description={error}
                            type="error"
                            showIcon
                            closable
                            style={{ width: '100%' }}
                        />
                    )}

                    <Button
                        type="primary"
                        icon={<GithubOutlined />}
                        onClick={handleGitHubLogin}
                        loading={loading}
                        size="large"
                        style={{ minWidth: '200px' }}
                    >
                        {loading ? '正在跳转...' : '使用 GitHub 登录'}
                    </Button>

                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        点击按钮将跳转到 GitHub 进行授权
                    </Text>
                </Space>
            </Card>
        </div>
    );
};
