/* eslint-disable */

const { resolve } = require('path');

const zlib = require('zlib');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const MODE = process.env.MODE || 'development';
const ROOT_DIR = resolve('./src');
const PATH_TO_BUNDLE = resolve('./bundle');

const isDevelope = MODE !== 'production';
const isProduction = MODE === 'production';

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

function createWebpackConfig() {
    const config = {
        bail: true,
        mode: MODE,
        plugins: [],
        devtool: isProduction ? false : 'inline-source-map',
        module: {
            exprContextCritical: false,
            rules: [],
        },
        optimization: {},
        context: resolve(ROOT_DIR),
        watchOptions: {
            ignored: /node_modules/,
        },
    };

    config.entry = {
        client: resolve(ROOT_DIR, 'client'),
    };

    config.output = {
        filename: '[name].js',
        path: PATH_TO_BUNDLE,
        globalObject: 'this',
    };

    config.optimization.splitChunks = {
        cacheGroups: {
            indexStyles: {
                name: 'index',
                test: (m, c, entry = 'index') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                chunks: 'all',
                enforce: true,
            },
        },
    };

    config.plugins.push(
        new webpack.DefinePlugin({
            MODE: JSON.stringify(MODE),
        }),
    );

    config.plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    );

    config.plugins.push(new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }));

    if (isProduction) {
        config.plugins.push(
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
        );

        config.plugins.push(
            new CompressionPlugin({
                filename: '[path][base].br',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    params: {
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                    },
                },
                threshold: 10240,
                minRatio: 0.8,
            }),
        );

        config.optimization.minimize = true;

        config.optimization.minimizer = [
            new TerserPlugin({
                terserOptions: {
                    ecma: 2016,
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({}),
        ];
    }

    config.resolve = {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
        alias: {
            src: ROOT_DIR,
        },
    };

    config.module.rules.push({
        test: /\.tsx?$/,
        use: ['cache-loader', 'ts-loader'],
        exclude: /node_modules/,
    });

    config.module.rules.push({
        test: /\.(css|scss)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: { localIdentName: '[local]__[hash:base64:5]' },
                    sourceMap: isDevelope,
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        sourceMap: isDevelope,
                        sourceMapContents: isDevelope,
                    },
                },
            },
        ],
    });

    config.module.rules.push({
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2|html)$/i,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        },
    });

    return config;
}

module.exports = () => [createWebpackConfig()];
