const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const CompressionPlugin = require("compression-webpack-plugin");

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
        new CompressionPlugin({
            test: /\.(css|js)$/i, //匹配css和js文件
            threshold: 0, // 文件大于该大小（字节），才会进行压缩
            // minRatio: 0.8, // 压缩之后的大小/压缩前的大小 小于该值才会进行压缩，默认0.8
            minRatio: Infinity, // 即使大于原始大小也进行压缩
            algorithm: "gzip", // 使用的压缩算法
            // include:"", // 匹配哪些需要压缩
            // exclude:"", // 匹配哪些不需要压缩
            // filename:"", //设置压缩文件名称
        }),
    ],
};
