const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: './src/index.js',
    resolve: {
        modules: [
            "node_modules",
            "src"
        ],
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.scss'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/,
                exclude: [/node_modules/, path.resolve(__dirname, '../backend')],
                use: {
                    loader: "babel-loader" 
                }
            },
           {test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./webpack-demo/template.html"}),
        new ExtractTextPlugin({
            filename: '[name].style.css'
        })
       
    ]
};