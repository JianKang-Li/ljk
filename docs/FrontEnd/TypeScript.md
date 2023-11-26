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
  |  array  |      [1,2,3]      |           任意JS数组，一般类型一致           |
  |  tuple  |       [4,5]       | 元组，TS新增类型，固定长度数组，类型不同 |
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

### void 和null、undefined

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

```ts
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 `void` 类型的变量不能赋值给 `number` 类型的变量：

```ts
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 数组的类型

在 TypeScript 中，数组类型有多种定义方式，比较灵活。

+ 最简单的方法是使用「类型 + 方括号」来表示数组

+ 我们也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组

+ `NumberArray` 表示：只要索引的类型是数字时，那么值的类型必须是数字。

  虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。

+ 类数组（Array-like Object）不是数组类型

+ 一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型

### 函数类型

在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）

```js
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
function sum(x: number, y: number): number {
    return x + y;
}
```

注意，**输入多余的（或者少于要求的）参数，是不被允许的**

**可选参数必须接在必需参数后面**

### 参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数**

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

### 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

**语法**

```ts
值 as 类型
```

或

```ts
<类型>值
```

在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 `值 as 类型`。

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
swim(tom);
```

## 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件

### 新语法索引

+ `declare var` 声明全局变量

`declare var` 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 `declare let` 和 `declare const`，使用 `let` 与使用 `var` 没有什么区别

+ `declare function`声明全局方法

`declare function` 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 `function` 来定义

+ `declare class`声明全局类

当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型

+ `declare enum`声明全局枚举类型

使用 `declare enum` 定义的枚举类型也称作外部枚举（Ambient Enums）

+ `declare namespace`声明（含有子属性的）全局对象

`namespace` 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。

由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 `module` 关键字表示内部模块。但由于后来 ES6 也使用了 `module` 关键字，ts 为了兼容 ES6，使用 `namespace` 替代了自己的 `module`，更名为命名空间。

+ `interface` 和 `type`声明全局类型

除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 `interface` 或 `type` 来声明一个全局的接口或类型

暴露在最外层的 `interface` 或 `type` 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 `namespace` 下

+ `export`导出变量

`export` 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现

+ `export namespace` 导出（含有子属性的）对象

与 `declare namespace` 类似，`export namespace` 用来导出一个拥有子属性的对象

+ `export default`ES6 默认导出

在 ES6 模块系统中，使用 `export default` 可以导出一个默认值，使用方可以用 `import foo from 'foo'` 而不是 `import { foo } from 'foo'` 来导入这个默认值

+ `export =`commonjs 导出模块

在 commonjs 规范中，我们用以下方式来导出一个模块

+ `export as namespace` UMD 库声明全局变量
+ `declare global`扩展全局变量

使用 `declare global` 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型

+ `declare module`扩展模块

如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 `declare module` 扩展原有模块

`declare module` 也可用于在一个文件中一次性声明多个模块的类型

+ `///` 三斜线指令

在全局变量的声明文件中，是不允许出现 `import`, `export` 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了

## Ts 写nodejs

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
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

+ 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json可以使用tsc --init自动生成

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

## TS使用

给vue的reactive对象动态添加属性

```TS
interface state {
    name: string
    age: number
    likes?: Array<string>
}

const rawState: state = reactive({
    name: "tom",
    age: 25,
})

rawState.likes && rawState.likes.push("c");
```

type 定义类型别名

interface 定义接口，可用于对象提取

extends 继承类或接口    ts允许接口继承多接口

### tsc 常用编译参数如下表所示

| 序号 |                         编译参数说明                         |
| :--: | :----------------------------------------------------------: |
|  1.  |                    **--help**显示帮助信息                    |
|  2.  |                   **--module**载入扩展模块                   |
|  3.  |                  **--target**设置 ECMA 版本                  |
|  4.  | **--declaration**额外生成一个 .d.ts 扩展名的文件。`tsc ts-hw.ts --declaration`以上命令会生成 ts-hw.d.ts、ts-hw.js 两个文件。 |
|  5.  |              **--removeComments**删除文件的注释              |
|  6.  |         **--out**编译多个文件并合并到一个输出的文件          |
|  7.  | **--sourcemap**生成一个 sourcemap (.map) 文件。sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。 |
|  8.  | **--module noImplicitAny**在表达式和声明上有隐含的 any 类型时报错 |
|  9.  | **--watch**在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。 |

### 类型断言（Type Assertion）

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。

语法格式：

```
<类型>值
```

或:

```
值 as 类型
```

### TypeScript 有以下几种作用域

+ **全局作用域** − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
+ **类作用域** − 这个变量也可以称为 **字段**。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
+ **局部作用域** − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

### 位运算符

位操作是程序设计中对位模式按位或二进制数的一元和二元操作。

