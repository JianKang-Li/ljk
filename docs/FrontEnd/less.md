# less

 less是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言，
 增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展
 LESS 既可以在 客户端 上运行 ，也可以借助Node.js在服务端运行。
 bootstrap中less教程：<https://less.bootcss.com/>

## Less编译工具

 koala 官网:www.koala-app.com
 Visual Studio Code插件：Easy LESS

## less中的注释

    以//开头的注释，不会被编译到css文件中
    以/**/包裹的注释会被编译到css文件中  

## less中的变量

 使用@来申明一个变量：@pink：pink;

1.作为普通属性值只来使用：直接使用@pink

下面使用较少

 2.作为选择器和属性名：#@{selector的值}的形式

 3.作为URL：@{url}

 4.变量的延迟加载

+ 在编译时会将声明编译完后再加载变量

## less中的嵌套规则

1.基本嵌套规则可直接按层级关系嵌套

2.&的使用将代码提升为同级适用于伪类/伪元素，使用伪元素时只用一个`:`号

## less中的混合

 混合就是将一系列属性从一个规则集引入到另一个规则集的方式

1. 普通混合.juzhong{}  (会编译到原生css中)
2. 不带输出的混合.juzhong(){}   (不会编译到原生css中去)
3. 带参数的混合.juzhong(@w,@c,@h){}
4.  带参数并且有默认值的混合.juzhong(@w:10px,@h:10px,@c:pink){}
5.  带多个参数的混合
6.  命名参数使用.juzhong(@c:black);
7.  匹配模式.triangle(@_,@wwww,@ccccc)
   + @_用于接受匹配参数，向下找到相匹配的


8. arguments变量

```less
 .border(@1,@2,@3) {
  border: @arguments;//@arguments将所有参数接受
}
```

## less运算

 在less中可以进行加减乘除的运算

## less避免编译

`~"避免编译的css"`

## less继承

 性能比混合高
 灵活度比混合低
 继承类不能使用mix形式，即不能代参数和括号
 使用继承：

+ 先导入继承类：`@import "./mixin/juzhong-extend.less";`
+ 然后使用`&:extend(.juzhong)`

## less函数

## if函数

if((判断语句),为真时值,为假时值)

## boolean函数

boolean()

## String函数系列

+ escape(@string)编码
+ e(@string)转义 类似于~
+ %(string,arguments...)格式化字符串需要注意的是，该函数返回格式化的字符串，带有`' '`，这样就会导致以上编译之后的属性值失效，使用e(@string)函数进行转义，去除引号
+ Replace替换用另一个字符串替换文本
  + string: 搜索和替换用的字符串
  + pattern: 一个字符串或者能搜索的正则表达式
  + replacement:匹配模式成功后替换之后的字符串
  + flags:（可选）全匹配还是局部匹配

## list函数系列

+ length函数 用于获取集合中的值的数目

+ extract函数 用于返回集合中指定位置上的值。`索引从1开始`

## Math函数系列

+ ceil 向上取整
+ floor 向下取整
+ percentage 将小数转化为百分比的形式
+ round 四舍五入
+ sqrt 计算平方根
+ abs 绝对值
+ pow(@base,@exponet) 求@base得@exponet次方
+ mod(number1,number2) number1对number2取余

## Type函数系列

+ isnumber
+ isstring
+ iscolor
+ iskeyword
+ isurl
+ ispixel
+ isem
+ ispercentage
+ isunit 是否是带指定单位的数据

## 其他杂项函数

+ color  转换成rgb

+ convert 数据兼容单位之间的转换 m cm mm in pt pc  s ms rad deg grad turn

+ data-uri 将资源文件内嵌到样式文件中。

+ default 边界函数，当自定义函数都不匹配的时候，该默认函数被匹配，否则匹配匹配成功的函数

  + ```less
    // 定义了三个自定义函数
    .minx(1) {
      x: 2;
    }
    
    .minx(2) {
      x: 3;
    }
    
    .minx(@x) when(default()) {
      z:@x;
    }
    
    div {
        // 匹配成功
      .minx(1);
    }
    
    span {
        // 匹配成功
      .minx(2);
    }
    
    .my {
        // 匹配不成功 匹配默认函数
      .minx(3);
    }
    ```

+ unit  移除或者改变属性值的单位

## color函数系列

+ rgb(@red,@green,@blue) 将rgb颜色值转为十六进制颜色值
+ lightness(@color) 提取`lightness`亮度

## 导入

| S.N. | 导入选项及描述                                               |
| ---- | ------------------------------------------------------------ |
| 1    | **[reference](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_reference.html)** 它使用一个LESS文件作为参考，不会输出它。 |
| 2    | **[inline](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_inline.html)** 它使您能够将CSS复制到输出而不进行处理。 |
| 3    | **[less](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_less.html)** 它会将导入的文件视为常规LESS文件，尽管可能是文件扩展名。 |
| 4    | [**css**](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_css.html) 它会将导入的文件视为常规CSS文件，尽管可能是文件扩展名。 |
| 5    | **[once](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_once.html)** 它将只导入一次文件。 |
| 6    | **[multiple](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_multiple.html)** 它会多次导入文件。 |
| 7    | **[optional](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.w3cschool.cn%2Fless%2Fimport_options_optional.html)** 即使找不到要导入的文件，它仍会继续编译。 |

