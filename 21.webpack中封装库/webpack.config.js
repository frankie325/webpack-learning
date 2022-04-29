const path = require("path");

module.exports = {
    mode: "production",
    entry: "./index.js",
    // library.type为module时，需要开启改特性，并且library.name不能设置
    // experiments: {
    //     outputModule: true,
    // },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "kfg_utils.js",
        // 暴露的模块名称。取决于 libraryTarget 的值
        library: "kfg_utils",
        library: {
            name: "kfg_utils",
            // type: "var", // 将导出的库赋值给一个变量
            // type: "assign", // 将导出的库赋值给一个变量，没有声明变量，更加安全
            // type: "global",
            // type: "window", // 将导出的库赋值给window
            // type: "commonjs", //社区规范的commonjs
            // type: "commonjs2", //Node的commonjs（commonjs2多了对module属性的支持）
            // type: "module", //支持ESModule
            // type: "amd", //支持AMD模块
            type: "umd", //支持所有环境
            // export: "default", // 可以指定哪一个导出应该被暴露为一个库
            // export: ["default", "math"], //传递一个数组，分配给库名的模块的路径
        },
        // 相当于library.type，官方推荐使用library.type，因为libraryTarget未来可能会废除该属性
        // libraryTarget: "window",
    },
};
