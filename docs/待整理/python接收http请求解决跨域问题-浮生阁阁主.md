python接收http请求解决跨域问题-浮生阁阁主```python
self.send_header("Access-Control-Allow-Origin", "*");
self.send_header("Access-Control-Allow-Headers", "X-Requested-With");
self.send_header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
self.send_header("X-Powered-By", ' 3.2.1')
```
[参考文章](https://www.cnblogs.com/tkqq000/p/12669780.html)