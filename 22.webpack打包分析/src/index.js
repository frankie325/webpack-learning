import "./style.css";
import { sum } from "./math";
import { format } from "./format";

format();
sum(1, 1);

class Person {
    constructor(name) {
        this.name = name;
    }
}

new Person("kfg");
