import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 可选别名
            '@pages': path.resolve(__dirname, './src/pages'),
            '@router': path.resolve(__dirname, './src/router'),
            '@layout': path.resolve(__dirname, './src/layout'),
            '@model': path.resolve(__dirname, './src/model'),
            '@service': path.resolve(__dirname, './src/service')
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },

    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true // 如果你用到 antd、变量嵌套之类的 less 特性
            }
        }
    },

    server: {
        port: 5000,
        // host: '0.0.0.0', // 允许外部访问 并且设置这个之后 可以访问到本地的ip地址
        proxy: {
            '/api': {
                target: 'http://localhost:5050',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: 'dist', // 打包输出目录
        sourcemap: false // 生产环境是否生成 sourcemap
    }
});
