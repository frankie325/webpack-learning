const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
    mode: "development",
    devtool: "source-map", //打包后会生成一个映射文件，以.map结尾
    // entry: "./src/index.js", //入口文件
    // entry: "./src/react_index.jsx", //入口文件，测试react jsx使用
    entry: "./src/vue_index.js", //入口文件，测试vue使用
    output: {
        filename: "js/index.js", //打包后的文件名
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, //第三方库中可能使用了polyfill，和babel可能会产生冲突，进行排除
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-transform-block-scoping"], // 可以安装对应的插件来进行对应功能的转换
                            // presets: ["@babel/preset-env"], //预设插件，多个插件的组合。
                            // presets: [
                            //     [
                            //         "@babel/preset-env",
                            //         {
                            //             targets: ["chrome 88"], //可以指定适配的浏览器
                            //             modules: "commonjs", //将esModule转换为CommonJs
                            //         },
                            //     ],
                            // ],
                        },
                    },
                ],
            },
            {
                // 处理.vue文件，使用vue-loader
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
    plugins: [
        new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
        // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
        new HtmlWebpackPlugin({
            title: "webpack教程", //生成的html文件中，title标签的内容
            template: "./index.html",
        }),
        new VueLoaderPlugin(),//必须使用VueLoaderPlugin插件。它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    ],
};
