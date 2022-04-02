import dayjs from "dayjs";
import _ from "lodash";

console.log("Hello Index");
console.log(_.join(["Hello", "Index"]));
console.log(dayjs(), "Index");
console.log(111);
import "./bar_1";
// 动态导入库
// import("lodash").then(() => {});

import(/* webpackChunkName: "foo" */ "./foo").then((res) => {
    console.log(res);
});
// import("./foo2").then((res) => {
//     console.log(res);
// });


const button = document.createElement("button");
button.innerText = "加载元素";
button.addEventListener("click", () => {
    import(/* webpackChunkName: "element" */ /* webpackPrefetch: true */  "./element").then((res) => {
        console.log(res);
        document.body.appendChild(res.default)
    });
});
document.body.appendChild(button);
