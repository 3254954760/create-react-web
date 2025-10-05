import { WeatherData, WeatherApiResponse, WeatherCondition, CityInfo } from './types';

// 城市信息数据库
const cities: CityInfo[] = [
  { name: '成都', code: 'CD', province: '四川', coordinates: { latitude: 30.5728, longitude: 104.0668 } },
  { name: '北京', code: 'BJ', province: '北京', coordinates: { latitude: 39.9042, longitude: 116.4074 } },
  { name: '上海', code: 'SH', province: '上海', coordinates: { latitude: 31.2304, longitude: 121.4737 } },
  { name: '广州', code: 'GZ', province: '广东', coordinates: { latitude: 23.1291, longitude: 113.2644 } },
  { name: '深圳', code: 'SZ', province: '广东', coordinates: { latitude: 22.5431, longitude: 114.0579 } },
  { name: '杭州', code: 'HZ', province: '浙江', coordinates: { latitude: 30.2741, longitude: 120.1551 } },
  { name: '南京', code: 'NJ', province: '江苏', coordinates: { latitude: 32.0603, longitude: 118.7969 } },
  { name: '武汉', code: 'WH', province: '湖北', coordinates: { latitude: 30.5928, longitude: 114.3055 } }
];

// 生成随机天气条件
const getRandomWeatherCondition = (): string => {
  const conditions = Object.values(WeatherCondition);
  return conditions[Math.floor(Math.random() * conditions.length)];
};

// 生成随机温度（基于季节和城市）
const getRandomTemperature = (city: string): number => {
  const baseTemp = {
    '成都': 20,
    '北京': 15,
    '上海': 18,
    '广州': 25,
    '深圳': 26,
    '杭州': 19,
    '南京': 17,
    '武汉': 18
  };
  
  const base = baseTemp[city] || 20;
  return Math.floor(Math.random() * 15) + base - 7; // ±7度变化
};

// 生成随机湿度
const getRandomHumidity = (): number => {
  return Math.floor(Math.random() * 40) + 40; // 40-80%
};

// 生成随机风速
const getRandomWindSpeed = (): number => {
  return Math.floor(Math.random() * 15) + 5; // 5-20 km/h
};

// 生成随机气压
const getRandomPressure = (): number => {
  return Math.floor(Math.random() * 50) + 990; // 990-1040 hPa
};

// 生成随机能见度
const getRandomVisibility = (condition: string): number => {
  if (condition.includes('雾') || condition.includes('霾')) {
    return Math.floor(Math.random() * 5) + 1; // 1-5 km
  }
  return Math.floor(Math.random() * 5) + 8; // 8-12 km
};

// 生成随机紫外线指数
const getRandomUVIndex = (condition: string): number => {
  if (condition === WeatherCondition.SUNNY) {
    return Math.floor(Math.random() * 4) + 6; // 6-9
  } else if (condition === WeatherCondition.CLOUDY) {
    return Math.floor(Math.random() * 3) + 3; // 3-5
  } else {
    return Math.floor(Math.random() * 3) + 1; // 1-3
  }
};

// 生成未来几天预报
const generateForecast = (city: string, days: number = 5): WeatherData['forecast'] => {
  const forecast = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const condition = getRandomWeatherCondition();
    const baseTemp = getRandomTemperature(city);
    
    forecast.push({
      date: i === 0 ? '今天' : i === 1 ? '明天' : i === 2 ? '后天' : `周${['一', '二', '三', '四', '五', '六', '日'][date.getDay()]}`,
      high: baseTemp + Math.floor(Math.random() * 5),
      low: baseTemp - Math.floor(Math.random() * 5),
      condition,
      precipitation: Math.floor(Math.random() * 100)
    });
  }
  
  return forecast;
};

// 模拟网络延迟
const simulateNetworkDelay = (min: number = 500, max: number = 2000): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// 模拟API错误
const simulateApiError = (errorRate: number = 0.1): boolean => {
  return Math.random() < errorRate;
};

// 获取天气数据API
export const fetchWeatherData = async (cityName: string = '成都'): Promise<WeatherApiResponse> => {
  try {
    // 模拟网络延迟
    await simulateNetworkDelay();
    
    // 模拟API错误
    if (simulateApiError()) {
      throw new Error('网络连接超时');
    }
    
    // 查找城市信息
    const city = cities.find(c => c.name === cityName) || cities[0];
    
    // 生成当前天气数据
    const currentCondition = getRandomWeatherCondition();
    const currentTemp = getRandomTemperature(cityName);
    
    const weatherData: WeatherData = {
      city: city.name,
      temperature: currentTemp,
      condition: currentCondition,
      humidity: getRandomHumidity(),
      windSpeed: getRandomWindSpeed(),
      pressure: getRandomPressure(),
      visibility: getRandomVisibility(currentCondition),
      uvIndex: getRandomUVIndex(currentCondition),
      forecast: generateForecast(cityName)
    };
    
    return {
      success: true,
      data: weatherData,
      message: '获取天气数据成功',
      timestamp: Date.now()
    };
    
  } catch (error) {
    return {
      success: false,
      data: {} as WeatherData,
      message: error instanceof Error ? error.message : '未知错误',
      timestamp: Date.now()
    };
  }
};

// 获取支持的城市列表
export const getSupportedCities = (): CityInfo[] => {
  return [...cities];
};

// 根据城市代码获取天气数据
export const fetchWeatherByCityCode = async (cityCode: string): Promise<WeatherApiResponse> => {
  const city = cities.find(c => c.code === cityCode);
  if (!city) {
    return {
      success: false,
      data: {} as WeatherData,
      message: '不支持的城市代码',
      timestamp: Date.now()
    };
  }
  
  return fetchWeatherData(city.name);
};

// 批量获取多个城市的天气数据
export const fetchMultipleCitiesWeather = async (cityNames: string[]): Promise<WeatherApiResponse[]> => {
  const promises = cityNames.map(cityName => fetchWeatherData(cityName));
  return Promise.all(promises);
};

// 获取历史天气数据（模拟）
export const fetchHistoricalWeather = async (
  cityName: string, 
  date: string
): Promise<WeatherApiResponse> => {
  try {
    await simulateNetworkDelay(300, 800);
    
    const city = cities.find(c => c.name === cityName) || cities[0];
    const condition = getRandomWeatherCondition();
    const temp = getRandomTemperature(cityName);
    
    const historicalData: WeatherData = {
      city: city.name,
      temperature: temp,
      condition,
      humidity: getRandomHumidity(),
      windSpeed: getRandomWindSpeed(),
      pressure: getRandomPressure(),
      visibility: getRandomVisibility(condition),
      uvIndex: getRandomUVIndex(condition),
      forecast: [] // 历史数据不需要预报
    };
    
    return {
      success: true,
      data: historicalData,
      message: `获取${date}的天气数据成功`,
      timestamp: Date.now()
    };
    
  } catch (error) {
    return {
      success: false,
      data: {} as WeatherData,
      message: error instanceof Error ? error.message : '获取历史数据失败',
      timestamp: Date.now()
    };
  }
};
