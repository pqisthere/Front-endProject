// 1.引入http模块
var http = require('http')

// 2.创建web服务器
var server = http.createServer()

// 3.监听用户请求
server.on('request', function (req, res) {
    // 获取当前请求地址

    // 响应用户请求
    res.end('hello')
})

// 4.启动服务
server.listen(8080, function () {
    console.log('启动成功，访问：http://localhost:8080')
})

// 注意
// 终端需要cd转到当前message目录下，再node app.js