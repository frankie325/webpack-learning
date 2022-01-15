(function () {
    var __webpack_modules__ = {
        "./src/js/format.js": function (module) {
            const dateFormat = () => {
                return "2022-1-11";
            };

            // 使用CommonJS模块进行导出
            module.exports = {
                dateFormat,
            };
        },

        "./src/js/math.js": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, {
                sum: function () {
                    return /* binding */ sum;
                },
                mul: function () {
                    return /* binding */ mul;
                },
            });
            // 使用ES6的module进行导出

            const sum = (num1, num2) => {
                return num1 + num2;
            };

            const mul = (num1, num2) => {
                return num1 * num2;
            };
        },
    };

    var __webpack_module_cache__ = {};

    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = (__webpack_module_cache__[moduleId] = {
            exports: {},
        });

        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        return module.exports;
    }

    !(function () {
        __webpack_require__.n = function (module) {
            var getter =
                module && module.__esModule
                    ? function () {
                          return module["default"];
                      }
                    : function () {
                          return module;
                      };
            
            __webpack_require__.d(getter, { a: getter });
            return getter;
        };
    })();

    !(function () {
        __webpack_require__.d = function (exports, definition) {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    })();

    !(function () {
        __webpack_require__.o = function (obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        };
    })();

    !(function () {
        __webpack_require__.r = function (exports) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports, "__esModule", { value: true });
        };
    })();

    var __webpack_exports__ = {};
    !(function () {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        // CommonJS的导出，使用import导入，和CommonJS实现一样，多了一个对n的调用
        var _js_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/format */ "./src/js/format.js");
        var _js_format__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_js_format__WEBPACK_IMPORTED_MODULE_0__);
        // 使用CommonJS语法导入esModule模块
        const { sum, mul } = __webpack_require__(/*! ./js/math */ "./src/js/math.js");

        // 使用esModule语法导入commonJS模块

        console.log(sum(10, 20));
        console.log(mul(10, 20));

        (0, _js_format__WEBPACK_IMPORTED_MODULE_0__.dateFormat)();
    })();
})();
//# sourceMappingURL=index.js.map
