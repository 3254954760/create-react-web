// 这是webpack的入口
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/index';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found');
}
