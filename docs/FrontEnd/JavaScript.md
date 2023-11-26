
# JavaScript

## 代码规范

以分号结束语句不是必需的，但我们仍然强烈建议您这么做。
在运算符旁边（ = + - * / ）添加空格是个好习惯
为了达到最佳的可读性，程序员们常常喜欢把代码行控制在 **80** 个字符以内。

## 关键词

| 关键词        | 描述                                              |
| :------------ | :------------------------------------------------ |
| break         | 终止 switch 或循环。                              |
| continue      | 跳出循环并在顶端开始。                            |
| debugger      | 停止执行 JavaScript，并调用调试函数（如果可用）。 |
| do ... while  | 执行语句块，并在条件为真时重复代码块。            |
| for           | 标记需被执行的语句块，只要条件为真。              |
| function      | 声明函数。                                        |
| if ... else   | 标记需被执行的语句块，根据某个条件。              |
| return        | 退出函数。                                        |
| switch        | 标记需被执行的语句块，根据不同的情况。            |
| try ... catch | 对语句块实现错误处理。                            |
| var           | 声明变量。                                        |

混合值被称为**字面量（literal）**。变量值被称为**变量**。

双斜杠 // 或 /*与*/ 之间的代码被视为**注释**。

所有 JavaScript 标识符**对大小写敏感**。

## 作用域

### 全局作用域

**全局**（在函数之外）声明的变量拥有**全局作用域**。

**全局**变量可以在 JavaScript 程序中的任何位置访问。

### 函数作用域

**局部**（函数内）声明的变量拥有**函数作用域**。

**局部**变量只能在它们被声明的函数内访问。

### JavaScript 块作用域

通过 var 关键词声明的变量没有块**作用域**。

在块 **{}** 内声明的变量可以从块之外进行访问。

**可以使用 let 关键词声明拥有块作用域的变量。**

在块 **{}** 内声明的变量无法从块外访问

**通过 const 定义的变量与 let 变量类似，但不能重新赋值**

**JavaScript const 变量必须在声明时赋值**

**常量对象可以更改**

## JavaScript 类型运算符

| 运算符     | 描述                                |
| :--------- | :---------------------------------- |
| typeof     | 返回变量的类型。                    |
| instanceof | 返回 true，如果对象是对象类型的实例 |

## JavaScript 位运算符

| 运算符 | 描述         | 例子    | 等同于       | 结果 | 十进制 |
| :----- | :----------- | :------ | :----------- | :--- | :----- |
| &      | 与           | 5 & 1   | 0101 & 0001  | 0001 | 1      |
| \|     | 或           | 5 \| 1  | 0101 \| 0001 | 0101 | 5      |
| ~      | 非           | ~ 5     | ~0101        | 1010 | 10     |
| ^      | 异或         | 5 ^ 1   | 0101 ^ 0001  | 0100 | 4      |
| <<     | 零填充左位移 | 5 << 1  | 0101 << 1    | 1010 | 10     |
| >>     | 有符号右位移 | 5 >> 1  | 0101 >> 1    | 0010 | 2      |
| >>>    | 零填充右位移 | 5 >>> 1 | 0101 >>> 1   | 0010 | 2      |

## JavaScript 数据类型

JavaScript 变量能够保存多种**数据类型**：数值、字符串值、数组、对象等等

## JavaScript 函数

使用上面的例子，toCelsius 引用的是函数对象，而 toCelsius() 引用的是函数结果。

## 请不要把字符串、数值和布尔值声明为对象

## JavaScript事件

| 事件        | 描述                         |
| :---------- | :--------------------------- |
| onchange    | HTML 元素已被改变            |
| onclick     | 用户点击了 HTML 元素         |
| onmouseover | 用户把鼠标移动到 HTML 元素上 |
| onmouseout  | 用户把鼠标移开 HTML 元素     |
| onkeydown   | 用户按下键盘按键             |
| onload      | 浏览器已经完成页面加载       |

