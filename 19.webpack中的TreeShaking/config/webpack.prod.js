const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"], //替换掉style-loader
            },
        ],
    },
    optimization: {
        usedExports: true, //生产环境下默认是true，目的是标注出来哪些函数没有使用
        minimize: false, //告知 webpack 使用 TerserPlugin或其它在 optimization.minimizer定义的压缩插件
        minimizer: [
            new TerserPlugin({
                // test: ""  //匹配需要压缩的文件
                // include: "" //匹配参与压缩的文件
                // exclude: "" //匹配不需要压缩的文件
                // parallel: true //使用多进程并发运行以提高构建速度，默认开启

                // 提供给terser插件的选项
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    // Deprecated
                    output: null,
                    format: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
                extractComments: true, //是否将注释抽离到单独的文件
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash:6].css",
        }),
        new CssMinimizerPlugin(),
    ],
};
