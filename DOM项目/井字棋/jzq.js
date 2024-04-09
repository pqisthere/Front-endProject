document.addEventListener("DOMContentLoaded", function () {
    // 游戏的格子
    const cells = document.querySelectorAll('.cell');
    // 游戏结束时显示的消息框
    const endgame = document.querySelector('.endgame');
    // 游戏结束消息内容
    const text = document.querySelector('.endgame .text');
    // 跟踪当前轮到哪个玩家，初始为X
    var currentPlayer = 'X';
    // 游戏是否已经结束，初始没结束
    var gameEnded = false;

    // 给每个格子添加点击监听
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            if (cell.textContent === '' && !gameEnded) {//当前点击的格子为空且游戏未结束
                cell.textContent = currentPlayer;
                if (checkWin()) {
                    endGame(`玩家${currentPlayer}胜利!`);
                } else if (checkDraw()) {
                    endGame("平局!");
                } else {//切换玩家
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });
    

    // 检查胜利
    function checkWin() {
        // 所有可能胜利的情况
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let line of lines) {
            if (cells[line[0]].textContent !== ''
                && cells[line[0]].textContent === cells[line[1]].textContent
                && cells[line[1]].textContent === cells[line[2]].textContent) {
                return true;// 胜利
            }// 三个格子都不为空，且它们的文本内容都相同
        }
        // cells[line[1]].textContent 获取当前组合中的第二个格子的文本内容
        // 第一次迭代[0, 1, 2]；第二次迭代[3, 4, 5]
        return false;// 没有胜利
    }

    // 检查平局
    function checkDraw() {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                return false; // 只要有一个格子为空，就不是平局，返回 false
            }
        }
        return true; // 如果所有格子都被填满，则为平局，返回 true
    }

    // 游戏结束
    function endGame(message) {
        text.textContent = message;// 显示游戏结束的消息
        endgame.style.display = 'block';// 显示游戏结束的提示框
        gameEnded = true;
    }
});
