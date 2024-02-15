Vue使用i18n-浮生阁阁主# Vue与vue-i18n

## 包安装
`npm  i vue-i18n@8`
**Vue2使用8版本**
**Vue3使用默认版本**

## 资源准备
1. 新建文件夹lang
存放使用的语言文件
目录结构
+ scr
	+ lang
		+ en.js
		+ zh.js
		+ index.js
2. 编辑文件
en.js:
```js
// 创建文件en.js
const en = {
  admin: 'admin',
  test: 'hello',
  language: {
      zh: '中文',
      en: 'English',
  },
}
export default en;
```
zh.js:
```js
// 创建文件zh.js
const zh = {
  admin: '后台管理系统',
  test: '你好',
  language: {
      zh: '中文',
      en: 'English',
  },
}
export default zh;
```
index.js:
```js
// 创建文件vueIN.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
// 引入各个语言配置文件
import zh from './zh';
import en from './en';
// 创建vue-i18n实例i18n
const i18n = new VueI18n({
    // 设置默认语言
    locale: 'zh', // 语言标识
    // 添加多语言（每一个语言标示对应一个语言文件）
    messages: {
        zh,
        en,
    }
})
// 暴露i18n
export default i18n;
```
main.js:
```js
import Vue from 'vue'
import App from './App.vue'
import i18n from './lang'
new Vue({
  i18n,
  render: (h) => h(App)
}).$mount('#app')
```
## 使用
```vue
<template>
  <div id="app">
    <div class="control">
      <button @click="handEvent('en')">英文</button>
      <button @click="handEvent('zh')">中文</button>
    </div>

    <div class="show">
      <div class="item">
        <label>admin:</label>
        <span>{{ $t("admin") }}</span>
      </div>
      <div class="item">
        <label>test:</label>
        <span>{{ $t("test") }}</span>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  methods: {
    handEvent(type) {
      localStorage.setItem("language", type);
      this.$i18n.locale = type; //这个代码负责实时切换语言
    }
  }
}
</script>

<style scoped>
.control{
  display: flex;
  align-items: center;
  justify-content: center;
}
.control button{
  margin: 1rem;
  border: none;
  padding: 0.5rem 1rem;
  background-color: #46AEF7;
  border-radius: 0.5rem;
  box-shadow: #eee 3px 3px 3px;
  color: #fff;
  font-size: medium;
}

.show{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item{
  width: 10rem;
  text-align: left;
}
</style>
```
参考文章:https://blog.csdn.net/m0_50884068/article/details/124216762