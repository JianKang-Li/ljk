
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

#### 原型（protopype）

### 执行上下文与执行上下文栈

### 作用域与 作用域链

### 闭包
