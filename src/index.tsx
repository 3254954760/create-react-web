// index.tsx —— 通用入口 (Vite + SSR 兼容)
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error('[Hybrid] ❌ Root element not found.');
} else {
    try {
        if (rootElement.hasChildNodes()) {
            // SSR 情况：服务端已经注入 HTML
            console.log('[Hybrid] 🧩 Hydrating SSR content...');
            hydrateRoot(rootElement, <App />);
        } else {
            // CSR 情况：开发环境或 SSR 失败回退
            console.log('[Hybrid] ⚡ No SSR content, running CSR...');
            const root = createRoot(rootElement);
            root.render(<App />);
        }
    } catch (err) {
        console.error('[Hybrid] 💥 SSR hydration failed, falling back to CSR:', err);
        rootElement.innerHTML = '';
        const root = createRoot(rootElement);
        root.render(<App />);
    }
}
