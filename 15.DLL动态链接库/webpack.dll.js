const path = require("path");
const { DllPlugin } = require("webpack");

module.exports = {
    mode: "production",
    entry: {
        react: ["react", "react-dom"], //将react打包成DLL动态链接库
    },
    output: {
        path: path.resolve(__dirname, "./dll"), //生成DLL动态链接库文件
        filename: "[name].dll.js", //输出的动态链接库名称
        library: "[name]", //作为一个库进行输出，为你的入口做导出，具体配置可以查看官网
    },
    plugins: [
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件中 name 字段的值
            name: "[name]",
            path: path.resolve(__dirname, "./dll/[name].manifest.json"), //生成manifest.json文件， 用来描述生成的dll文件
        }),
    ],
};
