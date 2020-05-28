const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'); //html dev -> html prod
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //cleans prod directory each build run

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
        ]
    }
}