| 运算符 | 描述                                                         | 例子        | 类似于       | 结果 | 十进制 |
| :----- | :----------------------------------------------------------- | :---------- | :----------- | :--- | :----- |
| &      | AND，按位与处理两个长度相同的二进制数，两个相应的二进位都为 1，该位的结果值才为 1，否则为 0。 | x = 5 & 1   | 0101 & 0001  | 0001 | 1      |
| \|     | OR，按位或处理两个长度相同的二进制数，两个相应的二进位中只要有一个为 1，该位的结果值为 1。 | x = 5 \| 1  | 0101 \| 0001 | 0101 | 5      |
| ~      | 取反，取反是一元运算符，对一个二进制数的每一位执行逻辑反操作。使数字 1 成为 0，0 成为 1。 | x = ~ 5     | ~0101        | 1010 | -6     |
| ^      | 异或，按位异或运算，对等长二进制模式按位或二进制数的每一位执行逻辑异按位或操作。操作的结果是如果某位不同则该位为 1，否则该位为 0。 | x = 5 ^ 1   | 0101 ^ 0001  | 0100 | 4      |
| <<     | 左移，把 << 左边的运算数的各二进位全部左移若干位，由 << 右边的数指定移动的位数，高位丢弃，低位补 0。 | x = 5 << 1  | 0101 << 1    | 1010 | 10     |
| >>     | 右移，把 >> 左边的运算数的各二进位全部右移若干位，>> 右边的数指定移动的位数。 | x = 5 >> 1  | 0101 >> 1    | 0010 | 2      |
| >>>    | 无符号右移，与有符号右移位类似，除了左边一律使用0 补位。     | x = 2 >>> 1 | 0010 >>> 1   | 0001 | 1      |

### TypeScript 接口

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

### TypeScript 命名空间

命名空间一个最明确的目的就是解决重名问题。

TypeScript 中命名空间使用 **namespace** 来定义，语法格式如下：

```ts
namespace SomeNameSpaceName {    
    export interface ISomeInterfaceName {      }     export class SomeClassName {      }   
}
```

以上定义了一个命名空间 SomeNameSpaceName，如果我们需要在外部可以调用 SomeNameSpaceName 中的类和接口，则需要在类和接口添加 **export** 关键字。

要在另外一个命名空间调用语法格式为：

```ts
SomeNameSpaceName.SomeClassName;
```

如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：

```ts
/// <reference path = "SomeFileName.ts" />
```

### 嵌套命名空间

命名空间支持嵌套，即你可以将命名空间定义在另外一个命名空间里头。

```ts
namespace namespace_name1 {     
    export namespace namespace_name2 {  
        export class class_name {    }  
    }  
}
```

成员的访问使用点号 **.** 来实现

模块导出使用关键字 **export** 关键字，语法格式如下：

```ts
// 文件名 : SomeInterface.ts  
export interface SomeInterface {    
    // 代码部分 
}
```

要在另外一个文件使用该模块就需要使用 **import** 关键字来导入:

`import someInterfaceRef = require("./SomeInterface");`

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对：

```ts
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

上例的编译结果是：

```ts
jQuery('#foo');
```

### 声明文件

声明文件以 **.d.ts** 为后缀

声明文件或模块的语法格式如下：

```ts
declare module Module_Name {
}
```

TypeScript 引入声明文件语法格式：

```ts
/// <reference path = " runoob.d.ts" />
```

### TS中实现导出接口类型的数组，并统一导出，实现接口导出

```ts
export interface IUser {
  id: number;
  username: string;
  auth: number[];
}

const users: IUser[] = [
  {
    id: 1,
    username: "zhangsan",
    auth: [2, 3, 6, 7],
  },
  {
    id: 2,
    username: "lisi",
    auth: [2, 3, 5, 6, 7, 8],
  },
  {
    id: 3,
    username: "wangwu",
    auth: [2, 3, 4, 5, 6, 7, 8],
  },
];

export default users;

```

```ts
export interface IRoute {
  id: number;
  pid: number;
  path: string;
  name: string;
  link?: string;
  title: string;
}

const routes: IRoute[] = [
  {
    id: 2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理",
  },
  {
    id: 3,
    pid: 2,
    path: "operate",
    name: "CourseOperate",
    link: "/course/operate",
    title: "课程操作",
  },
  {
    id: 4,
    pid: 3,
    path: "info_data",
    name: "CourseInfoData",
    link: "/course/operate/info_data",
    title: "课程数据",
  },
  {
    id: 5,
    pid: 2,
    path: "add",
    name: "CourseAdd",
    link: "/course/add",
    title: "增加课程",
  },
  {
    id: 6,
    pid: 0,
    path: "/student",
    name: "Student",
    title: "学生管理",
  },
  {
    id: 7,
    pid: 6,
    path: "/student/operate",
    name: "StudentOperate",
    link: "/student/operate",
    title: "学生操作",
  },
  {
    id: 8,
    pid: 6,
    path: "add",
    name: "StudentAdd",
    link: "/student/add",
    title: "增加学生",
  },
];

export default routes;

```

```ts
export * from "./routes";
export * from "./users";

import routes from "./routes";
import users from "./users";

export { routes, users };

```

```ts
import { users, IRoute, IUser, routes } from "./data";
```
