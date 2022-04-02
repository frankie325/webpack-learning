const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DllReferencePlugin } = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
module.exports = {
    mode: "production",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].bundle.js", //输出的动态链接库名称
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, //第三方库中可能使用了polyfill，和babel可能会产生冲突，进行排除
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack教程", //生成的html文件中，title标签的内容
            template: "./index.html",
        }),
        new DllReferencePlugin({
            context: __dirname, //上下文
            manifest: require("./dll/react.manifest.json"), //引用dll库的manifest文件
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, "./dll/react.dll.js"),  //要添加到HTML文件中文件的绝对路径
            publicPath: "./", //如果没有在output.publicPath，会在引入src前加上auto/xxx,导致资源引用不正确，设置为"./"
        }),
    ],
};
