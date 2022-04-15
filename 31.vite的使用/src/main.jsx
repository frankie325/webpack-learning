import { sum } from "./util/math.js";
// import _ from "../node_modules/lodash-es/lodash.default.js";
import _ from "lodash-es";
import "./css/style.css";
import "./css/index.less";
import { format } from "./ts/index.ts";
console.log(sum(1, 1));
console.log(_.join("a", "b"));
console.log(format("str"));

// 引入图片资源
import xhr from "./img/xhr.jpg";
const imgEl = document.createElement("img");
imgEl.src = xhr;
document.body.append(imgEl);

// 引入.vue文件
import Vue from "vue";
import App from "./vue/App.vue";

new Vue({
    el: "#app",
    render: (h) => h(App),
});

// 引入.jsx文件
import React from "react";
import ReactDOM from "react-dom";
import ReactApp from "./react/App.jsx";

ReactDOM.render(<ReactApp />, document.getElementById("root"));
