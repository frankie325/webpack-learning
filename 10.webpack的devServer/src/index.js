/*
    存在的问题：
    1.每次修改代码，都需要重新执行npm run build，开发效率很低
    在package.json中添加
    "scripts": {
        "watch": "webpack --watch"
    },
    运行npm run watch，只要修改代码，就会自动重新打包

    或者在webpack.config.js添加watch: true，执行npm run build，也会开启监听

    目前的开发模式：
    1.watch方案来监听文件变化
    2.通过VSCode的live-server插件提供本地服务（当文件变化时，自动刷新页面）
    效率并不是特别高
    1.对所有代码都重新进行编译
    2.编译成功后，都会生成新的文件进行替换
    3.live-server属于VSCode插件，不属于webpack给我们的解决方案
    4.live-server每次多会重新刷新整个页面
*/

// import "./math";


// let message = "hello webpack";

// function hello() {
//     return message;
// }

// if (module.hot) {
//     // 哪些模块想要使用热更新，则引入哪些模块
//     module.hot.accept("./math.js", function () {
//         console.log("热更新完成");
//     });
// }

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App.jsx";
// ReactDOM.render(<App />, document.getElementById("app"));


import Vue from "vue";
import App from "./App.vue";
new Vue({
    render: (h) => h(App),
}).$mount("#app");
