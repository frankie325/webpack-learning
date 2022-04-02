const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const DevConfig = require("./webpack.dev");
const ProdConfig = require("./webpack.prod");
const webpack = require("webpack");

const CommonConfig = {
    context: path.resolve(__dirname, "./"), //可以将context设置为config文件环境下
    entry: {
        main: "../src/main.js",
        index: "../src/index.js",
    },
    output: {
        filename: "./js/[name].[hash:6].bundle.js", //打包后的文件名
        path: path.resolve(__dirname, "../build"), //必须使用绝对路径
    },
    module: {
        rules: [
            // 使用 exports-loader，将一个全局变量作为一个普通的模块来导出
            {
                test: require.resolve("../src/global.js"),
                use: "exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse",
            },
            {
                test: /\.css/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack教程",
            template: "../index.html", //loader中的路径也是一样
        }),
        new webpack.ProvidePlugin({
            axios: "axios",
            get: ["axios", "get"], //通过配置一个“数组路径”，暴露出模块的单个功能
        }),
    ],
};

// 导出为函数，接收命令传递过来的参数
module.exports = function (env) {
    const isProduction = !!env.production;
    process.env.production = env.production ? env.production : "development";
    return isProduction ? merge(CommonConfig, ProdConfig) : merge(CommonConfig, DevConfig);
};
