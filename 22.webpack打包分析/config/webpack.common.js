const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const DevConfig = require("./webpack.dev");
const ProdConfig = require("./webpack.prod");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const CommonConfig = {
    context: path.resolve(__dirname, "./"), //可以将context设置为config文件环境下
    entry: "../src/index.js", //入口文件路径则改为../
    output: {
        filename: "./js/[name].bundle.js", //打包后的文件名
        path: path.resolve(__dirname, "../build"), //必须使用绝对路径
    },
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack教程",
            template: "../index.html", //loader中的路径也是一样
            inject: true, // 是否自动将打包资源链接注入到html文件，默认为true
            // inject: "head", // 注入到head标签中
            inject: "body", // 注入到body标签中
            cache: true, // 当文件没有任何改变时，使用缓存
            // minify: true, //是否开启html文件压缩
            // 设置html-minifier-terser压缩插件的选项
            minify: {
                collapseWhitespace: true, //是否压缩空格
                removeComments: true, // 是否移除注释
                removeEmptyAttributes: true, //是否移除一些空属性，比如<div class=""></div>
                removeRedundantAttributes: true, //是否移除多余的属性，比如<input type="text">，type默认就是text,可以去掉
                minifyCss: true, //是否压缩style标签内的css代码
                // minifyJS: true, //是否压缩script标签内的js代码
                // 设置为对象，则里面是terser压缩的设置
                minifyJS: {
                    mangle: {
                        toplevel: true,
                    },
                },
            },
        }),
        // 因为提取运行时的代码不是很多时，可以将runtime.***.js 内容全部注入到html文件中，减少对js文件的请求
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/]),
    ],
};

// 导出为函数，接收命令传递过来的参数
module.exports = function (env) {
    console.log("----------", env);
    const isProduction = !!env.production;
    process.env.production = env.production ? env.production : "development";
    const mergeConfig = isProduction ? merge(CommonConfig, ProdConfig) : merge(CommonConfig, DevConfig);
    return smp.wrap(mergeConfig);
};
