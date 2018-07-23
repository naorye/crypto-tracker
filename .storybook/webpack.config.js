const path = require("path");
const flexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');

module.exports = {
    resolve: {
        extensions: [ '.js', '.json', '.jsx' ],
    },
    module: {
        rules: [
            {
                test: /\.(s?)css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            camelCase: true,
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                flexbugsFixes,
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ]
    }
};