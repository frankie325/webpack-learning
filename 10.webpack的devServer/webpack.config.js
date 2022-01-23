const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    // watch: true, //开启监听，只要修改代码，就会自动重新打包
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js", //入口文件
    output: {
        filename: "js/index.js", //打包后的文件名
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
    },
    plugins: [
        new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
        // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
        new HtmlWebpackPlugin({
            title: "webpack教程", //生成的html文件中，title标签的内容
            template: "./index.html", //可以指定模板去生成html
        }),
        // new ReactRefreshWebpackPlugin(), //为React组件启用热重载
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: "babel-loader",
            // },
            {
                // 处理.vue文件，使用vue-loader，默认会帮助我们进行热重载
                test: /\.vue?$/,
                use: "vue-loader",
            },
            {
                // 处理vue文件内的style样式
                test: /\.less?$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    "postcss-loader",
                    "less-loader",
                ],
            },
        ],
    },
    devServer: {
        // hot: true, //开启HMR
        hot: "only", //当模块中有报错时，修复了报错，不会直接刷新页面
        // host: "0.0.0.0", //在同一个网段下的主机中，通过ip是直接可以访问的
        open: true, //开启本地服务完毕后，自动打开浏览器
        client: {
            overlay: {
                //控制警告、错误信息是否在浏览器显示
                errors: true, //只有错误才在浏览器显示
                warnings: false,
            },
        },
    },
};
