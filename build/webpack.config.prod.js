const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isAnalyze = process.env.ANALYZE === 'true';

console.log('ly', isAnalyze, process.env.ANALYZE);
module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [isAnalyze && new BundleAnalyzerPlugin()].filter(Boolean)
});
