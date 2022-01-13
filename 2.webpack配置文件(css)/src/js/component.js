// import "css-loader!../css/index.css"  //可以内联使用css-loader，不推荐使用
import "../css/index.css"   
import "../css/component.less" //引入less文件

export function component() {
    const element = document.createElement("div");

    // Lodash, now imported by this script
    element.innerHTML = ["Hello", "webpack"].join(" ");
    element.classList.add("content");
    document.body.append(element);
}
