# chrome 插件开发

## 使用 Vue + element-plus 开发用 vite 打包后 chrome 报错

1. `Unexpected token 'export'`
解决方案：
修改 vite.config.js，强制 Rollup 输出 IIFE（立即调用函数表达式）避免 export 语法：

```js
build: {
    rollupOptions: {
      output: {
        // 关键配置：指定模块格式为 IIFE
        format: 'iife',
      }
    }
  }
```
