const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    // devtool: false,
    // devtool: "eval",
    devtool: "source-map", //打包后会生成一个映射文件，以.map结尾
    // devtool: "eval-source-map",//打包后不会生成.map的映射文件，而是将模块内的源代码和转成base64编码的.map文件，放入到eval函数中
    // devtool: "inline-source-map", //打包后不会生成.map的映射文件，而会在index.js文件末尾生成一行注释，而这行注释内容为.map文件的base64编码
    // devtool: "cheap-source-map", //会生成.map的映射文件，但是会更高效一些（cheap低开销），它没有生成列映射，只能精准到行，因为在开发中通常只需要行信息就可以定位到错误了
    // devtool: "cheap-module-source-map", //当我们的代码经过了loader的处理，比如babel-loader，在调试控制台映射出来的代码是最原始的代码，而如果是cheap-source-map，就是loader转换过之后的代码
    // devtool: "hidden-source-map", //会生成.map的映射文件，但是不会在index.js中添加最后一行引用注释，在调试控制台中报的错也不会对应到原始文件了。
    // devtool: "nosources-source-map", //会生成.map的映射文件，只有错误信息提示，不会在调试控制台显示原始文件。
    entry: "./src/index.js", //入口文件
    output: {
        filename: "js/index.js", //打包后的文件名
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
        // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
        new HtmlWebpackPlugin({
            title: "webpack教程", //生成的html文件中，title标签的内容
        }),
    ],
};
