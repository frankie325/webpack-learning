const { src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
// const uglify = require("gulp-uglify");
const terser = require("gulp-terser");

const jsTask = () => {
    return (
        src("./src/**/*.js")
            // src("./src/main.js")
            .pipe(
                // 使用babel做转换
                babel({
                    presets: ["@babel/preset-env"],
                })
            )
            // .pipe(uglify())
            .pipe(
                // 使用terser进行压缩
                terser({
                    mangle: {
                        toplevel: true,
                    },
                })
            )
            .pipe(dest("./build"))
    );
};

watch("./src/**/*.js", jsTask);

module.exports = {
    jsTask,
};
