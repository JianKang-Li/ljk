使用async和await获取axios的数据注意事项-浮生阁阁主# 使用async和await获取axios的数据的注意事项
## 确定正确使用
```js
async function getInfo() {
  const res = await axios.get('http://example.com')
  return res.data
}
```
上述代码等同于
```js
async function getInfo() {
  const result = (await axios.get('http://example.com')).data
  return result
}
```
**注意括号包裹，如果没有括号则返回为 undefined**
