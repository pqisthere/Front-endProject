// 获取表格
var table = document.querySelector(".box");
// 获取单元格
var cells = table.getElementsByTagName("td");
// 生成随机数，范围在0-8
var randomIndex = Math.floor(Math.random() * 9);
// 随机单元格
var randomCell = cells[randomIndex];

// 创建一个新的老鼠图片元素
var img = document.createElement("img");
img.src = "./image/Mouse5.png"
img.classList.add('img');// 添加样式类

// 将老鼠图片添加到随机单元格中
randomCell.appendChild(img);


//下面被注释的这种方法不行，因为每次reload之后sum=0，永远不会alert("成功");
// var sum=0;
// // 正确点击（即页面重加载）三次输出“成功”
// img.addEventListener("click", function () {
//     console.log(sum);
//     // 如果页面重新加载次数达到 4，则输出 "成功"
//     if (sum === 4) {
//         alert("成功");
//     } else {
//         sum++;
//         // 如果页面重新加载次数未达到 3，则重新加载页面
//         location.reload();
//     }
// });


// 下面这种方法可以，因为将sum值保存在本地存储中，sum不会随着reload而清零

// 获取页面重新加载次数
var sum = parseInt(localStorage.getItem('sum')) || 1;
// 初始倒计时时间（秒）
var timeLeft = 2;

// 显示倒计时器
var timerDisplay = document.createElement('div');
timerDisplay.textContent = '倒计时：' + timeLeft + '秒';
timerDisplay.classList.add('countdown');// 添加样式类
document.body.appendChild(timerDisplay);

// 更新倒计时器
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = '倒计时：' + timeLeft + '秒';
}

// 给地鼠图片添加点击事件处理程序
img.addEventListener("click", function () {
    // 如果页面重新加载次数达到 4，则输出 "成功"
    console.log(sum);
    if (sum % 4 == 0) {
        alert("成功");
        // 清除本地存储中的 sum 值
        localStorage.removeItem('sum');
        sum = 1;
        clearInterval(countdownTimer); // 停止倒计时器
    } else {
        // 如果页面重新加载次数未达到 4，则重新加载页面并增加 sum 的值
        sum++;
        localStorage.setItem('sum', sum); // 将新的 sum 存储到 localStorage 中
        location.reload();
    }
    // clearInterval(countdownTimer); // 停止倒计时器
    // 重置倒计时
    timeLeft = 2;
    updateTimer();
});


// 设置定时器，在每秒更新倒计时器
var countdownTimer = setInterval(function () {
    if (timeLeft != 0) {
        console.log("倒计时:"+timeLeft);
        updateTimer();
    } else {
        console.log("失败");
        // 倒计时结束
        clearInterval(countdownTimer);
        // 如果在倒计时结束后仍然没有点击，则输出 "失败"
        if (sum % 4 != 0) {
            alert("失败");
            // 清除本地存储中的 sum 值
            localStorage.removeItem('sum');
            sum = 1;
        }else{
            alert("游戏结束");
        }
    }
}, 1000);
