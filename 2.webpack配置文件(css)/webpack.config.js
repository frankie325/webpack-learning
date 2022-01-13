const path = require("path");

module.exports = {
    entry: "./src/main.js", //入口文件
    output: {
        filename: "index.js", //打包后的文件名
        path: path.resolve(__dirname, "./build"), //必须使用绝对路径
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
            {
                // 处理.less结尾文件
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2, //数值为2会回退到less-loader处理
                        },
                    },
                    "postcss-loader",
                    "less-loader",
                ],
            },
        ],
    },
};
