var HtmlWebpackPlugin = require('html-webpack-plugin');

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
         })
    ],
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
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
