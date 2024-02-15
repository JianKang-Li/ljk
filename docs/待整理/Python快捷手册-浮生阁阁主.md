Python快捷手册-浮生阁阁主# python基础

## list

- 添加元素: append, insert, extend
- 删除元素: del删除某个元素, pop取出最后一个,remove删除对应元素(要元素值做参数)
- 统计相同元素count
- 索引列表元素index
- 倒序元素reverse
- 排序从小到大sort

## tuple(元组)

**逗号必有**

- 删除元组del
- 计算个数len
- 找最大值max
- 最小值min
- 判断元素是否在元组中in
- 统计次数count
- 返回位置index

## 格式化

- 左对齐`-`
- 正数前面显示`+`用`+`
- 用`0`代替空格`05d`
- `#`在对应进制前显示标记#x十六进制#o八进制
- `m.n`表示最小总位数为m小数部分为n位

## 序列

- 求和sum
- 排序sorted
- list(sorted(tuple1))
- max
- min
- list(reversed(tuple1))翻转元组数据但数据结构变了
- list(enumerate(tuple1))将元素枚举出来成列表,出来结果类似二维数组

## 函数

- lambda可以省略函数定义过程不考虑命名
- filter过滤函数(参数有两个，第一个参数为过滤规则，第二个参数为过滤对象)

## 字典

- 创建字典`dict1={}`
- 访问键keys()
- 访问值values()
- 访问键值对items()
- get()方法提供了更宽松的方式去访问字典项没有则返回None
- clear清空字典
- copy复制一个字典
- pop给定键弹出值popitem随机弹出一项
- setdefault()方法与get()方法相似，但setdefault()在字典中找不到相应的键值时会自动添加
- update()方法可以更新字典参数为键值对

## 集合(set)

- 工厂模式创建`set()`
- 元素唯一
- 添加元素`add`
- 删除元素`remove`
- 不可变集合（把元素给froze冰冻起来）(像元组一样不能随意地增加或删除集合中的元素)`frozenset()`

## os模块

- 获取地址`getcwd()`
- 获取目录中的文件`listdir`

## 类

- class 类名
- 初始化`def __init__(self,name)`
- 定义方法`def ljk(self)`
- 参数第一个为`self`
- 类的继承class 子类名(父类名):
- 为了实现定义私有变量，只需要在变量名或函数名前加上"__"两个下划线，那么这个函数或变量就会变成私有的了
- 多重继承class 子类名(父类1名,父类2名):
- 拾遗:组合（将需要的类一起进行实例化并放入新的类中）
- **另外，如果属性的名字跟方法名相同，属性会覆盖方法：**
- `issubclass(class, classinfo)` 如果第一个参数（class）是第二个参数（classinfo）的一个子类，则返回True，否则返回False
- `isinstance(object, classinfo)`如果第一个参数（object）是第二个参数（classinfo）的实例对象，则返回True，否则返回False
- `hasattr(object, name)`用来测试一个对象里是否有指定的属性，第一个参数（object）是对象，第二个参数（name）是属性名（属性的字符串名字）
- `getattr(object, name[, default])` 返回对象指定的属性值，如果指定的属性不存在，则返回default(可选参数);若没有设置default参数，则抛出异常
- `setattr(object, name, value)`可以设置对象中指定属性的值，如果指定的属性不存在，则会新建属性并赋值
- `delattr(object, name)`用于删除对象中指定的属性，如果属性不存在，抛出异常。
- `property(fget=None, fset=None, fdel=None, doc=None)`用来通过属性设置属性，第一个参数是获取属性的方法名，第二个参数是设置属性的方法名，第三个参数是删除属性的方法名

## 位运算

| 运算符 | 含义     | 功能                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| &      | 按位与   | 如果两个相应的二进制位都为1，则该位的结果值为1;否则为0。     |
| \|     | 按位或   | 两个相应的二进制位中只要有一个为1，该位的结果值为1。         |
| ^      | 按位异或 | 若参加运算的两个二进制位同号则结果为0假）异号则结果为1(真)   |
| ~      | 取反     | ~是一个单目(元)运算符，用来对一个二进制数按位取反，即将0变1，将1变0。 |
| <<     | 左移     | 左移运算符是用来将一个数的各二进制位全部左移N位，右补0。     |
| >>     | 右移     | 表示将a的各二进制位右移N位，移到右端的低位被舍弃,对无符号数,高位补0。 |



## 杂项

- id返回内存地址
- len返回长度

[参考文章](https://blog.csdn.net/qq_32809093/article/details/95892118?utm_source=app&app_version=5.0.1&code=app_1562916241&uLinkId=usr1mkqgl919blen)

[最新版本](https://www.jianguoyun.com/p/DUSo8nwQ6oL_CRiUs6wE)
