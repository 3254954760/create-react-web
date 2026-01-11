import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './index';

i18n
  .use(initReactI18next) // 将 i18n 传递给 react-i18next
  .init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React 已经转义了，所以不需要再次转义
      format: (value, format, lng) => {
        // 日期格式化
        if (value instanceof Date && format === 'datetime') {
          return new Intl.DateTimeFormat(lng === 'zh' ? 'zh-CN' : 'en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(value);
        }
        // 货币格式化
        if (typeof value === 'number' && format === 'currency') {
          return new Intl.NumberFormat(lng === 'zh' ? 'zh-CN' : 'en-US', {
            style: 'currency',
            currency: lng === 'zh' ? 'CNY' : 'USD'
          }).format(value);
        }
        return value;
      }
    }
  });

export default i18n;