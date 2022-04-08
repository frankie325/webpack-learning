const foo = (cb) => {
    console.log("foo");

    cb();
};

module.exports = {
    foo,
};

module.exports.default = (cb) => {
    console.log("default task");
    cb();
};
