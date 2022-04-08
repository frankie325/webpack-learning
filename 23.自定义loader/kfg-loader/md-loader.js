const marked = require("marked");

const hljs = require("highlight.js");

module.exports = function (content) {
    console.log("md-loader被执行");

    // 使用highlight.js
    marked.setOptions({
        highlight: function (code, lang) {
            return hljs.highlight(lang, code).value;
        },
    });

    const htmlContent = marked.parse(content);
    const innerContent = "`" + htmlContent + "`";
    // 转为HTML后，还需要依赖html-loader将 HTML 导出为字符串 或者自己转为js字符串
    const moduleCode = `var code=${innerContent}; export default code;`;

    return moduleCode; //因为返回的要是字符串或者二进制流
};
