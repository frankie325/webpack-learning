const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const DevConfig = require("./webpack.dev");
const ProdConfig = require("./webpack.prod");

const CommonConfig = {
    context: path.resolve(__dirname, "./"), //可以将context设置为config文件环境下

    // entry: "../src/main.js", 
    entry: "../src/index.js", //入口文件路径则改为../
    output: {
        filename: "./js/index.js", //打包后的文件名
        path: path.resolve(__dirname, "../build"), //必须使用绝对路径
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack教程",
            template: "../index.html", //loader中的路径也是一样
        }),
    ],
};

// 导出为函数，接收命令传递过来的参数
module.exports = function (env) {
    console.log("----------", env);
    const isProduction = !!env.production;
    process.env.production = env.production ? env.production :"development";
    return isProduction ? merge(CommonConfig, ProdConfig) : merge(CommonConfig, DevConfig);
};
