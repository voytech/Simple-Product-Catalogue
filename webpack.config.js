var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/web/index.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/dist/web"
    },
    plugins: [
         new HtmlWebpackPlugin({
             hash: true,
             title: 'React with Webpack',
             template : 'template.html',
             filename: __dirname + '/dist/web/index.html' //relative to root of the application
         }),
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
                          modules: true,
                          importLoaders: 1,
                          camelCase: true,
                          localIdentName: '[name]_[local]_[hash:base64:5]'
                      }
                    }]
                })
            }
            /*{ test: /\.css$/, loaders: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
                {
                    loader: "extract-loader",
                    options: {
                        publicPath: null,
                    }
                },
                {
                    loader: "css-loader",
                }
              ]
            }*/
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
};
