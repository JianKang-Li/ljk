Vue错误-浮生阁阁主### 【Vue】组件命名报错 “Component name “XXX“ should always be multi-word”的解决方法
在配置完 ESlint 后，要求代码格式规范的同时，也规定了组件的名称格式，要写成 “XXXName”的格式，不能是单个单词。

所以除了改名，另一种解决方法是在 vue.config.js 文件中加一行

lintOnSave: false

### 常用关闭项
```json
"parserOptions": {
	"parser": "@babel/eslint-parser",
	"requireConfigFile": false
},
"rules": {
	"vue/multi-word-component-names": 0,
	"vue/no-unused-components": "off"
}
```
### Vue3安装包后却提示无法找到模块
在src下新建文件`shime-vue.d.ts`
```ts
declare module "qs";
```

### Vue使用qrcodejs2报错
找不到"_android"
解决： 
+ 安装使用qrcodejs2-fix
+ 修改源码

### Vue3<keep-alive>使用
```vue
<router-view v-slot="{ Component }">
	<keep-alive>
		<component :is="Component"></component>
	</keep-alive>
</router-view>
```