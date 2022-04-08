const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    // context: path.resolve(__dirname, "./"),
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js",
    },
    module: {
        // rules: [
        //     {
        //         test: /\.js$/i,
        //         // use: "./kfg-loader/index.js",
        //         // use: "kfg-loader1",
        //         // 执行循序：从后往前，从右到左
        //         use: ["kfg-loader1", "kfg-loader2", "kfg-loader3"],
        //     },
        // ],
        // rules: [
        //     {
        //         test: /\.js$/i,
        //         use: "kfg-loader1",
        //     },
        //     {
        //         test: /\.js$/i,
        //         use: "kfg-loader2",
        //         enforce: "post",
        //     },
        //     {
        //         test: /\.js$/i,
        //         use: "kfg-loader3",
        //     },
        // ],
        // rules: [
        //     {
        //         test: /\.js$/i,
        //         use: {
        //             loader: "kfg-loader1",
        //             options: {
        //                 name: "kfg",
        //                 age: 22,
        //             },
        //         },
        //     },
        // ],
        rules: [
            {
                test: /\.md$/i,
                // use: ["html-loader", "md-loader"],
                use: ["md-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolveLoader: {
        modules: ["node_modules", "./kfg-loader"], //如果在node_modules找不到，则从kfg-loader中找
        mainFields: ["loader", "main"], //默认值
        extensions: [".js", ".json"], //默认值
    },
    plugins: [new HtmlWebpackPlugin()],
};
