# Vuecli使用，Vuex，Vue-Router

## 关闭组件未使用提示

`"vue/no-unused-components": "off"`

## vue.config.js

lintOnSave: false, //关闭语法检查

## 关闭vue组件命名提示

package.json中

```json
"eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser",
      "requireConfigFile": false
    },
    "rules": {
      "vue/multi-word-component-names": 0
    }
  },
```

## 完整关闭提示

```json
"eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser",
      "requireConfigFile": false
    },
    "rules": {
      "vue/multi-word-component-names": 0,
      "vue/no-unused-components": "off",
      "no-unused-vars": "off"
    }
  },
```

## Vue特点

1.采用**组件化**模式，提高代码复用率、且让代码更好维护。
2.声明式编码，让编码人员无需直接操作DOM，提高开发效率。
3.使用虚拟DOM+优秀的Diff 算法，尽量复用DOM节点。

4.学习Vue之前要掌握的JavaScript基础知识?
ES6语法规范
ES6模块化
包管理器
原型、原型链
数组常用方法
axios
promise

## MVVM模型

M：模型：data中的数据
V：视图：模板
VM：视图模型：Vue实例对象

## 基础

## 脚手架Vue Cli创建项目

`vue create name`

## 查看脚手架配置

vue inspect > output.js

