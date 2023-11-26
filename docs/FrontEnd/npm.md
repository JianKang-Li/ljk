# npm

## 1、安装

安装:

```npm
npm install 模块名   -g/—-save-dev（本地使用）/--save（默认）
```

## 2、卸载

卸载:

```npm
npm uninstall 模块名
```

-g 全局（global) 特性:安装的模块可以在命令行执行，其他都在当前目录下
-g 在全局目录中（通过`npm config list`可以看全局目录所在位置）

## 3、全局包卸载

```npm
npm uninstall -g <package>
```

卸载全局安装命令

## 4、全局包安装位置（不建议更改）

`C:\Users\Administrator\AppData\Roaming\npm\node_modules`
这个位置用于定位安装了什么包，因为查看全局包的命令`npm ls -g`确实不好看明白安装了那些包。
还有以下常用命令
查看所有全局安装的模块 `npm ls -g`
查看 npm 默认设置（部分） `npm config ls`
查看 npm 默认设置（全部） `npm config ls -l`

修改全局依赖下载位置
`npm config set prefix "E:\Program Files\npm_global_modules\node_modules"`

`npm install --production` 只安装生产环境的包

科普软件版本含义:
aplha 版-内测版(功能不全，BUG 多)
beta 版-公测版(功能不全,发烧友准备，依旧存在 BUG)
rc 版-预览版(功能不再增加)
stable 版-用户可用

主版本号.次版本号.修改版本号
主版本:功能模块有大的变动，比如增加多个模块或者整体架构发生变化
次版本:次版本号的升级对应的只是局部的变动
修改版:BUG 修复或者功能的扩充等

~用户使用该版本后，最多升级到【修改版】最新

^用户使用该版本后，最多升级到【次版本】最新

\*用户使用该版本后，可以升级到最新版本

## 5、NPM源管理

明确:通过npm命令下载会到国外服务器获取

缺点:下载速度慢

解决:切换国内服务器

简介:nrm是资源管理工具，可以切换国内服务器下载命令

安装: `npm install nrm -g`

查看: `nrm ls`(注:单词list缩写，查看可用服务器）

切换:`nrm use 服务器名`

测速: `nrm test npm`（测试npm下载延迟）

测速：`nrm test`（测试可用服务器延迟）

## 6、NPM自定义脚本命令

通过修改package.json文件的scripts自定义脚本命令

`npm run 名称`(ps. 1-名称指scripts 中的键2-如果是start 则run可省略)

使用双引号，最后一个不能写逗号，且不能有注释

## 7、NPM 自定义发布

自定义发布: `node login` &`node publish`

nodemon 模块可在修改js代码后自动重启服务，不用手动重新node

## 8、更新包

`npm update <name> -g`

## 9、更新npm

`npm install npm@latest -g`

## 10、检查包是否过时

`npm outdated`
