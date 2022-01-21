const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = function (env) {
    console.log("----------", env);
    return {
        // watch: true, //开启监听，只要修改代码，就会自动重新打包
        mode: "development",
        devtool: "source-map",
        entry: "./src/index.js", //入口文件
        output: {
            filename: "js/index.js", //打包后的文件名
            path: path.resolve(__dirname, "../build"), //必须使用绝对路径
        },
        plugins: [
            new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
            // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
            new HtmlWebpackPlugin({
                title: "webpack教程", //生成的html文件中，title标签的内容
                template: "./index.html", //可以指定模板去生成html
            }),
            new VueLoaderPlugin(),
        ],
        module: {
            rules: [],
        },
    };
};
