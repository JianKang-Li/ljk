# TypeScript

什么是TS

+ 以JavaScript为基础构建的语言
+ 一个JavaScript的超集
+ 可以在任何支持JavaScript的平台中执行
+ TypeScript扩展了JavaScript,并添加了类型

TS增加了什么

+ 支持ES的新特性
+ 类型
+ 添加ES不具备的新特性
+ 丰富的配置选项
+ 强大的开发工具

**编译ts**
`tsc 文件名`

## 基本类型

+ 类型声明

  + 类型声明是TS非常重要的一个特点

  + 通过类型声明可以指定TS中变量（参数、形参）的类型

  + 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

  + 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

  + 语法：

    + ```typescript
      let 变量: 类型;
      
      let 变量: 类型 = 值;
      
      function fn(参数: 类型, 参数: 类型): 类型{
          ...
      }
      ```

+ 自动类型判断

  + TS拥有自动的类型判断机制
  + 当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型
  + 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明
+ 类型：

  |  类型   |       例子        |              描述              |
  | :-----: | :---------------: | :----------------------------: |
  | number  |    1, -33, 2.5    |            任意数字            |
  | string  | 'hi', "hi", `hi`  |           任意字符串           |
  | boolean |    true、false    |       布尔值true或false        |
  | 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
  |   any   |         *         | 任意类型,可以赋值给任意类型变量  |
  | unknown |         *         | 类型安全的any，可以被赋值任意类型，但不可以直接赋值给其他类型  |
  |  void   | 空值（undefined） |     没有值（或undefined）      |
  |  never  |      没有值       |          不能是任何值          |
  | object  |  {name:'孙悟空'}  |          任意的JS对象          |
  |  array  |      [1,2,3]      |           任意JS数组           |
  |  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
  |  enum   |    enum{A, B}     |       枚举，TS中新增类型       |

```TS
//如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检湖
let k=false
//第一二个为参数类型，第三个为返回值类型
function sum(s:number,k:number):number{
  return s+k
}
```

```TS
//联合类型
let b:'male'|'female';
b='male'
b='female'
// b='hello' //报错，不在范围内
//&表同时
let c:string|number;
```

```TS
//unknow
let e:unknown;
e='hello'
let s:string;
if(typeof e==='string'){
  s=e
}

//或者，告诉解析器变量实际类型
s=e as string;
s=<string> e
```

**能用 unknown 不用 any**

```TS
//自动判断返回值
function fn(num: number) {
  if (num > 0) {
    return true;
  } else {
    return 123;
  }
}

//void表示没有返回值，可以为null或undefined
function fn():void{
  return;
}

//never表示没有返回值
function error(message: string): never {
  throw new Error(message);
}
```

```TS
//对象
//指定对象可以包含的属性
//指向一个拥有name属性的对象
//属性名后加?表示可选
let b: { name: string,age?:number };

//必包含某个属性可随意增加属性:any表示任意属性
let c:{name:string,[propName:string]:any}

//表示d是一个函数，且返回值是number，设置函数结构的类型声明
let d: (a: number, b: number) => number;
```

```TS
//定义数组指定类型
let e: number[] = [1, 2, 3];
let g: Array<number>;
```

元组：就是固定长度的数组

```TS
//定义元组
let h: [string, string];
h = ["hello", "123"];
```

```TS
//枚举enum
enum Gender {
  Male = 0,
  Female = 1,
}

let i: { name: string; gender: Gender };
i = {
  name: "孙悟空",
  gender: Gender.Male, //male
};
```

类型别名

```TS
type myType=1|2|3|4|5
let m:myType
```

+ 类型断言

  + 有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

    + 第一种

      + ```typescript
        let someValue: unknown = "this is a string";
        let strLength: number = (someValue as string).length;
        ```

    + 第二种

      + ```typescript
        let someValue: unknown = "this is a string";
        let strLength: number = (<string>someValue).length;
        ```

## 编译

### 自动编译文件

+ 编译文件时，使用 -w 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

+ 示例：

  + ```powershell
      tsc xxx.ts -w
      ```

### 自动编译整个项目

+ 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。

+ 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json

+ tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

