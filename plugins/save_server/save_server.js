let button;
Plugin.register("save_server", {
    title: 'Save Server',
    author: 'YourName',
    description: 'Save project data to a server on save',
    icon: 'icon',
    version: '0.0.1',
    variant: 'both',
    // 插件加载时执行的函数
    onload() {
        // 监听项目保存事件
        Events.on("project_save", (e) => {
            const projectData = e.model;
            const serverUrl = "https://your-server-url.com/api/save"; // 替换为实际的服务器地址

            // 创建 XMLHttpRequest 对象
            const xhr = new XMLHttpRequest();
            xhr.open("POST", serverUrl, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            // 监听请求状态变化
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        Blockbench.showQuickMessage("项目数据已成功发送到服务器！");
                    } else {
                        Blockbench.showQuickMessage("发送项目数据到服务器失败！", "error");
                    }
                }
            };

            // 将项目数据转换为 JSON 字符串并发送
            const data = JSON.stringify(projectData);
            xhr.send(data);
        });
    },

    // 插件卸载时执行的函数
    onunload() {
        // 移除项目保存事件的监听器
        Events.off("project_save");
    }
});