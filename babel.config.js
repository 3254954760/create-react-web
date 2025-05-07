module.exports = {
    presets: [
        // preset-env 注入的 polyfill 是会污染全局
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage', // usage 按需  entry 全部引入，不管是否用到
                corejs: 3,
                modules: false,
                targets: {
                    chrome: '49',
                    ios: '10'
                }
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        [
            '@babel/plugin-transform-runtime', // babel-polyfills  用了这个插件polyfill 将会采用不污染全局的，且 targets 设置将会失效
            {
                absoluteRuntime: false,
                regenerator: true,
                // eslint-disable-next-line max-len
                // 'corejs': 3, // 如果是业务项目开发者：@babel/plugin-transform-runtime ，建议关闭 corejs，polyfill 的引入由 @babel/preset-env 完成，即开启 useBuiltIns
                // 原因：https://mp.weixin.qq.com/s/sJMydobsSxzxj2SECwcr_A
                corejs: false,
                version: '^7.12.1'
            }
        ],
        '@babel/plugin-syntax-dynamic-import',
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                style: true
            },
            'antd'
        ],
        [
            'babel-plugin-import',
            {
                libraryName: 'antd-mobile',
                libraryDirectory: 'es/components',
                style: false
            },
            'antd-mobile'
        ]
    ],
    sourceType: 'unambiguous'
};
