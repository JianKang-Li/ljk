Less-浮生阁阁主# less

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
 2.&的使用将代码提升为同级适用于伪类/伪元素

## less中的混合

 混合就是将一系列属性从一个规则集引入到另一个规则集的方式
 1.普通混合.juzhong{}  (会编译到原生css中)
 2.不带输出的混合.juzhong(){}   (不会编译到原生css中去)
 3.带参数的混合.juzhong(@w,@c,@h){}
 4.带参数并且有默认值的混合.juzhong(@w:10px,@h:10px,@c:pink){}
 5.带多个参数的混合
 6.命名参数使用.juzhong(@c:black);
 7.匹配模式.triangle(@_,@wwww,@ccccc)

+ @_用于接受匹配参数，向下找到相匹配的
 8.arguments变量

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
