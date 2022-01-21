const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
    // watch: true, //开启监听，只要修改代码，就会自动重新打包
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js", //入口文件
    output: {
        filename: "js/index.js", //打包后的文件名
        // 打包后的文件输出目录
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
        // publicPath: "", //在打包之后的静态资源前面进行一个路径的拼接
        publicPath: "./",
        // publicPath: "/abc",
    },
    plugins: [
        new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
        // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
        new HtmlWebpackPlugin({
            // title: "webpack教程", //生成的html文件中，title标签的内容
            // template: "./public/index.html", //可以指定模板去生成html
        }),
        // DefinePlugin用来定义全局常量
        // new DefinePlugin({
        //     BASE_URL: JSON.stringify("./"), //由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个 实际的引号
        // }),
    ],
    module: {
        rules: [],
    },
    devServer: {
        hot: true, //开启HMR
        client: {
            overlay: {
                //控制警告、错误信息是否在浏览器显示
                errors: true, //只有错误才在浏览器显示
                warnings: false,
            },
        },
    },
};
