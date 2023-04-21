const path = require('path')
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './demo/index.ejs',
            client_id: 'DIST_CLIENT_KEY' // to be replaced on demo file remote push
        }),
        new Dotenv({ path: './.env' })
    ]
})