## vue.config.js默认内容

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
```

## 自定义配置需要在vue-cli官网看参数配置

## ref属性

1.被用来给元素或子组件注册引用信息(id的替代者)
2.应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象(vc)
3.使用方式:

+ 打标识:`<h1 ref="xxx">.....</h1>`
+ `<School ref="xxx"></School>`
+ 获取:`this.$refs.xxx`

## 配置项props

功能:让组件接收外部传过来的数据
(1).传递数据:

+ `<Demo name=" xxx"/>`

(2).接收数据:

+ 第一种方式(只接收）:props: ['name']
+ 第二种方式（限制类型）:props:{name : Number}
+ 第三种方式（限制类型、限制必要性、指定默认值）:

```js
props:{
  name:{
    type:String,//类型
    required:true,//必要性
    default:"老王"//默认值
  }
}
```

备注: props是只读的,Vue底层会监测你对props的修改,如果进行了修改，就会发出警告，
若业务需求确实需要修改。那么请复制props的内容到data中一份，然后去修改data中的数
据。

## mixin(混入)

功能:可以把多个组件共用的配置提取成一个混入对象使用方式:
第一步定义混合。例如:

```js
{
  data(){....},
  methods:{...},
  ...
}
```

第二步使用混入,例如:
(1).全局混入:Vue.mixin(xxx)
(2).局部混入:mixins:["xxx"]

## 插件

功能:用于增强Vue
本质:包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
定义插件:

```js
对象.install = function (vue,options){
  //1．添加全局过滤器
Vue.filter(.. ..)
//2添加全局指令
vue.directive(....)
//3.配置全局混入(合)
vue.mixin(....)
//4.添加实例方法
Vue.prototype.$myMethod = function(){...}
Vue.prototype.$myProperty = XXXX
}
//使用插件:
Vue.use()
```

## Vue组件局部样式scope

`<styple scoped>`
在App中设置样式全局样式(不使用scoped)
如果使用则在App中使用
`<style lang='less'>`
可以在style中使用less但须安装less-loader

## 关闭vue生产环境提示

在main.js中添加`Vue.config.productionTip = false;`

## 总结组件化开发

1. 组件化编码流程:
(1).拆分静态组件:组件要按照功能点拆分,命名不要与html元素冲突。
(2).实现动态组件:考虑好数据的存放位置。数据是一个组件在用，还是一些组件在用:
1).一个组什在用:放在组什自身即可。
2).一些组件在用:放在他们共同的父组件上(`<span style="color:red">状态提升<span>`)
(3).实现交互:从绑定事件开始.
2. props适用于:
(1).父组件==>子组件通信
(2).子组件==>父组件通信（要求父先给子一个函数)
3. 使用v-model时要切记:v-model绑定的值不能是props传过来的值，因为props是不可以修改的!
4. `props`传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

## webStorage

1. 存储内容大小一般支持5MB左右(不同浏览器可能还不一样)
2. 浏览器端通过 Window.sessionStorage和 Window.localStorage 属性来实现本地存储机制。
3. 相关API:
1.`xxxxStorage.setItem('key','value');`
该方法接受一个健和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
2.`xxxxStorage.getItem('person')`;
该方法接受一个键名作为参数，返回键名对应的值。
3.`xxxxStorage.removeItem('key');`
该方法接受一个键名作为参数。并把该健名从存储中删除。
4.`xxxxStorageclear()`
该方法会清空存储中的所有数据。
4.备注:
1.SessionStorage存储的内容会随着浏览器窗口关闭而消失。
2.LocalStorage存储的内容，需要手动清除才会消失。
3.xxxxStorage.getItem(xxx)如果xxx对应的value获取不到，那么getltem的返回值是null。
4.JSON.parse(null)的结果依然是null。

## 组件自定义事件

1.一种组件间通信的方式。适用于:子组件===>父组件
2.使用场景:A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件(事件的回调在A中)。
3.绑定自定义事件:
1.第一种方式，在父组件中:`<Demo @atguigu="test"/>或<Demo v-on:atguigu="test" />`
2.第二种方式，在父组件中:

```html
<组件名 ref="demo" />
......
mounted(){
this.$refs.xxx.$on('atguigu',this.test)
}
```

3.若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法。
4.触发自定义事件:this.$emit("atguigu",数据)
5.解绑自定义事件this.$off("atguigu")
6.组件上也可以绑定原生DOM事件，需要使用native修饰符。
7.注意:通过 this.refs.x.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题!

## 全局事件总线（GlobalEvenBus）

1.一种组件间通信的方式，适用于任意组件间通信。
2.安装全局事件总线

```js
new vue({
  ...
    beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总.线, $bus就是当前应用的vm
    },
  ...
})
```

3.使用事件总线:

+ 1.接收数据:A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。

```js
methods(){
demo(data){......}
}
....
mounted( ){
this.$bus.$on("xxxx" ,this.demo)
}
```

+ 2.提供数据:`this.$bus.$emit("xxx",数据)`

4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

## 消息订阅与发布（pubsub）

1.一种组件间通信的方式。适用于任意组件间通信。
2.使用步骤:

+ 1.安装pubsub: `npm i pubsub-js`
+ 2.引入: `import pubsub from 'pubsub-js'`
+ 3.接收数据:A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

```js
methods({
demo(data){......}
}
mounted(){
  this.pid = pubsub.subscribe('xxx',this.demo)//订阅消息.
}
```

+ 4.提供数据: `pubsub.publish("xxx",数据)`
+ 5.最好在beforeDestroy钩子中，用`PubSub.unsubscribe(pid)`取消订阅

## nextTick

1.语法: this.$nextTick(回调函数)
2.作用:在下一次DOM更新结束后执行其指定的回调
3.什么时候用:当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

## Vue封装的过渡和动画

1.作用:在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。

3.写法:

1. 准备好样式:

    + 元素进入的样式:

        1. v-enter:进入的起点
        2. v-enter-active:进入过程中
        3. v-enter-to:进入的终点
    + 元素离开的样式:
        1. v-leave:离开的起点
        2. v-leave-active:离开过程中
        3. v-leave-to:离开的终点

2. 使用`<transition>`包裹要过度的元素，并配置name属性:

    ```html
    <transition name="hello" appear>
      <h1 v-show="isShow">你好啊</h1>
    </transition>
    ```

3. 备注:若有多个元素需要过度，则需要使用:`<transition-group>`，且每个元索都要指定key值。

## vue-cli解决跨域（代理服务器）

在vue.config.js中添加（方式一）

```js
devServer: {
    proxy: "http://localhost:5000",
  },
```

代码中的请求路径只写hash不用前缀`/student`
如果项目端口有文件，则不会转发，从public获取，不能配置多个代理
1.优点:配置简单。请求资源时直接发给前端(8080)即可。
2.缺点:不能配五多个代理，不能灵活的控制请求是否走代理。
3.工作方式;若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源)

方式二

```js
devServer: {
    proxy: {
      '/api': {//匹配所有以"/api"开头的请求路径
        target: '',//代理服务器基础路径
        pathRewrite: { "^/atguigu/": "" },//重写路径去除atguigu
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
/*
changeOrigin设置为true时，服务器收到的请求头中的host为:localhost:5000
changeOrigin设置为false时，服务器收到的请求头中的host为:localhost:8080
changeOrigin默认值为true
*/

```

1.优点:可以配置多个代理，且可以灵活的控制请求是否走代理。
2缺点:配略微繁琐，请求资源时必须加前缀。

## 插槽

1.作用:让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于父组件===>子组件。
2.分类:默认插槽、具名插槽、作用域插槽
3.使用方式:

+ 1.默认插槽:

```html
父组件中:
<category>
<div>html结构1</div>
</category>
子组件中:
<template>
<div>
<!--定义插槽-->
<slot>插槽中的内容..-</slot>
</div>
</template>
```

2.具名插槽:

```html
父组件中:
<category>
<template slot="center"><div>html结构1</div></template>
<template v-slot:footer><div>html结构2</div></template>
</category>
子组件中;
<template>
<div>
<!--定义插槽-->
<slot name="center">插槽默认内容...</slot>
<slot name="footer">插槽默认内容...</slot>
</div>
</template>

```

3.作用域插槽:
1.理解:数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。(games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定)
2.具体编码:

```html
父组件中：
<category title="游戏">
  <template slot-scope="atguigu">
    <ul>
      <li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
    </ul>
  </template>
</category>
<category title="游戏">
  <template slot-scope="atguigu">
    <ol>
      <li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
    </ol>
  </template>
</category>
<category title="游戏">
  <template slot-scope="atguigu">
    <h4 v-for="(g, index) in atguigu.games" :key="index">{{ g }}</h4>
  </template>
</category>
子组件中：
<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games">我是默认内容</slot>
  </div>
</template>
<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
    return {
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
    };
  }, 
};
</script>
```

2.6以后使用

v-slot:defualt="slotProps"代替可缩写省略

## vuex

1.概念:专门在Vue中实现集中式状态(数据)管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理(读/写)，也是一种组件问通信的方式，且适用于任意组件间通信。
2.什么情况使用vuex

+ 1.多个组件依赖于同一状态
+ 2.来自不同组件的行为需要变更同一状态

3.搭建vuex环境
1.创建文件:src/store/index.js

```js
//该文件用于创建vuex中的store

//引入vuex
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//准备actions---响应组件中的动作
const actions = {};

//准备mutations---操作数据（states）
const mutations = {};

//准备states---存储数据
const state = {};

//暴露store
export default new Vuex.Store({
  actions,
  state,
  mutations,
});

```

2.在main.js中创建vm时传入store配置项

3.使用

```js
//该文件用于创建vuex中的store

//引入vuex
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//准备actions---响应组件中的动作
const actions = {
  /* jia(context, value) {
    // console.log("act", context, value);
    context.commit("JIA", value);
  },
  jian(context, value) {
    context.commit("JIAN", value);
  }, */
  jiaOdd(context, value) {
    if (context.state.sum % 2) context.commit("JIA", value);
  },
  jiaWait(context, value) {
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

//准备mutations---操作数据（states）
const mutations = {
  JIA(state, value) {
    // console.log("mu", state, value);
    state.sum += value;
  },
  JIAN(state, value) {
    state.sum -= value;
  },
};

//准备states---存储数据
const state = {
  sum: 0, //当前的和
};

//暴露store
export default new Vuex.Store({
  actions,
  state,
  mutations,
});

```

+ 2.组件中读取vuex中的数据:sstore.state,sum
+ 3.组件中修改vuex中的数据:$store.dispatch('action中的方法名',数据)或$store.commit('mutations中的方法名',数据)
备注:若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch)，直接编写commit

5.getters的使用

+ 1.概念:当state中的数据需要经过加工后再使用时，可以使用getters加工。
+ 2.在store.js 中追加getters配置

```js
//准备getters--将state中的数据加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

//暴露store
export default new Vuex.Store({
  getters,
  actions,
  state,
  mutations,
});

```

+ 3.组件中读取数据:`$store.getters.bigSum`

6.四个map方法

+ 1.mapState映射state中的数据为计算数据

```js
//借助mapState生成计算属性，从state中读取数据。（对象写法）
// ...mapState({ he: "sum", xuexiao: "school", xueke: "subject" }),

//数组写法
...mapState(["sum", "school", "subject"]),
```

+ 2.mapGetters映射getters中的数据为计算属性

```js
//从getters中读取数据（数组写法）
...mapGetters(["bigSum"]),
```

+ 3.mapMutations

```js
//借助mapMutations生成对应的方法，方法中会调用commit去联系Mutations（对象写法）
...mapMutations({ increment: "JIA", decrement: "JIAN" }),
```

+ 4.mapActions

```js
//借助mapActions生成对应的方法，方法中会调用dispatch去联系Actions（对象写法）
...mapActions({ incrementOdd: "jiaOdd", incrementWait: "jiaWait" }),
```

备注: mapActions与mapMutations使用时，若需要传递参数需要:在模板中绑定事件时传递好参数，否则参数是事件对象。**都有两种写法(数组和对象写法)**

## store模块化修改

```js
//该文件用于创建vuex中的store

//引入vuex
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//求和功能相关的配置

import countOptions from "./count";
import personOptions from "./person";

//暴露store
export default new Vuex.Store({
  modules: {
    countAbout: countOptions,
    personAbout: personOptions,
  },
});

```

```js
//人员管理相关的配置
import axios from "axios";
import { nanoid } from "nanoid";
export default {
  namespaced: true,
  actions: {
    addPersonWang(context, value) {
      if (value.name.indexOf("王") === 0) {
        context.commit("ADD_PERSON", value);
      } else {
        alert("添加失败");
      }
    },
    addPersonServe(context) {
      axios.get("https://api.uixsj.cn/hitokoto/get?type=social").then(
        (response) => {
          context.commit("ADD_PERSON", {
            id: nanoid(),
            name: response.data.slice(0, 3),
          });
        },
        (error) => {
          alert(error.massage);
        }
      );
    },
  },
  mutations: {
    ADD_PERSON(state, value) {
      console.log("ADD_PERSON");
      state.personList.unshift(value);
    },
  },
  state: { personList: [{ id: "001", name: "张三" }] },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name;
    },
  },
};

```

3.开启命名空间后，组件中读取state数据:

```js
this.$store.state.personAbout.personList
...mapState("countAbout", ["sum"]),
```

4.开启命名空间后，组件中读取getters数据;

```js
this.$store.getters['personAbout/firstPersonName']
...mapGetters("personAbout", ["firstPersonName"]),
```

5.开启命名空间后，组件中调用dispatch

```js
this.$store.dispatch('personAbout/addPersonwang',person)
...mapActions ("countAbout",{incrementOdd:"jiaOdd",incrementWait: 'jiawait'})
```

6.开启命名空间后，组件中调用commit

```js
this.$store.commit("personAbout/ADD_PERSON ",person)
...maplutations("countAbout",{increment:"JIA",decrement:"JIAN"})
```

## vue-router

vue的一个插件库，专门用来实现SPA应用
1.单页Web 应用(single page web application，SPA) 。
2.整个应用只有一个完整的页面。
3.点击页面中的导航链接不会刷新页面。只会做页面的局部更新。
4.数据需要通过ajax请求获取。

1．什么是路由?
1.一个路由就是一组映射关系(key - value)
2.key为路径,value可能是function或component

2.路由分类
1.后端路由:
1)理解: value是function，用于处理客户端提交的请求。
2)工作过程:服务器接收到一个请求时,根据请求路径找到匹配的函数来处理请求，返回响应数据
2.前端路由:
1)理解: value是component，用于展示页面内容
2)工作过程:当浏览器的路径改变时，对应的组件就会显示

编写路由配置项

```js
import Vue from "vue";
//引入vue-router
import VueRouter from "vue-router";

Vue.use(VueRouter);
import About from "../components/About";
import Home from "../components/Home";
export default new VueRouter({
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});

```

实现切换

```html
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
```

指定展示位置
`<router-view> </router-view>`

## router-link的属性

### to

表示目标路由的链接。 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。

### replace

设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，导航后不会留下 history 记录。

### append

设置 append 属性后，则在当前 (相对) 路径前添加其路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b

### tag

有时候想要 `<router-link>` 渲染成某种标签，例如 `<li>`。 于是我们使用 `tag` prop 类指定何种标签，同样它还是会监听点击，触发导航。

### active-class

设置 链接激活时使用的 CSS 类名。可以通过以下代码来替代。

### exact-active-class

配置当链接被精确匹配的时候应该激活的 class。可以通过以下代码来替代。

### event

声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组。

## router注意点

1.路由组件放在pages文件夹下
2.切换过程就是组件销毁和挂载
3.每个组件都有自己的\$route属性，里面存储着自己的路由信息
4.整个应用只有一个router，可以通过组件的\$router属性获取

## 多级路由

在父路由下新增`children`配置
子路由路径不写`/`
路由链接写法`<router-link to="/home/message">`（完整路径）

## 路由传参

```html
<!-- 跳转路由并携带query参数，to字符串写法 -->
<!-- <router-link :to="`/home/message/detail?id=${l.id}&title=${l.title}`">{{
  l.title
}}</router-link>&nbsp;&nbsp; -->

<!-- 跳转路由并携带query参数，to对象写法 -->
<router-link
  :to="{
    path: '/home/message/detail',
    query: {
      id: l.id,
      title: l.title,
    },
  }"
  >{{ l.title }}</router-link>
```

获取参数
`this.$route.query`

## 命名路由

作用：简化路由
使用：给路由配置`name`属性
跳转使用：将`to`改为对象将path换为name

## 路由params参数传递

路由配置

```js
{
  name: "xiangqing",
  path: "detail/:id/:title",
  component: Detail,
},
```

```html
<!-- 跳转路由并携带params参数，to字符串写法 -->
<!-- <router-link :to="`/home/message/detail/${l.id}/${l.title}`">{{
  l.title
}}</router-link>&nbsp;&nbsp; -->

<!-- 跳转路由并携带params参数，to对象写法 -->
<router-link
  :to="{
    name: 'xiangqing', //不允许使用path
    params: {
      id: l.id,
      title: l.title,
    },
  }"
  >{{ l.title }}</router-link
