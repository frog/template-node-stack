const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/public/index.ts'],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'entry',
                                    targets: {
                                        browsers: ['last 2 versions', 'not ie < 11']
                                    },
                                    debug: false
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        path: `${__dirname}/dist/public`,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/public/index.html',
            filename: './index.html'
        })
    ]
};
