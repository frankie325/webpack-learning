const { NodeSSH } = require("node-ssh");

class AutoUploadPlugin {
    constructor(options) {
        this.ssh = new NodeSSH();
        this.options = options;
    }

    apply(compiler) {
        // 将资源输出到 output 目录之后执行
        compiler.hooks.afterEmit.tapAsync("AutoUploadPlugin", async (compilation, callback) => {
            console.log("内容上传到服务器了");
            // 1. 获取输出的文件夹

            const outputPath = compilation.outputOptions.path;

            // 2. 连接服务器（ssh连接）
            await this.connectServer();

            // 3. 删除原来目录的内容
            const serverDir = this.options.serverDir;
            await this.ssh.execCommand(`rm -rf ${serverDir}/*`); //删除/root/test目录下的所有文件

            // 4. 上传文件到服务器
            console.log(outputPath);
            await this.uploadFiles(outputPath, serverDir);

            // 5. 关闭ssh
            this.ssh.dispose();
            callback();
        });
    }

    async connectServer() {
        await this.ssh.connect({
            host: this.options.host,
            username: this.options.username,
            password: this.options.password,
        });
    }

    /**
     * @description: 上传文件
     * @param {*} localPath 要上传的文件的本地目录
     * @param {*} remotePath 上传到服务器的目标目录
     */
    async uploadFiles(localPath, remotePath) {
        const status = await this.ssh.putDirectory(localPath, remotePath, {
            recursive: true, //递归上传所有文件
            concurrency: 10, //并发数
        });
        console.log("传送到服务器：", status ? "成功" : "失败");
    }
}

module.exports = AutoUploadPlugin;
