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

官方网站：[webpack](https://www.webpackjs.com/)  [babel](https://www.babeljs.cn/)  [eslint](http://eslint.cn/)

## 安装

`npm i webpack webpack-cli -D`

## 启动

`npx webpack ./src/main.js --mode=development production`

## 插件

| 插件                           | github                                                       | 描述                                                         |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| webpack-manifest-plugin        | [github](https://github.com/shellscape/webpack-manifest-plugin) | 将 manifest 数据提取为一个 json 文件以供使用                 |
| html-webpack-plugin            | [github](https://github.com/jantimon/html-webpack-plugin)    | 生成HTML文件                                                 |
| mini-css-extract-plugin        | [github](https://github.com/webpack-contrib/mini-css-extract-plugin) | 用于将 CSS 从主应用程序中分离                                |
| webpack-bundle-analyzer        | [github](https://github.com/webpack-contrib/webpack-bundle-analyzer) | 它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。 |
| webpack-dev-server             | [github](https://github.com/webpack/webpack-dev-server)      | 提供 live reloading 模式的开发服务器                         |
| eslint-webpack-plugin          |                                                              | js代码规则检查                                               |
| @vue/preload-webpack-plugin    |                                                              | preload/prefetch实现                                         |
| image-minimizer-webpack-plugin |                                                              | 图片无损压缩                                                 |
| terser-webpack-plugin          |                                                              | 多线程打包                                                   |
| workbox-webpack-plugin         |                                                              | 离线访问                                                     |

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

elintrc.js模板

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

#### Network Cache

将来开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快。

但是这样的话就会有一个问题, 因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。

所以我们从文件名入手，确保更新前后文件名不一样，这样就可以做缓存了。

它们都会生成一个唯一的 hash 值。

- fullhash（webpack4 是 hash）

每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。

- chunkhash

根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值。

- contenthash

根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。

使用

```js
//output:
filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式

//css:
filename: "static/css/[name].[contenthash:8].css",
chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
```

- 问题：

当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。

但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

- 原因：
  - 更新前：math.xxx.js, main.js 引用的 math.xxx.js
  - 更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化
- 解决：

将 hash 值单独保管在一个 runtime 文件中。

我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。

runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。

```js
optimization: {
    // 提取runtime文件
    runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
}
```

#### Core-js

过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题。

它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。

所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决

`core-js` 是专门用来做 ES6 以及以上 API 的 `polyfill`。

`polyfill`翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

下载：

`npm i @babel/eslint-parser -D`

```js
//.eslintrc.js
parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
```

全部引入：

`npm i core-js`

main.js

```js
import "core-js";
```

按需引入：

main.js

```js
import "core-js/es/promise";
```

自动按需引入:

- babel.config.js

```js
module.exports = {
  // 智能预设：能够编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
};
```

#### PWA

开发 Web App 项目，项目一旦处于网络离线情况，就没法访问了。

我们希望给项目提供离线体验。

渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。

其中最重要的是，在 **离线(offline)** 时应用程序能够继续运行功能。

内部通过 Service Workers 技术实现的。

安装：

`npm i workbox-webpack-plugin -D`

配置：

webpack.config.prod.js

```js
const WorkboxPlugin = require("workbox-webpack-plugin");

new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,//设置最大文件大小
    }),
```

main.js

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```

解决路径问题：

安装：`npm i serve -g`

`serve  文件夹名`

## Loader原理

帮助 webpack 将不同类型的文件转换为 webpack 可识别的模块

### loader 执行顺序

#### 1. 分类

- pre： 前置 loader
- normal： 普通 loader
- inline： 内联 loader
- post： 后置 loader

#### 2. 执行顺序

- 4 类 loader 的执行优级为：`pre > normal > inline > post` 。
- 相同优先级的 loader 执行顺序为：`从右到左，从下到上`。

```javascript
enforce: "pre",//设置优先级
```

#### 3. 使用 loader 的方式

- 配置方式：在 `webpack.config.js` 文件中指定 loader。（pre、normal、post loader）
- 内联方式：在每个 `import` 语句中显式指定 loader。（inline loader）

#### 4. inline loader

用法：`import Styles from 'style-loader!css-loader?modules!./styles.css';`

含义：

- 使用 `css-loader` 和 `style-loader` 处理 `styles.css` 文件
- 通过 `!` 将资源中的 loader 分开

`inline loader` 可以通过添加不同前缀，跳过其他类型 loader。

- `!` 跳过 normal loader。

```js
import Styles from '!style-loader!css-loader?modules!./styles.css';
```

- `-!` 跳过 pre 和 normal loader。

```js
import Styles from '-!style-loader!css-loader?modules!./styles.css';
```

- `!!` 跳过 pre、 normal 和 post loader。

```js
import Styles from '!!style-loader!css-loader?modules!./styles.css';
```

### loader原理

loader就是一个函数，当webpack解析资源的时候会调用相应loader去处理

loader接受到文件内容作为参数，返回内容出去

```js
// 测试loader
/*
content 文件内容
map SourceMap
meta 别的loader传递的数据
*/

module.exports = function (content, map, meta) {
  console.log(content);
  return content;
}
```

### loader分类

#### 1、同步loader

```js
// 同步loader

// module.exports = function (content) {
//   return content;
// }

module.exports = function (content, map, meta) {
  /* 
  第一个参数：err 是否有错误
  第二个参数：content 处理后的内容
  第三个参数：SourceMap 继续传递source-map
  第四个参数：给其他loader传递的参数
  */
  this.callback(null, content, map, meta)
}
```

**同步loader不能执行异步操作**

#### 2、异步loader

```js
// 异步loader

module.exports = function (content, map, meta) {
  const callback = this.async()

  setTimeout(() => {
    console.log("test2")
    callback(null, content, map, meta)
  }, 1000);
}
```

#### 3、Raw Loader

```js
// Rawloader

/* 
接受到的content是Buffer数据,
一般用于处理图片，字体图标等资源
*/
// module.exports = function (content) {
//   console.log(content)
//   return content;
// }

// module.exports.raw = true

function Test3Loader(content) {
  return content
}

Test3Loader.row = true

module.exports = Test3Loader
```

#### 4、Pitching Loader

```js
module.exports = function (content) {
  console.log("normal loader1")
  return content;
}

// 在loader执行之前开始执行
module.exports.pitch = function () {
  console.log("pitch loader1")
}

/* 
use    1,2,3 （normal loader）
pitch  1,2,3
执行顺序：pitch1，pitch2，pitch3，loader3，loader2，loader1
*/
```

**一旦提前在pitch方法中return结果就会中断，执行上一个loader的normal loader方法，自己和后面的不执行**

### loader API

| 方法名                  | 含义                                       | 用法                                           |
| ----------------------- | ------------------------------------------ | ---------------------------------------------- |
| this.async              | 异步回调 loader。返回 this.callback        | const callback = this.async()                  |
| this.callback           | 可以同步或者异步调用的并返回多个结果的函数 | this.callback(err, content, sourceMap?, meta?) |
| this.getOptions(schema) | 获取 loader 的 options                     | this.getOptions(schema)                        |
| this.emitFile           | 产生一个文件                               | this.emitFile(name, content, sourceMap)        |
| this.utils.contextify   | 返回一个相对路径                           | this.utils.contextify(context, request)        |
| this.utils.absolutify   | 返回一个绝对路径                           | this.utils.absolutify(context, request)        |

> 更多文档，请查阅 [webpack 官方 loader api 文档](https://webpack.docschina.org/api/loaders/#the-loader-context)

### 自定义loader

schema.json

用于检查options是否符合规定

```json
{
  "type": "object",
  "properties": {
    "author": {
      "type": "string"
    }
  },
  "additionalProperties": false//是否允许追加属性
}
```

```js
type: "javascript/auto", // 解决图片重复打包问题
```

组织默认处理静态资源

style-loader:

```js
module.exports = function (content) {



  /* 
    1、不使用css-loader出现其他资源路径问题，
    2、使用css-loader返回为js代码无法使用 
  */
  // const script = `
  // const styleEl=document.createElement("style")
  // styleEl.innerHTML=${JSON.stringify(content)};
  // document.head.appendChild(styleEl);
  // `


  // return script;
}


module.exports.pitch = function (remainingRequest) {
  /**
 * @remainingRequest 剩余请求
 * @precedingRequest 前置请求
 * @data 数据对象
 */

  // remainingRequest 剩下还需要处理的loader
  // console.log(remainingRequest)//F:\git\WebPackPractice\loader\node_modules\css-loader\dist\cjs.js!F:\git\WebPackPractice\loader\src\css\index.css
  // 1、将绝对路径改为相对路径
  // ..\..\loader\node_modules\css-loader\dist\cjs.js!.\index.css
  const relativePath = remainingRequest.split("!").map(absolutePath => {
    // 返回相对路径
    return this.utils.contextify(this.context, absolutePath)
  }).join("!")
  // console.log(relativePath)//../../node_modules/css-loader/dist/cjs.js!./index.css

  //引入css-loader处理好的资源
  // 创建style标签，将内容插入到页面中
  const script = `
  import style from "!!${relativePath}"
  const styleEl=document.createElement("style")
  styleEl.innerHTML=style;
  document.head.appendChild(styleEl);
  `

  // 终止后面的loader执行
  return script;
}
```

Pitching loader 获取后面loader处理获取的信息，使用require，但require使用相对路径

```javascript
 !!代表禁用所有配置的loader，只使用inline loader
```

## Plugin 原理

### plugin 工作原理

通过插件我们可以扩展webpack，如入自定义的热建行为，使 webpack可以执行更广泛的任务，拥有更强的热建能力。

站在代码逻辑的角度就是：webpack 在编译代码过程中，会触发一系列 `Tapable` 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

### webpack 内部的钩子

`Tapable` 为 webpack 提供了统一的插件接口（钩子）类型定义，它是 webpack 的核心功能库。webpack 中目前有十种 `hooks`，在 `Tapable` 源码中可以看到，他们是：

```js
// https://github.com/webpack/tapable/blob/master/lib/index.js
exports.SyncHook = require("./SyncHook");
exports.SyncBailHook = require("./SyncBailHook");
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
exports.SyncLoopHook = require("./SyncLoopHook");
exports.AsyncParallelHook = require("./AsyncParallelHook");
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
exports.HookMap = require("./HookMap");
exports.MultiHook = require("./MultiHook");
```

`Tapable` 还统一暴露了三个方法给插件，用于注入不同类型的自定义构建行为：

- `tap`：可以注册同步钩子和异步钩子。
- `tapAsync`：回调方式注册异步钩子。
- `tapPromise`：Promise 方式注册异步钩子。

### Plugin 构建对象

compiler 对象中保存着完整的 Webpack 环境配置，每次启动 webpack 构建时它都是一个独一无二，仅仅会创建一次的对象。

这个对象会在首次启动 Webpack 时创建，我们可以通过 compiler 对象上访问到 Webapck 的主环境配置，比如 loader 、 plugin 等等配置信息。

它有以下主要属性：

- `compiler.options` 可以访问本次启动 webpack 时候所有的配置文件，包括但不限于 loaders 、 entry 、 output 、 plugin 等等完整配置信息。
- `compiler.inputFileSystem` 和 `compiler.outputFileSystem` 可以进行文件操作，相当于 Nodejs 中 fs。
- `compiler.hooks` 可以注册 tapable 的不同种类 Hook，从而可以在 compiler 生命周期中植入不同的逻辑。

> [compiler hooks 文档](https://webpack.docschina.org/api/compiler-hooks/)

### Compilation

compilation 对象代表一次资源的构建，compilation 实例能够访问所有的模块和它们的依赖。

一个 compilation 对象会对构建依赖图中所有模块，进行编译。 在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)。

它有以下主要属性：

- `compilation.modules` 可以访问所有模块，打包的每一个文件都是一个模块。
- `compilation.chunks` chunk 即是多个 modules 组成而来的一个代码块。入口文件引入的资源组成一个 chunk，通过代码分割的模块又是另外的 chunk。
- `compilation.assets` 可以访问本次打包生成所有文件的结果。
- `compilation.hooks` 可以注册 tapable 的不同种类 Hook，用于在 compilation 编译模块阶段进行逻辑添加以及修改。

> [compilation hooks 文档](https://webpack.docschina.org/api/compilation-hooks/)

### 生命周期简图

<img src="F:\git\githubio\ljk.github.io\docs\images\plugin.jpg" alt="生命周期见图" style="zoom:33%;" />

### 注册钩子函数

```js
/* 
1. webpack加载webpack.config.js中所有配置，此时就会new TestPlugin(),执行constructor
2. webpack创建compiler对象
3. 遍历所有plugins中的插件，调用apply方法
4. 执行剩下编译流程（触发各个hooks事件）
*/

class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor")
  }

  apply(compiler) {
    console.log("TestPlugin apply")

    // 由文档可知，environment是同步hooks
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("TestPlugin environment")
    })

    // emit 异步串行钩子
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log("TestPlugin emit 111")

    })

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin emit 222")
        callback()
      }, 1000)
    })

    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("TestPlugin emit 333")
          resolve()
        }, 1000)
      })
    })


    // make 异步并行钩子
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      // 需要在compilation hook函数触发前注册
      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("TestPlugin seal")
      })
      setTimeout(() => {
        console.log("TestPlugin make 111")
        callback()
      }, 3000)
    })


    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make 222")
        callback()
      }, 1000)
    })


    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make 333")
        callback()
      }, 2000)
    })



  }
}

