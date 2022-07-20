# webpack5基础使用

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

使用自定义的webpack.config.dev.js文件
命令：`npx webpack serve --config 自定义文件路径`

## 生产模式

命令：`npx webpack --config 自定义文件路径`
**生产模式不需要服务器**

## css 处理

### 提取CSS成单独文件

下载包`npm i mini-css-extract-plugin -D`

配置：

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
rules: [
    {
      // 用来匹配 .css 结尾的文件
      test: /\.css$/,
      // use 数组里面 Loader 执行顺序是从右到左
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
    },
    {
      test: /\.s[ac]ss$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
    {
      test: /\.styl$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
    },
],
plugins: [
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
  ],
```

### CSS兼容性处理

下载包`npm i postcss-loader postcss postcss-preset-env -D`

配置：

```js
use: [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          "postcss-preset-env", // 能解决大多数样式兼容性问题
        ],
      },
    },
  },
],
```

**在css-loader后less-loader前**

需要在package.json中设置

```json
"browserslist": [
  "ie>=8"
]
```

实际开发中的设置

```json
"browserslist": [
  "last 2 version", 
  "> 1%",
  "not dead"
]
```

### CSS压缩

安装：`npm i css-minimizer-webpack-plugin -D`

配置：

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
new CssMinimizerPlugin(),
```

**在生产环境下默认开启html和js压缩**

## 生产环境下webpack.config.prod.js完整配置

```js
const path = require("path")
// 导入插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlwebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 获取处理样式loader
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}



module.exports = {
  // 入口
  entry: "./src/main.js",//相对路径
  // 输出
  output: {
    // 输出路径,所有打包的文件输出目录
    path: path.resolve(__dirname, "../dist"),//绝对路径
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
        // use: [
        //   // 将js中的css通过创建style标签添加到html文件中生效
        //   "style-loader",
        //   // 将css资源编译成commonjs的模块到js中
        //   "css-loader"],
        use: getStyleLoader(),
      },
      {
        //只检测xxx文件
        test: /\.less$/,
        // 使用什么loader，执行顺序（从下到上）
        // use: [
        //   // 将js中的css通过创建style标签添加到html文件中生效
        //   "style-loader",
        //   // 将css资源编译成commonjs的模块到js中
        //   "css-loader",
        //   // 将less文件编译成css文件
        //   "less-loader"],
        use: getStyleLoader("less-loader"),
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
      context: path.resolve(__dirname, "../src")
    }),
    new HtmlwebpackPlugin({
      // 模板
      template: path.resolve(__dirname, "../public/index.html")
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    new CssMinimizerPlugin(),
  ],
  // 开发服务器
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  // 关闭打包时静态资源太大warning
  performance: {
    hints: false
  },
  // 模式
  mode: "production",
};
```

## webpack高级

优化：

- 提升开发体验
- 提升打包构建速度
- 减少代码体积
- 优化代码运行性能

### 提升开发体验

#### SourceMap

##### 是什么

SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。

##### 怎么用

- 开发模式：cheap-module-source-map
  - 优点：打包编译速度快，只包含行映射
  - 缺点：没有列映射

```js
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

- 生产模式：source-map
  - 优点：包含行/列映射
  - 缺点：打包编译速度更慢

```js
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```

### 提升打包速度

#### HotModuleReplacement（热模块替换、HMR）

```js
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
```

main.js

```js
// js实现热模块替换
if (module.hot) {
  // 判断是否支持热模块替换
  module.hot.accept("./js/count")
  module.hot.accept("./js/sum")
  // 添加模块
}
```

上面这样写会很麻烦，所以实际开发我们会使用其他 loader 来解决。

比如：[vue-loader](https://github.com/vuejs/vue-loader), [react-hot-loader](https://github.com/gaearon/react-hot-loader)

#### oneof

打包时每个文件都会经过所有 loader 处理，虽然因为 `test` 正则原因实际没有处理上，但是都要过一遍。比较慢。

顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了

生产模式也是如此配置

```webpack.config.js
 module: {
    rules: [
      {
        // 每个文件只能被一个loader处理
        oneOf: [{
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
          test: /\.js$/,
          exclude: /node_modules/, // 排除node_modules代码不编译
          loader: "babel-loader",
          // options: {
          //   presets: ["@babel/preset-env"]
          // }
        }]
      }
    ],
  },
