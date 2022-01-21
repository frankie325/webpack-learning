module.exports = {
    env: {
        browser: true, // 监测代码运行在什么环境下
        es2021: true, //支持ES2021的语法
    },
    // 继承这些插件的规则
    extends: ["plugin:vue/essential", "airbnb-base"],
    parserOptions: {
        ecmaVersion: "latest",
        // "parser": "@typescript-eslint/parser" // 默认使用espree编译器对js解析，选择了支持ts的话，为解析ts的编译器
    },
    // 插件
    plugins: [
        "vue",
        // "@typescript-eslint"
    ],
    // 自定义js相关规则
    rules: {
        // 严重程度
        // 0 => off    关闭警告
        // 1 => warn   显示黄色警告
        // 2 => error  显示红色警告
        "no-unused-vars": 0, //关闭变量声明但未使用的报错
        quotes: [
            "error", //严重程度
            "double", //使用双引号包裹字符
        ],
        "linebreak-style": ["error", "windows"], //使用widows的行结束符\r\n
        indent: ["error", 4], //控制缩进，默认4个空格
        "no-console": "off", //关闭出现console语句报错
    },
};
