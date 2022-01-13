// import "../css/index.css";
import "../css/index.css";
import exampleTxt from "../txt/index.txt";
// import  from '.'
export function createElement() {
    const img = new Image();
    img.style.width = "100px";
    img.style.height = "100px";
    img.src = require("../images/xhr.jpg"); //引入图片资源
    document.body.appendChild(img);

    const div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.textContent = exampleTxt; //使用导入的txt内的文字
    // div.style.backgroundImage = `url(${require("../images/xhr.jpg").default})`;
    // div.className = "bg-img";
    document.body.appendChild(div);

    const i = document.createElement("i");
    i.className = "iconfont icon-tiantianquan"; //使用字体图标
    i.style.color = "red";
    document.body.appendChild(i);
}
