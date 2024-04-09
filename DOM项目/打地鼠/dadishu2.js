// 获取表格
var table = document.querySelector(".box");
// 获取单元格
var cells = [...table.getElementsByTagName("td")];

// 计时器变量
var timer;
// 获取倒计时显示
var timerDisplay = document.querySelector(".countdown");

// 胜利条件
var winCondition = 3;

// 给每个单元格增加点击监听事件：点击老鼠->老鼠消失->再随机出现老鼠
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        var clickedImg = cell.querySelector("img");
        if (clickedImg && !cell.classList.contains("hidden")) {// 点击了出现的老鼠
            clickedImg.style.display = "none";// 该老鼠消失
            cell.classList.add("hidden"); // 隐藏被点击的老鼠
            clickCount++;// 点击次数+1
            console.log("点击次数" + clickCount);
            if (clickCount >= winCondition) {
                alert("成功");
                initGame(); // 重新开始游戏
            } else {
                show();// 再重新随机显示一只老鼠
            }
        }
    });
});

//------随机显示一只老鼠
function show() {
    // 隐藏所有老鼠
    cells.forEach(function (cell) {
        cell.classList.add("hidden");
    });
    var randomIndex = Math.floor(Math.random() * 9); // 生成一个随机索引，范围为0-8
    cells[randomIndex].classList.remove("hidden"); // 移除hidden=显示老鼠
    console.log("老鼠出现在" + randomIndex);
}

// //------随机显示1-3只老鼠
// function show() {
//     // 隐藏所有老鼠
//     cells.forEach(function (cell) {
//         cell.classList.add("hidden");
//     });

//     // 随机选择1-3个单元格显示老鼠，并添加标记
//     var numMiceToShow = Math.floor(Math.random() * 3) + 1; // 随机选择1-3
//     var shownMice = 0;
//     while (shownMice < numMiceToShow) {
//         var randomIndex = Math.floor(Math.random() * 9); // 生成一个随机索引，范围为0-8
//         if (cells[randomIndex].classList.contains("hidden")) {
//             cells[randomIndex].classList.remove("hidden");
//             cells[randomIndex].classList.add("shown-mouse"); // 添加标记
//             shownMice++;
//         }
//     }
//     console.log("显示了" + numMiceToShow + "只老鼠");
// }

//------开始计时器，判断输赢
function startTimer() {
    var timeLeft = timeLimit; // 剩余时间
    timer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = '倒计时：' + timeLeft + '秒';
        if (timeLeft < 0 && clickCount < winCondition) {// 时间到且点击次数小于获胜条件（3次）
            alert("时间到，失败");
            initGame(); // 重新开始游戏
        }
    }, 1000);
}

//------初始化游戏
function initGame() {
    clickCount = 0;// 点击次数0
    timeLimit = 3;// 倒计时3s

    for (var i = 0; i < cells.length; i++) {
        // 移除单元格内已有的老鼠图片
        // 此处非常重要，因为每次调用initGame()时都向每个单元格添加了新的老鼠图片，
        // 而没有移除之前添加的老鼠图片，导致单元格内老鼠图片的堆叠，最终导致单元格变得越来越大
        var existingImg = cells[i].querySelector("img");
        if (existingImg) {
            cells[i].removeChild(existingImg);
        }

        var img = document.createElement("img");
        img.src = "./image/Mouse5.png";
        img.classList.add('img');// 添加img样式类
        cells[i].appendChild(img);// 添加老鼠图片
    }
    clearInterval(timer); // 清除计时器
    startTimer(); // 开始计时器
    show(); // 随机显示一只老鼠
}

// 初始化游戏
initGame();