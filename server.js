const express = require('express');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// 使用 babel-register 运行 TSX 源码
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@': './src',
                    '@pages': './src/pages',
                    '@router': './src/router',
                    '@layout': './src/layout',
                    '@model': './src/model',
                    '@service': './src/service'
                }
            }
        ]
    ]
});

const App = require('./src/App.tsx').default;
const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const isProduction = process.env.NODE_ENV === 'production';

let jsFileName = null;
if (isProduction) {
    try {
        const distHtml = fs.readFileSync(path.join(__dirname, 'dist/index.html'), 'utf8');
        const match = distHtml.match(/src="\/assets\/([^"]+\.js)"/);
        jsFileName = match ? match[1] : null;
    } catch {
        console.warn('⚠️ 无法读取 dist/index.html，使用开发模式');
    }
}

const app = express();
const PORT = process.env.PORT || 4000;

/* -------------------
 * ✅ 1. 静态资源托管（必须在 SSR 之前）
 * ------------------- */
if (isProduction) {
    // 生产环境下，所有静态资源都在 dist 中
    app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    // 开发环境（Vite 开发调试用）
    app.use('/src', express.static(path.join(__dirname, 'src')));
    app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

/* -------------------
 * ✅ 2. SSR 渲染逻辑
 * ------------------- */
const renderApp = (req, res) => {
    try {
        // 如果是静态资源请求，不应该走 SSR（保险措施）
        if (/\.(js|css|png|jpg|svg|ico|map)$/.test(req.url)) {
            return res.status(404).end();
        }

        const appHtml = ReactDOMServer.renderToString(React.createElement(App, { location: req.url, context: {} }));

        let fullHtml = htmlTemplate.replace('<div id="root">\n\n    </div>', `<div id="root">${appHtml}</div>`);

        if (isProduction && jsFileName) {
            fullHtml = fullHtml.replace(
                '<script type="module" src="/src/index.js"></script>',
                `<script type="module" crossorigin src="/assets/${jsFileName}"></script>`
            );
        }

        res.status(200).set('Content-Type', 'text/html').send(fullHtml);
    } catch (err) {
        console.error('❌ SSR Error:', err);
        res.status(500).send('服务器内部错误');
    }
};

/* -------------------
 * ✅ 3. 挂载 SSR 路由
 * ------------------- */
app.get('*', renderApp);

/* -------------------
 * ✅ 4. 启动服务
 * ------------------- */
app.listen(PORT, () => {
    console.log(`🚀 SSR Server: http://localhost:${PORT}`);
    console.log(`📦 Mode: ${isProduction ? 'Production' : 'Development'}`);
    console.log(jsFileName ? `📄 Bundle: /assets/${jsFileName}` : `📄 Entry: /src/index.js`);
});