>
```

## 路由的props配置

```js
{
  path: "message",
  component: Message,
  children: [
    {
      name: "xiangqing",
      path: "detail",
      component: Detail,
      //props第一种写法,该对象中的所有key-value都会以props的形式传给Detail
      //组件,
      /* props: {
        a: 1,
        b: "hello",
      }, */
      //props的第二种写法,若布尔值为真，会把路由收到的所有params参数，以props的形式传给Detail组件
      // props: true, //不会接受query参数

      //props的第三种写法值为函数,可以接受query参数
      props($route) {
        return { id: $route.query.id, title: $route.query.title };
      },
    },
  ],
},
```

## 路由的replace属性

1.作用:控制路由跳转时操怍浏览器历史记录的模式
2.浏览器的历史记录有两种写入方式:分别为push和replace,push是追加历史记录,replace是替换当前记录。路由跳转时候默认为push
3.如何开启replace模式:`<router-link replace ...>News<router-link>`

## 编程式路由导航

```js
this.$router.push({
  name: "xiangqing", //不允许使用path
  query: {
    id: l.id,
    title: l.title,
  },
});

this.$router.replace({
  name: "xiangqing", //不允许使用path
  query: {
    id: l.id,
    title: l.title,
  },
});

this.$router.back();//后退
this.$router.forward();//前进
this.$router.go(1);//指定跳转
```

## 缓存路由组件

1.作用:让不展示的路由组件保持载，不被销毁。
2.具体编码:

```html
<keep-alive include="News">
<router-view></router-view>
</keep-alive>
```

可以将include写为数组保存多个路由页面

## 新生命周期钩子

$nextTick()

1.作用:路由组件所独有的两个钩子，用于捕获路由组件的激活状态
active()
deactive()

## 路由元信息

```js
meta: { isAuth: true, title: "新闻" },
```

一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。即使用`$route.matched[i].meta`

全局导航守卫检查元字段

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 路由守卫

1.作用:对路由进行权限控制
2.分类:全局守卫、独享守卫、组件内守卫

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标 [路由对象](https://v3.router.vuejs.org/zh/api/#路由对象)
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://v3.router.vuejs.org/zh/api/#to) 或 [`router.push`](https://v3.router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://v3.router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**

3.全局守卫

```js
//全局前置路由-初始化时被调用，每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // console.log(to, from);
  if (to.meta.isAuth) {
    if (localStorage.getItem("school") === "atguigu") {
      next(); //放行
    } else {
      alert("学校名不对");
    }
  } else {
    next();
  }
});

