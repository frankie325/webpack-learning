(function () {
    /*
    定义了一个对象
    以模块路径为key
    以包裹模块内容的函数为value
    */
    var __webpack_modules__ = {
        "./src/js/count-CommonJS.js": function (__unused_webpack_module, exports) {
            let count = 1;

            function increase() {
                count++;
            }

            // 将我们导出的变量，放入到module对象中的exports 
            exports.count = count;
            exports.increase = increase;
            // module.exports = {
            //     count,
            //     increase,
            // };
        },
    };

    // 定义一个对象，作为加载模块的缓存
    var __webpack_module_cache__ = {};

    // 是一个函数，当我们加载模块时，都会通过这个函数来加载
    function __webpack_require__(moduleId) {

        // 1.判断缓存是否已经加载过，如果加载过直接取缓存
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }

        // 2.给module变量和__webpack_module_cache__[moduleId]赋值了同一个对象
        var module = (__webpack_module_cache__[moduleId] = {
            exports: {},
        });

        // 3.加载执行模块，传入module对象 {  exports: {} }
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        // 4.导出module.exports， {  exports: { dateFormat } }
        return module.exports;
    }

    var __webpack_exports__ = {};
    !function () {
        // 调用__webpack_require__，加载模块
        let { count, increase } = __webpack_require__(/*! ./js/count-CommonJS */ "./src/js/count-CommonJS.js");

        console.log(count);
        increase();
        console.log(count);
    }();
})();
//# sourceMappingURL=index.js.map
