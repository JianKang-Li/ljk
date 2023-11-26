# mock

## json-server

### 环境搭建

`npm install json-server`
`npx json-server --watch src/db.json --port 5000`

###  获取数据

#### get请求

+ <http://localhost:5000/comments> 获取所有数据
+ <http://localhost:5000/starts?id=100> 根据id获取数据
+ <http://localhost:5000/starts?id=100&name=邱淑贞> 多条件过滤
+ <http://localhost:5000/users?name.nicknamemgoddess> 使用对象取属性值obj.key的方式
+ <http://localhost:5000/movies?q=9.1> 全局模糊搜索
+ <http://localhost:5000/movies?_page=1&_limit=2> 分页搜索 _page设置页码，_limit 控制每页显示条数，默认每页显示10条
+ <http://localhost:5000/movies?_sort=score&_order=desc> _sort 排序采用字段_order指定正排序还是逆排序(asc|desc,默认asc)
+ <http://localhost:5000/movies?_start=0&_end=2> 获取局部数据_start指定开始位置，_end指定结束位置
+ <http://localhost:5000/movies?_start=0&_limit=2> 获取局部数据 _limit 指定往后取几个数据
更细致的过滤条件
+ <http://localhost:5000/movies?id_gte=5&id_lte=9> 采用_gte_lte来设置取值范围
+ <http://localhost:5000/movies?id_ne=1&id_ne=2&id_ne=3> 采用_ne来设置不包含某个值
+ <http://localhost:5000/movies?score_like=9> 采用_like来设置匹配某个字符串

多表查询 向下关联

+ <http://localhost:5000/movies?_embed=comments> comments(复数)

向上关联

+ <http://localhost:5000/comments?_expand=movie> movie(单数)

#### post请求

添加数据(默认id自增长)
返回添加的数据

```js
axios.post('http://localhost:5000/movies',{
  "name":"最佳损友",
  "score":10.0
}).then(res=>{
  console.log(res.data);
})
```

#### put/patch(修改数据)

返回修改后的数据

#### delete(删除数据)

返回值为空

#### 静态资源的部署

创建json_server_config_json

`json-server --watch db.json json_server_config.json`

```json
  "port":5000,
  "watch":true,
  "static":"./public",
  "no-cors":true,
  "no-gzip":false,
  "read-only":false
```

## Mock.js

### Mock环境搭建

`npm i mockjs`
`npm i axios`

```js
import {createApp} from 'vue'
import App from "./App.vue"
createApp(App).mount("#app")


const Mock = require("mockjs")
console.log (Mock);
```

### Mock语法规范

Mock.js 的语法规范包括两部分：

数据模板定义规范（Data Template Definition，DTD）
数据占位符定义规范（Data Placeholder Definition，DPD）

#### 数据模板定义规范 DTD

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```js
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

注意：

属性名和生成规则之间用竖线`|`分隔。
生成规则是可选的。
生成规则有7种格式：

+ 'name|min-max': value
+ 'name|count': value
+ 'name|min-max.dmin-dmax': value
+ 'name|min-max.dcount': value
+ 'name|count.dmin-dmax': value
+ 'name|count.dcount': value
+ 'name|+step': value

生成规则的含义需要依赖属性值的类型才能确定。
属性值中可以含有@占位符。
属性值还指定了最终值的初始值和类型。

1. 属性值是字符串 String
    `'name|min-max': string`
    通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。
    `'name|count': string`
    通过重复 string 生成一个字符串，重复次数等于 count。

2. 属性值是数字 Number
    `'name|+1': number`
    属性值自动加 1，初始值为 number。
    `'name|min-max': number`
    生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
    `'name|min-max.dmin-dmax': number`
    生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

    ```js
    Mock.mock({
        'number1|1-100.1-10': 1,
        'number2|123.1-10': 1,
        'number3|123.3': 1,
        'number4|123.10': 1.123
    })
    // =>
    {
        "number1": 12.92,
        "number2": 123.51,
        "number3": 123.777,
        "number4": 123.1231091814
    }
    ```

3. 属性值是布尔型 Boolean
    `'name|1': boolean`
    随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
    `'name|min-max': value`
    随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。

4. 属性值是对象 Object
    `'name|count': object`
    从属性值 object 中随机选取 count 个属性。
    `'name|min-max': object`
    从属性值 object 中随机选取 min 到 max 个属性。

5. 属性值是数组 Array
    `'name|1': array`
    从属性值 array 中随机选取 1 个元素，作为最终值。
    `'name|+1': array`
    从属性值 array 中顺序选取 1 个元素，作为最终值。
    `'name|min-max': array`
    通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。
    `'name|count': array`
    通过重复属性值 array 生成一个新数组，重复次数为 count。

6. 属性值是函数 Function
    `'name': function`
    执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。

7. 属性值是正则表达式 RegExp
    `'name': regexp`
    根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

    ```js
    Mock.mock({
        'regexp1': /[a-z][A-Z][0-9]/,
        'regexp2': /\w\W\s\S\d\D/,
        'regexp3': /\d{5,10}/
    })
    // =>
    {
        "regexp1": "pJ7",
        "regexp2": "F)\fp1G",
        "regexp3": "561659409"
    }
    ```

#### 数据占位符定义规范 DPD

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

占位符 的格式为：

@占位符
@占位符(参数 [, 参数])
注意：

+ 用 @ 来标识其后的字符串是占位符。
+ 占位符引用的是Mock.Random中的方法。
+ 通过Mock.Random.extend()来扩展自定义占位符。
+ 占位符也可以引用数据模板中的属性。
+ 占位符会优先引用数据模板中的属性。
+ 占位符支持相对路径和绝对路径。

Mock.Random 提供的完整方法（占位符）如下：

| Type          | Method                                                       |
| ------------- | ------------------------------------------------------------ |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                             |
| Color         | color                                                        |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name          | first, last, name, cfirst, clast, cname                      |
| Web           | url, domain, email, ip, tld                                  |
| Address       | area, region                                                 |
| Helper        | capitalize, upper, lower, pick, shuffle                      |
| Miscellaneous | guid, id                                                     |
