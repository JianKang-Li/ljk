# Canvas

## 认识Canvas

+ canvas 是html5新增的标签使用js绘制图形
+ 浏览器支持情况: ie8+标准浏览器
+ HTML5的canvas元素使用JavaScript在网页上绘制图像。
+ 画布是一个矩形区域，您可以控制其每一像素。
+ canvas拥有多种绘制路径、矩形、园形、字符以及添加图像的方法

## canvas标签

+ canvas画布容器默认尺寸300*150
+ 可通过属性width和height设置画布的宽高(不要通过css方式设置画布的宽高,因为css方式设置宽高不会增加画布内的像素点个数,只会将每一个像素点放大)

```html
<canvas width="600" height="400" id="canvas"></canvas>
```

## canvas上下文对象

```js
// 获取画布
const canvas = document.querySelector("#canvas")
// 获取画布上下文对象
const context = canvas.getContext("2d")
// console.log(context)

// 设置线条起点
context.moveTo(10, 10);
// 设置线条终点
context.lineTo(510, 10);
// 设置线条颜色
context.strokeStyle = "red"
// 设置粗细
context.lineWidth = 10
// 绘制线条(通过描边的方式绘图)
context.stroke()
```

## 线条操作

+ moveTo(x,y) //把路径移动到画布中的指定点,不创建线条。起点
+ lineTo(x,y) //添加一个新点,绘制一条从当前位置到指定新点(x,y)位置的直线。终点/拐点
+ strokeStyle //设置或返回描边颜色
+ fillStyle //设置或返回填充颜色
+ stroke() //描边已定义绘图<路径>
+ fill() //填充当前绘图(路径)
+ lineWidth //设置或返回当前的线条宽度。执行指定数值即问。不能带单位
+ lineJoin //设置或返回两条线相交时，所创建的拐角类型，可选值: miter round bevel
+ lineCap  //设置或返回线条的结束端点样式，可选值: butt round square

**起点使用moveTo()，其他使用lineTo()**

```js
// 开启一个独立作用域
context.beginPath();
```

## 绘制矩形

```js
const context = document.querySelector("#canvas").getContext('2d')

context.moveTo(20, 20);
context.lineTo(100, 20);
context.lineTo(100, 100);
context.lineTo(20, 100);
// 手动
// context.lineTo(20, 20);
// 自动闭合,连接起点和终点
context.closePath();
context.stroke();
```

```js
context.rect(20, 20, 100, 200);
//空心,描边
context.stroke()
//实心
context.fillStyle="red"
context.fill()
```

```js
context.strokeRect(20, 20, 100, 200);

context.fillRect(20,20,100,200)
```

## 绘制圆，圆弧和扇形

```js
const context = document.querySelector("#canvas").getContext('2d')
// 绘制圆，x,y为圆心坐标，radius为半径，Math.PI / 180 * startAngle起始弧度,Math.PI / 180 * endAngle终止弧度，anticlockwise是否逆时针(boolean)
context.arc(100, 100, 80, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
context.stroke();
```

```js
//绘制弧线
const context = document.querySelector("#canvas").getContext('2d')
// 绘制圆，x,y为圆心坐标，radius为半径，Math.PI / 180 * startAngle起始弧度,Math.PI / 180 * endAngle终止弧度，anticlockwise是否逆时针(boolean)
context.arc(100, 100, 80, Math.PI / 180 * 0, Math.PI / 180 * 90, false);
context.stroke();
```

```js
//绘制扇形
//方法1
const context = document.querySelector("#canvas").getContext('2d')
// 绘制圆，x,y为圆心坐标，radius为半径，Math.PI / 180 * startAngle起始弧度,Math.PI / 180 * endAngle终止弧度，anticlockwise是否逆时针(boolean)
context.moveTo(100, 100);
context.arc(100, 100, 80, Math.PI / 180 * 0, Math.PI / 180 * 90, false);
context.closePath();
context.stroke();


//方法2
const context = document.querySelector("#canvas").getContext('2d')
// 绘制圆，x,y为圆心坐标，radius为半径，Math.PI / 180 * startAngle起始弧度,Math.PI / 180 * endAngle终止弧度，anticlockwise是否逆时针(boolean)
context.arc(100, 100, 80, Math.PI / 180 * 0, Math.PI / 180 * 90, false);
context.moveTo(100, 100);
context.closePath();
context.stroke();
```

**context.closePath();自动闭合**

## 绘制椭圆

```js
const context = document.querySelector("#canvas").getContext('2d')
// 坐标，水平半径，垂直半径，旋转角度，起始弧度，终止弧度，顺逆时钟
context.ellipse(200, 200, 100, 200, 0, 0, 360 * Math.PI / 180, false)
context.stroke();
```

**弧度：Math.PI / 180 * 角度**

## 绘制文本

```js
//设置样式
context.font = '40px 宋体';
context.textAlign = 'start | left | center | right |end';

context.strokeText("你好", 30, 70, 300);

//基本使用
ctx.fillText(文字,x,y,maxWidth)
ctx.strokeText(文字,x,y,maxWidth)
```

