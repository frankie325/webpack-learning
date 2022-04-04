module.exports = {
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
            },
        ],
    },
    devServer: {
        hot: true, //开启HMR
        client: {
            overlay: {
                //控制警告、错误信息是否在浏览器显示
                errors: true, //只有错误才在浏览器显示
                warnings: false,
            },
        },
    },
};
