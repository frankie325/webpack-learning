const { SyncHook, SyncBailHook, SyncLoopHook, SyncWaterfallHook } = require("tapable");
const { AsyncSeriesHook, AsyncParallelHook } = require("tapable");
class LearnTapable {
    constructor() {
        this.hooks = {
            /*
                同步Hook：
                Bail：在某一个绑定的事件函数中，如果有返回值，那么后续监听的事件就不会执行了
                Loop：在某一个绑定的事件函数中，如果返回值为真，就会反复执行该事件函数
                Waterfall：当事件函数的返回值不为undefined时，那么它的的返回值会传递到下一个函数的第一个参数位置
            */
            // syncHook: new SyncHook(["name", "age"]), //传递字符数组作为Hook构造函数的参数，将作为绑定事件函数的形参
            // syncHook: new SyncBailHook(["name", "age"]),
            // syncHook: new SyncLoopHook(["name", "age"]),
            // syncHook: new SyncWaterfallHook(["name", "age"]),
            /*
                异步Hook：
                Series：在一个Hook中，监听的多次事件函数是串行执行的（等到上一个事件函数执行完，才会执行下一个）
                Parallel：在一个Hook中，监听的多次事件函数是并行执行的
            */
            // asyncHook: new AsyncSeriesHook(["name", "age"]),
            asyncHook: new AsyncParallelHook(["name", "age"]),
        };

        // 调用tap方法，往Hook实例上绑定事件函数
        // this.hooks.syncHook.tap("event1", (name, age) => {
        //     console.log("event1", name, age);
        //     return false;
        // });

        // this.hooks.syncHook.tap("event2", (name, age) => {
        //     console.log("event2", name, age);
        // });

        // this.hooks.asyncHook.tapAsync("event1", (name, age, callback) => {
        //     setTimeout(() => {
        //         console.log("event1", name, age);
        //         callback(); //执行回调，说明异步任务完成
        //     }, 1000);
        // });

        // this.hooks.asyncHook.tapAsync("event2", (name, age, callback) => {
        //     setTimeout(() => {
        //         console.log("event1", name, age);
        //         callback();
        //     }, 1000);
        // });

        // 使用Promise方式绑定事件函数
        this.hooks.asyncHook.tapPromise("event1", (name, age) => {
            // 返回一个Promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("event1", name, age);
                    resolve();
                }, 1000);
            });
        });

        this.hooks.asyncHook.tapPromise("event2", (name, age, callback) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("event2", name, age);
                    resolve();
                }, 1000);
            });
        });
    }
    emitSync() {
        // 执行call方法，触发同步Hook实例上绑定的事件
        this.hooks.syncHook.call("kfg", 22); //传递参数
    }

    emitAsync() {
        // 执行callAsync方法，触发异步Hook实例上绑定的事件
        // this.hooks.asyncHook.callAsync("kfg", 22, () => {
        //     console.log("异步事件执行完成");
        // });

        this.hooks.asyncHook.promise("kfg", 22).then(() => {
            console.log("异步事件执行完成");
        });
    }
}

const lt = new LearnTapable();
// lt.emitSync();
lt.emitAsync();
