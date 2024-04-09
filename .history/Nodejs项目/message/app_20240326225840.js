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
var server = http.createServer();// 创建HTTP 服务器实例

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
            // res.end(data);// data是所有首页的html代码  需求里面的列表动态化

            // 1.将上面的变量数据 组装HTML
            var html = '';
            msgs.forEach(function (item) {
                // console.log(item);
                html += `<li class="list-group-item">${item.name}:${item.content}<span class="pull-right">${item.create_at}</span></li>`;
                // 注意上面是`反引号（tab键上面的），不是单引号
            })
            console.log(html);

            // 2.将拼接好的数据 替换 data中的占位符
            var htmlData = data.replace('^_^', html); // 替换占位符

            // 3.响应替换后的数据即可
            res.end(htmlData);
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
        // res.setHeader('content-type', 'text/html;charset=utf-8');
        // res.end('提交数据处理');

        // get提交 /doadd?name=xxx&content=xxx req.url 请求路径 得用url模块

        var parsedUrl = new URL(req.url, 'http://localhost:8080'); // 使用你的服务器地址  
        var paramsObj = parsedUrl.searchParams;
        
        // console.log(paramsObj);
        // res.end('look');


        // 理论上是给数据库添加一条数据
        // 现在是向数组中压入一条数据
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        
        // 将小时和分钟转换为两位数
        var hoursStr = (hours < 10 ? '0' : '') + hours;
        var minutesStr = (minutes < 10 ? '0' : '') + minutes;
        
        var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hoursStr + ':' + minutesStr;
        var msg = {
            name: paramsObj.get('name'), // 使用get方法获取参数值
            content: paramsObj.get('content'), // 使用get方法获取参数值
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