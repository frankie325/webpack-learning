import "core-js/stable";
import "regenerator-runtime/runtime";

const message = "Hello Babel";

const foo = (info) => {
    console.log(info);
};

foo(message);

const p = new Promise((resolve, reject) => {});
