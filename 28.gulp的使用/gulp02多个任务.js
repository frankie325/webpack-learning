const { series, parallel } = require("gulp");

const task1 = (cb) => {
    setTimeout(() => {
        console.log("task1");
        cb();
    }, 1000);
};

const task2 = (cb) => {
    setTimeout(() => {
        console.log("task2");
        cb();
    }, 1000);
};

const task3 = (cb) => {
    setTimeout(() => {
        console.log("task3");
        cb();
    }, 1000);
};

// 任务串行执行：一个接一个的执行
const seriesTask = series(task1, task2, task3);
// 任务并行执行，任务同时一起执行
const parallelTask = parallel(task1, task2, task3);

// 可以组合使用：先执行并行任务，接着再执行串行任务
const composeTask = series(parallelTask, seriesTask);

module.exports = {
    seriesTask,
    parallelTask,
    composeTask,
};