[W3School JavaScript参考手册](https://www.w3school.com.cn/jsref/dom_obj_event.asp)

**内建属性 length 可返回字符串的长度**

## 转义序列

| 代码 | 结果       |
| :--- | :--------- |
| \b   | 退格键     |
| \f   | 换页       |
| \n   | 新行       |
| \r   | 回车       |
| \t   | 水平制表符 |
| \v   | 垂直制表符 |

您也可以**在字符串中**换行，通过一个反斜杠即可

**对长字符串换行的最安全做法（但是有点慢）是使用字符串加法**

**JavaScript 对象无法进行对比**

## 字符串方法

+ indexOf() 方法返回字符串中指定文本*首次*出现的索引（位置）

+ lastIndexOf() 方法返回指定文本在字符串中**最后**一次出现的索引

+ 如果未找到文本， indexOf() 和 lastIndexOf() 均返回 -1

+ 两种方法都接受作为检索起始位置的第二个参数。

+ search() 方法搜索特定值的字符串，并返回匹配的位置

+ slice() 提取字符串的某个部分并在新字符串中返回被提取的部分

+ substring() 类似于 slice()。不同之处在于 substring() 无法接受负的索引

+ substr() 类似于 slice()。不同之处在于第二个参数规定被提取部分的**长度**

+ replace() 方法用另一个值替换在字符串中指定的值

+ 默认地，replace() **只替换首个匹配**

+ toUpperCase() 把字符串转换为大写

+ toLowerCase() 把字符串转换为小写

+ concat() 连接两个或多个字符串

+ trim() 方法删除字符串两端的空白符

+ charAt() 方法返回字符串中指定下标（位置）的字符串

+ charCodeAt() 方法返回字符串中指定索引的字符 unicode 编码

+ 可以通过 split() 将字符串转换为数组

+ match() 方法根据正则表达式在字符串中搜索匹配项，并将匹配项作为 Array 对象返回。

+ 如果字符串包含指定值，includes() 方法返回 true

+ 如果字符串以指定值开头，则 startsWith() 方法返回 true，否则返回 false

  | 参数        | 描述                             |
  | :---------- | :------------------------------- |
  | searchvalue | 必需。需要搜索的值。             |
  | start       | 可选。默认为 0。开始搜索的位置。 |

+ 如果字符串以指定值结尾，则 endsWith() 方法返回 true，否则返回 false

  | 参数        | 描述                 |
  | :---------- | :------------------- |
  | searchvalue | 必需。需要搜索的值。 |
  | length      | 可选。要搜索的长度。 |

## 模板字符串

+ **模板字面量**使用反引号 (``) 而不是引号 ("") 来定义字符串
+ 模板字面量使用反引号 (``) 而不是引号 ("") 来定义字符串
+ 模板字面量允许多行字符串
+ 模板字面量提供了一种将变量和表达式插入字符串的简单方法。该方法称为字符串插值`${...}`
+ 模板字面量允许字符串中的表达式

[String 参考手册](https://www.w3school.com.cn/jsref/jsref_obj_string.asp)

## 数值

**JavaScript 数值始终是 64 位的浮点数**

## NaN - 非数值

`NaN`属于 JavaScript 保留词，指示某个数不是合法数。

`isNaN()` 来确定某个值是否是数

`typeof`返回类型

`Infinity` （或 `-Infinity`）是 JavaScript 在计算数时超出最大可能数范围时返回的值。

## 数字方法

+ toString() 方法以字符串返回数值
+ toExponential() 返回字符串值，它包含已被四舍五入并使用指数计数法的数字
+ toFixed() 返回字符串值，它包含了指定位数小数的数字
+ toPrecision() 返回字符串值，它包含了指定长度的数字
+ valueOf() 以数值返回数值

## 全局方法

JavaScript 全局方法可用于所有 JavaScript 数据类型。

这些是在处理数字时最相关的方法：

| 方法         | 描述                         |
| :----------- | :--------------------------- |
| Number()     | 返回数字，由其参数转换而来。 |
| parseFloat() | 解析其参数并返回浮点数。     |
| parseInt()   | 解析其参数并返回整数。       |

Number(new Date("2019-04-15"))返回 1970 年 1 月 1 日至今的毫秒数

## 数值属性

| 属性              | 描述                             |
| :---------------- | :------------------------------- |
| MAX_VALUE         | 返回 JavaScript 中可能的最大数。 |
| MIN_VALUE         | 返回 JavaScript 中可能的最小数。 |
| NEGATIVE_INFINITY | 表示负的无穷大（溢出返回）。     |
| NaN               | 表示非数字值（"Not-a-Number"）。 |
| POSITIVE_INFINITY | 表示无穷大（溢出返回）。         |

**数字属性不可用于变量**

## javascript 数组

直接创建

`a=['ljk','lst','nb']`

方法创建

`new Array()`

## 函数

函数实参和形参如果长度相等，会有映射，即改变了内部形参，arguments类数组也会变

## 数组属性和方法

+ length 属性返回数组的长度（数组元素的数目）
+ length 属性始终大于最高数组索引（下标）
+ 遍历数组的最安全方法是使用 "for" 循环：
+ 也可以使用 `Array.foreach()`函数
+ 向数组添加新元素的最佳方法是使用 `push()`方法
+ Array.isArray()判断是否数组

**假如对象由给定的构造器创建，则 *instanceof* 运算符返回 true**

数组方法

+ JavaScript 方法 toString() 把数组转换为数组值（逗号分隔）的字符串

+ join() 方法也可将所有数组元素结合为一个字符串

+ pop() 方法从数组中删除最后一个元素

+ push() 方法（在数组结尾处）向数组添加一个新的元素

+ shift() 方法会删除首个数组元素，并把所有其他元素“位移”到更低的索引

+ unshift() 方法（在开头）向数组添加新元素，并“反向位移”旧元素

+ 使用 delete 会在数组留下未定义的空洞。请使用 pop() 或 shift() 取而代之。

+ splice() 方法可用于向数组添加新项

+ 第一个参数定义了应添加新元素的位置（拼接）。

  第二个参数定义应删除多少元素。

  其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。

+ concat() 方法通过合并（连接）现有数组来创建一个新数组，不会更改现有数组。它总是返回一个新数组

+ slice() 方法用数组的某个片段切出新数组，可接受两个参数，该方法会从开始参数选取元素，直到结束参数（不包括）为止

+ sort() 方法以字母顺序对数组进行排序

+ reverse() 方法反转数组中的元素

+ Math.max.apply 来查找数组中的最高值

+ Math.min.apply 来查找数组中的最低值

+ forEach() 方法为每个数组元素调用一次函数（回调函数）

  该函数接受 3 个参数：

  + 项目值
  + 项目索引
  + 数组本身

+ Array.map()

  + map() 方法通过对每个数组元素执行函数来创建新数组。

  + map() 方法不会对没有值的数组元素执行函数。

  + map() 方法不会更改原始数组。
  + 该函数有 3 个参数：
    + 项目值
    + 项目索引
    + 数组本身

+ Array.filter()

  + filter() 方法创建一个包含通过测试的数组元素的新数组
  + 此函数接受 3 个参数：
    + 项目值
    + 项目索引
    + 数组本身

+ Array.reduce()

  + reduce() 方法在每个数组元素上运行函数，以生成（减少它）单个值。

  + reduce() 方法在数组中从左到右工作。另请参阅 reduceRight()。

  + reduce() 方法不会减少原始数组。
  + 此函数接受 4 个参数：
    + 总数（初始值/先前返回的值）
    + 项目值
    + 项目索引
    + 数组本身

+ Array.reduceRight()

  + reduceRight() 方法在每个数组元素上运行函数，以生成（减少它）单个值。

  + reduceRight() 方法在数组中从右到左工作。另请参阅 reduce()。

  + reduceRight() 方法不会减少原始数组
  + 此函数接受 4 个参数：
    + 总数（初始值/先前返回的值）
    + 项目值
    + 项目索引
    + 数组本身

+ Array.every()

  + every() 方法检查所有数组值是否通过测试
  + 此函数接受 3 个参数：
    + 项目值
    + 项目索引
    + 数组本身

+ Array.some()

  + some() 方法检查某些数组值是否通过了测试
  + 此函数接受 3 个参数：
    + 项目值
    + 项目索引
    + 数组本身

+ Array.indexOf()

  + indexOf() 方法在数组中搜索元素值并返回其位置。

  + | *item*  | 必需。要检索的项目。                                         |
    | ------- | ------------------------------------------------------------ |
    | *start* | 可选。从哪里开始搜索。负值将从结尾开始的给定位置开始，并搜索到结尾。 |

+ Array.lastIndexOf()

  + Array.lastIndexOf() 与 Array.indexOf() 类似，但是从数组结尾开始搜索

+ Array.find()

  + find() 方法返回通过测试函数的第一个数组元素的值

+ Array.findIndex()

  + findIndex() 方法返回通过测试函数的第一个数组元素的索引
  + 此函数接受 3 个参数：
    + 项目值
    + 项目索引
    + 数组本身

## 日期对象

### 创建 Date 对象

Date 对象由新的 Date() 构造函数创建。

有 4 种方法创建新的日期对象：

+ new Date()
+ new Date(year, month, day, hours, minutes, seconds, milliseconds)
+ new Date(milliseconds)
+ new Date(date string)

### 方法

+ toUTCString() 方法将日期转换为 UTC 字符串（一种日期显示标准）
+ toDateString() 方法将日期转换为更易读的格式

### 日期获取方法

| 方法              | 描述                                 |
| :---------------- | :----------------------------------- |
| getDate()         | 以数值返回天（1-31）                 |
| getDay()          | 以数值获取周名（0-6）                |
| getFullYear()     | 获取四位的年（yyyy）                 |
| getHours()        | 获取小时（0-23）                     |
| getMilliseconds() | 获取毫秒（0-999）                    |
| getMinutes()      | 获取分（0-59）                       |
| getMonth()        | 获取月（0-11）                       |
| getSeconds()      | 获取秒（0-59）                       |
| getTime()         | 获取时间（从 1970 年 1 月 1 日至今） |

### UTC 日期方法

| 方法                 | 描述                                    |
| :------------------- | :-------------------------------------- |
| getUTCDate()         | 等于 getDate()，但返回 UTC 日期         |
| getUTCDay()          | 等于 getDay()，但返回 UTC 日            |
| getUTCFullYear()     | 等于 getFullYear()，但返回 UTC 年       |
| getUTCHours()        | 等于 getHours()，但返回 UTC 小时        |
| getUTCMilliseconds() | 等于 getMilliseconds()，但返回 UTC 毫秒 |
| getUTCMinutes()      | 等于 getMinutes()，但返回 UTC 分        |
| getUTCMonth()        | 等于 getMonth()，但返回 UTC 月          |
| getUTCSeconds()      | 等于 getSeconds()，但返回 UTC 秒        |

### 日期设置方法

| 方法              | 描述                                         |
| :---------------- | :------------------------------------------- |
| setDate()         | 以数值（1-31）设置日                         |
| setFullYear()     | 设置年（可选月和日）                         |
| setHours()        | 设置小时（0-23）                             |
| setMilliseconds() | 设置毫秒（0-999）                            |
| setMinutes()      | 设置分（0-59）                               |
| setMonth()        | 设置月（0-11）                               |
| setSeconds()      | 设置秒（0-59）                               |
| setTime()         | 设置时间（从 1970 年 1 月 1 日至今的毫秒数） |

## 数学

+ Math.round(x) 的返回值是 x 四舍五入为最接近的整数
+ Math.pow(x, y) 的返回值是 x 的 y 次幂
+ Math.sqrt(x) 返回 x 的平方根
+ Math.abs(x) 返回 x 的绝对（正）值
+ Math.ceil(x) 的返回值是 x *上舍入*最接近的整数
+ Math.floor(x) 的返回值是 x *下舍入*最接近的整数
+ Math.sin(x) 返回角 x（以弧度计）的正弦（介于 -1 与 1 之间的值）
+ Math.cos(x) 返回角 x（以弧度计）的余弦（介于 -1 与 1 之间的值）
+ Math.min() 和 Math.max() 可用于查找参数列表中的最低或最高值
+ Math.random() 返回介于 0（包括） 与 1（不包括） 之间的随机数

常量

```js
Math.E          // 返回欧拉指数（Euler's number）
Math.PI         // 返回圆周率（PI）
Math.SQRT2      // 返回 2 的平方根
Math.SQRT1_2    // 返回 1/2 的平方根
Math.LN2        // 返回 2 的自然对数
Math.LN10       // 返回 10 的自然对数
Math.LOG2E      // 返回以 2 为底的 e 的对数（约等于 1.414）
Math.LOG10E     // 返回以 10 为底的 e 的对数（约等于 0.434）
```

## 逻辑

+ 使用 Boolean() 函数来确定表达式（或变量）是否为真

## 类型转换

+ constructor 属性返回所有 JavaScript 变量的构造器函数。

## 位运算

| 运算符 | 名称         | 描述                                                     |
| :----- | :----------- | :------------------------------------------------------- |
| &      | AND          | 如果两位都是 1 则设置每位为 1                            |
| \|     | OR           | 如果两位之一为 1 则设置每位为 1                          |
| ^      | XOR          | 如果两位只有一位为 1 则设置每位为 1                      |
| ~      | NOT          | 反转所有位                                               |
| <<     | 零填充左位移 | 通过从右推入零向左位移，并使最左边的位脱落。             |
| >>     | 有符号右位移 | 通过从左推入最左位的拷贝来向右位移，并使最右边的位脱落。 |
| >>>    | 零填充右位移 | 通过从左推入零来向右位移，并使最右边的位脱落。           |

## 正则表达式

+ test() 是一个正则表达式方法。
+ exec() 方法是一个正则表达式方法

## 错误

**try 语句使您能够测试代码块中的错误。**

**catch 语句允许您处理错误。**

**throw 语句允许您创建自定义错误。**

**finally 使您能够执行代码，在 try 和 catch 之后，无论结果如何。**

## 错误对象

| 属性    | 描述                             |
| :------ | :------------------------------- |
| name    | 设置或返回错误名                 |
| message | 设置或返回错误消息（一条字符串） |

## Error Name Values

| 错误名         | 描述                          |
| :------------- | :---------------------------- |
| EvalError      | 已在 eval() 函数中发生的错误  |
| RangeError     | 已发生超出数字范围的错误      |
| ReferenceError | 已发生非法引用                |
| SyntaxError    | 已发生语法错误                |
| TypeError      | 已发生类型错误                |
| URIError       | 在 encodeURI() 中已发生的错误 |

**提升（Hoisting）是 JavaScript 将声明移至顶部的默认行为。**

## 严格模式

**"use strict"; 定义 JavaScript 代码应该以“严格模式”执行。**

## 严格模式中不允许的事项

+ 在不声明变量的情况下使用变量，是不允许的
+ 在不声明对象的情况下使用对象也是不允许的
+ 删除变量（或对象）是不允许的
+ 删除函数是不允许的
+ 重复参数名是不允许的
+ 八进制数值文本是不允许的
+ 转义字符是不允许的
+ 写入只读属性是不允许的
+ 写入只能获取的属性是不允许的
+ 删除不可删除的属性是不允许的
+ 字符串 "eval" 不可用作变量
+ 字符串 "arguments" 不可用作变量
+ with 语句是不允许的
+ 处于安全考虑，不允许 eval() 在其被调用的作用域中创建变量

## javascript 类

**请使用关键字 class 创建类。**

**请始终添加名为 constructor() 的方法**

然后添加任意数量的方法

## Constructor 方法

构造方法是一种特殊的方法：

+ 它必须拥有确切名称的“构造函数”
+ 创建新对象时自动执行
+ 用于初始化对象属性
+ 如果未定义构造函数方法，JavaScript 会添加空的构造函数方法。

## javascript 与json

使用 JavaScript 的内建函数 JSON.parse() 来把这个字符串转换为 JavaScript 对象

任何 JavaScript 对象都可以使用 JavaScript 函数 JSON.stringify() 进行字符串化（转换为字符串）

## debug

*debugger* 关键词会停止 JavaScript 的执行，并调用（如果有）调试函数。ECMAScript 5 (2009) 引入了 Getter 和 Setter。

## **Getter 和 Setter 允许您定义对象访问器（被计算的属性）。**

```js
// 创建对象：
var person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "en",
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  }
};

// 使用 getter 来显示来自对象的数据：
document.getElementById("demo").innerHTML = person.lang;
```

### 为什么使用 Getter 和 Setter？

+ 它提供了更简洁的语法
+ 它允许属性和方法的语法相同
+ 它可以确保更好的数据质量
+ 有利于后台工作

## JavaScript prototype 属性允许您为对象构造器添加新属性

**请只修改*您自己*的原型。绝不要修改标准 JavaScript 对象的原型。**

## js对象方法

```js
//管理方法
// 以现有对象为原型创建对象
Object.create()

// 添加或更改对象属性
Object.defineProperty(object, property, descriptor)

// 添加或更改对象属性
Object.defineProperties(object, descriptors)

// 访问属性
Object.getOwnPropertyDescriptor(object, property)

// 以数组返回所有属性
Object.getOwnPropertyNames(object)

// 访问原型
Object.getPrototypeOf(object)

// 以数组返回可枚举属性
Object.keys(object)

//保护对象
// 防止向对象添加属性
Object.preventExtensions(object)

// 如果属性可以添加到对象，则返回 true
Object.isExtensible(object)

// 防止更改对象属性（不是值）
Object.seal(object)

// 如果对象被密封，则返回 true
Object.isSealed(object)

// 防止对对象进行任何更改
Object.freeze(object)

// 如果对象被冻结，则返回 true
Object.isFrozen(object)

//ES5 允许更改以下属性元数据
writable : true      // 属性值可更改
enumerable : true    // 属性可枚举
configurable : true  // 属性可重新配置
```

## Map

### 基本的 Map() 方法

| Method    | Description                    |
| :-------- | :----------------------------- |
| new Map() | 创建新的 Map 对象。            |
| set()     | 为 Map 对象中的键设置值。      |
| get()     | 获取 Map 对象中键的值。        |
| entries() | 返回 Map 对象中键/值对的数组。 |
| keys()    | 返回 Map 对象中键的数组。      |
| values()  | 返回 Map 对象中值的数组。      |

### Map() 属性

| Property | Description               |
| -------- | ------------------------- |
| size     | 获取 Map 对象中某键的值。 |

### 其他 Map() 方法

| 方法      | 描述                      |
| :-------- | :------------------------ |
| clear()   | 删除 Map 中的所有元素。   |
| delete()  | 删除由键指定的元素。      |
| has()     | 如果键存在，则返回 true。 |
| forEach() | 为每个键/值对调用回调     |

## Set

Set 是唯一值的集合。

每个值在 Set 中只能出现一次。

一个 Set 可以容纳任何数据类型的任何值。

## Set 对象的方法和属性

| new Set() | 创建新的 Set 对象。       |
| --------- | ------------------------- |
| add()     | 向 Set 添加新元素。       |
| clear()   | 从 Set 中删除所有元素。   |
| delete()  | 删除由其值指定的元素。    |
| entries() | 返回 Set 对象中值的数组。 |
| has()     | 如果值存在则返回 true。   |
| forEach() | 为每个元素调用回调。      |
| keys()    | 返回 Set 对象中值的数组。 |
| values()  | 与 keys() 相同。          |
| size      | 返回元素计数。            |

## 通过 call()，您能够使用属于另一个对象的方法

## 通过 apply() 方法，您能够编写用于不同对象的方法

## call() 和 apply() 之间的区别

不同之处是：

call() 方法分别接受参数。

apply() 方法接受数组形式的参数。

如果要使用数组而不是参数列表，则 apply() 方法非常方便。

## 如需创建类继承，请使用 extends 关键字

## super() 方法引用父类

## 如需在类中添加 getter 和 setter，请使用 get 和 set 关键字

**static 类方法是在类本身上定义的。**

**您不能在对象上调用 static 方法，只能在对象类上调用**

***async* 使函数返回 Promise**

***await* 使函数等待 Promise**

## JavaScript Html事件

## 输入事件

+ onblur - 当用户离开输入字段时
+ onchange - 当用户更改输入字段的内容时
+ onchange - 当用户选择下拉值时
+ onfocus - 当输入字段获得焦点时
+ onselect - 当输入文本被选取时
+ onsubmit - 当用户点击提交按钮
+ onreset - 当用户点击重置按钮
+ onkeydown - 当用户按下/按住某个键时
+ onkeypress - 当用户按下/按住某个键时
+ onkeyup - 当用户释放按键时
+ onkeyup - 当用户释放按键时
+ onkeydown vs onkeyup - 两者

## 鼠标事件

+ onmouseover/onmouseout - 当鼠标经过一个元素时
+ onmousedown/onmouseup - 当按下/释放鼠标按钮时
+ onmousedown - 当按下鼠标时：提示点击了哪个元素
+ onmousedown - 当点击鼠标时：提示点击了哪个按钮
+ onmousemove/onmouseout - 当把鼠标指针移入/移出 div 时
+ onmouseover/onmouseout - 当把鼠标指针移入/移出图像时
+ onmouseover - 将鼠标悬停在图像映射上

## 点击事件

+ 对 onclick 事件作出反应
+ onclick - 单击按钮时
+ ondblclick - 双击文本时

## 加载事件

+ onload - 页面加载后
+ onload - 图像加载后
+ onerror - 当图像加载时发生错误
+ onunload - 当浏览器关闭文档时
+ onresize - 当浏览器窗口大小被调整时

[更多事件](https://www.w3school.com.cn/jsref/dom_obj_event.asp)

## 函数高级

### 原型与原型链

<img src="F:/git/githubio/ljk.github.io/docs/images/yxl.jpg" alt="原型链" style="zoom:50%;" />

### 执行上下文与执行上下文栈

### 作用域与 作用域链

### 闭包

## 操作DOM

+ `Dom.classList.toggle` 给元素增加或消除某个类
+ `classList.add()`
+ `classList.remove()`

### 获取宽高

| 元素尺寸属性 | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| clientWidth  | 获取元素可视部分的宽度，即 CSS 的 width 和 padding 属性值之和，元素边框和滚动条不包括在内，也不包含任何可能的滚动区域 |
| clientHeight | 获取元素可视部分的高度，即 CSS 的 height 和 padding 属性值之和，元素边框和滚动条不包括在内，也不包含任何可能的滚动区域 |
| offsetWidth  | 元素在页面中占据的宽度总和，包括 width、padding、border 以及滚动条的宽度 |
| offsetHeight | 元素在页面中占据的高度总和，包括 height、padding、border 以及滚动条的宽度 |
| scrollWidth  | 当元素设置了 overflow:visible 样式属性时，元素的总宽度，也称滚动宽度。在默认状态下，如果该属性值大于 clientWidth 属性值，则元素会显示滚动条，以便能够翻阅被隐藏的区域 |
| scrollHeight | 当元素设置了 overflow:visible 样式属性时，元素的总高度，也称滚动高度。在默认状态下，如果该属性值大于 clientWidth 属性值，则元素会显示滚动条，以便能够翻阅被隐藏的区域 |
| clientLeft   | 左边框宽度                                                   |
| offsetLeft   | 距离定位父元素的左边距                                       |

## 自定义菜单

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>test</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }

    .context {
      list-style: none;
      border: 1px solid #eee;
      width: fit-content;
      padding: 0;
      margin: 0;
      position: absolute;
      display: none;
    }

    .context li {
      font-size: 1rem;
      padding: 0.3rem;
    }
  </style>
</head>

<body>
  <ul class="context">
    <li>复制</li>
    <li>博客</li>
    <li>github</li>
  </ul>
  <script>
    let contenxt =      document.querySelector(".context")
    document.oncontextmenu = function (e) {
      e.preventDefault();
      contenxt.style.display = "block";
      contenxt.style.left = e.clientX + "px";
      contenxt.style.top = e.clientY + "px";
    }

    document.onclick = function () {
      //  alert("fuck");
      contenxt.style.display = "none";
    }
  </script>
</body>

</html>
```

## Function

```html
<!doctype html>
<html>

<head>
 <meta charset="utf-8">
 <title>js高级</title>
 <style>
 </style>
</head>

<body>
 </div>
 <script>
  //原型
  /*
  1．函数的prototype属性(图)
    *每个函数都有一个prototype属性，它默认指向一个object空对象(即称为:原型对象)对Object不使用，值为null
    *原型对象中有一个属性constructor，它指向函数对象
  2．给原型对象添加属性(一般都是方法)
    *作用:函数的所有实例对象自动拥有原型中的属性(方法)
  */

  /* console.log(Date.prototype)
  function Fun() { }
  Fun.prototype.test = function () {//默认为空对象，没有我们的属性
   console.log('test()')
  }
  console.log(Fun.prototype)
  console.log(Fun.prototype.constructor === Fun)
  console.log(Date.prototype.constructor === Date)
  var fun = new Fun()
  fun.test() */


  //显式原型与隐式原型
  /*
  1.每个函数function都有一个prototype，即显式原型
  2.每个实例对象都有一个__proto__，可称为隐式原型
  3.对象的隐式原型的值为其对应构造函数的显式原型的值
  4.内存结构(图)
  5.总结:
  *函数的prototype属性:在定义函数时自动添加的，默认值是一个空Object对象
  *对象的__proto__属性:创建对象时自动添加的。默认值为构造函数的prototype属性值
  *程序员能直按操作显式原型，但不能直接操作隐式原型(ES6之前)
  */

  /* function Fn() { }

  console.log(Fn.prototype)

  var fn = new Fn()
  console.log(fn)
  console.log(fn.__proto__)
  console.log(fn.__proto__ === Fn.prototype) //true

  //给原型添加方法
  Fn.prototype.test = function () {
   console.log('test()')
  }
  fn.test() */

  //原型链
  /*
  1．原型链(图解)
  *访问一个对象的属性时,
   *先在自身属性中查找,找到返回
   *如果没有,再沿著__proto_这条链向上查找，找到返回
   *如果最终没找到，返回undefined
  *别名:隐式原型链
  *作用:查找对象的属性(方法)
  2．构造函数/原型/实体对象的关系(图解)
  3．构造函数/原型/实体对象的关系2(图解)
  */
  /* function Fn() {
   this.test1 = function () {
    console.log('test1()')
   }
  }

  Fn.prototype.test2 = function () {
   console.log('test2()')
  }

  let fn = new Fn();
  fn.test1()
  fn.test2()
  console.log(fn.toString()) */
  //所有函数都有一个隐式原型指向Function.prototype
  //Function是new自己产生的
  //所有的函数的__proto__相同
  /* console.log(Object.prototype instanceof Object)//false
  console.log(Function.prototype instanceof Object)//true */



  //Function是它自己的实例，所有函数都是Function的实例
  // console.log(Function.__proto__ === Function.prototype)//true
  //object的原型对象是原型链的尽头
  // console.log(Object.prototype.__proto__)


  /*
  1．读取对象的属性值时:会自动到原型链中查找
  2．设置对象的属性值时:不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
  3．方法一般定义在原型中，属性一般通过构造函数定义在对象本身上
  */



  /*
  1. instanceof是如何判断的?
   *表达式:A instanceof B
   *如果B函数的显式原型对象在A对象的原型链上，返回true，否则返回false
  2. Function是通过new自己产生的实例
  */
  // console.log(Object instanceof Object)//true Object->Function->Object




  //执行上下文与执行上下文栈


  /*
  1．代码分类(位置)
  *全局代码
  *函数（局部）代码
  2．全局执行上下文
  *在执行全局代码前将window确定为全局执行上下文
  *对全局数据进行预处理
   * var定义的全局变量==>undefined,添加为window的属性
   * function声明的全局函数==>赋值(fun)，添加为window的方法
   * this==>赋值(window)
  *开始执行全局代码
  3.函数执行上下文
  *在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象
  *对局部数据进行预处理
   *形参变量==>赋值(实参)==>添加为执行上下文的属性
   *arguments==>赋值(实参列表),添加为执行上下文的属性
   *var定义的局部变量==>undefined，添加为执行上下文的属性
   *function声明的函数==>赋值(fun)，添加为执行上下文的方法
   *this==>赋值(调用函数的对象)
  *开始执行函数体代码
  */



  //执行上下文栈
  /*
  1．在全局代码执行前，JS引擎就会创建一个栈来存储管理所有的执行上下文对象
  2．在全局执行上下文( window)确定后，将其添加到栈中(压栈)
  3．在函数执行上下文创建后，将其添加到栈中(压栈)
  4. 在当前函数执行完后,将栈顶的对象移除(出栈)
  5．当所有的代码执行完后，栈中只剩下window
  */
  //函数调用产生执行上下文
  /* var a = 10
  var bar = function (x) {
   var b = 5
   foo(x + b)
  }
  var foo = function (y) {
   var c = 5
   console.log(a + c + y)
  }
  bar(10) */

  /*  console.log('gb:' + i)
   var i = 1
   foo(1)
   function foo(i) {
    if (i == 4) {
     return
    }
    console.log('fb:' + i)
    foo(i + 1)// 递归调用: 在函数内部调用自己
    console.log('fe:' + i)
   }
   console.log("ge: " + i) */

  /*
  gb:undefined
  fb:1
  fb:2
  fb:3
  fe:3
  fe:2
  fe:1
  ge:1
  */

  //面试题

  //先执行变量提升后执行函数提升
  /* function a() { };
  var a;
  console.log(typeof a) */

  /* if (!(b in window)) {
   var b = 1
  }
  console.log(b)//undefined


  var c = 1
  function c(c) {
   console.log(c)
  }
  c(2)//报错相当于 var c; function c(c){console.log(c)} c=1 c(2) */



  //作用域与作用域链
  /*
  1．理解
   *就是一块"地盘",一个代码段所在的区域
   *它是静态的(相对于上下文对象)，在编写代码时就确定了
  2．分类
   *全局作用域
   *函数作用域
   *没有块作用域(ES6有了)
  3．作用
   *隔离变量，不同作用域下同名变量不会有冲突
  */

  /*与执行上下文相比
  1．区别1
  *全局作用域之外，每个函数都会创建自己的作用域（n+1），作用域在函数定义时就已经确定了。而不是在函数调用时
  *全局执行上下文环境是在全局作用域确定之后，js代码马上执行之前创建
  *函数执行上下文环境是在调用函数时，函数体代码执行之前创建
  2.区别2
  *作用域是静态的，只要函数定义好了就一直存在，且不会再变化
  *执行上下文环境是动态的，调用函数时创建，函数调用结束时上下文环境就会自动被释放
  3.联系
  *执行上下文环境(对象)是从属于所在的作用域
  *全局上下文环境==>全局作用域
  *函数上下文环境==>对应的函数使用域
  */


  /*作用域链
  1．理解
  *多个上下级关系的作用域形成的链，它的方向是从下向上的(从内到外)
  *查找变量时就是沿着作用域链来查找的
  2．查找一个变量的查找规则
  *在当前作用域下的执行上下文中查找对应的属性，如果有直接返回，否则进入2
  *在上一级作用域的执行上下文中查找对应的属性，如果有直接返回，否则进入3
  *再次执行2的相同操作，直到全局作用域，如果还找不到就抛出找不到的异常
  */

  //作用域大于执行上下文

  //面试题
  /* var x = 10
  function fn() {
   console.log(x)
  }
  function show(f) {
   var x = 20
   f()
  }
  show(fn)//10 作用域在声明时建立 */


  /* var fn = function () {
   console.log(fn)
  }
  fn()

  var obj = {
   fn2: function () {
    console.log(this.fn2)
   }
  }
  obj.fn2() */

  //闭包
  /*
  1.如何产生闭包?
  *当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时，就产生了闭包
  2．闭包到底是什么?
  *使用chrome调试查看
  *理解一:闭包是嵌套的内部函数(绝大部分人)
  *理解二:包含被引用变量(函数)的对象(极少数人)
  *注意:闭包存在子嵌套的内部函数中
  3．产生闭包的条件?
  *函数嵌套
  *内部函数引用了外部函数的数据(变量/函数)
  */

  /*function fn1() {
    var a = 2;
    var b = 'abc'
    function fn2() {//执行函数定义就会产生闭包（不用调用内部函数）
     console.log(a)
    }
    fn2()//需要return或调用后才能在浏览器中看到
   }
   fn1() */

  //常见的闭包
  /*
  1．将函数作为另一个函数的返回值
  2．将函数作为实参传递给另一个函数调用
  */
  /* function fn1() {
   var a = 2;
   function fn2() {
    a++;
    console.log(a)
   }
   return fn2
  }

  var f = fn1()
  f()//3
  f()//4 */

  //将函数作为实参传递给另一个函数调用
  /* function showDelay(msg, time) {
   setTimeout(function () {
    alert(msg)
   }, time)
  }
  showDelay('ljk', 2000) */

  /*//闭包的作用
  1．使用函数内部的变量在函数执行完后，仍然存活在内存中(延长了局部变量的生命周期)
  2．让函数外部可以操作(读写)到函数内部的教据(变量/函数)
  问题:
  1.函数执行完后,函数内部声明的局部变量是否还存在? 一般不存在，产生闭包时存在
  2.在函数外部能直接访问函数内部的局部变量吗? 不能，通过闭包可以
  */
  /* function fn1() {
   var a = 2;
   function fn2() {
    a++;
    console.log(a)
   }
   return fn2
  }

  var f = fn1()
  f()//3
  f()//4 */

  //f = null//闭包死亡（包含闭包的函数对象成为垃圾对象）
  /*//闭包的生命周期
  1.产生:在嵌套内部函数定义执行完时就产生了(不是在调用)
  2．死亡:在嵌套的内部函数成为垃圾对象时
  */

  /*
  1．缺点
  *函数执行完后，函数内的局部变量没有释放，占用内存时间会变长
  *容易造成内存泄露
  2.解决
  *能不用闭包就不用
  *及时释放
  */


  /*
  1.内存溢出
   *一种程序运行出现的错误
   *当程序运行需要的内存超过了剩余的内存时，就出抛出内存溢出的错误
  2．内存泄露
  *占用的内存没有及时释放
  *内存泄露积累多了就容易导致内存溢出
  *常见的内存泄露:
   *意外的全局变量
   *没有及时清理的计时器或回调函数
   *闭包
  */



  //面试题
  function fun(n, o) {
   console.log(o)
   return {
    fun: function (m) {
     return fun(m, n)
    }
   }
  }
  var a = fun(0)
  a.fun(1)
  a.fun(2)
  a.fun(3)//undefined,0,0,0

  var b = fun(0).fun(1).fun(2).fun(3)//undefined,0,1,2
  var c = fun(0).fun(1)
  c.fun(2)
  c.fun(3)//undefined,0,1,1
 </script>

 <!-- 闭包的应用 -->
 <!-- <script src="./myModule.js"></script>
	<script src="./myModule2.js"></script>
	<script>
		var module = myModule()
		module.doSomething()
		module.doOtherthing()

		myModule2.doOtherthing()
		myModule2.doSomething()
	</script> -->
</body>

</html>
```

## Object

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>对象</title>
</head>

<body>
  <script>
    //Object构造函数模式
    /*
    *套路:先创建空object对象，再动态添加属性/方法
    *适用场景:起始时不确定对象内部数据
    *问题:语句太多
    */
    /* var p = new Object()
    p.name = 'Tom'
    p.age = 12
    p.setName = function (name) {
      this.name = name
    }
    p.setName('Jack')
    console.log(p.name, p.age) */

    /*
    方式二:对象字面量模式
    *套路:使用{}创建对象,同时指定局性/方法
    *适用场景:起始时对象内部数据是确定的
    *问题:如果创建多个对象,有重复代码
    */
    /* var p = {
      name: 'Tom',
      age: 12,
      setName: function (name) {
        this.name = name
      }
    }

    console.log(p.name, p.age)
    p.setName('jack')
    console.log(p.name, p.age) */


    /*
    方式三:工厂模式
    *套路:通过工厂函数动态创建对象并返回
    *适用场景:需要创建多个对象
    *问题:对象没有一个具体的类型，都是object类型
    */

    /* function creatPerson(name, age) {
      var obj = {
        name: name,
        age: age,
        setName: function (name) {
          this.name = name
        }
      }
      return obj
    }

    var p1 = creatPerson('Tom', 12)
    var p2 = creatPerson('jack', 18)
    console.log(p1, p2)
 */


    /*
    方式四:自定义构造函数模式
    *套路:自定义构造函数,通过new创建对象
    *适用场景:需要创建多个类型确定的对象
    *问题:每个对象都有相同的数据，浪费内存
    */
    /* function Person(name, age) {
      this.name = name
      this.age = age
      this.setName = (name) => {
        this.name = name
      }
    }

    var p1 = new Person('Tom', 18)
    p1.setName('jack')
    console.log(p1)
 */


    /*
    方式六:构造函数+原型的组合模式
    *套路:自定义构造函数，属性在函数中初始化，方法添加到原型上
    *适用场景:需要创建多个类型确定的对象
    */
    /* function Person(name, age) {
      this.name = name
      this.age = age
    }

    Person.prototype.setName = function (name) {
      this.name = name
    }
    var p1 = new Person('Tom', 23)
    var p2 = new Person('jack', 18)
    console.log(p1, p2) */


    //继承模式

    /*
    方式1:原型链继承
    1．套路
      1．定义父类型构造函数
      2．给父类型的原型添加方法
      3．定义子类型的构造函数
      4. 创建父类型的对象赋值给子类型的原型
      5．将子类型原型的构造属性设置为子类型
      6．给子类型原型添加方法
      7.创建子类型的对象:可以调用父类型的方法
    2．关键
      1.子类型的原型为父类型的一个实例对象
    */
    //父类型
    /* function Supper() {
      this.supProp = 'Supper property'
    }
    Supper.prototype.showSupperProp = function () {
      console.log(this.supProp)
    }

    //子类型
    function Sub() {
      this.subProp = 'Sub property'
    }
    Sub.prototype = new Supper()//子类型原型为父类型实例对象
    Sub.prototype.constructor = Sub//修改子类型原型的construct指向子类型
    Sub.prototype.showSubProp = function () {
      console.log(this.subProp)
    }

    var sub = new Sub()
    sub.showSupperProp()
    console.log(sub)
    console.log(sub.constructor) */

    /*
    方式2:借用构造函数继承(假的)
    1．套路:
      1.定义父类型构造函数
      2.定义子类型构造函数
      3.在子类型构造函数中调用父类型构造
    2．关键:
      1．在子类型构造函数中通用call()调用父类型构造函数
    */

    /*  function Person(name, age) {
       this.name = name
       this.age = age
     }
     function Student(name, age, price) {
       Person.call(this, name, age)//相当于：this.Person(name,age)
       this.price = price
     }

     var s = new Student('Tom', 20, 14000)
     console.log(s.name, s.age, s.price) */


    //组合继承
    /*
    方式3:原型链+借用构造函数的组合继承
    1．利用原型链实现对父类型对象的方法继承
    2.利用super()借用父类型构建函数初始化相同属性
    */
    /* function Person(name, age) {
      this.name = name
      this.age = age
    }
    Person.prototype.setName = function (name) {
      this.name = name
    }
    function Student(name, age, price) {
      Person.call(this, name, age)//相当于：this.Person(name,age)得到属性
      this.price = price
    }
    Student.prototype = new Person()//得到方法
    Student.prototype.constructor = Student//修正constructor
    Student.prototype.setPrice = function (price) {
      this.price = price
    }

    var s = new Student('Tom', 24, 15000)
    s.setName('ljk')
    s.setPrice(24000)
    console.log(s) */
  </script>

</body>

</html>
```

## 定时器引发的思考

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>启动定时器</title>
</head>

<body>
  <!-- 
1．定时器真是定时执行的吗?
  *定时器并不能保证真正定时执行
  *一般会延迟一丁点(可以接受)，也有可能延迟很长时间(不能接受)
2．定时器回调函数是在分线程执行的吗?
  *在主线程执行的,js是单线程的
3．定时器是如何实现的?
  *事件循环模型(后面讲)


1.如何证明js执行是单线程的?
  * setTimeout()的回调函数是在主线程执行的
  *定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行
2．为什么js要用单线程模式,而不用多线程模式?
  * Javascript的单线程，与它的用途有关。
  *作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
  *这决定了它只能是单线程，否则会带来很复杂的同步问题
3．代码的分类:
  *初始化代码
  *回调代码
4. js 引擎执行代码的基本流程
  *先执行初始化代码:包含一些特别的代码  回调函数（异步执行）
    *设置定时器
    *绑定监听 
    *发送ajax请求
  *后面在某个时刻才会执行回调代码
 -->
  <!-- <button id="btn">启动定时器</button> -->


  <!-- <button id="btn">测试</button> -->

  <input type="text" placeholder="数值" id="number">
  <button id="js">计算</button>
  <script>
    /* document.getElementById('btn').onclick = function () {
      var start = Date.now()
      console.log('启动定时器前')
      setTimeout(function () {
        console.log('定时器执行了', Date.now() - start)
      }, 200)
      console.log('启动定时器后')

      //做一个长时间的工作
      for (let index = 0; index < 1000000000; index++) {
      }
    } */

    //证明js执行是单线程的
    /* setTimeout(function () {
      console.log('timeout 2000')
      alert('2000')
    }, 2000)

    setTimeout(function () {
      console.log('timeout 1000')
      console.log('1000')
    }, 1000)

    function fn() {
      console.log('fn()')
    }
    fn()
    console.log('alert()之前')
    alert('--------')//暂停当前主线程的执行，同时暂停计时，点击确定后恢复
    console.log('alert()之后') */


    //事件循环模型
    /*
    1.所有代码分类
      *初始化执行代码(同步代码):包含绑定dom事件监听，设置定时器，发送ajax请求的代码
      *回调执行代码(异步代码):处理回调逻辑
    2. js引擎执行代码的基本流程:
      *初始化代码===>回调代码
    3．模型的2个重要组成部分:
      *事件(dom事件,定时器,ajax)管理模块
      *回调队列
    4．模型的运转流程
      *执行初始化代码，将事件回调函数交给对应模块管理
      * 当事件发生时，管理模块会将回调函数及其数据添加到回调列队中
      *只有当初始化代码执行完后(可能要一定时间)，才会遍历读取回调队列中的回调函数执行
    */
    /* function fn1() {
      console.log('fn1()')
    }
    fn1()
    document.getElementById('btn').onclick = function () {
      console.log('点击')
    }
    setTimeout(function () {
      console.log('定时器执行')
    }, 2000)
    function fn2() {
      console.log('fn2()')
    }
    fn2() */


    //H5 webworks
    /*
    1.H5规范提供了js分线程的实现，取名为: web workers
    2．相关API
      *Worker:构造函数，加载分线程执行的js文件
      *Worker.prototype.onmessage:用于接收另一个线程的回调函数
      *Worker.prototype.postMessage:向另一个线程发送消息
    3．不足
    *worker内代码不能操作DOM(更新uI)
    *不能跨域加载JS
    *不是每个浏览器都支持这个新特性
    */

    /* var input = document.getElementById('number')
    var btn = document.getElementById('js')
    btn.onclick = function () {
      var number = input.value
      //创建一个worker
      var worker = new Worker('worker.js')
      worker.onmessage = function (event) {
        console.log(event)
        console.log('主线程接收分线程返回数据：' + event.data)
      }
      worker.postMessage(number)
      console.log('主线程向分线程发送数据：' + number)
    } */

  </script>
</body>

</html>
```

## 事件循环

一个进程可以有多个线程，线程至少有一个主线程

浏览器多进程多线程-避免相互影响减少连环崩溃的几率

+ 网络进程
+ 渲染进程
+ 浏览器进程

### 浏览器进程

页面展示，除页面内容例如标签页，窗口导航栏展示，用户交互，子进程管理

### 网络进程

负责加载网络资源

### 渲染进程

渲染进程启动后，会开启一个**渲染主线程**，主线程负责执行HTML、CSS、JS代码

默认打开一个新标签页会开启一个新的渲染进程，保证标签页的独立

优先级

+ 微队列
+ 交互队列
+ 延时队列

## 计时器不能做到精确计时

+ 调用操作系统函数会有延时
+ 代码执行会有延时
+ 受事件循环的影响

## 渲染原理

渲染流程

+ 网络获取html源码
+ 解析HTML   生成DOM树 CSSOM树
+ 样式计算 得到计算后的样式 生成含计算样式的DOM树
+ 布局 计算相对包含块的布局 生成Layout树包含有几何信息的元素
+ 分层 减少完全重绘页面，可以在控制台选择更多工具-图层查看，影响分层，设置will-change告诉浏览器哪些属性可能会变化
+ 绘制 为每一个层生成绘制指令

剩下步骤交给其他线程完成

+ 分块 将一层分为多个小的区域，交给合成线程会从线程池获取多个线程完成分块
+ 光栅化 交给GPU进程完成光栅化生成一块一块的位图，优先处理靠近视口的块
+ 画 计算出每个位图在屏幕上的位置，生成指引信息【quad】交给GPU进行最终呈现
+ 像素信息

### 解析HTML

为提高解析效率，浏览器会启动一个预解析器率先下载和解析CSS

所以渲染不会被css阻塞

遇到JS必须暂停一切行为，等待下载执行完后继续

预解析线程可以分担一点下载JS任务

### reflow（重排）

修改布局树影响CSSOM或DOM

读取属性时可能会得到上次的数据

### repaint（重绘）

重新根据分层信息计算了绘制指令

## 属性描述符

+ Object.getOwnPropertyDescriptor()
+ Object.defineProperty()

## this

    1. 默认绑定规则 指向window 函数独立调用指向window
       全局函数严格模式执行undefined
    2. 隐式绑定规则 谁调用指向谁(隐式丢失 参数赋值)
    3. 立即执行函数指向window
    4. 显式绑定call,bind,apply 可以修改this指向(绑定失败会指向window)
    5. 函数作为参数时发生预编译，形参会赋值浅拷贝
    6. 父函数可以决定子函数的this指向 sort,reduce方法第三个参数可以修改this指向
    7. new操作指向实例对象可以this重写即return的返回的值为引用值
    8. new>显式绑定>隐私绑定>默认绑定
    9. 箭头函数的this 不能显式绑定改变this指向,隐式绑定无效,默认绑定无效,会指向外层最近的this(本身没有this)
       指定了严格模式('use strict'),this指向undefined
