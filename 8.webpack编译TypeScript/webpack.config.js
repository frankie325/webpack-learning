const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map", //打包后会生成一个映射文件，以.map结尾
    entry: "./src/index.ts", //入口文件
    output: {
        filename: "js/index.js", //打包后的文件名
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, //第三方库中可能使用了polyfill，和babel可能会产生冲突，进行排除
                use: [
                    {
                        loader: "babel-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                // 本质上依赖于typescript，还需在项目上安装typescript
                // 方式一：
                // use:["ts-loader"],
                // 直接使用ts-loader，无法进行polyfill，使用babel的预设@babel/preset-typescript
                // 方式二：
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
        // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
        new HtmlWebpackPlugin({
            title: "webpack教程", //生成的html文件中，title标签的内容
            template: "./index.html",
        }),
    ],
};
