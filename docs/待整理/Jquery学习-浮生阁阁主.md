Jquery学习-浮生阁阁主## 一、基本选择器

```javascript
var divjq=$('#mydiv')//id选择器

var divs=$(divDom)//Dom对象转为jquer对象	

var divjqtodom=divs[0];//jquery对象转Dom对象	

var jqclass=$('.blue')//类选择器

var jqtag=$('p')//标签选择器	

var all=$('*')//通用选择器

var along=$('.blue,p,#mydiv')//组合选择器
```



## 二、层次选择器

| 选择器     | 方法及描述                                                   |
| ---------- | ------------------------------------------------------------ |
| 后代选择器 | $("#parent div")选择id为parent的元素的所有div 包含所有代     |
| 子代选择器 | $("parent>div")选择id为parent的直接div子元素 只找第一代      |
| 相邻选择器 | $(".blue+img")选择css类为blue的下一个img元素 只找一个同级元素且为直接挨着的 不存在则获取不到 |
| 同辈选择器 | $(".blue~img")选择css类为blue的之后的img元素 包含所有        |



## 三、表单选择器

| Forms          | 名称      | 举例                                                         |
| -------------- | --------- | ------------------------------------------------------------ |
| 表单选择器     | :input    | 查找所有的input元素:$(":input") 注意:会匹配所有的input、 textarea、 select和button元素。 |
| 文本框选择器   | :text     | 找所有文本框: $(":text")                                     |
| 密码框选择器   | :password | 查找所有密码框:$(":password")                                |
| 单选按钮选择器 | :radio    | 查找所有单选按钮:$(":radio")                                 |
| 复选框选择器   | :checkbox | 查找所有复选框:$(":checkbox")                                |
| 提交按钮选择器 | :submit   | 查找所有提交按钮:$(":submit")                                |
| 图像域选择器   | :image    | 查找所有图像域:$(":image")                                   |
| 重置按钮选择器 | :reset    | 查找所有重置按钮:$(":reset")                                 |
| 按钮选择器     | :button   | 查找所有按钮: $(":button")                                   |
| 文件域选择器   | :file     | 查找所有文件域: $(":file")                                   |



## 四、操作DOM元素

### 1、操作元素的属性（jq对象）

属性的分类：

固有属性：元素本身就有的属性

返回值：boolean的属性：checked，selected，disabled

自定义属性：用户自定义的属性

### 1.1获取属性

attr(属性名称) 获取指定的属性值，操作checkbox时，选中返回checked，没有选中返回undefined。

