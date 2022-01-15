(function () {
    "use strict";
    /*
    定义了一个对象
    以模块路径为key
    以包裹模块内容的函数为value
    */
    var __webpack_modules__ = {
        "./src/js/count-esModule.js": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            //调用r的目的是记录是一个esModule
            __webpack_require__.r(__webpack_exports__);
            // 调用d给exports对象做一层代理
            __webpack_require__.d(__webpack_exports__, {
                default: function () {
                    return /* binding */ getDefault;
                },
                count: function () {
                    return /* binding */ count;
                },
                increase: function () {
                    return /* binding */ increase;
                },
            });

            function getDefault() {
                return "default";
            }
            
            let count = 1;

            function increase() {
                count++;
            }
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

        // 4.导出module.exports， {  exports: { sum, mul } }
        return module.exports;
    }

    !function () {
        // __webpack_require__函数对象上添加一个属性：d -> 值function
        __webpack_require__.d = function (exports, definition) {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    // exports对象上做了一层代理，严格模式下无法对export中的属性进行赋值操作
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    }();

    !function () {
        // __webpack_require__函数对象上添加一个属属性：o -> 值function
        // 判断对象是否有指定的属性
        __webpack_require__.o = function (obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        };
    }();

    !function () {
        // __webpack_require__函数对象上添加一个属性：r -> 值function
        // 作用是为exports添加属性，说明是一个esModule
        __webpack_require__.r = function (exports) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports, "__esModule", { value: true });
        };
    }();

    var __webpack_exports__ = {};

    !function () {
        // 调用__webpack_require__，加载模块
        __webpack_require__.r(__webpack_exports__);
        var _js_count_esModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/count-esModule */ "./src/js/count-esModule.js");

        (0, _js_count_esModule__WEBPACK_IMPORTED_MODULE_0__["default"])();
        console.log(_js_count_esModule__WEBPACK_IMPORTED_MODULE_0__.count);
        (0, _js_count_esModule__WEBPACK_IMPORTED_MODULE_0__.increase)();
        console.log(_js_count_esModule__WEBPACK_IMPORTED_MODULE_0__.count);
    }();
})();
//# sourceMappingURL=index.js.map
