# Fetch

## Fetch的认知

通过Ajax发送请求数据

```js
// 1、创建xhr对象
let xhr = new XMLHttpRequest()
// 2、设置请求方式和地址
xhr.open("get", "https://api.d5.nz/api/yiyan.php")
//3、发送请求
xhr.send()
//4、监听load时间，获取响应结果
xhr.addEventListener("load", function () {
    console.log(xhr.response)
})
```

axios基于XMLhttpRequest,进行Promise封装

**什么是Fetch？**

+ Fetch被称之为下一代Ajax技术，内部采用`Promise`方式来处理数据可以直接.then即可
+ API语法简洁明了，比`XMLHttpRequest`更加简单易用
+ 采用了模块化设计，API分散于多个对象中〈如: Response对象、Request对象、Header对象)
+ 通过数据流(Stream对象）处理数据，可以分块读取，有利于提高网站性能，对于大文件或者网速慢的场景极为有用

**兼容性**

除IE，主流浏览器都已兼容

**不兼容IE**

## 使用fetch发送基本get请求

介绍:

+ 如果fetch() 只接收了一个url字符串参数，表示默认向该网址发送 get 请求，会返回一个Promise对象
+ 如果需要设get的参数，直接拼接到url地址上即可

```js
fetch("http://ajax-base-api-t.itheima.net/api/getbooks")
    .then((res) => {
    // 默认返回一个Response对象，使用json()方法使其可读
    // console.log(res.json())//json只能使用一次且json是一个异步操作及一个promise对象，使用await获取最终数据
    return res.json()
}).then(json => {
    console.log(json)
})
    .catch((error) => {
    console.error("error:" + error)
})
```

改写

```js
async function getData() {
    try {
        let res = await fetch("http://ajax-base-api-t.itheima.net/api/getbooks")
        let json = await res.json()
        console.log(json)
    } catch (error) {
        console.log(error)
    }
}
getData()
```

## Response对象

### 常见属性

| 属性           | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| res.headers    | 包含此 Response 所关联的 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 对象。 |
| res.ok         | 包含了一个布尔值，标示该 Response 成功（HTTP 状态码的范围在 200-299） |
| res.redirected | 表示该 Response 是否来自一个重定向，如果是的话，它的 URL 列表将会有多个条目。 |
| res.status     | 包含 Response 的状态码（例如 `200` 表示成功）。              |
| res.statusText | 包含了与该 Response 状态码一致的状态信息（例如，OK 对应 `200`）。 |
| res.type       | 包含 Response 的类型（例如，`basic`、`cors`）。              |
| res.url        | 包含 Response 的 URL。                                       |
| res.body       | 一个简单的 getter，用于暴露一个 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 类型的 body 内容。 |

[官方网站](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### 常见方法

| 方法              | 含义                                                         |
| ----------------- | ------------------------------------------------------------ |
| res.clone()       | 创建一个 `Response` 对象的克隆。                             |
| res.blob()        | 返回一个被解析为 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 格式的 Promise 对象 |
| res.json()        | 并返回一个被解析为 `JSON` 格式的 Promise 对象                |
| res.text()        | 返回一个被解析为 [`USVString`](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Global_Objects/String_9094f63a1f7efd350dd69d6a8ae174fb) 格式的 Promise 对象。 |
| res.formData()    | 并返回一个被解析为 [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 格式的 Promise 对象 |
| res.arrayBuffer() | 返回一个被解析为 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 格式的 Promise 对象。 |

## fetch 配置参数

fetch第一个参数是url，此外，第二个参数作为配置对象，可以自定义发出的http请求

其中post、put、patch用法类似

**配置参数介绍**

```js
fetch(url,{
    method:"请求方式",
    headers:{
        "Content-Type":"数据格式"
    },
    body:"post请求体数据"
})
```

**fetch 发送Post请求**

```JS
async function add() {
    let obj = {
        bookname: "魔法",
        author: "黑马",
        publisher: "黑马"
    }

    let res = await fetch("http://ajax-base-api-t.itheima.net/api/addbook",
                          {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    let json = await res.json()
    console.log(json)
}
add()
```

## 取消发送

使用`fetch`发送请求可以使用`AbortController`

XHR 使用 `xhr.abort()`

`Axios` 中通过 `cancelToken` 取消请求发送