## 绘制图片

```js
const context = document.querySelector("#canvas").getContext("2d")
// image:图片对象；dx，dy:图片左上角坐标；width:宽度；height:高度
const img = new Image()
img.src = "./imgs/c260f7ably1fh5ryn0tirj20ku0v9wi6.jpg"
img.onload = function () {
    context.drawImage(img, 0, 0, 300, 400);
}
```

### 剪切图像

```js
//sx,sy:剪切位置；swidth，sheight：被剪切图像的宽度；x,y:放置图片的位置；width，height：图像宽高
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
```

## 贝塞尔曲线

应用场景

加入购物车，qq消息气泡拖拽，点赞的飘心动画，翻书效果，xmind联系功能

```js
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d")
ctx.strokeStyle = "#b538b7";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(40, 350);
// 控制点，终点；二次贝塞尔曲线
ctx.quadraticCurveTo(300, 100, 466, 374);
ctx.stroke();
ctx.closePath();
```

三次贝塞尔曲线

```js
//第一个控制点，第二个控制点，终点坐标
ctx.bezierCurveTo(351, 501, 380, 1, 542, 312)
```

## canvas渐变

**使用场景**

处理图表，处理文字，处理图片，用作背景、

### 线性渐变

```js
createLinearGradient 线性渐变
```

```js
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
// 创建线性渐变：起始坐标，结束坐标
var lg = ctx.createLinearGradient(0, 0, 200, 0);

// 添加渐变色
// lg.addColorStop(位置(小数),填充颜色)
lg.addColorStop(0, 'red');
lg.addColorStop(0.3, 'pink')
lg.addColorStop(0.5, 'blue')
lg.addColorStop(0.8, 'yellow')
lg.addColorStop(1, 'green')

ctx.fillStyle = lg;
ctx.fillRect(0, 0, 200, 200);
```

### 放射性渐变

```js
createRadialGradient放射性渐变
```

```js
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
// 创建线性渐变：起始坐标，结束坐标
var rg = ctx.createRadialGradient(50, 300, 50, 300, 300, 300);

// 添加渐变色
// lg.addColorStop(位置(小数),填充颜色)
rg.addColorStop(0, 'red');
rg.addColorStop(0.3, 'pink')
rg.addColorStop(0.5, 'blue')
rg.addColorStop(0.8, 'yellow')
rg.addColorStop(1, 'green')
ctx.arc(300, 300, 300, 0 / 180 * Math.PI, 360 / 180 * Math.PI)

ctx.fillStyle = rg;
ctx.fill();
```

## 转换和变形

### 旋转rotate

**以画布左上角为中心**

```js
ctx.rotate(弧度)
```

### 缩放scale

```js
ctx.scale(水平缩放比例，垂直缩放比例)
```

### 平移translate

```js
ctx.translate(水平方向偏移量,垂直方向偏移量)
```

### 变形transform

```js
ctx.transform(a,b,c,d,e,f)
```

| 参数 | 描述         |
| ---- | ------------ |
| a    | 水平缩放绘图 |
| b    | 水平倾斜绘图 |
| c    | 垂直倾斜绘图 |
| d    | 垂直缩放绘图 |
| e    | 水平移动绘图 |
| f    | 垂直移动绘图 |

## canvas状态

> 在绘制图形时，难免会重复使用某个样式，甚至有时会在不同颜色之间来回切换。那么为了减少代码冗余，我们可以调用画布中的save()方法，来帮我们保存一些样式和属性，这样我们就可以再通过调用restore()方法，来再次使用这些我们曾保存好的样式和属性了!

```js
//将当前的绘制属性存储起来
context.save()
//还原之前的绘制属性
context.restore()
```

## 清除画布

+ context.clearRect(x,y,width,height)
+ 重新设置画布的大小（清空画布内部所有图形）

## toDataURL()

toDataURL()是canvas对象的一种方法，用于将canvas对象转换为base64位编码；

toDataURL()方法的两个参数：

```js
toDataURL(type, encoderOptions)
```

- `type`指定转换为base64编码后图片的格式，如：`image/png`、`image/jpeg`、`image/webp`等等，默认为`image/png`格式；
- `encoderOptions`用于设置转换为base64编码后图片的质量，取值范围为0-1，超出取值范围用默认值0.92代替；

实现下载

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>test</title>
  <style>
    canvas {
      border: 1px solid #eee;
    }
  </style>
</head>

<body>

  <canvas id="canvas" width="200" height="100"></canvas>
  <button onclick="down()">保存</button>
  <script>
    const canvas = document.querySelector("#canvas")

    let context = canvas.getContext('2d');

    context.moveTo(100, 10);

    context.lineTo(100, 100);

    context.stroke();

    function down() {
      let url = canvas.toDataURL("image/png");
      var oA = document.createElement("a");
      oA.download = 'test';// 设置下载的文件名，默认是'下载'
      oA.href = url;
      document.body.appendChild(oA);
      oA.click();
      oA.remove(); // 下载之后把创建的元素删除
    }


  </script>
</body>

</html>
```



