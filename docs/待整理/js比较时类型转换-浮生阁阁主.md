js比较时类型转换-浮生阁阁主+ 如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回true。
+ 如果一个操作数是null，另一个操作数是undefined，则返回true。

如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
+ 当数字与字符串进行比较时，会尝试将字符串转换为数字值。
+ 如果操作数之一是Boolean，则将布尔操作数转换为 1 或 0。
	+ 如果是true，则转换为1。
	+ 如果是 false，则转换为0。

+ 如果操作数之一是对象，另一个是数字或字符串，会尝试使用对象的valueOf()和toString()方法将对象转换为原始值。

**数字>String>Boolean>Object**

如果操作数具有相同的类型，则将它们进行如下比较：
+ String：true仅当两个操作数具有相同顺序的相同字符时才返回。
+ Number：true仅当两个操作数具有相同的值时才返回。+0并被-0视为相同的值。如果任一操作数为NaN，则返回false。
+ Boolean：true仅当操作数为两个true或两个false时才返回true。

隐式转换规则：调用 ToPrimitive() 内部函数，将对象转换为字符串，然后两者进行比较。
注：在 js 中，想要将对象转换成原始值，必然会调用 toPrimitive() 内部函数。
+ ToPrimitive() 方法

toPrimitive(input,preferedType?)

input是输入的值，preferedType是期望转换的类型，他可以是字符串，也可以是数字。

如果转换的类型是number，会执行以下步骤：

1. 如果input是原始值，直接返回这个值；

2. 否则，如果input是对象，调用input.valueOf()，如果结果是原始值，返回结果；

3. 否则，调用input.toString()。如果结果是原始值，返回结果；

4. 否则，抛出错误。

如果转换的类型是String，2和3会交换执行，即先执行toString()方法。
+ valueOf() 方法

Array：返回数组对象本身。

Boolean： 返回布尔值

Date：存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。

Function： 返回函数本身。

Number： 返回数字值。

Object：返回对象本身。这是默认情况。

String：返回字符串值。

Math 和 Error 对象没有 valueOf 方法。
+ toString() 方法

undefined 和 null 是一个原始值，不是对象，没有原型，故调用不到 Object.prototype(原型链最终原型) 的 toString 方法

Object \[object Object]

Array   "1,2"

String  "demo"

Number  "1"

Boolean  "true"

Function  返回本身字符串

Date 返回字符串类型


请注意，使用构造的字符串new String()是对象。如果将其中之一与字符串文字进行比较，则该String对象将被转换为字符串文字并对其内容进行比较。但是，如果两个操作数都是String对象，则将它们作为对象进行比较，并且必须引用相同的对象才能进行比较