const { src, dest, watch, series, parallel } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const less = require("gulp-less");
const postcss = require("gulp-postcss"); //需要安装postcss 和 gulp-postcss
const postcssPresetEvn = require("postcss-preset-env"); //使用postcss预设插件
const inject = require("gulp-inject");

const browserSync = require("browser-sync");
const del = require("del");

const htmlTask = () => {
    return src("./src/index.html", { base: "./src" })
        .pipe(
            htmlmin({
                collapseWhitespace: true,
            })
        )
        .pipe(dest("./dist"));
};

const jsTask = () => {
    return src("./src/js/*.js", {
        base: "./src", //按照原目录结构进行原样输出
    })
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(
            terser({
                mangle: {
                    toplevel: true,
                },
            })
        )
        .pipe(dest("./dist"));
};

const lessTask = () => {
    return src("./src/css/*.less", { base: "./src" })
        .pipe(less())
        .pipe(postcss([postcssPresetEvn])) //css语法兼容处理
        .pipe(dest("./dist"));
};

// 将打包的js和css注入到html文件，想要生成注入标签，还要在html模板中写入模板注释进行占位
const injectHtml = () => {
    return src("./dist/*.html")
        .pipe(inject(src(["./dist/js/*.js", "./dist/css/*.css"]), { relative: true /*相对路径*/ }))
        .pipe(dest("./dist"));
};

// 搭建本地服务，使用browser-sync插件
const bs = browserSync.create();
const serve = () => {
    // 监听src文件变化
    watch("./src/*.html", series(htmlTask, injectHtml));
    watch("./src/js/*.js", series(jsTask, injectHtml));
    watch("./src/css/*.less", series(lessTask, injectHtml));

    bs.init({
        prot: 8081,
        open: true,
        files: "./dist/*", //监听dist文件的变化
        server: {
            baseDir: "./dist", //提供的服务目录
        },
    });
};

// 清空dist文件
const clean = () => {
    return del(["./dist"]);
};

/*
在package.json导入这两个任务
{
    "scripts": {
        "build": "gulp buildTask",
        "serve": "gulp serveTask"
    },
}
*/ 
const buildTask = series(clean, parallel(htmlTask, jsTask, lessTask), injectHtml);
const serveTask = series(buildTask, serve);

module.exports = {
    buildTask,
    serveTask,
};
