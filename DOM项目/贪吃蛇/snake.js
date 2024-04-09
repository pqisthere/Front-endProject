document.addEventListener('DOMContentLoaded', function () {

    // 获取食物，地图，蛇，得分显示，墙
    var food = document.querySelector('.food');
    var map = document.querySelector('.map');
    var snake = document.querySelector('.snake');
    var scoredisplay = document.querySelector('.score');
    var walls = document.querySelectorAll('.wall1, .wall2, .wall3, .wall4, .wall5, .wall6');

    // 声明变量
    let snakeX; // 蛇的x坐标
    let snakeY; // 蛇的y坐标
    let snakeDirection; // 蛇运动方向
    let score; // 得分

    // 重新开始游戏
    function resetGame() {
        clearInterval(snakeMoveInterval); // 清除移动定时器
        snakeX = 160;
        snakeY = 160;
        snakeDirection = 'right';
        score = 0;
        updateScore();
        generateFood();
        startGame();
    }

    resetGame();

    // 更新分数显示
    function updateScore() {
        scoredisplay.textContent = '得分: ' + score;
    }

    // 生成随机位置的食物
    var foodX, foodY; // 声明全局变量
    function generateFood() {
        foodX = Math.floor(Math.random() * (map.offsetWidth / 20)) * 20;
        foodY = Math.floor(Math.random() * (map.offsetHeight / 20)) * 20;
        //虽然/20*20看似没变化，但实际上，如果删掉了这里，食物的位置不会严丝合缝在“格子”上，而是会有所偏移
        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
        food.style.display = 'block'; // 让食物作为一个块级元素显示
        // 一定要让食物显示，因为蛇碰到食物后，食物被隐藏了
    }

    // 定时器，持续地让蛇向当前移动方向移动
    var snakeMoveInterval;

    // 开始游戏
    function startGame() {
        snakeMoveInterval = setInterval(function () {
            // 根据蛇的移动方向移动蛇的位置
            // 左上角是原点，向右是 X 轴正方向，向下是 Y 轴正方向
            if (snakeDirection === 'left' && snakeX > 0) {
                snakeX -= 20; // 向左移动20px
            } else if (snakeDirection === 'up' && snakeY > 0) {
                snakeY -= 20; // 向上移动20px
            } else if (snakeDirection === 'right' && snakeX < map.offsetWidth - 20) {
                snakeX += 20; // 向右移动20px
            } else if (snakeDirection === 'down' && snakeY < map.offsetHeight - 20) {
                snakeY += 20; // 向下移动20px
            } else {
                // 蛇撞到了地图边界，游戏失败
                var restart = confirm('游戏失败！你的得分是： ' + score + ' 是否重新开始？');
                if (restart) {
                    resetGame();
                }
                return; // 结束函数
            }

            // 更新蛇的位置
            snake.style.left = snakeX + 'px';
            snake.style.top = snakeY + 'px';

            // 检查是否吃到了食物
            if (snakeX === foodX && snakeY === foodY) {
                food.style.display = 'none'; // 食物消失
                generateFood(); // 生成新的食物
                score += 5; // 增加分数
                updateScore(); // 更新分数显示
            }

            // 检查是否撞墙
            if (isSnakeCollidingWithWall(snakeX, snakeY)) {
                var restart = confirm('游戏失败！你的得分是： ' + score + ' 是否重新开始？');
                if (restart) { // 重新开始
                    resetGame();
                }
                return; // 不重新开始，则结束函数
            }

        }, 500); // 每隔500ms移动一次
    }

    // 开始游戏
    startGame();

    // 键盘事件监听器，控制蛇的移动方向
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 37 && snakeDirection !== 'right') { // 左箭头键
            snakeDirection = 'left';
        } else if (event.keyCode === 38 && snakeDirection !== 'down') { // 上箭头键
            snakeDirection = 'up';
        } else if (event.keyCode === 39 && snakeDirection !== 'left') { // 右箭头键
            snakeDirection = 'right';
        } else if (event.keyCode === 40 && snakeDirection !== 'up') { // 下箭头键
            snakeDirection = 'down';
        }
    });

    // 检查是否撞墙
    function isSnakeCollidingWithWall(snakeX, snakeY) {
        // 定义蛇的矩形边界框对象，包含蛇头的位置 (x, y) 和蛇的宽度和高度
        var snakeRect = {
            x: snakeX, // 蛇的横坐标
            y: snakeY, // 蛇的纵坐标
            width: 20, // 蛇的宽度
            height: 20 // 蛇的高度
        };

        // ！！！重点！！！
        // 遍历墙数组，检查蛇是否与墙发生碰撞
        for (var i = 0; i < walls.length; i++) {
            // 获取当前墙
            var wall = walls[i];
            var wallRect = {
                // 墙的位置 (x, y) 
                x: wall.offsetLeft,
                // 墙体元素左侧边缘相对于其最近的定位祖先元素的偏移量，并将其作为墙体的 x 坐标
                y: wall.offsetTop,
                // 墙体元素顶部边缘相对于其最近的定位祖先元素的偏移量，并将其作为墙体的 y 坐标
                // 墙的宽高
                width: wall.offsetWidth,
                height: wall.offsetHeight
            };

            // 检查蛇的边界框是否与当前墙的边界框相交
            if (snakeRect.x < wallRect.x + wallRect.width &&
                snakeRect.x + snakeRect.width > wallRect.x &&
                snakeRect.y < wallRect.y + wallRect.height &&
                snakeRect.y + snakeRect.height > wallRect.y) {
                return true; // 发生碰撞
            }
            // 蛇的左边界 小于 墙的右边界，蛇在墙的右侧（蛇从右往左撞墙）
            // 蛇的右边界 大于 墙的左边界，蛇在墙的左侧（蛇从左往右撞墙）
            // 蛇上边界的 小于 墙的下边界，蛇在墙的上侧（蛇从下往上撞墙）
            // 蛇下边界的 大于 墙的上边界，蛇在墙的上侧（蛇从上往下撞墙）
        }
        return false; // 未发生碰撞
    }
});