module.exports = TestPlugin
```

node调试

package.json注册指令

`"debug": "node --inspect-brk ./node_modules/webpack-cli/bin/cli.js"`

代码中使用`debugger;`

在浏览器中打开控制台，点击nodejs图标即可调试

## package.json小知识

`exports` 可以更容易地控制子目录的访问路径，也被称为 `export map`。

main为入口文件，导入从main开始

version号/semver规范：

- ^1.0.0
- ~1.0.0

`Semantic Versioning` 语义化版本的缩写，文档可见 [https://semver.org/ (opens new window)](https://semver.org/)，它由 `[major, minor, patch]` 三部分组成，其中

- `major`: 当你发了一个含有 Breaking Change 的 API
- `minor`: 当你新增了一个向后兼容的功能时
- `patch`: 当你修复了一个向后兼容的 Bug 时

对于 `~1.2.3` 而言，它的版本号范围是 `>=1.2.3 <1.3.0`

对于 `^1.2.3` 而言，它的版本号范围是 `>=1.2.3 <2.0.0`

dependencies和devDependencies区别

**对于业务代码而讲，它俩区别不大**

当进行业务开发时，严格区分 `dependencies` 与 `devDependencies` 并无必要，实际上，大部分业务对二者也并无严格区别。

当打包时，依靠的是 `Webpack/Rollup` 对代码进行模块依赖分析，与该模块是否在 `dep/devDep` 并无关系，只要在 `node_modules` 上能够找到该 Package 即可。

以至于在 CI 中 `npm i --production` 可加快包安装速度也无必要，因为在 CI 中仍需要 lint、test、build 等。

**对于库 (Package) 开发而言，是有严格区分的**

- dependencies: 在生产环境中使用
- devDependencies: 在开发环境中使用，如 webpack/babel/eslint 等

一些 Package 宣称自己是 `zero dependencies`，一般就是指不依赖任何 `dependencies`

## webpack打包库

```js
  entry: isProduction ? "./src/canvas.ts" : {
    index: "./src/index.ts",
    canvas: "./src/canvas.ts"
  },
  output: isProduction ? {
    path: path.resolve(__dirname, "dist"),
    filename: "Canvas.js",
    library: "Canvas",// 在全局变量中增加一个library变量
    libraryTarget: "umd",
    libraryExport: 'default',
    clean: true,
  } : {
    path: undefined,
    filename: "[name].[contenthash].js",//打包后的文件名称
    clean: true,
  },
```
