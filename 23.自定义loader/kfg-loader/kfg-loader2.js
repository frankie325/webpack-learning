// NormalLoader
module.exports = function (content) {
    console.log("我是自定义loader2");
    return content;
};

// PitchLoader
module.exports.pitch = function () {
    console.log("我是自定义pitch loader2");
};
