# nodejs

## fs模块

`fs.readFile()`读取文件

```js
fs.readFile("./1.txt", "utf-8", (err, data) => {
  //成功err===null，失败为错误对象
  if (err) {
    return console.log(err);
  }
  console.log("-----");
  //失败data为null
  console.log(data);
});
```

`fs.writeFile()`写入文件

```js
//(文件路径（不存在就新建），内容，编码（可选），回调(err)(成功和失败都会调用))
fs.writeFile("./2.txt", "ljk", (err) => {
  //成功err为null,失败为错误对象
  if (err) {
    return console.log("写入失败", err);
  }
  console.log("写入成功");
});
```

`__dirname`当前文件所在的路径

## path模块

path模块是Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

+ `path.join()`方法，用来将多个路径片段拼接成一个完整的路径字符串path.

```js
const path = require("path");
//../抵消前面一层路径
let pathStr = path.join("/a", "/b/c", "../", "./d", "e");
console.log(pathStr); //\a\b\d\e

let paths = path.join(__dirname, "./1.txt");
console.log(paths);

```

+ `basename()`方法，用来从路径字符串中，将文件名解析出来

```js
const path = require("path");

/* path <string>必选参数，表示一个路径的字符串
ext <string>可选参数，表示文件扩展名
返回: <string>表示路径中的最后一部分 */

let fullName = path.basename("/a/b/c/join.js");
let nameWithoutExt = path.basename("/a/b/c/join.js", ".js");

console.log(fullName, nameWithoutExt);
```

+ `extname()`获取文件拓展名

```js
const path = require("path");
let fspath = "a/c/b/v/index.html";
let ext = path.extname(fspath);
console.log(ext);
```

## http模块

+ 最基本的web服务器

```js
const http = require("http");
const app = http.createServer();
app.on("request", (req, res) => {
  console.log(req, res);
});

app.listen(80, () => {
  console.log("serve at http://127.0.0.1:8080");
});
```

req请求对象
只要服务器接收到了客户端的请求，就会调用通过server.on()为服务器绑定的request事件处理函数。如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式:
req是请求对象，它包含了与客户端相关的数据和属性
req.url是客户端请求的URL地址
req.method 是客户端的 method请求类型

req对象和res对象基本使用

```js
const http = require("http");
const app = http.createServer();
app.on("request", (req, res) => {
  console.log(req.url, req.method);
  let str = `路径${req.url},方法${req.method}`;
  //解决中文乱码
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.end(str);
});

app.listen(80, () => {
  console.log("serve at http://127.0.0.1:80");
});
```

动态响应

```js
const http = require("http");
const app = http.createServer();
app.on("request", (req, res) => {
  let content = "<h1>404 Not Found！</h1>";
  console.log(req.url, req.method);
  let url = req.url;
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>";
  } else if (url === "/about.html") {
    content = "<h1>about</h1>";
  }
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  res.end(content);
});

app.listen(80, () => {
  console.log("serve at http://127.0.0.1:80");
});
```

## 11、i5ting_toc

将md文档转html的小工具
`i5ting_toc -f 文件路径 -o`//-o转换后在浏览器中打开

## 自定义包

新建itheima-tools 文件夹，作为包的根目录
在itheima-tools文件夹中，新建如下三个文件:

+ package.json(包管理配置文件)
初始化package.json

```json
{
  "name": "itheima-tools",
  "vesion": "1.0.0",
  "main": "index.js",
  "description":"提供了格式化时问，HTMLEscape的功能",
  "keywords": ["itheima"，"dateFormat" , "escape"],
  "license": "ISC"
}
```

+ index.js(包的入口文件)
+ README.md(包的说明文档)

## Express

官方给出的概念: Express是基于Node.js 平台，快速、开放、极简的Web开发框架。
通俗的理解: Express 的作用和Node.js内置的 http模块类似，是专门用来创建Web 服务器的。

### 监听get和post请求

`app.get(url,callback(req,res))`
`app.post(url,callback(req,res))`
返回内容
`res.send()`
获取url携带的查询参数
`req.query`
获取动态参数
`req.params`

