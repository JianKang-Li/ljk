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

**图片，字体，css，less等用loader，js，html用插件，插件用new，loader用对象配置**

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

## 处理图片

过去在 Webpack4 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

现在 Webpack5 已经将两个 Loader 功能内置到 Webpack 里了，我们只需要简单配置即可处理图片资源

```js
{
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        // 优化，不会删除之前的资源
        parser: {
          dataUrlCondition: {
            // 小于10kb转base64
            // 减少请求数量，体积会变大一点
            maxSize: 10 * 1024 // 10kb
          }
        }
},
```

图片转base64优势为请求数减少，图片会转换为编码，浏览器会自动转换，缺点为会变大（小图片转换为base64，大图还是靠请求）

## 修改输出资源路径

```js
{
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于10kb转base64
            // 减少请求数量，体积会变大一点
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          //输出图片名称 :10代表取前十位hash值
          filename: 'static/images/[hash:10][ext][query]'
        }
}
```

js文件直接在path前增加路径

## 自动清除上次打包文件

```js
output:{
  clean: true,
}
```

## 处理字体图标资源

```js
// main.js
import "./css/iconfont.css"

// webpack.config.js
{
  test: /\.(ttf|woff2?)$/,
  type: 'asset/resource',
  generator: {
    //输出名称 
    filename: 'static/media/[hash:10][ext][query]'
  }
}
```

## 处理直接输出的文件

```js
type: 'asset/resource',
```

## js资源

Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理

- 针对 js 兼容性处理，我们使用 Babel 来完成
- 针对代码格式，我们使用 Eslint 来完成

### Eslint

- .eslintrc.*：新建文件，位于项目根目录
- .eslintrc
- .eslintrc.js
- .eslintrc.json
- 区别在于配置格式不一样
package.json 中 eslintConfig：不需要创建文件，在原有文件基础上写
ESLint 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

elintrcjs模板

```js
module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: { // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
    }
  },
  // 具体检查规则
  rules: {
    
  },
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};

```

### 1.parserOptions 解析选项

```js
parserOptions: {
  ecmaVersion: 6, // ES 语法版本
  sourceType: "module", // ES 模块化
  ecmaFeatures: { // ES 其他特性
    jsx: true // 如果是 React 项目，就需要开启 jsx 语法
  }
}
```

### 2.rules 具体规则

- "off" 或 0 - 关闭规则
- "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

```js
rules: {
  semi: "error", // 禁止使用分号
  'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', // 要求 switch 语句中有 default 分支，否则警告
    { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
  ],
  eqeqeq: [
    'warn', // 强制使用 === 和 !==，否则警告
    'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
  ],
}
```

### 3.extends 继承

开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

现有以下较为有名的规则：

- Eslint 官方的规则：eslint:recommended
- Vue Cli 官方的规则：plugin:vue/essential
- React Cli 官方的规则：react-app

```js
// 例如在React项目中，我们可以这样写配置
module.exports = {
  extends: ["react-app"],
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};
```

```js
// webpack.config.js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
  ],
```

## Babel

主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

1. 配置文件
配置文件由很多种写法：

- babel.config.*：新建文件，位于项目根目录
- babel.config.js
- babel.config.json
- .babelrc.*：新建文件，位于项目根目录
- .babelrc
- .babelrc.js
- .babelrc.json
package.json 中 babel：不需要创建文件，在原有文件基础上写
Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

安装`npm i babel-loader @babel/core @babel/preset-env -D`

### presets 预设

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

@babel/preset-env: 一个智能预设，允许您使用最新的 JavaScript。
@babel/preset-react：一个用来编译 React jsx 语法的预设
@babel/preset-typescript：一个用来编译 TypeScript 语法的预设

## html资源打包

安装`npm i html-webpack-plugin -D`

```js
new HtmlwebpackPlugin({
  // 模板
  template: "./public/index.html"
})
```

## 开发服务器和自动化

安装`npm i webpack-dev-server -D`

配置

```js
// 开发服务器
devServer: {
host: "localhost", // 启动服务器域名
port: "3000", // 启动服务器端口号
open: true, // 是否自动打开浏览器
},
```

启动`webpack serve`
**注意开发模式下不会有任何输出，及不会正在dist文件夹下产生文件**

## 完整开发模式webpack.config.js配置

```js
const path = require("path")
// 导入插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // 入口
  entry: "./src/main.js",//相对路径
  // 输出
  output: {
    // 输出路径,所有打包的文件输出目录
    path: path.resolve(__dirname, "dist"),//绝对路径，可以为undefined，因为没有输出
    // 输出名称,入口文件打包输出的文件名
    filename: "static/js/main.js",
    // 自动清空上次打包结果
    // 打包前将path目录清空
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      {
        //只检测xxx文件
        test: /\.css$/,
        // 使用什么loader，执行顺序（从下到上）
        use: [
          // 将js中的css通过创建style标签添加到html文件中生效
          "style-loader",
          // 将css资源编译成commonjs的模块到js中
          "css-loader"],
      },
      {
        //只检测xxx文件
        test: /\.less$/,
        // 使用什么loader，执行顺序（从下到上）
        use: [
          // 将js中的css通过创建style标签添加到html文件中生效
          "style-loader",
          // 将css资源编译成commonjs的模块到js中
          "css-loader",
          // 将less文件编译成css文件
          "less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于10kb转base64
            // 减少请求数量，体积会变大一点
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          //输出图片名称 :10代表取前十位hash值
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        // 原封不动输出
        type: 'asset/resource',
        generator: {
          //输出名称 
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        // 原封不动输出
        type: 'asset/resource',
        generator: {
          //输出名称 
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
        // options: {
        //   presets: ["@babel/preset-env"]
        // }
      }
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src")
    }),
    new HtmlwebpackPlugin({
      // 模板
      template: "./public/index.html"
    })
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  // 模式
  mode: "development",
};
```

## babel.config.js

```js
module.exports = {
  // 智能预设，能编译ES6
  presets: ["@babel/preset-env"]
}
```

## .eslintrc.js

```js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```

使用自定义的webpack.config.js文件
命令：`npx webpack serve --config 自定义文件路径`

## 生产模式
