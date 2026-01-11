// 这是vite的入口
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 初始化 i18next
import './locale/init';
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found');
}
