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
      escapeValue: false // React 已经转义了，所以不需要再次转义
    }
  });

export default i18n;