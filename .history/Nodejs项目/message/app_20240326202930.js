// 1.引入http模块
var http = require('http');
var fs = require('fs');

// 创建留言数据对象
var msgs = [
    { name: '张三', content: "我是张三", create_at: '2024-3-14 10：30：32' },
    { name: '里斯', content: "我是里斯", create_at: '2024-2-14 10：30：32' },
    { name: '王五', content: "我是王五", create_at: '2024-1-14 10：30：32' },
]


// 2.创建web服务器
var server = http.createServer();

// 3.监听用户请求
server.on('request', function (req, res) {
    // 获取当前请求地址
    var currentUrl = req.url;
    //判断页面
    if (currentUrl == '/') {// 首页（fs模块）
        fs.readFile('./views/index.html', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            // 1.将上面的变量数据 组装HTML
            var html = '';
            msgs.forEach(function (item) {
                html += `<li class="list-group-item">${item.name}:${item.content}<span class="pull-right">${item.create_at}</span></li>`;
            });
            // 替换HTML中的占位符
            data = data.replace('{{msgList}}', html);
            res.end(data);
        });
    } else if (currentUrl == '/add') {// 添加页
        fs.readFile('./views/add.html', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.end(data);
        });
    } else {// 404
        fs.readFile('./views/404.html', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.end(data);
        });
    }
});

// 4.启动服务
server.listen(8080, function () {
    console.log('启动成功，访问：http://localhost:8080')
});
