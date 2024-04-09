// 一.引入http模块
var http = require('http');// 用于创建 HTTP 服务器和处理 HTTP 请求
var fs = require('fs');// 用于读取和写入文件
var url = require('url');// 用于解析 URL

// 创建留言数据对象
var msgs = [
    { name: '张三', content: "我是张三", create_at: '2024-3-04 10:32' },
    { name: '里斯', content: "我是里斯", create_at: '2024-2-23 10:28' },
    { name: '王五', content: "我是王五", create_at: '2024-1-14 10:11' }
];

// 二.创建web服务器
var server = http.createServer();// 创建HTTP服务器实例

// 三.监听用户请求
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
            // res.end(data);// data是所有首页的html代码

            // 1.将上面的变量数据组装到html
            var html = '';
            msgs.forEach(function (item) {
                html += `<li class="list-group-item">${item.name}:${item.content}<span class="pull-right">${item.create_at}</span></li>`;
            })
            console.log(html);

            // 2.替换data的占位符
            var htmlData = data.replace('^_^', html);

            // 3.响应替换后的数据即可
            res.end(htmlData);// 结束响应，并向客户端发送最终的响应内容
        })
    } else if (currentUrl == '/add') {// 添加页
        fs.readFile('./views/add.html', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.end(data);
        })

    } else if (currentUrl.indexOf('/doadd') === 0) {

        // get提交 /doadd?name=xxx&content=xxx req.url 请求路径需用url模块

        var parsedUrl = new URL(req.url, 'http://localhost:8080');
        // 创建一个新的URL对象，解析req.url来获取客户端请求的URL，如/add。
        // 'ht...80' 是基础URL，它是可选的，用于解析相对 URL。
        // 使用 new URL() 方法来解析相对 URL，从而得到完整的 URL 地址。
        var paramsObj = parsedUrl.searchParams;

        // 理论上是给数据库添加一条数据，现在是向数组中压入一条数据

        // 时间
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        // 将小时和分钟转换为两位数
        var hoursStr = (hours < 10 ? '0' : '') + hours;
        var minutesStr = (minutes < 10 ? '0' : '') + minutes;
        var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hoursStr + ':' + minutesStr;

        var msg = {
            name: paramsObj.get('name'), // 使用get方法获取参数值
            content: paramsObj.get('content'),
            create_at: dateStr
        };
        msgs.push(msg); // 添加留言对象到留言数组中

        // 插入成功，跳转到首页
        res.statusCode = 302; // 重定向
        res.setHeader('location', '/');
        res.end()
    }

    else {// 404
        fs.readFile('./views/404.html', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            res.end(data);
        })

    }

    // 响应用户请求
    // res.end('hello')
})

// 四.启动服务
server.listen(8080, function () {
    console.log('启动成功，访问：http://localhost:8080')
})

// 注意
// 终端需要cd转到当前message目录下，再node app.js