// 使用webpack-dev-middleware自己开启一个本地服务

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
// 拿到webpack配置对象
const config = require("./webpack.config");

// webpack根据配置信息进行编译
const compiler = webpack(config);

// 生成express中间件
const middleware = webpackDevMiddleware(compiler);

// 告知 express 使用 webpack-dev-middleware
app.use(middleware);

app.listen(3000, () => {
    console.log("服务器已经开启在3000端口上");
});

// 执行node server.js即可启动本地服务