```

#### Include/Exclude

开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

所以我们在对 js 文件处理时，要排除 node_modules 下面的文件

- include

包含，只处理 xxx 文件

- exclude

排除，除了 xxx 文件以外其他文件都处理

```js
include: path.resolve(__dirname, "../src"), // 也可以用包含
```

**两种方式只能用一种**

#### Cache

每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

**提升的是第一次打包后的打包时间**

对 Eslint 检查 和 Babel 编译结果进行缓存。

使用：

```js
{
    test: /\.js$/,
    // exclude: /node_modules/, // 排除node_modules代码不编译
    include: path.resolve(__dirname, "../src"), // 也可以用包含
    loader: "babel-loader",
    options: {
    cacheDirectory: true, // 开启babel编译缓存
    cacheCompression: false, // 缓存文件不要压缩
},
    
new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
```

#### Thead

当项目越来越庞大时，打包速度越来越慢，甚至于需要一个下午才能打包出来代码。这个速度是比较慢的。

我们想要继续提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少。

而对 js 文件处理主要就是 eslint 、babel、Terser 三个工具，所以我们要提升它们的运行速度。

我们可以开启多进程同时处理 js 文件，这样速度就比之前的单进程打包更快了

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销。**

安装：`npm i thread-loader -D`

```js
// nodejs核心模块，直接使用
const os = require("os");

const TerserPlugin = require("terser-webpack-plugin");
// cpu核数
const threads = os.cpus().length;
use: [
    {
        loader: "thread-loader", // 开启多进程
        options: {
            workers: threads, // 数量
        },
    },
]
```

### 减少代码体积

#### Tree Sharking

开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。

如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能。

这样将整个库都打包进来，体积就太大了

`Tree Shaking` 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码。

**注意：它依赖 `ES Module`**

Webpack 已经默认开启了这个功能，无需其他配置。

#### Babel

Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

Babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend`。默认情况下会被添加到每一个需要它的文件中。

你可以将这些辅助代码作为一个独立模块，来避免重复引入。

`@babel/plugin-transform-runtime`: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用

下载包

`npm i @babel/plugin-transform-runtime -D`

配置

```js
{
    loader: "babel-loader",
    options: {
    cacheDirectory: true, // 开启babel编译缓存
    cacheCompression: false, // 缓存文件不要压缩
    `plugins: ["@babel/plugin-transform-runtime"],` // 减少代码体积
    },
},
```

#### Image Minimizer

开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。

我们可以对图片进行压缩，减少图片体积。

**注意：如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。**

`image-minimizer-webpack-plugin`: 用来压缩图片的插件

安装：

`npm i image-minimizer-webpack-plugin imagemin -D`

- 无损压缩`npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D`
- 有损压缩`npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D`

### 优化代码的运行性能

#### Code Split

打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快

代码分割（Code Split）主要做了两件事：

1. 分割文件：将打包生成的文件进行分割，生成多个 js 文件。
2. 按需加载：需要哪个文件就加载哪个文件

##### 1、使用

```js
entry: {//多入口
    app: "./src/app.js",
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"//webpack中的命名方式[name]以文件名自己命名
  },
```

##### 2、多入口打包公共模块

```js
optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
```

##### 3、按需加载，动态导入

```js
document.getElementById("btn").onclick = function () {
  //  import 动态导入,会将动态导入的文件代码分割（拆分成单独模块），在需要使用时自动加载
  import("./count")
    .then((res) => {
      console.log("模块加载成功", res.default(2, 1))
    })
    .catch((error) => {
      console.log("失败" + error)
    })
}
```

##### 4、单入口应用

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  entry: "./src/main.js",
  // 多入口
  // entry: {
  //   main: "./src/main.js",
  //   app: "./src/app.js",
  // },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
  },
};
```

##### 5、给动态导入文件命名

`main.js`

```js
document.getElementById("btn").onclick = function () {
  // Eslint不识别动态导入语法
  // /* webpackChunkName:"math" */ webpack魔法命名
  import(/*webpackChunkName:"math"*/"./js/math").then(({ mul }) => {
    console.log(mul(3, 3))
  }).catch((error) => {
    console.log("错误", error)
  })
}
```

`webpack.config.js`

```js
output: {
    // 输出路径,所有打包的文件输出目录
    path: path.resolve(__dirname, "../dist"),//绝对路径
    // 输出名称,入口文件打包输出的文件名
    filename: "static/js/main.js",
    // 给打包的动态加载文件命名
    `chunkFilename: "static/js/[name].js",`
    // 自动清空上次打包结果
    // 打包前将path目录清空
    clean: true,
  },
```

##### 6、统一命名

- `filename: "static/js/[name].js",`//兼容多入口文件

- `chunkFilename: "static/js/[name].chunk.js",`//区分chunk文件

- `assetModuleFilename: 'static/media/[hash:10][ext][query]',`//type:"asset"处理的资源统一命名

- ```js
  new MiniCssExtractPlugin({
     // 定义输出文件名和目录,兼容模块css
     filename: "static/css/[name].css",
     chunkFilename: "static/css/[name].chunk.css"
    }),
  ```

#### Preload/Prefetch

比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。

我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 `Preload` 或 `Prefetch` 技术

- `Preload`：告诉浏览器立即加载资源。
- `Prefetch`：告诉浏览器在空闲时才开始加载资源。

它们共同点：

- 都只会加载资源，并不执行。
- 都有缓存。

它们区别：

- `Preload`加载优先级高，`Prefetch`加载优先级低。
- `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

总结：

- 当前页面优先级高的资源用 `Preload` 加载。
- 下一个页面需要使用的资源用 `Prefetch` 加载。

它们的问题：兼容性较差。

- 我们可以去[Can I Use](https://caniuse.com/)网站查询 API 的兼容性问题。
  - 红色完全不兼容（有绿色表示要开启浏览器特性才能用）
  - 绿色完全兼容
  - 黄色存在兼容性问题
- `Preload` 相对于 `Prefetch` 兼容性好一点。

使用

- 下载`npm install --save-dev @vue/preload-webpack-plugin`
- 导入`const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');`

- 使用`new PreloadWebpackPlugin({rel: 'preload',as: 'script',// rel: 'prefetch' // prefetch兼容性更差})`
