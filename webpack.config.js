var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: "./src/web/index.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/dist/src/web"
    },
    plugins: [
         new CleanWebpackPlugin([ __dirname + "/dist/src/web" ]),
         new HtmlWebpackPlugin({
             hash: true,
             title: 'React with Webpack',
             template : 'template.html',
             filename: __dirname + '/dist/src/web/index.html'
         }),
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoEmitOnErrorsPlugin(),
         new ExtractTextPlugin({
            filename: '[name].[hash:8].css',
            allChunks: true
         })
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                      loader: 'css-loader',
                      options: {
                          modules: false,
                          //importLoaders: 1,
                          //camelCase: true,
                          //localIdentName: '[name]_[local]_[hash:base64:5]'
                      }
                    }]
                })
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader?name=public/fonts/[name].[ext]'
            }/*,
            {
               test: /bootstrap.+\.(jsx|js)$/,
               loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            }*/
        ]
    }
};
