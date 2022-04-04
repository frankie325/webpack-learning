const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

module.exports = {
    mode: "production",
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"], //替换掉style-loader
                // sideEffects: true, //认为css文件有副作用
            },
        ],
    },
    optimization: {
        // usedExports: true, //生产环境下默认是true，目的是在源代码通过注释标注出来哪些函数没有使用，然后Terser会将没使用的代码进行删除
        // minimize: true, //告知 webpack 使用 TerserPlugin或其它在 optimization.minimizer定义的压缩插件
        // minimizer: [
        //     new TerserPlugin({
        //         // test: ""  //匹配需要压缩的文件
        //         // include: "" //匹配参与压缩的文件
        //         // exclude: "" //匹配不需要压缩的文件
        //         // parallel: true //使用多进程并发运行以提高构建速度，默认开启
        //         // 提供给terser插件的选项
        //         terserOptions: {
        //             ecma: undefined,
        //             parse: {},
        //             compress: {},
        //             mangle: true, // Note `mangle.properties` is `false` by default.
        //             module: false,
        //             // Deprecated
        //             output: null,
        //             format: null,
        //             toplevel: false,
        //             nameCache: null,
        //             ie8: false,
        //             keep_classnames: undefined,
        //             keep_fnames: false,
        //             safari10: false,
        //         },
        //         extractComments: true, //是否将注释抽离到单独的文件
        //     }),
        // ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash:6].css",
        }),
        new CssMinimizerPlugin(),

        // 实现css的tree shaking，没有使用的css类名、标签名等会被删除
        new PurgeCssPlugin({
            // 匹配src目录下的所有文件
            // purgecss-webpack-plugin官方推荐使用glob来获取匹配的文件列表
            paths: glob.sync(`${path.resolve(__dirname, "./src")}/**/*`, {
                nodir: true, //文件夹不需要匹配
            }),
            // 安全列表，这些css属性不会删除
            safelist: function () {
                return { standard: ["html", "body"] };
            },
        }),
    ],
};