```js
const express = require("express");
const app = express();
app.get("/user", (req, res) => {
  let name = req.query.name;
  console.log(name);
  res.send({ name: "ljk", age: 20 });
});

app.post("/user", (req, res) => {
  res.send("请求成功");
});
//默认情况下req.query为空
app.get("/", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
//req.params为动态参数
app.get("/user/:id/:name", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
app.listen(80, () => {
  console.log("express start at http://127.0.0.1:80");
});
```

## 托管静态资源

express提供了一个非常好用的函数，叫做 `express.static()`，通过它，我们可以非常方便地创建一个静态资源服务器,例如，通过如下代码就可以将public目录下的图片、CSS文件、JavaScript文件对外开放访问了:
`app.use(express.static('public'))`
注意: Express在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在URL中。

```js
const express = require("express");
const app = express();
//配置对外静态资源
app.use(express.static("./clock"));
app.listen(80, () => {
  console.log("express start at http://127.0.0.1:80");
});
```

如果要托管多个静态资源目录，请多次调用express.static()函数:
访问静态资源文件时，express.static())函数会根据目录的添加顺序查找所需的文件。

## 挂载路径前缀

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式:
`app.use("/public", express.static("public'))`
现在，你就可以通过带有`/public`前缀地址来访问public目录中的文件了`http://localhost:3000/public/images/kitten.jpg`

## express路由

在Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。
Express 中的路由分3部分组成，分别是请求的类型、请求的URL地址、处理函数，格式如下:
`app.METHOD(RPATH,HANDLER)`
路由匹配的注意点:

+ 按照定义的先后顺序进行匹配
+ 请求类型和请求的URL同时匹配成功，才会调用对应的处理函数
+ 匹配成功后不再向后匹配

最简单的使用：

```js
app.get()
app.post()
```

## 模块化路由

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块。

+ 创建路由模块对应的.js 文件
+ 调用express.Router()函数创建路由对象向路由对象上挂载具体的路由
+ 使用module.exports向外共享路由对象
+ 使用app.use()函数注册路由模块

模块化路由

```js
const express = require("express");
//创建路由对象
const router = express.Router();
router.get("/user/list", (req, res) => {
  res.send("Get user list");
});
//app.use()注册全局中间件
router.post("/user/add", (req, res) => {
  res.send("Add new list");
});
//暴露路由
module.exports = router;
```

使用

```js
//注册使用router
// app.use(userRouter);
//使用router并添加统一访问前缀/api
app.use("/api", userRouter);
```

## 中间件

Express的中间件，本质上就是一个 function处理函数
注意:中间件函数的形参列表中，必须包含next参数。
而路由处理函数中只包含req和res。
next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

## 全局中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。
通过调用app.use(中间件函数)，即可定义一个全局生效的中间件,

```js
/* //定义中间件
const mw = function (req, res, next) {
  console.log("中间件函数");
  //把流转关系，转交给下一个中间件或路由
  next();
};
//全局中间件
app.use(mw); */
//全局中间件简写形式
app.use(function (req, res, next) {
  console.log("中间件函数");
  //把流转关系，转交给下一个中间件或路由
  next();
});
```

## 中间件的作用

多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

可以使用app.use()连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用

## 局部生效中间件

不使用app.use0定义的中间件，叫做局部生效的中间件,
局部中间件

```js
const express = require("express");
const app = express();
const mw1 = function (req, res, next) {
  console.log("中间件函数");
  //把流转关系，转交给下一个中间件或路由
  next();
};
app.get("/", mw1, (req, res) => {
  res.send("Home page");
});
app.get("/user", (req, res) => {
  res.send("User page");
});
app.listen(80, () => {
  console.log("express start at http://127.0.0.1:80");
});

```

使用多个局部中间件

```js
//以下两种写法是"完全等价"的，可根据自己的喜好，选择任意一种方式进行使用
app.get('/', mw1,m2,(req,res) => { res.send("Home page.")})
app.get('/',[mw1,mw2],(req,res) =>{res.send('Home page.')}) 
```

## 使用中间件的注意事项

+ —定要在路由之前注册中间件
+ 客户端发送过来的请求，可以连续调用多个中间件进行处理
+ 执行完中间件的业务代码之后，不要忘记调用next())函数
+ 为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
+ 连续调用多个中间件时，多个中间件之间，共享req和res对象

## 中间件的分类

为了方便大家理解和记忆中间件的使用，Express官方把常见的中间件用法，分成了5大类，分别是:

