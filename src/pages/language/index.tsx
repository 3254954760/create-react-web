import React, { useState } from 'react';
import { Card, Button, Space, Typography, Divider, Tag, Row, Col, Statistic } from 'antd';
import { GlobalOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

const { Title, Paragraph, Text } = Typography;

const LanguageSwitch: React.FC = () => {
    const { t, i18n } = useTranslation('main');
    const currentLang = i18n.language || 'zh';
    const [userCount, setUserCount] = useState(5);
    const [userName] = useState('张三');

    const switchLanguage = (lang: 'zh' | 'en') => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.header}>
                    <GlobalOutlined className={styles.icon} />
                    <Title level={2}>{t('language.title')}</Title>
                </div>

                <Divider />

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {/* 语言切换区域 */}
                    <div className={styles.switchSection}>
                        <Text strong>{t('language.current')}: </Text>
                        <Tag color="blue" icon={<CheckCircleOutlined />}>
                            {currentLang === 'zh' ? t('language.chinese') : t('language.english')}
                        </Tag>
                        <div className={styles.buttonGroup}>
                            <Button
                                type={currentLang === 'zh' ? 'primary' : 'default'}
                                onClick={() => switchLanguage('zh')}
                                disabled={currentLang === 'zh'}
                            >
                                {t('language.chinese')}
                            </Button>
                            <Button
                                type={currentLang === 'en' ? 'primary' : 'default'}
                                onClick={() => switchLanguage('en')}
                                disabled={currentLang === 'en'}
                            >
                                {t('language.english')}
                            </Button>
                        </div>
                    </div>

                    <Divider />

                    {/* 欢迎信息 */}
                    <div className={styles.contentSection}>
                        <Title level={3}>{t('language.welcome')}</Title>
                        <Paragraph>{t('language.description')}</Paragraph>

                        {/* 带参数的翻译示例 */}
                        <Divider orientation="left">带参数的翻译示例</Divider>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Card size="small">
                                <Title level={5}>1. 基本插值（变量替换）</Title>
                                <Text>{t('language.welcomeWithName', { name: userName })}</Text>
                            </Card>

                            <Card size="small">
                                <Title level={5}>2. 数字插值</Title>
                                <Space>
                                    <Text>{t('language.userCount', { count: userCount })}</Text>
                                    <Button size="small" onClick={() => setUserCount(userCount + 1)}>
                                        +1
                                    </Button>
                                    <Button size="small" onClick={() => setUserCount(Math.max(0, userCount - 1))}>
                                        -1
                                    </Button>
                                </Space>
                            </Card>

                            <Card size="small">
                                <Title level={5}>3. 复数形式</Title>
                                <Text>{t('language.message', { count: userCount })}</Text>
                            </Card>

                            <Card size="small">
                                <Title level={5}>4. 多个参数</Title>
                                <Text>{t('language.demo.userInfo', { username: userName, type: '个人' })}</Text>
                            </Card>

                            <Card size="small">
                                <Title level={5}>5. 格式化（日期、货币等）</Title>
                                <Space direction="vertical">
                                    <Text>{t('language.lastLogin', { date: new Date() })}</Text>
                                    <Text>{t('language.price', { value: 99.99 })}</Text>
                                </Space>
                            </Card>

                            <Card size="small">
                                <Title level={5}>6. 动态计数</Title>
                                <Statistic
                                    title={t('language.demo.itemCount', { count: userCount })}
                                    value={userCount}
                                    prefix={<UserOutlined />}
                                />
                            </Card>
                        </Space>
                    </div>

                    {/* 功能特点 */}
                    <div className={styles.contentSection}>
                        <Title level={4}>{t('language.features.title')}</Title>
                        <ul className={styles.featureList}>
                            <li>{t('language.features.item1')}</li>
                            <li>{t('language.features.item2')}</li>
                            <li>{t('language.features.item3')}</li>
                        </ul>
                    </div>

                    <Divider />

                    {/* 演示内容 */}
                    <div className={styles.contentSection}>
                        <Title level={4}>{t('language.demo.title')}</Title>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8}>
                                <Card size="small" hoverable>
                                    <Title level={5}>{t('system.title')}</Title>
                                    <Text type="secondary">{t('language.demo.systemManagement')}</Text>
                                    <div className={styles.demoItem}>
                                        <Text>{t('system.user.title')}</Text>
                                    </div>
                                    <div className={styles.demoItem}>
                                        <Text>{t('system.role.title')}</Text>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <Card size="small" hoverable>
                                    <Title level={5}>{t('content.title')}</Title>
                                    <Text type="secondary">{t('language.demo.contentManagement')}</Text>
                                    <div className={styles.demoItem}>
                                        <Text>{t('content.article.title')}</Text>
                                    </div>
                                    <div className={styles.demoItem}>
                                        <Text>{t('content.comment.title')}</Text>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                <Card size="small" hoverable>
                                    <Title level={5}>{t('settings.title')}</Title>
                                    <Text type="secondary">{t('language.demo.systemSettings')}</Text>
                                    <div className={styles.demoItem}>
                                        <Text>{t('settings.system.title')}</Text>
                                    </div>
                                    <div className={styles.demoItem}>
                                        <Text>{t('settings.personal.title')}</Text>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <Divider />

                    {/* 通用操作按钮演示 */}
                    <div className={styles.contentSection}>
                        <Title level={4}>{t('common.operation')}</Title>
                        <Space wrap>
                            <Button type="primary">{t('common.confirm')}</Button>
                            <Button>{t('common.cancel')}</Button>
                            <Button type="primary" ghost>
                                {t('common.submit')}
                            </Button>
                            <Button>{t('common.reset')}</Button>
                            <Button type="link">{t('common.search')}</Button>
                            <Button type="link">{t('common.add')}</Button>
                            <Button type="link">{t('common.edit')}</Button>
                            <Button type="link" danger>
                                {t('common.delete')}
                            </Button>
                        </Space>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default LanguageSwitch;
