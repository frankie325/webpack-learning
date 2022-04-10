// const { format } = require("./utils/format"); //CommonJs导出时，导入是不能为CommonJs语法
import { format } from "./utils/format";
import _ from "loadsh";
import "./css/style.css";

import Vue from "vue";
import App from "./vue/App.vue";

new Vue({
    el: "#app",
    render: (h) => h(App),
});

const message = "hello world";
console.log(message);

export function sum(a, b) {
    return a + b;
}

console.log(format());
console.log(_.join("a", "b"));
