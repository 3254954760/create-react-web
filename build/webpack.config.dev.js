const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const path = require('path');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        port: 5050,
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true
    }
});
