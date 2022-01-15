const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: "./src/main.js", //入口文件
    output: {
        filename: "js/index.js", //打包后的文件名
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
        // assetModuleFilename: "img/[name].[hash:6][ext]", //使用asset/resource资源模块类型，可以指定输出文件目录，注意这里的[ext]包含后缀名前面的.（点符号）
    },
    module: {
        // 在rules里面配置loader
        rules: [
            {
                // 匹配文件规则，使用正则表达式
                test: /\.css$/, //匹配以.css结尾的文件
                // loader: "css-loader", //当use中只有一个loader时，可以简写
                use: [
                    // "css-loader",  //没有options参数时，可以简写，直接写字符串
                    // {
                    //     loader: "css-loader",
                    //     options: {},  //传入到css-loader的配置项
                    // },

                    // 多个loader时，编译顺序从后往前，也就是先解析完.css文件，再将css插入到页面中
                    "style-loader", // style-loader负责将解析后的css插入head标签中
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1, // 当css文件中使用了@import语法导入其他css文件，需要设置该属性，不然通过@import导入的css文件无法被postcss-loader处理
                        },
                    },
                    "postcss-loader",
                ],
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 name: "img/[name].[hash:6].[ext]",
            //                 // outputPath: "img", // 图片文件输出的目录，可以直接在name中指定输出目录
            //                 limit: 100 * 1024, //限制文件大小，小于100kb的文件转化为base64的URL
            //                 esModule: false, //默认为true，表示是否以es module的形式引入，使用require引入的资源是个对象，require().default才能拿到资源路径
            //             },
            //         },
            //     ],
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/,
            //     type: "asset/resource", //file-loader的效果
            //     generator: {
            //         // generator内也可以指定输出文件目录，仅适用于asset 和 asset/resource 模块类型
            //         filename: "img/[name].[hash:6][ext]",
            //     },
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/, //url-loader的效果
            //     type: "asset/inline",
            // },
            {
                test: /\.txt$/, //将txt文件作为字符串导入
                type: "asset/source", //raw-loader的效果
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset", //url-loader的效果
                generator: {
                    // generator内也可以指定输出文件目录，仅适用于asset 和 asset/resource 模块类型
                    filename: "img/[name].[hash:6][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 300 * 1024, // 300kb，相当于url-loader的limit选项
                    },
                },
            },
            {
                test: /\.ttf$/, //处理字体图标文件
                type: "asset/resource",
                generator: {
                    filename: "font/[name].[hash:6][ext]",
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), //使用CleanWebpackPlugin插件，打包时会自动删除之前的打包目录
        // HtmlWebpackPlugin自动创建一个html文件，并将打包好的js等资源自动引入该html
        new HtmlWebpackPlugin({
            title: "webpack教程", //生成的html文件中，title标签的内容
            template: "./public/index.html", //可以指定模板去生成html
        }),
        // DefinePlugin用来定义全局常量
        new DefinePlugin({
            BASE_URL: JSON.stringify("./"), //由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个 实际的引号
        }),
        // CopyWebpackPlugin可以直接将已经存在的单个文件或整个目录复制到打包后的目录。
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    // to: "dest", //可以不需要指定复制的到的目录，默认值为打包出口output
                    globOptions: {
                        ignore: [
                            "**/index.html", //忽略public下的index.html
                            "**/abc.txt", //忽略public下的abc.txt
                        ],
                    },
                },
            ],
        }),
    ],
};
