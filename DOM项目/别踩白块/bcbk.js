document.addEventListener('DOMContentLoaded', function () {
    //获取容器和主容器元素
    var container = document.getElementById("container");
    var main = document.getElementById("main");

    // 获取开始游戏按钮
    // var startButton = document.getElementById("startbt");

    var rowCount = 50;//方块行数
    var initialTop = -5000;// 初始位置距离页面顶部的高度=rowCount * cell.width

    var blackBlocks = [];//存储黑块的数组
    var gameStart = false;//游戏开始标志
    var intervalID;//定时器

    var score;//分数
    var scoreDisplay = document.getElementById("scoreDisplay");//分数显示

    var audioPlayer = document.getElementById("audioPlayer");//点击音效

    //------更新分数
    function updateScore() {
        score += 5; //点一次黑块加5分

        if (score < 10) {
            scoreDisplay.textContent = "分数: 00" + score;
        }
        else if (score < 100) {
            scoreDisplay.textContent = "分数: 0" + score;
        }
        else {
            scoreDisplay.textContent = "分数: " + score;
        }
        //最原始的方法保证分数是三位数，因为肯定玩不到1000分
    }

    //------点击开始游戏按钮，游戏开始
    document.getElementById("startbt").addEventListener("click", function () {
        startGame(); // 调用开始游戏函数
    });


    //------点击黑块则变白，并更新得分
    function clickBlackBlock() {
        if (this.classList.contains("cellblack")) {

            audioPlayer.play();

            //添加放大渐变消失动画
            this.style.animation = "grow 0.4s forwards";
            //将当前元素应用名为 "grow" 的动画，持续0.4秒，并且动画执行完毕后保持最终状态（不回到初始状态）

            this.classList.remove("cellblack");//移除该黑块
            // this.classList.add("cellwhite");
            //之前写的是把黑块变成白块，而不是移除黑块，会出现：
            //黑块变白块后，再点击该白块，又变黑块，需要设置clicked棋子，很麻烦，还是直接移除的好

            var index = blackBlocks.indexOf(this);
            if (index !== -1) {
                blackBlocks.splice(index, 1);//清除 已点击黑块 在 blackBlocks中的索引
            }
            updateScore();//更新分数
        }
    }

    //------生成初始黑块的索引
    function generateInitialBlackIndices() {
        var indices = [];//存储黑块的索引位置
        var blackCount = Math.floor(Math.random() * 3 + 1);//黑块个数1-3（没有4，一行全黑太难了）
        for (var i = 0; i < blackCount; i++) {
            var index = Math.floor(Math.random() * 4);//黑块索引位置
            indices.push(index);
        }
        return indices;
    }

    //------生成一行黑白块（包含四个块，四个块里有随机个数的黑块）
    function createRow() {
        var row = document.createElement("div");//一行方块
        row.className = "row";//这行方块的类名叫row
        var init = generateInitialBlackIndices();//返回包含了随机生成的初始黑块索引的数组
        for (var i = 0; i < 4; i++) {//一行内的四个方块迭代
            var cell = document.createElement("div");//小方块
            cell.className = "cell";
            if (init.includes(i)) {// 是否为黑块索引
                cell.classList.add("cellblack");//是黑块索引，就变成黑块
                cell.addEventListener("click", clickBlackBlock);//点击黑块变白块
                blackBlocks.push(cell);//把黑块加到blackBlocks数组
            }
            row.appendChild(cell);//将创建的方块元素添加到当前行
        }
        return row;
    }

    //------生成所有黑白块
    function geneRows() {
        for (var i = 0; i < rowCount; i++) {
            container.appendChild(createRow());
        }
        console.log("已生成黑白块");
    }

    //------重置函数
    function resetGame() {
        // 清除容器中的所有方块元素
        container.innerHTML = '';
        score = 0;
        var diff = document.getElementById("difficulty");
        if (diff.value === "easy") {
            speed = 3;
        } else if (diff.value === "medium") {
            speed = 5;
        } else if (diff.value === "hard") {
            speed = 7;
        }
        console.log(speed);
        // 重新生成方块行
        geneRows();
    }

    //------开始游戏
    function startGame() {
        resetGame();

        // 将容器移动到初始位置
        container.style.top = initialTop + "px";

        //------方块下落、判断游戏结束
        function moveContainerDown() {
            // 获取当前容器的 top 值
            var top = parseInt(container.style.top) || initialTop;
            // 更新容器的 top 值，使容器向下移动
            container.style.top = top + speed + "px";

            //获取 main 的底部位置： main 元素顶部距离文档顶部的偏移量加上 main 元素自身的可见高
            var mainBottom = main.offsetTop + main.clientHeight;
            //遍历所有的黑块，任一黑块的底部>=main的底部，则游戏结束
            for (var i = 0; i < blackBlocks.length; i++) {
                if (blackBlocks[i].getBoundingClientRect().bottom >= mainBottom + 15) {
                    //bla...tom 是黑块元素相对于浏览器窗口顶部的距离加上其自身的高度=黑块元素底部距离浏览器窗口顶部的距离
                    //我也不知道为什么要+15，如果不+，那么黑块离底部还有一段距离的时候就会判断游戏结束
                    gameOver();
                    return; //结束函数，避免继续执行下面的代码
                }
            }
        }
        //一定要清除之前的定时器，否则速度会叠加，越来越快
        clearInterval(intervalID);
        //每隔20毫秒调用下落函数，实现容器持续向下移动
        intervalID = setInterval(moveContainerDown, 20);
    }

    //------游戏结束
    function gameOver() {
        gameStart = false;
        var restart = confirm("游戏结束！您的得分是：" + score + " 分。是否重新开始？");
        if (restart) {
            startGame();
        } else {
            alert("掰掰");
        }
    }

});
