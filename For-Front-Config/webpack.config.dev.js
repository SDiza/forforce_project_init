const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const dartSass = require('dart-sass');
const autoPreFixer = require('autoprefixer');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, './public'),
        compress: true,
        port: 9002,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { minimize: false },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                minimize: false,
                                plugins: [autoPreFixer],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: dartSass,
                                minimize: false,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2|woff|eot|ttf)$/i,
                loaders: ['file-loader'],
            },
        ],
    },
    plugins: [
        new LiveReloadPlugin(),
    ],
});
