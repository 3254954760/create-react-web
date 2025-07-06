import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src') // 可选别名
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true // 如果你用到 antd、变量嵌套之类的 less 特性
            }
        }
    }
});
