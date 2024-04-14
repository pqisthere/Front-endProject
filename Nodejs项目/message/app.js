// 一.引入模块
var http = require('http');// 用于创建 HTTP 服务器和处理 HTTP 请求
var fs = require('fs');// 用于读取和写入文件
var url = require('url');// 用于解析URL

// 创建留言数据对象
var msgs = [
    { name: '牛二', content: "我是妞儿", create_at: '2024-1-04 06:12' },
    { name: '张三', content: "我是张三", create_at: '2024-1-22 09:32' },
    { name: '里斯', content: "我是里斯", create_at: '2024-2-23 12:28' },
    { name: '王五', content: "我是王五", create_at: '2024-4-14 17:11' }
];

// 二.创建 HTTP 服务器实例
var server = http.createServer();

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
            // res.end(data);// data 是首页所有的 html 代码

            // 1.将上面的变量数据组装到html
            var html = '';
            msgs.forEach(function (item, index) {
                html += `
        <li class="list-group-item" style="display: flex; justify-content: space-between; align-items: center;">
            ${item.name}: ${item.content}
            <span >${item.create_at}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteMessage(${index})">删除</button>
        </li>`;
            });

            // console.log(html);

            // 2.重点！！替换 data 的占位符
            var htmlData = data.replace('^_^', html);

            // 3.响应替换后的数据
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

    } else if (currentUrl.indexOf('/doadd') === 0) {// 发表
        // get 提交 /doadd?name=xxx&content=xxx req.url 请求路径需用url模块

        var parsedUrl = new URL(req.url, 'http://localhost:8080');
        // 创建新的 URL 对象，解析 req.url 来获取客户端请求的 URL，如 /add
        // 'ht...80' 是基础 URL，用于解析相对 URL，从而得到完整的 URL 地址
        var paramsObj = parsedUrl.searchParams;// 从解析后的 URL 对象中获取查询参数

        // 格式化日期时间
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var hoursStr = (hours < 10 ? '0' : '') + hours;
        var minutesStr = (minutes < 10 ? '0' : '') + minutes;
        var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hoursStr + ':' + minutesStr;

        var msg = {
            name: paramsObj.get('name'),
            content: paramsObj.get('content'),
            create_at: dateStr
        };

        // 理论上是给数据库添加一条数据，现在是向数组中压入一条数据
        msgs.push(msg); // 添加留言对象到留言数组中

        // 插入成功，重定向到首页
        res.statusCode = 302; // 声明重定向
        res.setHeader('location', '/'); //设置响应头，指定重定向到网站的根目录
        res.end() // 结束响应，并将其发送给客户端

    } else if (currentUrl.startsWith('/delete')) { // 当前请求的 URL 以 '/delete' 开头
        // 解析并删除对应索引
        var index = parseInt(currentUrl.split('/').pop());
        msgs.splice(index, 1);
        // 删除成功，重定向到首页
        res.statusCode = 302;
        res.setHeader('location', '/');
        res.end();
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
})

// 四.启动服务
server.listen(8080, function () {
    console.log('启动成功，访问：http://localhost:8080')
})

// 注意
// 终端需要cd转到当前message目录下，再node app.js

// currentUrl.indexOf('/doadd') === 0
// 通过 indexOf() 方法检查当前请求的 URL 是否以 /doadd 开头
// 如果返回 0，则表示当前 URL 的开头与 /doadd 完全匹配
// 如果匹配成功，条件语句将返回 true，否则返回 false