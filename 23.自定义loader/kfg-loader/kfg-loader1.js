const { validate } = require("schema-utils");
const schema = require("./kfg-schema.json");
// NormalLoader
module.exports = function (content) {
    console.log("我是自定义loader1");

    // 返回值的方式有两种
    // return content + 123;
    // 或者
    /**
     * @description:
     * @param {err} 错误信息
     * @return {content} 内容
     */
    this.callback(null, content); //this为loader的上下文
};

// 异步Loader处理方式
// module.exports = function (content) {
//     const options = this.getOptions(); //获取传递的参数

//     validate(schema, options); //校验传递的参数

//     console.log("传递的参数", options);
//     console.log(content + " 我是自定义loader1");

//     const callback = this.async(); //loader处理为异步的时候

//     setTimeout(() => {
//         callback(null, content);
//     }, 0);
// };

// PitchLoader
module.exports.pitch = function () {
    console.log("我是自定义pitch loader1");
};
