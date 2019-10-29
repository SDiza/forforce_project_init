const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: [
            path.join(__dirname, 'private/index.js'),
            path.join(__dirname, 'private/index.scss'),
        ],
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'private'),
        },
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'private'),
                exclude: /(node_modules|bower_components)/,
                use: [
                    'cache-loader',
                    'babel-loader',
                ],

            },
            {
                test: /\.twig$/,
                loader: 'twig-loader',
            },
        ],

    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new WebpackNotifierPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'private/index.twig.js',
        }),
        new HtmlWebpackPlugin({
            filename: '../main.html',
            template: 'private/pages/main/main.twig.js',
        }),
        new HtmlWebpackPlugin({
            filename: '../typography.html',
            template: 'private/pages/typography/typography.twig.js',
        }),
        new HtmlWebpackPlugin({
            filename: '../typography.html',
            template: 'private/pages/typography/typography.twig.js',
        }),
    ],
};