+ 应用级别的中间件
+ 路由级别的中间件
+ 错误级别的中间件
+ Express内置的中间件
+ 第三方的中间件

通过app.use()或 app.get())或 app.post()，绑定到app实例上的中间件，叫做应用级别的中间件

绑定到 express.Router())实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app实例上，路由级别中间件绑是到router实例上

错误级别中间件的作用:专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

格式:错误级别中间件的 function处理函数中，必须有4个形参，形参顺序从前到后，分别是(err, req, res, next)。
**注意:错误级别的中间件,必须注册在所有路由之后!**

## Express内置中间件

自Express 4.16.0版本开始，Express 内置了3个常用的中间件，极大的提高了Express 项目的开发效率和体验:

+ express.static快速托管静态资源的内置中间件，例如:HTML文件、图片、CSS样式等（无兼容性)
+ express.json解析JSON格式的请求体数据（**有兼容性**，仅在4.16.0+版本中可用)
+ express.urlencoded解析URL-encoded格式的请求体数据（**有兼容性**，仅在4.16.0+版本中可用)

```js
//配置解析application/json格式数据的内置中间件
app.use(express.json())
//配置解析 application/x-ww-form-urlencoded格式数据的内置中间件
app.use(express.urlencoded({extended:false})
```

## 跨域解决

### cros

```js
const cors = require("cors");
app.use(cors());
```

## CORS响应头部- Access-Control-Allow-Origin

响应头部中可以携带一个 Access-Control-Allow-Origin字段，其语法如下:
`Access-Control-Allow-origin: <origin>|*`
控制允许请求的域名

## CORS 响应头部- Access-Control-Allow-Headers

默认情况下，CORS仅支持客户端向服务器发送如下的9个请求头:
Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type(值仅限于text/plain、multipart/form-data、application/x-www-form-urlencoded三者之一)如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败!

## CORS响应头部– Access-Control-Allow-Methods

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。
如果客户端希望通过PUT、DELETE等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Alow-Methods来指明实际请求所允许使用的HTTP方法。

## CORS请求的分类

客户端在请求CORS 接口时，根据请求方式和请求头的不同，可以将CORS的请求分为两大类，分别是:

+ 简单请求
+ 预检请求

同时满足以下两大条件的请求，就属于简单请求:

+ 请求方式:GET、POST、HEAD三者之一
+ HTTP头部信息不超过以下几种字段:无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width . Content-Type (只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)

只要符合以下任何一个条件的请求，都需要进行预检请求:

+ 请求方式为GET、POST、HEAD之外的请求 Method类型
+ 请求头中包含自定义头部字段
+ 向服务器发送了application/json格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送ОPTION请求进行预检，以获知服务器是否允许该实际请求，所以这一次的OPTION请求称为“预检请求”。服务器成功响应预检请求咸，才会发送真正的请求，并且携带真实数据。

## 区别

简单请求的特点:客户端与服务器之间只会发生一次请求。
预检请求的特点:客户端与服务器之间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求。

## jsonp

概念:浏览器端通过`<script>`标签的 src属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做JSONP.
特点:

+ JSONP 不属于真正的Ajax请求，因为它没有使用XMLHttpRequest这个对象。
+ JSONP仅支持 GET请求，不支持POST、PUT、DELETE等请求。

## 实现JSONP接口的步骤

+ 获取客户端发送过来的回调函数的名字
+ 得到要通过JSONP形式发送给客户端的数据
+ 根据前两步得到的数据,拼接出一个函数调用的字符串
+ 把上一步拼接得到的字符串，响应给客户端的`<script>`标签进行解析执行

## 操作mysql数据库

+ 安装操作 MySQL 数据库的第三方模块(mysql)
+ 通过 mysql模块连接到MySQL 数据库
+ 通过mysql模块执行SQL语句

```js
//导入模块
const mysql = require("mysql");
//建立连接
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "books",
});
//操作
//调用db.query)函数，指定要执行的SQL语句，通过回调函数拿到执行的结果
db.query("select * from admins", (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});
```

使用?进行占位
利用数组进行指定具体值

