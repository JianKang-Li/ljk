CSS动画基础-浮生阁阁主# CSS3 学习

# 1 浏览器内核及其前缀

|    内核     |      前缀      | 浏览器                                                       |
| :---------: | :------------: | :----------------------------------------------------------- |
|  Gecko内核  |  前缀为-moz-   | 火狐浏览器                                                   |
| Webki t内核 | 前缀为-webkit- | 也叫谷歌内核，chrome浏览器最先开发使用，safari浏览器也使用该内核。国内很多浏览器也使用了webkit内核，如360极速、世界之窗、猎豹等 |
| Trident内核 |   前缀为-ms-   | 也称IE内核                                                   |
| Presto内核  |    前缀-o-     | 目前只有opera采用                                            |

# 2 CSS3 定义了两种类型的渐变（gradients)

线性渐变(Linear Gradients)

径向渐变(Radial Gradients)

1.线性渐变(Linear Gradients)-向下/向上/向左/向右/对角方向
background: linear gradient(direction,color-stop 1,color-stop 2,... );
2.径向渐变(Radial Gradients) -由它们的中心定义
background: radial-gradient(center shape  size,start-color,... ,last-color);
默认情况下，渐变的中心是center（表示在中心点），渐变的形状是ellipse（表示椭圆形)
它可以是值 circle 或ellipse。其中，circle 表示圆形，ellipse表示椭圆形

中心：（at center center）

+ 语法：（at x y）都是从左上角原点为参考点

+ x,y可以是像素或百分比





   大小

+ 最近边 closest-side

+ 最远边 farthest-side

+ 最近角 closest-corner

+ 最远角 farthest-corner



   形状

+ ellipse 椭圆 默认

+ circle 圆



# 3 Transform 属性

# 1 转换Transform2D的属性

通常的属性包含了属性名和属性值，而CSS3的transform属性是用函数来定义
的。Transform 2D的数包括了translate()、scale()、rotate()和skew()。
书写格式:
transform:函数名(x轴值,y轴值);

## 1.translate()函数

translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动。接受CSS的标准度量单位（px)translate(x, y):转换，沿着X和Y轴移动元素。

## 2.rotate()

通过 rotate()方法，元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。它以deg为单位，代表了旋转的角度。

## 3.scale()

通过值把宽和高转换为原始尺寸的n倍，接受两个参数，前面的为宽，后面的为高。

可取值:

+ 默认值为1
+ 缩小:0-1之间的数
+ 放大:大于1的数

## 4.skew ()

根据水平轴和垂直轴翻转，接受两个或一个值，两个值时前面为水平，后面为垂直的角度，一个值只是水平轴的角度。此函数是指元素的倾斜角度。



# 2 转换Transform 3D的属性

Transform 3D常用函数有:

| 函数                  | 含义                                  |
| --------------------- | ------------------------------------- |
| translate3d(x,y,z)    | 定义3D转化。                          |
| translateX(x)         | 定义3D转化，仅使用用于X轴的值。       |
| translateY(y)         | 定义3D转化，仅使用用于轴的值。        |
| translateZ(z)         | 定义3D,转化，仅使用用于Z轴的值。      |
| scale3d(x,y ,z)       | 定义3D缩放转换。                      |
| scaleX(x)             | 定义3D缩放转换，通过给定一个X轴的值。 |
| scaleY(y)             | 定义3D缩放转换，通过给定一个Y轴的值。 |
| scaleZ(z)             | 定义3D缩放转换，通过给定一个Z轴的值。 |
| rotate3d(x,y,z,angle) | 定义3D旋转。                          |
| rotatex(angle)        | 定义沿X轴的3D旋转。                   |
| rotateY(angle)        | 定义沿Y轴的3D旋转。                   |
| rotateZ(angle)        | 定义沿Z轴的3D旋转。                   |



# 3 过渡Transition

## 1什么是过渡

使用css的属性值在一段时间内平滑的过渡
比如，鼠标悬停后，背景色在1s内，由白色平滑的过渡到红色

+ 1）指定四个要素:
  过渡属性，如background、color等

  过渡所需时间
  过渡函数，即过渡的速度、方式等

  过渡延迟时间，表示开始执行的时间

+ 2）触发过渡
  通过用户的行为触发，如点击、悬浮等



## 2.过渡属性

transition-property: none | all |property ;

多个属性用逗号隔开
可设置过渡的属性

+ 颜色属性
+ 取值为数值的属性
+ 转换属性
+ 渐变属性
+ 阴影属性

## 3.过渡时间

transition-duration: s ms;
默认值为0，意味着不会有效果，所以必须设置transition-duration属性

## 4.过渡函数

transition-timing-function: ;

取值:

+ ease:默认值，规定慢速开始，然后变快，然后慢速结束的过渡效果
+ linear:匀速
+ ease-in:规定以慢速开始，加速效果
+ ease-out:规定以慢速结束，减速效果
+ ease-in-out:规定以慢速开始和结束，先加速后减速效果



## 5.过渡延迟

transition-delay: s ms;
改变元素属性值后多长时间开始执行过渡效果



## 6.简写属性transition

transition属性是一个简写属性，用于设置四个过渡属性
语法:transition:property duration timing function delay;





# 4 animation动画

过渡属性只能模拟动画效果

+ animation属性可以制作类似Flash动画
+ 通过关键帧控制动画的每一步
+ 使元素从一种样式逐渐变化为另一种样式
+ 实现复杂的动画效果



## 1.@keyframes

作用:用于声明动画，指定关键帧

帧，

+ 用于分解动画动作
+ 每个帧代表某个时间点
+ 定义每个帧上的动作

@keyframes的语法
@key frames name {

   from l 0% {
   css样式
   }

   percent {
   css样式

   }

   to| 100%{
   css样式
   }

}



## 2.animation属性

animation属性用于控制动画

+ 调用由@keyframes定义的动画

+ 设置动画属性，如时间、次数等

  animation属性是一个简写属性
  语法为: animation:name duration timing-function delay iteration-count direction;





## 3.动画子属性

| 属性                                         | 描述                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| animation-name: ;                            | 调用动画，规定需要和keyframes的名字一致                      |
| animation-duration: s ms;                    | 动画完成一个周期所需要的时间                                 |
| animation-timing-function: ;                 | 规定动画的速度变化类型                                       |
| animation-delay : s ms ;                     | 播放之前的延迟时间                                           |
| animation-iteration-count :数值\|  infinite; | 播放次数 infinite表示无限次播放                              |
| animation-direction: normal \|alternate;     | 动画播放方向normal为默认值，表示正常播放alternate表示轮流播放，即动画会在奇数次正常播放，而在偶数次向后播放 |
| animation fill-mode: forwards;               | 动画停在最后一帧 默认值为none                                |
| animation-play-state: paused \| running;     | 属性规定动画正在运行还是暂停默认值为running                  |
