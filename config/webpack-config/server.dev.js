const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack/hot/poll?1000',
        './server/index.js',
    ],
    resolve: {
        extensions: [ '.js', '.json', '.jsx' ],
    },
    watch: true,
    target: 'node',
    output: {
        pathinfo: true,
        path: path.join(__dirname, '../../build/server'),
        filename: 'server.js',
    },
    node: {
        __dirname: true,
    },
    externals: [
        nodeExternals({
            whitelist: [ 'webpack/hot/poll?1000' ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // Same name as where thr FrontEnd generated the file
                            name: '/static/media/[name].[hash:8].[ext]',

                            // No need to emit files, using FrontEnd assets
                            emitFile: false,
                        },
                    },
                ],
            },
            {
                test: /\.(s?)css$/,
                use: [
                    {
                        loader: require.resolve('css-loader/locals'),
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]',
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([ 'server' ], { root: path.resolve(__dirname, '../../build') }),
        new StatsPlugin('stats.json'),
        new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
        new webpack.DefinePlugin({
            'process.env.BUILD_TARGET': JSON.stringify('server'),
            'process.env.BROWSER': JSON.stringify(false),
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new StartServerPlugin({
            name: 'server.js',
            nodeArgs: [ '--inspect=30105' ],
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
