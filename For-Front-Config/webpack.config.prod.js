const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dartSass = require('dart-sass');
const autoPreFixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [new UglifyJSPlugin({
            uglifyOptions: {
                compress: { drop_console: true },
                output: { comments: false },
                sourceMap: false,
            },
        })],
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
                            options: { minimize: true },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                minimize: true,
                                plugins: [autoPreFixer],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: dartSass,
                                minimize: true,
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
});
