import React, { useState } from 'react';
import { Card, Button, Space, Typography, Divider, Tag, Row, Col, Statistic } from 'antd';
import { GlobalOutlined, CheckCircleOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import styles from './index.module.less';

const { Title, Paragraph, Text } = Typography;

const LanguageSwitch: React.FC = () => {
    const { t, i18n } = useTranslation('main');
    const currentLang = i18n.language || 'zh';
    const [userCount, setUserCount] = useState(5);
    const [userName] = useState('张三');
    const [licensePrice] = useState(99.99);
    const [licensePriceCycle, setLicensePriceCycle] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

    const switchLanguage = (lang: 'zh' | 'en') => {
        i18n.changeLanguage(lang);
    };

    // 格式化货币
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(currentLang === 'zh' ? 'zh-CN' : 'en-US', {
            style: 'currency',
            currency: currentLang === 'zh' ? 'CNY' : 'USD'
        }).format(value);
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

                        {/* Trans 组件示例 */}
                        <Divider orientation="left">Trans 组件示例（JSX 元素替换）</Divider>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Card size="small">
                                <Title level={5}>1. 基本用法 - 链接替换</Title>
                                <Trans
                                    i18nKey="language.demo.transExample1"
                                    ns="main"
                                    components={[
                                        <a
                                            key="0"
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                alert('点击了链接');
                                            }}
                                        >
                                            这里
                                        </a>
                                    ]}
                                />
                            </Card>

                            <Card size="small">
                                <Title level={5}>2. 多个元素替换 + 参数</Title>
                                <Trans
                                    i18nKey="language.demo.transExample2"
                                    ns="main"
                                    values={{ name: userName, count: userCount }}
                                    components={[
                                        <span key="0" />, // 占位符，不会被使用
                                        <Tag key="1" color="blue">
                                            {userName}
                                        </Tag>,
                                        <Tag key="2" color="red">
                                            {userCount}
                                        </Tag>
                                    ]}
                                />
                            </Card>

                            <Card size="small">
                                <Title level={5}>3. 多个链接替换</Title>
                                <Trans
                                    i18nKey="language.demo.transExample3"
                                    ns="main"
                                    components={[
                                        <a
                                            key="0"
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                alert('服务条款');
                                            }}
                                        >
                                            服务条款
                                        </a>,
                                        <a
                                            key="1"
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                alert('隐私政策');
                                            }}
                                        >
                                            隐私政策
                                        </a>
                                    ]}
                                />
                            </Card>

                            <Card size="small">
                                <Title level={5}>4. 样式元素替换</Title>
                                <Trans
                                    i18nKey="language.demo.transExample4"
                                    ns="main"
                                    components={[<strong key="0" />, <em key="1" />]}
                                />
                            </Card>

                            <Card size="small">
                                <Title level={5}>5. 按钮元素替换</Title>
                                <Trans
                                    i18nKey="language.demo.transExample5"
                                    ns="main"
                                    components={[
                                        <Button key="0" type="primary" size="small" onClick={() => alert('提交成功')}>
                                            提交
                                        </Button>
                                    ]}
                                />
                            </Card>
                        </Space>

                        {/* Trans 组件 - 对象语法写法（类似用户提供的示例） */}
                        <Divider orientation="left">Trans 组件 - 对象语法写法</Divider>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Card size="small">
                                <Title level={5}>1. 对象语法 - 价格和周期（类似您的示例）</Title>
                                <Trans
                                    i18nKey="language.demo.licensePrice"
                                    ns="main"
                                    values={{
                                        price: formatCurrency(licensePrice),
                                        period: {
                                            daily: t('language.demo.dailyPeriod'),
                                            monthly: t('language.demo.monthlyPeriod'),
                                            yearly: t('language.demo.yearlyPeriod')
                                        }[licensePriceCycle]
                                    }}
                                />
                                <div style={{ marginTop: 8 }}>
                                    <Space>
                                        <Button size="small" onClick={() => setLicensePriceCycle('daily')}>
                                            {t('language.demo.dailyPeriod')}
                                        </Button>
                                        <Button size="small" onClick={() => setLicensePriceCycle('monthly')}>
                                            {t('language.demo.monthlyPeriod')}
                                        </Button>
                                        <Button size="small" onClick={() => setLicensePriceCycle('yearly')}>
                                            {t('language.demo.yearlyPeriod')}
                                        </Button>
                                    </Space>
                                </div>
                            </Card>

                            <Card size="small">
                                <Title level={5}>2. 对象语法 + JSX 元素替换</Title>
                                <Trans
                                    i18nKey="language.demo.productPrice"
                                    ns="main"
                                    values={{
                                        price: formatCurrency(licensePrice),
                                        period: {
                                            daily: t('language.demo.dailyPeriod'),
                                            monthly: t('language.demo.monthlyPeriod'),
                                            yearly: t('language.demo.yearlyPeriod')
                                        }[licensePriceCycle]
                                    }}
                                    components={[
                                        <Text
                                            key="0"
                                            style={{ color: '#1890ff', fontSize: '16px', fontWeight: 'bold' }}
                                        />,
                                        <Tag key="1" color="green" />
                                    ]}
                                />
                            </Card>

                            <Card size="small">
                                <Title level={5}>3. 对象语法 + 多个 JSX 元素</Title>
                                <Trans
                                    i18nKey="language.demo.userStatus"
                                    ns="main"
                                    values={{
                                        name: userName,
                                        status: '活跃'
                                    }}
                                    components={[<Tag key="0" color="blue" />, <Tag key="1" color="success" />]}
                                />
                            </Card>

                            <Card size="small">
                                <Title level={5}>4. 您示例的简化版本（如果支持对象语法）</Title>
                                <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                                    注意：标准的 react-i18next Trans 组件使用 values prop 传递参数。
                                    如果您的项目中有自定义的 Trans 组件支持对象语法，可以这样写：
                                </Paragraph>
                                <div
                                    style={{
                                        background: '#f5f5f5',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        fontFamily: 'monospace',
                                        fontSize: '12px'
                                    }}
                                >
                                    {`<Trans 
  i18nKey="language.demo.licensePrice" 
  price={licensePrice} 
  period={licensePriceCycle}
>
  <Text style={{ color: '#F0484E' }}>
    {{ price: formatCurrency(licensePrice) }}
  </Text>
  {{
    period: {
      daily: t('language.demo.dailyPeriod'),
      monthly: t('language.demo.monthlyPeriod'),
      yearly: t('language.demo.yearlyPeriod'),
    }[licensePriceCycle],
  }}
</Trans>`}
                                </div>
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