```js
//导入模块
const mysql = require("mysql");
//建立连接
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "books",
});
//操作

let user = { name: "ljk", password: "123456" };
let sqlStr1 = "insert into user (username,password) values (?,?)";
db.query(sqlStr1, [user.name, user.password], (err, result) => {
  if (err) return console.log(err);
  console.log(result);
});

let sqlStr = "select * from user";
db.query(sqlStr, (err, result) => {
  if (err) return console.log(err);
  if (result.affectedRows === 1) {
    console.log("插入成功");
  }
});
```

快捷插入操作

```js
let user = { username: "ljk", password: "123456" };
let sqlStr1 = "insert into user SET ?";
```

## 标记删除

使用DELETE语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。
所谓的标记删除，就是在表中设置类似于status这样的状态字段，来标记当前这条数据是否被删除。
当用户执行了删除的动作时，我们并没有执行DELETE语句把数据删除掉。而是执行了UPDATE语句，将这条数据对应的status字段标记为删除即可。

## Web开发模式

服务端渲染的概念:服务器发送给客户端的HTML页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不需要使用Ajax这样的技术额外请求页面的数据。

优点:

+ 前端耗时少。因为服务器端负责动态生成HTML内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
+ 有利于SEO。因为服务器端响应的是完整的HTML页面内容，所以爬虫更容易爬取获得信息，更有利于SEO。
缺点:
+ 占用服务器端资源。即服务器端完成HTML页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
+ 不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。

前后端分离的概念:前后端分离的开发模式，依赖于Ajax技术的广泛应用。简而言之，前后端分离的Web开发模式，就是后端只负责提供API接口，前端使用Ajax调用接口的开发模式。

优点:

+ 开发体验好。前端专注于U页面的开发，后端专注于api的开发，且前端有更多的选择性。
+ 用户体验好。Ajax技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
+ 减轻了服务器端的渲染压力。因为页面最终是在每个用户的浏览器中生成的。
缺点:
+ 不利于SEO。因为完整的HTML页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。(解决方案:利用Vue、React等前端框架的SSR (server side rendeF)技术能够很好的解决SEO问题! )

## cookie

Cookie 是存储在用户浏览器中的一段不超过4KB的字符串。它由一个名称(Name)、一个值(Value)和其它几个用于控制Cookie有效期、安全性、使用范围的可选属性组成。
不同域名下的Cookie各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的Cookie一同发送到服务器。

Cookie的几大特性:

+ 自动发送
+ 域名独立
+ 过期时限
+ 4KB限制

Cookie 不具有安全性
由于Cookie是存储在浏览器中的，而且浏览器也提供了读写Cookie的API，因此Cookie 很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据，通过Cookie 的形式发送给浏览器。

Express使用session认证

```js
//导入session中间件
var session = require('express-session')
//配置Session中间件
app.use(session({
secret: "keyboard cat", // secret属性的值可以为任意字符串
resave: false,//固定写法
saveUninitialized: true //固定写法
})
```

调用req.session.destroy()函数，即可清空服务器保存的session信息。

## 了解Session 认证的局限性

Session认证机制需要配合Cookie 才能实现。由于Cookie默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域Session认证。

## JWT

JWT(英文全称:JSON Web Token)是目前最流行的跨域认证解决方案。
总结:用户的信息通过Token字符串的形式，保存在客户端浏览器中。服务器通过还原Token字符串的形式来认证用户的身份。

JWT通常由三部分组成，分别是 Header (头部)、Payload (有效荷载)、Signature(签名)。
三者之间使用英文的“.”分隔，格式如下:
`Header.Payload.Signature`

+ Payload部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。
+ Header和Signature是安全性相关的部分，只是为了保证Token 的安全性。

## JWT的使用方式

客户端收到服务器返回的JWT之后，通常会将它储存在localStorage或 sessionStorage中。
此后，客户端每次与服务器通信，都要带上这个JWT的字符串，从而进行身份认证。推荐的做法是把JWT放在HTTP请求头的Authorization字段中，格式如下:
`Authorization: Bearer <token>`

## JWT使用

1.安装JWT相关的包
运行如下命令，安装如下两个JWT相关的包:
`npm install jsonwebtoken express-jwt`
其中:

+ jsonwebtoken用于生成JWT字符串
+ express-jwt用于将JWT字符串解析还原成JSON对象

bcryptjs用于加密密码和反向对比密码
