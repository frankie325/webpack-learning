const { src, dest } = require("gulp");
const babel = require("gulp-babel");

const jsTask = () => {
    return src("./src/main.js").pipe(babel()).pipe(dest("./build"));
};

module.exports = {
    jsTask,
};
