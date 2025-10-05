// 天气数据类型定义
export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  forecast: WeatherForecast[];
}

// 天气预报数据类型
export interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}

// 天气条件枚举
export enum WeatherCondition {
  SUNNY = '晴',
  CLOUDY = '多云',
  OVERCAST = '阴',
  RAINY = '雨',
  LIGHT_RAIN = '小雨',
  HEAVY_RAIN = '大雨',
  THUNDERSTORM = '雷雨',
  SNOW = '雪',
  FOGGY = '雾'
}

// API响应类型
export interface WeatherApiResponse {
  success: boolean;
  data: WeatherData;
  message?: string;
  timestamp: number;
}

// 城市信息类型
export interface CityInfo {
  name: string;
  code: string;
  province: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
