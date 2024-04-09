// 在页面加载完成后隐藏初始商品
document.addEventListener('DOMContentLoaded', function () {
    var initialProduct = document.querySelector(".unit");
    initialProduct.style.display = 'none';
});

// 增加商品函数
function addProductEventListener(newUnit) {
    var geshu = 0;

    var addButton = newUnit.querySelector(".add");
    var subButton = newUnit.querySelector(".sub");
    var deleButton = newUnit.querySelector(".delete");
    var geshuDisplay = newUnit.querySelector(".geshu");
    var unitPrice = parseFloat(newUnit.querySelector(".jiage").textContent);

    //------➕增加按钮
    addButton.addEventListener('click', function () {
        geshu++;
        // 更新个数展示区域的数字
        geshuDisplay.textContent = geshu;
        // 更新总价
        sum.textContent = zongjia();
    });

    //------➖减少按钮
    subButton.addEventListener('click', function () {
        if (geshu > 0) {
            geshu--;
            geshuDisplay.textContent = geshu;
            sum.textContent = zongjia();
        }
        else {
            alert("已经是0,不能再减少了!");
        }
    });

    //------del删除按钮
    deleButton.addEventListener('click', function () {
        newUnit.remove();
        // 更新总价
        sum.textContent = zongjia();
    });

    //------总价
    sum.textContent = zongjia();
    function zongjia() {
        var zj = 0;
        // 遍历所有的商品
        var unitDisplay = document.querySelectorAll(".unit");
        unitDisplay.forEach(function (unit) {
            var jiage = parseFloat(unit.querySelector(".jiage").textContent);
            var geshu = parseInt(unit.querySelector(".geshu").textContent);
            // 计算总价=个数*价格
            zj += geshu * jiage;
        });
        return zj;
    }
}

// 调用增加商品函数
// 一定要为初始商品添加事件监听器,否则初始商品无法+-del
addProductEventListener(document.querySelector(".unit"));

//------新增商品种类
// 提交按钮
var tijiaoButton = document.querySelector("#tijiao")
tijiaoButton.addEventListener('click', function () {
    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var description = document.querySelector("#description").value;
    // var imageUpload = document.querySelector("#imageUpload").files[0]; // 获取上传的图片文件

    // 克隆之前存在的那个商品
    var unitclone = document.querySelector(".unit").cloneNode(true);

    // 显示克隆的商品
    unitclone.style.display = 'inline-block';

    // // 更新克隆商品的内容
    // if (imageUrl) {
    //     imgElement.src = imageUrl; // 设置图片的 URL
    // } else if (imageUpload) {
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //         imgElement.src = e.target.result; // 使用上传的图片文件
    //     };
    //     reader.readAsDataURL(imageUpload);
    // } else {
    //     imgElement.src = './img/img1.jpg'; // 使用默认图片
    // }
    unitclone.querySelector("p").textContent = name;
    unitclone.querySelector(".jiage").textContent = price;
    unitclone.querySelector(".geshu").textContent = 0;//一定要个数归0,否则会克隆初始商品的个数
    unitclone.querySelector("p:nth-of-type(3)").textContent = "描述" + description;

    // 将新克隆的商品元素添加到页面中
    document.querySelector("#list").appendChild(unitclone);

    // 为新增商品添加事件监听器
    addProductEventListener(unitclone);

    // 更新总价
    sum.textContent = zongjia();

});