//全局解析路由
/*
router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
*/

//全局后置路由-初始化时被调用，每次路由切换之后被调用
router.afterEach((to, from) => {
  // to and from are both route objects.
  console.log("后置路由守卫", to, from);
  document.title = to.meta.title || "demo";
});
```

## 独享路由

```js
beforeEnter: (to, from, next) => {
  console.log("独享路由守卫", to, from);
  if (to.meta.isAuth) {
    if (localStorage.getItem("school") === "atguigu") {
      next(); //放行
    } else {
      alert("学校名不对");
    }
  } else {
    next();
  }
},
```

## 组件内守卫

```js
//通过路由规则，进入该组件时被调用
beforeRouteEnter(to, from, next) {
  console.log("组件路由守卫进入", to, from);
  if (to.meta.isAuth) {
    if (localStorage.getItem("school") === "atguigu") {
      next(); //放行
    } else {
      alert("学校名不对");
    }
  } else {
    next();
  }
    // 不！能！获取组件实例 `this`
    //不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
},
beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
//通过路由规则，离开该组件时被调用
beforeRouteLeave(to, from, next) {
  console.log("组件路由守卫离开", to, from);
  next();
    //可以获取组件实例的`this`
},
```

## 路由器的两种工作模式

1.对于一个url来说。什么是hash值?———#及其后面的内容就是hash值,
2.hash值不会包含在HTTP请求中，即:hash值不会带给服务器。
3.hash模式:

+ 地址中永远带着#号，不美观。
+ 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
+ 兼容性较好。

4.history模式:

+ 地址干净，美观。
+ 兼容性和hash模式相比略差。
+ 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

## 使用组件库

少啥安啥
将`"es2015"`换为`["@babel/preset-env", { modules: false }],`
多看官方文档

## 自定义Vue插件

```js
//src/plugins/index.js
// 入口文件=>插件的入口=>统一管理

