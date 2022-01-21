module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                // useBuiltIns: false,//不使用Polyfill
                // useBuiltIns: "entry",//使用Polyfill，需要在入口文件中引入core-js/regenerator-runtime
                useBuiltIns: "usage", //使用Polyfill，代码中需要那些polyfill，就引用相关api
                corejs: 3, //Polyfill默认使用corejs的版本为2，但是安装的是3的版本，会报错，所以指定为使用3的版本
            },
        ],
        // ["@babel/preset-react"],
        ["@babel/preset-typescript"],
    ],
    // plugins: [
    //     [
    //         "@babel/plugin-transform-runtime",
    //         {
    //             corejs: 3,
    //         },
    //     ],
    // ],
};
