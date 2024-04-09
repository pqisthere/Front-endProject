// 1.引入http模块
var http = require('http')

// 2.创建web服务器
var server = http.createServer()

// 3.监听用户请求
server.on('request', function (req, res) {
    // 响应用户请求
    res.end('hello')
})

// 4.启动服务
server.listen(8080, function () {
    console.log('启动成功，访问：http://localhost:8080')
})