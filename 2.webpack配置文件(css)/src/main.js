import { sum, mul } from "./js/math.js";
import { component } from "./js/component.js";
const { dateFormat } = require("./js/format");

// 使用ES6的语法，低版本浏览器不支持
console.log(sum(20, 30));
console.log(mul(20, 30));

// 使用CommonJS模块，浏览器不支持
console.log(dateFormat());

// 在命令行输入webpack，即可打包（默认以src下的index.js文件为入口）


component()