// 动态引入文件
const requireComponent = require.context('./', true, /\.vue$/)


// 插件
const install = (Vue) => {
  if (install.installed) return;
  install.installed
  requireComponent.keys().forEach(filename => {
    // 第i个组件
    const config = requireComponent(filename)
    const componentName = config.default.name

    Vue.component(componentName, config.default || config)
  });

  // 全局自定义指令
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })

}

// 环境检测
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
```

```package.json
"main": "lib/ljk.umd.min.js",
"script":{
"lib": "vue-cli-service build --target lib --name ljk --dest lib src/plugins/index.js"
}
```

## vue-cli添加Loader和plugin

在vue.config.js中的chainWebpack中添加配置

```js
chainWebpack: config => {
  // my-loader为loader的别名，./src/myLoader.js是loader的位置
  config.resolveLoader.alias.set('my-loader', path.resolve(__dirname, './src/myLoader.js'))
  // 修改vue文件Loader的选项，增加新的处理loader
  const vueRule = config.module.rule('vue')
  vueRule.use('my-loader').loader('my-loader').end()
},
```



plugin

```js
chainWebpack: config => {
  // ./src/versionPlugin.js是plugin的位置
  const VersionPlugin = require('./src/versionPlugin')
  config.plugin('version').use(VersionPlugin).tap(args => {
  	// 此处添加的参数可在versionPlugin的构造函数中获取
    return args
  })
}
```

