# CSS

## 选择器

### id选择器

`#id`

### class选择器

`.class`

### 分组和嵌套选择器

分组：`h1,h2`

嵌套：`p.class`

### 组合选择器

在 CSS3 中包含了四种组合方式:

- 后代选择器(以空格   分隔)（子孙）
- 子元素选择器(以大于 **>** 号分隔）（直接子类）
- 相邻兄弟选择器（以加号 **+** 分隔）（相邻且同父）
- 普通兄弟选择器（以波浪号 **～** 分隔）（所有兄弟）

### 属性选择器

`[title]`

### 属性和值选择器

`[title=runoob]`

### 属性和值的选择器 - 多值

`[title~=hello]`(单词单独存在)

`[lang|=en]`(以en开头)

## 创建

### 外部

```html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

### 内部

```html
<head>
<style>
hr {color:sienna;}
p {margin-left:20px;}
body {background-image:url("images/back40.gif");}
</style>
</head>
```

### 内联

```html
<p style="color:sienna;margin-left:20px">这是一个段落。</p>
```

### 优先级

`（内联样式）Inline style > （内部样式）Internal style sheet >（外部样式）External style sheet > 浏览器默认样式`

### 优先级顺序

下列是一份优先级逐级增加的选择器列表：

- 通用选择器（*）
- 元素(类型)选择器
- 类选择器
- 属性选择器
- 伪类
- ID 选择器
- 内联样式

```p
内联样式 > id 选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 伪元素选择器
```

### !important 规则例外

当 !important 规则被应用在一个样式声明中时,该样式声明会覆盖CSS中任何其他的声明, 无论它处在声明列表中的哪里. 尽管如此, !important规则还是与优先级毫无关系.使用 !important 不是一个好习惯，因为它改变了你样式表本来的级联规则，从而使其难以调试。

一些经验法则：

- **Always** 要优化考虑使用样式规则的优先级来解决问题而不是 `!important`
- **Only** 只在需要覆盖全站或外部 css（例如引用的 ExtJs 或者 YUI ）的特定页面中使用 `!important`
- **Never** 永远不要在全站范围的 css 上使用`!important`
- **Never** 永远不要在你的插件中使用 `!important`

### CSS specifity(css权重)

1. 内联样式表的权值最高 1000；

2. ID 选择器的权值为 100

3. Class 类选择器的权值为 10

4. HTML 标签选择器的权值为 1

### CSS 优先级法则

- 选择器都有一个权值，权值越大越优先；
- 当权值相等时，后出现的样式表设置要优于先出现的样式表设置；
- 创作者的规则高于浏览者：即网页编写者设置的CSS 样式的优先权高于浏览器所设置的样式；
- 继承的CSS 样式不如后来指定的CSS 样式；
- 在同一组属性设置中标有“!important”规则的优先级最大；

## 背景(background)

CSS 属性定义背景效果:

- background-color（背景颜色）
- background-image（背景图片）
- background-repeat（水平或垂直平铺）
- background-attachment（是否固定）
- background-position（改变图像在背景中的位置）

当使用简写属性时，属性值的顺序为：:

- background-color
- background-image
- background-repeat
- background-attachment
- background-position

## 文本格式(text)

### 文本颜色

`color`

### 文本对齐方式

`text-align`

- center
- left
- right
- justify

### 文本修饰

`text-decoration`

- none
- overline
- line-through
- underline

### 文本转换

`text-transform`

- uppercase（大写）
- lowercase（小写）
- capitalize（单词首字母大写）

### 文本缩进

`text-indent`

| 属性            | 描述                     |
| :-------------- | :----------------------- |
| color           | 设置文本颜色             |
| direction       | 设置文本方向。           |
| letter-spacing  | 设置字符间距             |
| line-height     | 设置行高                 |
| text-align      | 对齐元素中的文本         |
| text-decoration | 向文本添加修饰           |
| text-indent     | 缩进元素中文本的首行     |
| text-shadow     | 设置文本阴影             |
| text-transform  | 控制元素中的字母         |
| unicode-bidi    | 设置或返回文本是否被重写 |
| vertical-align  | 设置元素的垂直对齐       |
| white-space     | 设置元素中空白的处理方式 |
| word-spacing    | 设置字间距               |

## fonts

### 字型

- 通用字型

- 特定字型

### 字体

font-family 属性设置文本的字体系列

### 字体样式

这个属性有三个值：

- 正常 - 正常显示文本（normal）
- 斜体 - 以斜体字显示的文字(italic)
- 倾斜的文字 - 文字向一边倾斜（和斜体非常类似，但不太支持）(oblique)

### 字体大小

`font-size`

**16px=1em**

| Property     | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| font         | 在一个声明中设置所有的字体属性                               |
| font-family  | 指定文本的字体系列                                           |
| font-size    | 指定文本的字体大小                                           |
| font-style   | 指定文本的字体样式                                           |
| font-variant | 以小型大写字体或者正常字体显示文本。                         |
| font-weight  | 指定字体的粗细。(normal,bold,bolder,lighter,inherit(继承父元素)) |

## 链接(a)

### 这四个链接状态是

- a:link - 正常，未访问过的链接
- a:visited - 用户已访问过的链接
- a:hover - 当用户鼠标放在链接上时
- a:active - 链接被点击的那一刻

### 当设置为若干链路状态的样式，也有一些顺序规则

- a:hover 必须跟在 a:link 和 a:visited后面
- a:active 必须跟在 a:hover后面

## 列表（ul,ol）

### 列表项标记

`list-style-type`(circle,square,upper-roman,lower-alpha)

`list-style-image`

简写可以按顺序设置如下属性：

- list-style-type
- list-style-position (有关说明，请参见下面的CSS属性表)
- list-style-image

| 属性                | 描述                                               |
| :------------------ | :------------------------------------------------- |
| list-style          | 简写属性。用于把所有用于列表的属性设置于一个声明中 |
| list-style-image    | 将图像设置为列表项标志。                           |
| list-style-position | 设置列表中列表项标志的位置。                       |
| list-style-type     | 设置列表项标志的类型。                             |

## 表格(table)

- border
- border-collapse(折叠边框)

## 盒子模型

所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

从外到内

- Margin
- border
- padding
- contentborder

margin属性可以有一到四个值。

- margin:25px 50px 75px 100px;
  - 上边距为25px
  - 右边距为50px
  - 下边距为75px
  - 左边距为100px
- margin:25px 50px 75px;
  - 上边距为25px
  - 左右边距为50px
  - 下边距为75px
- margin:25px 50px;
  - 上下边距为25px
  - 左右边距为50px
- margin:25px;
  - 所有的4个边距都是25px

Padding属性，可以有一到四个值。

 **padding:25px 50px 75px 100px;**

- 上填充为25px
- 右填充为50px
- 下填充为75px
- 左填充为100px

 **padding:25px 50px 75px;**

- 上填充为25px
- 左右填充为50px
- 下填充为75px

 **padding:25px 50px;**

- 上下填充为25px
- 左右填充为50px

 **padding:25px;**

- 所有的填充都是25px

## 边框（border）

### 边框样式

**border-style**属性用来定义边框的样式

- none: 默认无边框

- dotted: 定义一个点线边框

- dashed: 定义一个虚线边框

- solid: 定义实线边框

- double: 定义两个边框。 两个边框的宽度和 border-width 的值相同

- groove: 定义3D沟槽边框。效果取决于边框的颜色值

- ridge: 定义3D脊边框。效果取决于边框的颜色值

- inset:定义一个3D的嵌入边框。效果取决于边框的颜色值

- outset: 定义一个3D突出边框。 效果取决于边框的颜色值

**border-style:dotted solid double dashed;**(上右底左)

- 上边框是 dotted
- 右边框是 solid
- 底边框是 double
- 左边框是 dashed

**两个参数（上底，右左）**

**三个参数（上，右左，底）**

你可以在"border"属性中设置：

- border-width
- border-style (required)
- border-color

## 轮廓（outline）

- outline
  - outline-color
  - outline-style
  - outline-width
  - inherit
- outline-color
- outline-style
  - none
  - dotted
  - dashed
  - solid
  - double
  - groove
  - ridge
  - inset
  - outset
  - inherit
- outline-width
  - thin
  - medium
  - thick
  - length
  - inherit

## 尺寸属性

| 属性        | 描述                 |
| :---------- | :------------------- |
| height      | 设置元素的高度。     |
| line-height | 设置行高。           |
| max-height  | 设置元素的最大高度。 |
| max-width   | 设置元素的最大宽度。 |
| min-height  | 设置元素的最小高度。 |
| min-width   | 设置元素的最小宽度。 |
| width       | 设置元素的宽度。     |

## display visibility

隐藏一个元素可以通过把display属性设置为"none"，或把visibility属性设置为"hidden"。但是请注意，这两种方法会产生不同的结果。

visibility:hidden可以隐藏某个元素，但隐藏的元素仍需占用与未隐藏之前一样的空间。也就是说，该元素虽然被隐藏了，但仍然会影响布局。

**块级元素主要有：**

- address , blockquote , center , dir , div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , isindex , menu , noframes , noscript , ol , p , pre , table , ul , li

**内联元素主要有：**

- a , abbr , acronym , b , bdo , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup ,textarea , tt , u , var

**主要用的CSS display样式**

- display:block -- 显示为块级元素

- display:inline -- 显示为内联元素

- display:inline-block -- 显示为内联块元素，表现为同行显示并可修改宽高内外边距等属性

## 定位（position）

position 属性的五个值：

- static

  - 即没有定位，遵循正常的文档流对象。

  - 静态定位的元素不会受到 top, bottom, left, right影响。

- relative

  - 相对定位元素的定位是相对其正常位置
  - 移动相对定位元素，但它原本所占的空间不会改变

  - 相对定位元素经常被用来作为绝对定位元素的容器块。

- fixed

  - 元素的位置相对于浏览器窗口是固定位置。

  - 即使窗口是滚动的它也不会移动：

- absolute

  - 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`
  - absolute 定位使元素的位置与文档流无关，因此不占据空间。
  - absolute 定位的元素和其他元素重叠。

- sticky

  - 基于用户的滚动位置来定位
  - 元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。
  - 这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

## overflow

overflow属性有以下值：

| 值      | 描述                                                     |
| :------ | :------------------------------------------------------- |
| visible | 默认值。内容不会被修剪，会呈现在元素框之外。             |
| hidden  | 内容会被修剪，并且其余内容是不可见的。                   |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit | 规定应该从父元素继承 overflow 属性的值。                 |

**注意:**overflow 属性只工作于指定高度的块元素上。

**注意:** 在 OS X Lion ( Mac 系统) 系统上，滚动条默认是隐藏的，使用的时候才会显示 (设置 "overflow:scroll" 也是一样的)。

## float

**清除浮动 - 使用 clear**

## 布局（水平垂直对齐）

### 元素居中对齐

- `margin：auto`**注意:** 如果没有设置 **width** 属性(或者设置 100%)，居中对齐将不起作用。

### 文本居中对齐

- **text-align: center;**

### 图片居中对齐

- 要让图片居中对齐, 可以使用 **margin: auto;** 并将它放到 **块** 元素中

### 左右对齐 - 使用定位方式

```css
 position: absolute;
 right: 0px;
```

### 左右对齐 - 使用 float 方式

```css
float: right;
```

**我们可以在父元素上添加 overflow: auto; 来解决子元素溢出的问题**

### 垂直居中对齐 - 使用 padding

如果要水平和垂直都居中，可以使用 **padding** 和 **text-align: center**

### 垂直居中 - 使用 line-height

### 垂直居中 - 使用 position 和 transform

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

## 伪类

### anchor伪类

```css
a:link {color:#FF0000;} /* 未访问的链接 */
a:visited {color:#00FF00;} /* 已访问的链接 */
a:hover {color:#FF00FF;} /* 鼠标划过链接 */
a:active {color:#0000FF;} /* 已选中的链接 */
```

### :first-child 伪类

使用 :first-child 伪类来选择父元素的第一个子元素

### :lang 伪类

:lang 伪类使你有能力为不同的语言定义特殊的规则

### css伪类/元素

| 选择器               | 示例                  | 示例说明                                                     |
| :------------------- | :-------------------- | :----------------------------------------------------------- |
| :checked             | input:checked         | 选择所有选中的表单元素                                       |
| :disabled            | input:disabled        | 选择所有禁用的表单元素                                       |
| :empty               | p:empty               | 选择所有没有子元素的p元素                                    |
| :enabled             | input:enabled         | 选择所有启用的表单元素                                       |
| :first-of-type       | p:first-of-type       | 选择的每个 p 元素是其父元素的第一个 p 元素                   |
| :in-range            | input:in-range        | 选择元素指定范围内的值                                       |
| :invalid             | input:invalid         | 选择所有无效的元素                                           |
| **:last-child**      | p:last-child          | 选择所有p元素的最后一个子元素                                |
| :last-of-type        | p:last-of-type        | 选择每个p元素是其母元素的最后一个p元素                       |
| :not(selector)       | :not(p)               | 选择所有p以外的元素                                          |
| **:nth-child(n)**    | p:nth-child(2)        | 选择所有 p 元素的父元素的第二个子元素                        |
| :nth-last-child(n)   | p:nth-last-child(2)   | 选择所有p元素倒数的第二个子元素                              |
| :nth-last-of-type(n) | p:nth-last-of-type(2) | 选择所有p元素倒数的第二个为p的子元素                         |
| :nth-of-type(n)      | p:nth-of-type(2)      | 选择所有p元素第二个为p的子元素                               |
| :only-of-type        | p:only-of-type        | 选择所有仅有一个子元素为p的元素                              |
| :only-child          | p:only-child          | 选择所有仅有一个子元素的p元素                                |
| :optional            | input:optional        | 选择没有"required"的元素属性                                 |
| :out-of-range        | input:out-of-range    | 选择指定范围以外的值的元素属性                               |
| :read-only           | input:read-only       | 选择只读属性的元素属性                                       |
| :read-write          | input:read-write      | 选择没有只读属性的元素属性                                   |
| :required            | input:required        | 选择有"required"属性指定的元素属性                           |
| :root                | root                  | 选择文档的根元素                                             |
| :target              | #news:target          | 选择当前活动#news元素(点击URL包含锚的名字)                   |
| :valid               | input:valid           | 选择所有有效值的属性                                         |
| :link                | a:link                | 选择所有未访问链接                                           |
| :visited             | a:visited             | 选择所有访问过的链接                                         |
| :active              | a:active              | 选择正在活动链接                                             |
| **:hover**           | a:hover               | 把鼠标放在链接上的状态                                       |
| :focus               | input:focus           | 选择元素输入后具有焦点                                       |
| :first-letter        | p:first-letter        | 选择每个<p> 元素的第一个字母;**"first-letter" 伪元素只能用于块级元素。** |
| :first-line          | p:first-line          | 选择每个<p> 元素的第一行**"first-line" 伪元素只能用于块级元素。** |
| **:first-child**     | p:first-child         | 选择器匹配属于任意元素的第一个子元素的 <p> 元素              |
| **:before**          | p:before              | 在每个<p>元素之前插入内容                                    |
| **:after**           | p:after               | 在每个<p>元素之后插入内容                                    |
| :lang(*language*)    | p:lang(it)            | 为<p>元素的lang属性选择一个开始值                            |

### 伪元素

```css
:first-letter
:first-line
:before
:after
使用content 属性来指定要插入的内容。
```

**一个选择器只能使用一个伪元素，并且伪元素必须处于选择器语句的最后**

## 图片拼合

- background:url(img_navsprites.gif) 0 0; - 定义背景图像和它的位置（左0px，顶部0px）

## 透明（opacity）

## 媒体类型

### @media 规则

@media 规则允许在相同样式表为不同媒体设置不同的样式。

| 媒体类型   | 描述                                                   |
| :--------- | :----------------------------------------------------- |
| all        | 用于所有的媒体设备。                                   |
| aural      | 用于语音和音频合成器。                                 |
| braille    | 用于盲人用点字法触觉回馈设备。                         |
| embossed   | 用于分页的盲人用点字法打印机。                         |
| handheld   | 用于小的手持的设备。                                   |
| print      | 用于打印机。                                           |
| projection | 用于方案展示，比如幻灯片。                             |
| screen     | 用于电脑显示器。                                       |
| tty        | 用于使用固定密度字母栅格的媒体，比如电传打字机和终端。 |
| tv         | 用于电视机类型的设备。                                 |

## css计数器

### 使用计数器自动编号

CSS 计数器根据规则来递增变量。

CSS 计数器使用到以下几个属性：

- `counter-reset` - 创建或者重置计数器
- `counter-increment` - 递增变量
- `content` - 插入生成的内容
- `counter()` 或 `counters()` 函数 - 将计数器的值添加到元素

## CSS导入字体

```css
// 引入自定义字体
@font-face {
  font-family: "open_sanslight";
  src: url("./font/opensans-light.woff2") format("woff2"),
    url("./font/opensans-light.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

.box1 {
  width: 100px;
  height: 100px;
  font-family: open_sanslight;
}
```

## 函数

CSS 有以下几个函数：

| 函数                                                         | 描述                                                         | CSS 版本 |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :------- |
| [attr()](https://www.runoob.com/cssref/func-attr.html)       | 返回选择元素的属性值。                                       | 2        |
| [calc()](https://www.runoob.com/cssref/func-calc.html)       | 允许计算 CSS 的属性值，比如动态计算长度值。                  | 3        |
| [cubic-bezier()](https://www.runoob.com/cssref/func-cubic-bezier.html) | 定义了一个贝塞尔曲线(Cubic Bezier)。                         | 3        |
| [conic-gradient()](https://www.runoob.com/cssref/func-conic-gradient.html) | 定义了一个圆锥渐变。                                         | 3        |
| [counter()](https://www.runoob.com/cssref/func-counter.html) | 设置计数器。                                                 | 3        |
| [hsl()](https://www.runoob.com/cssref/func-hsl.html)         | 使用色相、饱和度、亮度来定义颜色。                           | 3        |
| [hsla()](https://www.runoob.com/cssref/func-hsla.html)       | 使用色相、饱和度、亮度、透明度来定义颜色。                   | 3        |
| [linear-gradient()](https://www.runoob.com/cssref/func-linear-gradient.html) | 创建一个线性渐变的图像                                       | 3        |
| [max()](https://www.runoob.com/cssref/func-max.html)         | 从一个逗号分隔的表达式列表中选择最大的值作为属性的值。       | 3        |
| [min()](https://www.runoob.com/cssref/func-min.html)         | 从一个逗号分隔的表达式列表中选择最小的值作为属性的值。       | 3        |
| [radial-gradient()](https://www.runoob.com/cssref/func-radial-gradient.html) | 用径向渐变创建图像。                                         | 3        |
| [repeating-linear-gradient()](https://www.runoob.com/cssref/func-repeating-linear-gradient.html) | 用重复的线性渐变创建图像。                                   | 3        |
| [repeating-radial-gradient()](https://www.runoob.com/cssref/func-repeating-radial-gradient.html) | 类似 radial-gradient()，用重复的径向渐变创建图像。           | 3        |
| [repeating-conic-gradient()](https://www.runoob.com/cssref/func-repeating-conic-gradient.html) | 重复的圆锥渐变。                                             | 3        |
| [rgb()](https://www.runoob.com/cssref/func-rgb-css.html)     | 使用红(R)、绿(G)、蓝(B)三个颜色的叠加来生成各式各样的颜色。  | 2        |
| [rgba()](https://www.runoob.com/cssref/func-rgba.html)       | 使用红(R)、绿(G)、蓝(B)、透明度(A)的叠加来生成各式各样的颜色。 | 3        |
| [var()](https://www.runoob.com/cssref/func-var.html)         | 用于插入自定义的属性值。                                     | 3        |
| [repeat()](https://www.runoob.com/cssref/func-repeat.html)   | 表示轨道列表的重复片段。                                     | 3        |
| [minmax()](https://www.runoob.com/cssref/func-minmax.html)   | 定义了一个长宽范围的闭区间。                                 | 3        |

HSLA 即色相、饱和度、亮度、透明度（英语：Hue, Saturation, Lightness, Alpha ）。

色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。

饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取 0-100% 的数值。

亮度（L） 取 0-100%，增加亮度，颜色会向白色变化；减少亮度，颜色会向黑色变化。

透明度（A） 取值 0~1 之间， 代表透明度。

## 单位

| 长度单位                          | Chrome | IE     | Firefox | Safari | Opera |
| :-------------------------------- | :----- | :----- | :------ | :----- | :---- |
| em, ex, %, px, cm, mm, in, pt, pc | 1.0    | 3.0    | 1.0     | 1.0    | 3.5   |
| ch                                | 27.0   | 9.0    | 1.0     | 7.0    | 20.0  |
| rem                               | 4.0    | 9.0    | 3.6     | 4.1    | 11.6  |
| vh, vw                            | 20.0   | 9.0    | 19.0    | 6.0    | 20.0  |
| vmin                              | 20.0   | 9.0*   | 19.0    | 6.0    | 20.0  |
| vmax                              | 26.0   | 不支持 | 19.0    | 不支持 | 20.0  |

| 单位 | 描述                                     |
| :--- | :--------------------------------------- |
| cm   | 厘米                                     |
| mm   | 毫米                                     |
| in   | 英寸 (1in = 96px = 2.54cm)               |
| px * | 像素 (1px = 1/96th of 1in)               |
| pt   | point，大约1/72英寸； (1pt = 1/72in)     |
| pc   | pica，大约 12pt，1/6英寸； (1pc = 12 pt) |

# CSS3

## background-size 属性

**指定的大小是相对于父元素的宽度和高度的百分比的大小**

## background-origin

background-origin 属性指定了背景图像的位置区域。

content-box, padding-box,和 border-box区域内可以放置背景图像。

## background-clip属性

background-clip背景剪裁属性是从指定位置开始绘制

## Gradients

CSS3 定义了两种类型的渐变（gradients）：

- **线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向**

  - `background-image: linear-gradient(to right, red , yellow);`
  - `background-image: linear-gradient(angle, color-stop1, color-stop2);`
  - 重复的线性渐变repeating-linear-gradient() 函数用于重复线性渐变

- **径向渐变（Radial Gradients）- 由它们的中心定义**

  - ```css
    background-image: radial-gradient(shape size at position, start-color, ..., last-color);
    ```

  - shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse。

  - size 参数定义了渐变的大小。它可以是以下四个值：

    - **closest-side**
    - **farthest-side**
    - **closest-corner**
    - **farthest-corner**

  - 重复的径向渐变repeating-radial-gradient() 函数用于重复径向渐变

## 文本效果

### CSS3中包含几个新的文本特征

- text-shadow（文本阴影）
- box-shadow（盒子阴影）
- text-overflow（如何显示溢出内容；ellipsis(省略)，clip(剪切)，自定义字符串(只在 Firefox 浏览器下有效)）
- word-wrap(换行；)
- word-break

| 属性                | 描述                                                         | CSS  |
| :------------------ | :----------------------------------------------------------- | :--- |
| hanging-punctuation | 规定标点字符是否位于线框之外。                               | 3    |
| punctuation-trim    | 规定是否对标点字符进行修剪。                                 | 3    |
| text-align-last     | 设置如何对齐最后一行或紧挨着强制换行符之前的行。             | 3    |
| text-emphasis       | 向元素的文本应用重点标记以及重点标记的前景色。               | 3    |
| text-justify        | 规定当 text-align 设置为 "justify" 时所使用的对齐方法。      | 3    |
| text-outline        | 规定文本的轮廓。                                             | 3    |
| text-overflow       | 规定当文本溢出包含元素时发生的事情。                         | 3    |
| text-shadow         | 向文本添加阴影。                                             | 3    |
| text-wrap           | 规定文本的换行规则。（text-wrap: normal\|none\|unrestricted\|suppress） |      |
| word-break          | 规定非中日韩文本的换行规则。（word-break: normal\|break-all\|keep-all;） |      |
| word-wrap           | 允许对长的不可分割的单词进行分割并换行到下一行。word-wrap: normal\|break-word; | 3    |

**text-wrap**

| 值           | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| normal       | 只在允许的换行点进行换行。                                   |
| none         | 不换行。元素无法容纳的文本会溢出。                           |
| unrestricted | 在任意两个字符间换行。                                       |
| suppress     | 压缩元素中的换行。浏览器只在行中没有其他有效换行点时进行换行。 |

**word-break**

| 值        | 描述                           |
| :-------- | :----------------------------- |
| normal    | 使用浏览器默认的换行规则。     |
| break-all | 允许在单词内换行。             |
| keep-all  | 只能在半角空格或连字符处换行。 |

**word-wrap**

| 值         | 描述                                         |
| :--------- | :------------------------------------------- |
| normal     | 只在允许的断字点换行（浏览器保持默认处理）。 |
| break-word | 在长单词或 URL 地址内部进行换行。            |

## 字体

 **@font-face 规则中，您必须首先定义字体的名称（比如 myFirstFont），然后指向该字体文件**

## 2D 转换方法

| 函数                            | 描述                                     |
| :------------------------------ | :--------------------------------------- |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*) | 定义 2D 转换，使用六个值的矩阵。         |
| translate(*x*,*y*)              | 定义 2D 转换，沿着 X 和 Y 轴移动元素。   |
| translateX(*n*)                 | 定义 2D 转换，沿着 X 轴移动元素。        |
| translateY(*n*)                 | 定义 2D 转换，沿着 Y 轴移动元素。        |
| scale(*x*,*y*)                  | 定义 2D 缩放转换，改变元素的宽度和高度。 |
| scaleX(*n*)                     | 定义 2D 缩放转换，改变元素的宽度。       |
| scaleY(*n*)                     | 定义 2D 缩放转换，改变元素的高度。       |
| rotate(*angle*)                 | 定义 2D 旋转，在参数中规定角度。         |
| skew(*x-angle*,*y-angle*)       | 定义 2D 倾斜转换，沿着 X 和 Y 轴。       |
| skewX(*angle*)                  | 定义 2D 倾斜转换，沿着 X 轴。            |
| skewY(*angle*)                  | 定义 2D 倾斜转换，沿着 Y 轴。            |

## 3D 转换方法

| 函数                                                         | 描述                                      |
| :----------------------------------------------------------- | :---------------------------------------- |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*, *n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。   |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转化。                            |
| translateX(*x*)                                              | 定义 3D 转化，仅使用用于 X 轴的值。       |
| translateY(*y*)                                              | 定义 3D 转化，仅使用用于 Y 轴的值。       |
| translateZ(*z*)                                              | 定义 3D 转化，仅使用用于 Z 轴的值。       |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                        |
| scaleX(*x*)                                                  | 定义 3D 缩放转换，通过给定一个 X 轴的值。 |
| scaleY(*y*)                                                  | 定义 3D 缩放转换，通过给定一个 Y 轴的值。 |
| scaleZ(*z*)                                                  | 定义 3D 缩放转换，通过给定一个 Z 轴的值。 |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                            |
| rotateX(*angle*)                                             | 定义沿 X 轴的 3D 旋转。                   |
| rotateY(*angle*)                                             | 定义沿 Y 轴的 3D 旋转。                   |
| rotateZ(*angle*)                                             | 定义沿 Z 轴的 3D 旋转。                   |
| perspective(*n*)                                             | 定义 3D 转换元素的透视视图。              |

## 过渡

## 过渡属性

| 属性                       | 描述                                         | CSS  |
| :------------------------- | :------------------------------------------- | :--- |
| transition                | 简写属性，用于在一个属性中设置四个过渡属性。 | 3    |
| transition-property        | 规定应用过渡的 CSS 属性的名称。              | 3    |
| transition-duration        | 定义过渡效果花费的时间。默认是 0。           | 3    |
| transition-timing-function | 规定过渡效果的时间曲线。默认是 "ease"。      | 3    |
| transition-delay           | 规定过渡效果何时开始。默认是 0。             | 3    |

transition-timing-function:

| linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
| ----------------------------- | ------------------------------------------------------------ |
| ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
| ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
| ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |

## 动画

@keyframes 规则是创建动画。

### CSS3的动画属性

| 属性                      | 描述                                                         | CSS  |
| :------------------------ | :----------------------------------------------------------- | :--- |
| @keyframes                | 规定动画。                                                   | 3    |
| animation                 | 所有动画属性的简写属性。                                     | 3    |
| animation-name            | 规定 @keyframes 动画的名称。                                 | 3    |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。             | 3    |
| animation-timing-function | 规定动画的速度曲线。默认是 "ease"。                          | 3    |
| animation-fill-mode       | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 | 3    |
| animation-delay           | 规定动画何时开始。默认是 0。                                 | 3    |
| animation-iteration-count | 规定动画被播放的次数。默认是 1。                             | 3    |
| animation-direction       | 规定动画是否在下一周期逆向地播放。默认是 "normal"。          | 3    |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是 "running"。               | 3    |

## CSS3 多列属性

- `column-count`指定了需要分割的列数
- `column-gap`指定了列与列间的间隙
- `column-rule-style`指定了列与列间的边框样式
- `column-rule-width`指定了两列的边框厚度
- `column-rule-color`指定了两列的边框颜色
- `column-rule`是 column-rule-* 所有属性的简写
- `column-span`指定元素跨越多少列
- `column-width`指定了列的宽度

**`filter` 属性用为元素添加可视效果**

## button

可以使用 `transition-duration` 属性来设置 "hover" 效果的速度

可以添加 `cursor` 属性并设置为 "not-allowed" 来设置一个禁用的图片CSS3

## 框大小

**`box-sizing` 属性可以设置 width 和 height 属性中包含了 padding(内边距) 和 border(边框)。**

常用`border-box`

## flex box

- `flex-direction` 属性指定了弹性子元素在父容器中的位置。`flex-direction: row | row-reverse | column | column-reverse`

- 内容对齐（justify-content）属性应用在弹性容器上，把弹性项沿着弹性容器的主轴线（main axis）对齐`justify-content: flex-start | flex-end | center | space-between | space-around`

- `align-items` 设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式`align-items: flex-start | flex-end | center | baseline | stretch`

  各个值解析:

  - flex-start：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
  - flex-end：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
  - center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
  - baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
  - stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。

- **flex-wrap** 属性用于指定弹性盒子的子元素换行方式`flex-wrap: nowrap|wrap|wrap-reverse|initial|inherit;`

  各个值解析:

  - **nowrap** - 默认， 弹性容器为单行。该情况下弹性子项可能会溢出容器。
  - **wrap** - 弹性容器为多行。该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行
  - **wrap-reverse** -反转 wrap 排列。

- `align-content` 属性用于修改 `flex-wrap` 属性的行为。类似于 `align-items`, 但它不是设置弹性子元素的对齐，而是设置各个行的对齐。`align-content: flex-start | flex-end | center | space-between | space-around | stretch`

  各个值解析:

  - `stretch` - 默认。各行将会伸展以占用剩余的空间。

  - `flex-start` - 各行向弹性盒容器的起始位置堆叠。

  - `flex-end` - 各行向弹性盒容器的结束位置堆叠。

  - `center` -各行向弹性盒容器的中间位置堆叠。

  - `space-between` -各行在弹性盒容器中平均分布。

  - `space-around` - 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。

## 弹性子元素属性

### 排序

### 语法

```css
order: 
```

各个值解析:

- 用整数值来定义排列顺序，数值小的排在前面。可以为负值。

### align-self

`align-self` 属性用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch
```

各个值解析:

- auto：如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。
- flex-start：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
- flex-end：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
- center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
- baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
- stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。

### flex

`flex` 属性用于指定弹性子元素如何分配空间。

### 语法

```css
flex: auto | initial | none | inherit |  [ flex-grow ] || [ flex-shrink ] || [ flex-basis ]
```

各个值解析:

- auto: 计算值为 1 1 auto
- initial: 计算值为 0 1 auto
- none：计算值为 0 0 auto
- inherit：从父元素继承
- [ flex-grow ]：定义弹性盒子元素的扩展比率。
- [ flex-shrink ]：定义弹性盒子元素的收缩比率。
- [ flex-basis ]：定义弹性盒子元素的默认基准值。

## 多媒体查询

```css
@media not|only mediatype and (expressions) {
    CSS 代码...;
}
```

## CSS3 多媒体类型

| 值     | 描述                             |
| :----- | :------------------------------- |
| all    | 用于所有多媒体类型设备           |
| print  | 用于打印机                       |
| screen | 用于电脑屏幕，平板，智能手机等。 |
| speech | 用于屏幕阅读器                   |

## 网格布局

### display 属性

当一个 HTML 元素将 display 属性设置为 grid 或 inline-grid 后，它就变成了一个网格容器，这个元素的所有直系子元素将成为网格元素

通过 **grid-template-columns**（用来确定要多少列） 和 **grid-template-rows**（用来确定每行长度） 属性来定义网格中的行和列

**grid-gap**：网格之间间距

### fr 单位

轨道可以使用任何长度单位进行定义。

网格引入了 **fr** 单位来帮助我们创建灵活的网格轨道。一个 fr 单位代表网格容器中可用空间的一等份

### justify-content 属性

justify-content 属性用于对齐容器内的网格，设置如何分配顺着弹性容器主轴(或者网格行轴) 的元素之间及其周围的空间

### align-content 属性

**align-content** 属性用于设置垂直方向上的网格元素在容器中的对齐方式

## 网格元素

### grid-column 属性

grid-column 属性定义了网格元素列的开始和结束位置。

**注意：** grid-column 是 grid-column-start 和 grid-column-end 属性的简写属性

### grid-row 属性

grid-row 属性定义了网格元素行的开始和结束位置。

**注意：** grid-row 是 grid-row-start 和 grid-row-end 属性的简写属性。

### grid-area 属性

grid-area 属性是 grid-row-start, grid-column-start, grid-row-end 以及 grid-column-end 属性的简写。

### 网格元素命名

grid-area 属性可以对网格元素进行命名。

命名的网格元素可以通过容器的 grid-template-areas 属性来引用

每行由单引号内` ' ' `定义，以空格分隔。

**`.`** 号表示没有名称的网格项。

## 1 浏览器内核及其前缀

|    内核     |      前缀      | 浏览器                                                       |
| :---------: | :------------: | :----------------------------------------------------------- |
|  Gecko内核  |  前缀为-moz-   | 火狐浏览器                                                   |
| Webki t内核 | 前缀为-webkit- | 也叫谷歌内核，chrome浏览器最先开发使用，safari浏览器也使用该内核。国内很多浏览器也使用了webkit内核，如360极速、世界之窗、猎豹等 |
| Trident内核 |   前缀为-ms-   | 也称IE内核                                                   |
| Presto内核  |    前缀-o-     | 目前只有opera采用                                            |

## 2 CSS3 定义了两种类型的渐变（gradients)

线性渐变(Linear Gradients)

径向渐变(Radial Gradients)

1.线性渐变(Linear Gradients)-向下/向上/向左/向右/对角方向
background: linear gradient(direction,color-stop 1,color-stop 2,... );
2.径向渐变(Radial Gradients) -由它们的中心定义
background: radial-gradient(center shape  size,start-color,... ,last-color);
默认情况下，渐变的中心是center（表示在中心点），渐变的形状是ellipse（表示椭圆形)
它可以是值 circle 或ellipse。其中，circle 表示圆形，ellipse表示椭圆形

中心：（at center center）

- 语法：（at x y）都是从左上角原点为参考点

- x,y可以是像素或百分比

   大小

- 最近边 closest-side

- 最远边 farthest-side

- 最近角 closest-corner

- 最远角 farthest-corner

   形状

- ellipse 椭圆 默认

- circle 圆

## 3 Transform 属性

##### 1 转换Transform2D的属性

通常的属性包含了属性名和属性值，而CSS3的transform属性是用函数来定义
的。Transform 2D的数包括了translate()、scale()、rotate()和skew()。
书写格式:
transform:函数名(x轴值,y轴值);

###### 1.translate()函数

translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动。接受CSS的标准度量单位（px)translate(x, y):转换，沿着X和Y轴移动元素。

###### 2.rotate()

通过 rotate()方法，元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。它以deg为单位，代表了旋转的角度。

###### 3.scale()

通过值把宽和高转换为原始尺寸的n倍，接受两个参数，前面的为宽，后面的为高。

可取值:

- 默认值为1
- 缩小:0-1之间的数
- 放大:大于1的数

###### 4.skew ()

根据水平轴和垂直轴翻转，接受两个或一个值，两个值时前面为水平，后面为垂直的角度，一个值只是水平轴的角度。此函数是指元素的倾斜角度。

##### 2 转换Transform 3D的属性

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

##### 3 过渡Transition

###### 1什么是过渡

使用css的属性值在一段时间内平滑的过渡
比如，鼠标悬停后，背景色在1s内，由白色平滑的过渡到红色

- 1）指定四个要素:
  过渡属性，如background、color等

  过渡所需时间
  过渡函数，即过渡的速度、方式等

  过渡延迟时间，表示开始执行的时间

- 2）触发过渡
  通过用户的行为触发，如点击、悬浮等

###### 2.过渡属性

transition-property: none | all |property ;

多个属性用逗号隔开
可设置过渡的属性

- 颜色属性
- 取值为数值的属性
- 转换属性
- 渐变属性
- 阴影属性
  
###### 3.过渡时间

transition-duration: s ms;
默认值为0，意味着不会有效果，所以必须设置transition-duration属性

###### 4.过渡函数

transition-timing-function: ;

取值:

- ease:默认值，规定慢速开始，然后变快，然后慢速结束的过渡效果
- linear:匀速
- ease-in:规定以慢速开始，加速效果
- ease-out:规定以慢速结束，减速效果
- ease-in-out:规定以慢速开始和结束，先加速后减速效果

###### 5.过渡延迟

transition-delay: s ms;
改变元素属性值后多长时间开始执行过渡效果

###### 6.简写属性transition

transition属性是一个简写属性，用于设置四个过渡属性
语法:transition:property duration timing function delay;

## 4 animation动画

过渡属性只能模拟动画效果

- animation属性可以制作类似Flash动画
- 通过关键帧控制动画的每一步
- 使元素从一种样式逐渐变化为另一种样式
- 实现复杂的动画效果

##### 1.@keyframes

作用:用于声明动画，指定关键帧

帧，

- 用于分解动画动作
- 每个帧代表某个时间点
- 定义每个帧上的动作

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

##### 2.animation属性

animation属性用于控制动画

- 调用由@keyframes定义的动画

- 设置动画属性，如时间、次数等

  animation属性是一个简写属性
  语法为: animation:name duration timing-function delay iteration-count direction;

##### 3.动画子属性

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

## Drag Drop

| 事件                | On 型事件处理程序                                            | 触发时刻                                                     |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `drag (en-US)`      | [`ondrag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event) | 当拖拽元素或选中的文本时触发。                               |
| `dragend (en-US)`   | [`ondragend` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event) | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见[结束拖拽 (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragend)) |
| `dragenter (en-US)` | [`ondragenter` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event) | 当拖拽元素或选中的文本到一个可释放目标时触发（见 [指定释放目标 (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets)）。 |
| `dragexit`          | [`ondragexit` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave_event) | 当元素变得不再是拖拽操作的选中目标时触发。                   |
| `dragleave (en-US)` | [`ondragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event) | 当拖拽元素或选中的文本离开一个可释放目标时触发。             |
| `dragover (en-US)`  | [`ondragover` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event) | 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）。 |
| `dragstart (en-US)` | [`ondragstart` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event) | 当用户开始拖拽一个元素或选中的文本时触发（见[开始拖拽操作 (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragstart)）。 |
| `drop (en-US)`      | [`ondrop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event) | 当元素或选中的文本在可释放目标上被释放时触发（见[执行释放 (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop)）。 |

**注意：**当从操作系统向浏览器中拖拽文件时，不会触发 `dragstart` 和`dragend` 事件。

[`setData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/setData) 方法为拖拽数据添加一个项，如下面的示例代码所示：

```js
function dragstart_handler(ev) {
  // 添加拖拽数据
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData("text/uri-list", ev.target.ownerDocument.location.href);
}
```

## 小技巧

```
aspect-ratio: 16/9;//设置宽高比
```

伪类：

- ::selection
- ::before
- ::after

禁止复制粘贴

- user-select:none
- js禁止oncopy事件
