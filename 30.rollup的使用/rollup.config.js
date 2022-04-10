import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import postcssPresetEvn from "postcss-preset-env"; //使用postcss预设插件
import vue from "rollup-plugin-vue";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const plugins = [
    commonjs(), //支持commonJs
    resolve(),
    replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV), //注入环境变量
    }),
    babel({
        babelHelpers: "bundled", //babel解析时，辅助函数只会生成一个，建议显示设置该值
    }),
    postcss({
        // extract: true,
        extract: "css/style.css", //提取css文件
        minimize: true, //开启压缩
        plugins: [
            postcssPresetEvn(), //使用预设插件
        ],
    }),
    vue(),
];

// 生产环境才进行压缩
if (isProduction) {
    plugins.push(terser());
}

// 开发环境才开启本地服务
if (isDevelopment) {
    plugins.push(
        serve({
            open: true, //是否自动打开浏览器
            port: 8081,
            contentBase: ".", //服务哪个文件夹（取决于index.html所在的位置取决于index.html所在的位置，推荐放在根目录，需手动引入打包资源）
            // contentBase: "./dist",
        }),
        livereload({
            watch: "dist", //监听dist目录的变化
        })
    );
}

export default {
    input: "./src/main.js",
    output: {
        format: "umd", // 输出的文件类型
        name: "myUtils",
        file: "./dist/index.umd.js", //输出目录
    },
    external: ["lodash"],
    plugins,
};
