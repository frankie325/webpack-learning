const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const DevConfig = require("./webpack.dev");
const ProdConfig = require("./webpack.prod");

const CommonConfig = {
    context: path.resolve(__dirname, "./"), //可以将context设置为config文件环境下
    entry: {
        main: "../src/main.js",
        index: "../src/index.js",
    },
    output: {
        filename: "./js/[name].[chunkhash:6].bundle.js",
        path: path.resolve(__dirname, "../build"),
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all",
    //         cacheGroups: {
    //             // 将node_modules下引用的模块，打包到一个chunk中
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 filename: "./js/vendor.[chunkhash:6].js",
    //             },
    //         },
    //     },
    // },
    module: {
        rules: [
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
    ],
};

// 导出为函数，接收命令传递过来的参数
module.exports = function (env) {
    const isProduction = !!env.production;
    process.env.production = env.production ? env.production : "development";
    return isProduction ? merge(CommonConfig, ProdConfig) : merge(CommonConfig, DevConfig);
};
