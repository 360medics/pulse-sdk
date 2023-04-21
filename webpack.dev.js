const path = require('path')
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

// this is for webpack dev config script only
// application and runtime environment is hanlded with dotenv-webpack
dotenv.config({ path: './.env.dev' })

module.exports = merge(common, {
    mode: 'development',
    performance: { hints: false },
    devServer: {
        port: 5173,
        static: [
            {
                directory: path.join(__dirname, 'demo/assets'),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './demo/index.ejs',
            client_id: process.env.DEV_CLIENT_KEY
        }),
        new Dotenv({ path: './.env.dev' }),
    ]
})