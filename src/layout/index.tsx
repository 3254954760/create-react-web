import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useHistory } from 'react-router-dom';

import { RouteConfig } from 'react-router-config';
import { NavList, NavItem } from './const';
const { Header, Sider, Content } = Layout;
import RichRoute from '@router/rich-route';
const HomeLayout: React.FC<{ route: RouteConfig[] }> = function ({ route }) {
    console.log('ly', route);
    const [num, setNum] = useState<number>(0);
    const history = useHistory<string>();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    const preTopage = (path: string) => {
        const newNumber = num + 1;
        setNum(newNumber);
        history.push(path);
    };

    return (
        <Layout>
            {/* <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1'
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2'
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3'
                        }
                    ]}
                />
            </Sider> */}
            {NavList.map((navItem: NavItem) => {
                const { label, path } = navItem;
                return <div onClick={() => preTopage(path)}>{label}</div>;
            })}
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                </Header>
                {num}
                <RichRoute route={route} />
            </Layout>
        </Layout>
    );
};

export default HomeLayout;
