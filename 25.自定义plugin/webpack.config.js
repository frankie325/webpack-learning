const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AutoUploadPlugin = require("./plugins/AutoUploadPlugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new AutoUploadPlugin({
            host: "192.168.8.128",
            username: "root",
            password: "123456",
            serverDir: "/root/test",
        }),
    ],
};
