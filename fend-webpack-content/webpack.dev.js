const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                enforce: 'pre',
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
    ]
}
