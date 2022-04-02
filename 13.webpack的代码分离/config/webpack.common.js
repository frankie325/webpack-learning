const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const DevConfig = require("./webpack.dev");
const ProdConfig = require("./webpack.prod");

const CommonConfig = {
    context: path.resolve(__dirname, "./"), //可以将context设置为config文件环境下
    // entry: { //最简单的入口分离：设置多个入口文件
    //     main: "../src/main.js",
    //     index: "../src/index.js",
    // },
    // entry: {
    //     // 不同入口依赖了相同模块，使用 dependOn 可以共享模块
    //     // main: { import: "../src/main.js", dependOn: "lodash", /* filename:"" 这里也可以设置filename，不设置采用output.filename*/ },
    //     // index: { import: "../src/index.js", dependOn: "lodash" },
    //     // lodash: "lodash",
    //     // 依赖了多个模块，可以将依赖模块打包到一个文件中进行共享
    //     main: { import: "../src/main.js", dependOn: "shared" },
    //     index: { import: "../src/index.js", dependOn: "shared" },
    //     shared: ["lodash", "dayjs"],
    // },
    entry: {
        main: "../src/main.js",
        index: "../src/index.js",
    },
    output: {
        filename: "[name].[hash:6].bundle.js", //打包后的文件名
        path: path.resolve(__dirname, "../build"), //必须使用绝对路径
        chunkFilename: "./chunk/[name].[hash:6].chunk.js", //异步加载的
    },
    optimization: {
        chunkIds: "natural", // id名称占位符使用哪种算法
        // runtimeChunk: true,
        // runtimeChunk: "single",
        // runtimeChunk: {
        //     name: "runtime", //可以设置[name]字符占位名称的值
        // },
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`, // entrypoint为入口文件的信息
        },
        splitChunks: {
            // chunks: "initial", //同步导入的模块进行拆分共享
            // chunks: "async", //异步导入的模块进行拆分共享
            chunks: "all", //同步异步都进行拆分共享
            // 最小尺寸（ bytes），如果要拆分的模块小于这个值，则不会拆分
            minSize: 200,
            // 将大于maxSize的部分，拆分成不小于minSize的包
            // maxSize: 30000,
            // 一个包至少被导入了2次（在不同入口导入），才会进行拆分
            // minChunks: 2,

            /*
                cacheGroups：
                按条件分组，将匹配的模块打包到不同的chunk中
                不会立即将导入的模块进行输出，而是先缓存，等到所有匹配的模块加载完之后，再进行输出
            */
            cacheGroups: {
                // 将node_modules下引用的模块，打包到一个chunk中
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: "[id]_vendors.js",
                    priority: -10, //vendor分组优先级更高
                    // name:"" // name也可以设置打包的文件名称，可以是字符也可以是函数，与filename的区别就是，名字是固定的，不能使用名称占位符
                },
                // 将名称为bar_开头的文件，打包到一个chunk中
                bar: {
                    test: /bar_/,
                    filename: "[id]_bar.js",
                },
                // 默认分组，被导入了2次会打包到一个chunk中
                // 像lodash和dayjs满足既满足vendor分组也满足default，我们可以设置priority优先级
                // default: {
                //     minChunks: 2,
                //     filename: "[id]_common.js",
                //     priority: -20,
                // },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack教程",
            template: "../index.html", //plugin中的路径也是一样
        }),
    ],
};

// 导出为函数，接收命令传递过来的参数
module.exports = function (env) {
    const isProduction = !!env.production;
    process.env.production = env.production ? env.production : "development";
    return isProduction ? merge(CommonConfig, ProdConfig) : merge(CommonConfig, DevConfig);
};
