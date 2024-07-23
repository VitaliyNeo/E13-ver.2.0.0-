const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    stats: 'none',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[chunkhash].js',
    },
    devtool: "inline-source-map",
    devServer: {
        static: {directory: path.join(__dirname, "./dist"),},
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
        new MiniCssExtractPlugin({
          filename: 'css/[name].[chunkhash].css',
        }),
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin(),
        new CleanWebpackPlugin(),
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
                },
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
    optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin() , new TerserWebpackPlugin({})],
    },
  }