+ 配置选项：

  + include

    + 定义希望被编译文件所在的目录

    + 默认值：["\*\*/\*"]

    + 示例：

      + ```json
          "include":["src/**/*", "tests/**/*"]
          ```

      + 上述示例中，所有src目录和tests目录下的文件都会被编译

  + exclude

    + 定义需要排除在外的目录

    + 默认值：["node_modules", "bower_components", "jspm_packages"]

    + 示例：

      + ```json
          "exclude": ["./src/hello/**/*"]
          ```

      + 上述示例中，src下hello目录下的文件都不会被编译

  + extends

    + 定义被继承的配置文件

    + 示例：

      + ```json
          "extends": "./configs/base"
          ```

      + 上述示例中，当前配置文件中会自动包含config目录下base.json中的所有配置信息

  + files

    + 指定被编译文件的列表，只有需要编译的文件少时才会用到

    + 示例：

      + ```json
          "files": [
              "core.ts",
              "sys.ts",
              "types.ts",
              "scanner.ts",
              "parser.ts",
              "utilities.ts",
              "binder.ts",
              "checker.ts",
              "tsc.ts"
            ]
          ```

      + 列表中的文件都会被TS编译器所编译

    + compilerOptions

      + 编译选项是配置文件中非常重要也比较复杂的配置选项

      + 在compilerOptions中包含多个子选项，用来完成对编译的配置

        + 项目选项

          + target

            + 设置ts代码编译的目标版本

            + 可选值：

              + ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

            + 示例：

              + ```json
                  "compilerOptions": {
                      "target": "ES6"
                  }
                  ```

              + 如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码

          + lib

            + 指定代码运行时所包含的库（宿主环境）

            + 可选值：

              + ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

            + 示例：

              + ```json
                  "compilerOptions": {
                      "target": "ES6",
                      "lib": ["ES6", "DOM"],
                      "outDir": "dist",
                      "outFile": "dist/aa.js"
                  }
                  ```

          + module

            + 设置编译后代码使用的模块化系统

            + 可选值：

              + CommonJS、UMD、AMD、System、ES2020、ESNext、None

            + 示例：

              + ```typescript
                  "compilerOptions": {
                      "module": "CommonJS"
                  }
                  ```

          + outDir

            + 编译后文件的所在目录

            + 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

            + 示例：

              + ```json
                  "compilerOptions": {
                      "outDir": "dist"
                  }
                  ```

              + 设置后编译后的js文件将会生成到dist目录

          + outFile

            + 将所有的文件编译为一个js文件

            + 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

            + 示例：

              + ```json
                  "compilerOptions": {
                      "outFile": "dist/app.js"
                  }
                  ```

          + rootDir

            + 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

            + 示例：

              + ```json
                  "compilerOptions": {
                      "rootDir": "./src"
                  }
                  ```

          + allowJs

            + 是否对js文件编译

          + checkJs

            + 是否对js文件进行检查

            + 示例：

              + ```json
                  "compilerOptions": {
                      "allowJs": true,
                      "checkJs": true
                  }
                  ```

          + removeComments

            + 是否删除注释
            + 默认值：false

          + noEmit

            + 不对代码进行编译
            + 默认值：false

          + sourceMap

            + 是否生成sourceMap
            + 默认值：false

        + 严格检查

          + strict
            + 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
          + alwaysStrict
            + 总是以严格模式对代码进行编译
          + noImplicitAny
            + 禁止隐式的any类型
          + noImplicitThis
            + 禁止类型不明确的this
          + strictBindCallApply
            + 严格检查bind、call和apply的参数列表
          + strictFunctionTypes
            + 严格检查函数的类型
          + strictNullChecks
            + 严格的空值检查
          + strictPropertyInitialization
            + 严格检查属性是否初始化

        + 额外检查

          + noFallthroughCasesInSwitch
            + 检查switch语句包含正确的break
          + noImplicitReturns
            + 检查函数没有隐式的返回值
          + noUnusedLocals
            + 检查未使用的局部变量
          + noUnusedParameters
            + 检查未使用的参数

        + 高级

          + allowUnreachableCode
            + 检查不可达代码
            + 可选值：
              + true，忽略不可达代码
              + false，不可达代码将引起错误
          + noEmitOnError
            + 有错误的情况下不进行编译
            + 默认值：false

## webpack 打包TS代码

下载构建工具

+ ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```
  + 共安装了7个包
    + webpack
      + 构建工具webpack
    + webpack-cli
      + webpack的命令行工具
    + webpack-dev-server
      + webpack的开发服务器
    + typescript
      + ts编译器
    + ts-loader
      + ts加载器，用于在webpack中编译ts文件
    + html-webpack-plugin
      + webpack中html插件，用来自动创建html文件
    + clean-webpack-plugin
      + webpack中的清除插件，每次构建都会先清除目录

## babel使用

安装依赖包：

+ ```npm i -D @babel/core @babel/preset-env babel-loader core-js```
+ 共安装了4个包，分别是：
  + @babel/core
    + babel的核心工具
  + @babel/preset-env
    + babel的预定义环境
  + @babel-loader
    + babel在webpack中的加载器
  + core-js
    + core-js用来使老版本的浏览器支持新版ES语法

```js
module: {
    rules: [
        {
            test: /\.ts$/,
            use: [
                {
                    loader: "babel-loader",
                    options:{
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets":{
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    "corejs":"3",
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                {
                    loader: "ts-loader",

                }
            ],
            exclude: /node_modules/
        }
    ]
}
```
