const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[chunkhash].js',
        clean: true,
    },
    devtool: "inline-source-map",
    devServer: {
        static: {directory: path.join(__dirname, "./dist"),},
        hot: true,
        devMiddleware: {
            stats: {
                children: false,
                maxModules: 0,
            },
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
	      progress: true
            },
        },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: false }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx",]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            esModule: true,
                            },
                        },
                    'css-loader',
                ],
            }
        ]
    },
}