attr(checked')  attr('name')

prop(属性名称) 获取具有true和false两个属性的属性值

prop('checked')

### 1.2设置属性

attr("属性名","属性值");

prop("属性名","属性值");

### 1.3移除属性：

removeAttr("属性名");



### 2、操作元素的样式

| 方法                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| attr("class")          | 获取class样式名称                                            |
| attr("class","属性值") | 修改class修改样式，会覆盖原本的样式                          |
| addClass("样式名")     | 添加样式名称，以定义顺序后为主                               |
| css()                  | 添加具体的样式,css("具体样式名","样式值");(设置单个样式)；css({"":"","":""});(设置多个样式) |
| removeClass(class)     | 移除样式                                                     |



### 3.操作元素的内容

| 方法             | 说明                                        |
| ---------------- | ------------------------------------------- |
| html()           | 获取元素的html内容,包含html标签//非表单元素 |
| html("html内容") | 设定元素的html内容，可识别标签              |
| text()           | 获取元素的文本内容，不包含html//非表单元素  |
| text("text内容") | 设置元素的文本内容，不包含html              |
| val()            | 获取元素value值//表单元素                   |
| val("值")        | 设定元素的value值                           |



表单元素：

文本域text，密码框password，单选框radio，复选框checkbox，隐藏域hidden，文本域textarea，下拉框select

非表单元素：div,span,h1-h6,table,tr,td,li,p等


### 4.创建元素

在jQuery中创建元素很简单，直接使用核心函数即可

`$("元素内容")`



### 5.添加元素

| 方法                                      | 说明                                                         |
| :---------------------------------------- | ------------------------------------------------------------ |
| 前追加子元素<br>指定元素.prepend(content) | 在被选元素内部的开头插入元素或内容，被追加的content参数，可以是在指定元素内部最前部追加字符、HTML元素标记或jquery对象。 |
| $(content).prependTo(selector)            | 把content元素或内容加入selector元素开头                      |
| 后追加子元素<br>append(content)           | 在被选元素内部的结尾插入元素或内容，被追加的content参数，可以是字符、HTML元素标记。 |
| $(content).appendTo(selector)             | 把content元素或内容插入selector元素内，默认是在尾部          |
|                                           |                                                              |
| 追加同级元素<br>前追加                    |                                                              |
| before()                                  | 在元素前插入指定的元素或内容:$(selector).before(content)     |
| 后追加<br>after()                         | 在元素后插入指定的元素或内容:$(selector).after(content)      |

`注`：在添加元素时，如果元素本身不存在（新建的元素），此时会将元素追加到指定位置,如果元素本身存在（已有）相当于剪切



### 6.删除元素及遍历元素

| 方法     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| remove() | 删除所选元素或指定的子元素，包括整个标签和内容一起删。指定元素.remove(); |
| empty()  | 清空所选元素的内容,保留标签。指定元素.empty();               |
| 遍历元素 |                                                              |
| each()   | $(selector).each(function(index,element)):遍历元素           |
|          | 参数function为遍历时的回调函数,index为遍历元素的序列号，从0开始。element是当前的元素，此时是dom元素。 |



## 五、ready加载事件

从上至下执行

 ready加载事件

 预加载事件：当页面的dom结构加载完毕后执行

类似于js中的load事件

ready事件可以写多个

语法：

```javascript
$(document).ready(function(){});
```

简写：

```javascript
$(function(){});
```



## 六、绑定事件

绑定事件

bind绑定事件：

为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。

语法：

```javascript
$(selector).bind( eventType,[eventData](可有),handler(eventObject));
```

 eventType :是一个字符串类型的事件类型，就是你所需要绑定的事件。

这类类型可以包括如下:

 blur, focus, focusin, focusout, load, resize, scroll, 

unload, click, dblclick,mousedown, mouseup, mousemove,

mouseover, mouseout, mouseenter,mouseleave,change,select,

submit, keydown, keypress, keyup, error


\[evendata]:传递的参数，格式:{名:值,名2:值2)

handler(eventObject):该事件触发执行的函数

### 1、绑定单个事件：

```javascript
//bind绑定
$("指定元素").bind("事件类型",function(){ 
});

//直接绑定：
$("元素").事件名(function(){
});
```

### 2、绑定多个事件：

```javascript
//bind绑定
//1、同时为多个事件绑定同一个函数
指定元素.bind("事件类型1 事件类型2 ...",fuction(){
});

//2、为元素绑定多个事件，并设置对应的函数
指定元素.bind("事件类型",fuction(){
}).bind("事件类型",fuction(){
});

//3、为元素绑定多个事件，并设置对应的函数
指定元素.bind({
"事件类型":function(){
},"事件类型":function(){
}
});

//直接绑定
指定元素.事件名(fuction(){
}).事件名(fuction(){
});
```

## 七、Ajax与jQuery

Ajax是一种异步无刷新方法，操作Dom用于局部刷新或无刷新

jquery调用Ajax

格式：$.ajax({});

参数：

type:请求方式GET/POST

url:请求地址url

async:是否异步，默认是true表示异步

data:发送到服务器的数据

dataType:预期服务器返回的数据类型

contentType:设置请求头

success:请求成功时调用此函数

error:请求失败时调用此函数

```javascript
$("#btn").click(function(){
$.ajax({
type:"get",
url:"js/data.json",
data:{//请求对象是一个json对象
//没有参数则不需要设置
},
dataType:"json",//预期返回的数据类型，如果是json格式，在接收到返回值时会自动封装成json对象
//请求成功时调用的函数
success:function(data){//data为形参名，代表的是返回的数据
console.log(data);//字符串
//将字符串转换为json对象
// var obj=JSON.parse(data);
// console.log(obj);
//dom操作
//创建一个ul
var ul=$("<ul><ul>"); 
//遍历返回的数据数组
for(var i=0;i<data.length;i++)
{
//得到数组中每一个元素
var user=data[i];
//创建li元素
var li="<li>"+user.userName+"</li>";
//将li放入ul中
ul.append(li);
}
console.log(ul);
//将ul设置到body标签中
$("body").append(ul);
}
});
});
```



### 1、$.get

这是一个简单的GET请求功能以取代复杂$.ajax 。请求成功时可调用回调函数。如果需要在出错时执行函数，请使用$.ajax。

1.请求json文件，忽略返回值

```javascript
$.get('js/cuisine_area.json');
```

2.请求json文件，传递参数，忽略返回值

```javascript
$.get('js/cuisine_area.json' ,{name : "tom" , age : 100});
```

3.请求json文件,拿到返回值,请求成功后可拿到返回值

```javascript
$.get('js/cuisine_area.json',function(data){
console.log(data) ;
});
```

4.请求json文件,传递参数,拿到返回值

```javascript
$.get('js/cuisine_area.json', {name : "tom" , age :100}, function(data){
console.log(data);
}); 
```



### 2、$.get():

语法：

```javascript
$.get("请求地址","请求参数",fuction(形参){
});
```



### 3、$.post():

语法：

```javascript
$.post("请求地址","请求参数",fuction(形参){
});
```



### 4、$.getJSON

表示请求返回的数据类型是JSON格式的ajax请求

```javascript
$.getJSON( 'js/cuisine_area.json',{name : "tom" , age : 100},function(data){
console.log(data);//要求返回的数据格式是JSON格式
});
```

$.getJSON

语法：

```javascript
$.getJSON("请求地址","请求参数",fuction(形参){
});
```

注:getJSON方式要求返回的数据格式满足json格式（json字符串）

```javascript
$.getJSON("js/data.json",{},function(data){
console.log(data);
});
$.get("js/test.txt",{},function(data){//可不为json格式
console.log(data);
 });
/* $.getJSON("js/test.txt",{},function(data){//只识别json格式数据
console.log(data);
}); */
```
