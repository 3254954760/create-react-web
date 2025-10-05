import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Alert, Select, Button } from 'antd';
import { CloudOutlined, SunOutlined, ThunderboltOutlined, ReloadOutlined } from '@ant-design/icons';
import { WeatherData } from './types';
import { fetchWeatherData, getSupportedCities } from './api';

const { Title, Text } = Typography;
const { Option } = Select;

// 获取天气图标
const getWeatherIcon = (condition: string) => {
    switch (condition) {
        case '晴':
            return <SunOutlined style={{ fontSize: '24px', color: '#faad14' }} />;
        case '多云':
            return <CloudOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />;
        case '小雨':
        case '雨':
            return <ThunderboltOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
        default:
            return <CloudOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />;
    }
};

// 获取支持的城市列表
const supportedCities = getSupportedCities();

export const WeatherSSR: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string>('成都');

    const loadWeatherData = async (city: string = selectedCity) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchWeatherData(city);

            if (response.success) {
                setWeatherData(response.data);
            } else {
                setError(response.message || '获取天气数据失败');
            }
        } catch (err) {
            setError('网络请求失败');
            console.error('Weather data fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWeatherData();
    }, []);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        loadWeatherData(city);
    };

    const handleRefresh = () => {
        loadWeatherData(selectedCity);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div style={{ marginTop: '16px' }}>
                    <Text>正在加载天气数据...</Text>
                </div>
            </div>
        );
    }

    if (error) {
        return <Alert message="加载失败" description={error} type="error" showIcon style={{ margin: '20px' }} />;
    }

    if (!weatherData) {
        return (
            <Alert message="无数据" description="未获取到天气数据" type="warning" showIcon style={{ margin: '20px' }} />
        );
    }

    return (
        <div
            style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '100vh'
            }}
        >
            <Title level={2} style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
                🌤️ 天气预报系统 (SSR)
            </Title>

            {/* 城市选择和刷新按钮 */}
            <Card style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <Row gutter={[16, 16]} align="middle" justify="center">
                    <Col>
                        <Text strong>选择城市: </Text>
                        <Select
                            value={selectedCity}
                            onChange={handleCityChange}
                            style={{ width: 120 }}
                            disabled={loading}
                        >
                            {supportedCities.map(city => (
                                <Option key={city.code} value={city.name}>
                                    {city.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
                            刷新
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* 当前天气 */}
            <Card style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col span={8} style={{ textAlign: 'center' }}>
                        {getWeatherIcon(weatherData.condition)}
                        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1890ff' }}>
                            {weatherData.temperature}°
                        </div>
                        <Text type="secondary">{weatherData.condition}</Text>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[16, 8]}>
                            <Col span={12}>
                                <Text strong>湿度: </Text>
                                <Text>{weatherData.humidity}%</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>风速: </Text>
                                <Text>{weatherData.windSpeed} km/h</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>气压: </Text>
                                <Text>{weatherData.pressure} hPa</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>能见度: </Text>
                                <Text>{weatherData.visibility} km</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>紫外线指数: </Text>
                                <Text>{weatherData.uvIndex}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            {/* 未来几天预报 */}
            <Card title="未来几天预报" style={{ borderRadius: '12px' }}>
                <Row gutter={[16, 16]}>
                    {weatherData.forecast.map((day, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={4.8}>
                            <Card
                                size="small"
                                style={{
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                    background: index === 0 ? '#f0f9ff' : 'white'
                                }}
                            >
                                <div style={{ marginBottom: '8px' }}>
                                    <Text strong>{day.date}</Text>
                                </div>
                                <div style={{ marginBottom: '8px' }}>{getWeatherIcon(day.condition)}</div>
                                <div style={{ marginBottom: '4px' }}>
                                    <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        {day.high}° / {day.low}°
                                    </Text>
                                </div>
                                <div style={{ marginBottom: '4px' }}>
                                    <Text type="secondary">{day.condition}</Text>
                                </div>
                                <div>
                                    <Text type="secondary">降水概率: {day.precipitation}%</Text>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* 天气小贴士 */}
            <Card title="天气小贴士" style={{ marginTop: '20px', borderRadius: '12px' }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Alert
                            message="今日建议"
                            description={
                                weatherData.temperature > 25
                                    ? '天气较热，建议多喝水，注意防晒'
                                    : weatherData.temperature < 15
                                      ? '天气较冷，注意保暖'
                                      : '天气适宜，适合户外活动'
                            }
                            type="info"
                            showIcon
                        />
                    </Col>
                    <Col span={24}>
                        <Alert
                            message="紫外线提醒"
                            description={
                                weatherData.uvIndex > 6 ? '紫外线较强，建议涂抹防晒霜' : '紫外线适中，可适当户外活动'
                            }
                            type="warning"
                            showIcon
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default WeatherSSR;
