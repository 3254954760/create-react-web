const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    }
});
