# webpack

## 5 大核心概念

1. entry（入口）

指示 Webpack 从哪个文件开始打包

2. output（输出）

指示 Webpack 打包完的文件输出到哪里去，如何命名等

3. loader（加载器）

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4. plugins（插件）

扩展 Webpack 的功能

5. mode（模式）

主要由两种模式：

- 开发模式：仅能编译 JS 中的 `ES Module` 语法
- 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

## 安装

`npm i webpack webpack-cli -D`

## 启动

`npx webpack ./src/main.js --mode=development production`

## 配置文件（webpack.config.js）

基础模板

```js
const path = require("path");

module.exports = {
  // 入口（相对和绝对路径都可）
  entry: "",
  // 输出
  output: {
      //文件输出路径（必须绝对路径）
      path:path.resolve(__dirname,"dist"),
      //文件输出名
      filename:"main.js",
  },
  // 加载器
  module: {
    rules: [
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",//开发模式
};
```

## 处理CSS

官方文档[webpack-Loader](https://webpack.docschina.org/loaders/css-loader/#getting-started)

下载安装`style-loader css-loader`

在入口文件中导入资源，注意css样式等资源补全后缀

配置规则

```js
{
        //只检测xxx文件
        test: /\.css$/,
        // 使用什么loader（使用use可以使用多个loader，使用loader只能使用一个loader），执行顺序（从下到上）
        use: [
          // 将js中的css通过创建style标签添加到html文件中生效
          "style-loader",
          // 将css资源编译成commonjs的模块到js中
          "css-loader"],
}
```
