const path = require('path')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Pulse',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                use: [
                    { loader: 'raw-loader' },
                ],
            },
            
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}