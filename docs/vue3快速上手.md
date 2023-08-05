# Vue3快速上手

<img src="https://user-images.githubusercontent.com/499550/93624428-53932780-f9ae-11ea-8d16-af949e16a09f.png" style="width:200px" />

## 1.Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者](https://github.com/vuejs/vue-next/graphs/contributors)
- github上的tags地址：<https://github.com/vuejs/vue-next/releases/tag/v3.0.0>

## 2.Vue3带来了什么

### 1.性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

### 4.新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

# 一、创建Vue3.0工程

## 1.使用 vue-cli 创建

官方文档：<https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create>

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

## 2.使用 vite 创建

官方文档：<https://v3.cn.vuejs.org/guide/installation.html#vite>

vite官网：<https://vitejs.cn>

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

# 二、常用 Composition API

官方文档: <https://v3.cn.vuejs.org/guide/composition-api-introduction.html>

## 1.拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有<strong style="color:#DD5145">Composition API（组合API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。
4. 组件中所用到的：数据、方法等等，均要配置在setup中。
5. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
6. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
      - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）
   3. setup优先级高，`没有this`，可以将data和methods进行合并

## 2.ref函数

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)```
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
  - 一般用来定义一个原始类型的响应式数据
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。

## 3.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- ref函数定义对象会自动调用reactive
- 修改数指不需要使用`.value`
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。
- return 时使用...展开运算符，可以不用在界面使用.但如果是原始类型会无法更新，相当于固定死返回值

### ...toRefs()

- 将响应式对象中所有属性包装成ref对象，并返回包含这些ref对象的普通对象

- ```js
  return {
      // 展开运算符，可以不用在界面使用.但如果是原始类型会无法更新，相当于固定死返回值
      ...toRefs(state),
      update
  };
  ```

## 4.Vue3.0中的响应式原理

### vue2.x的响应式

- 实现原理：
  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。
  
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
  
    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0的响应式

- 实现原理:
  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过Reflect（反射）:  对源对象的属性进行操作。
  - MDN文档中描述的Proxy与Reflect：
    - [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

    - [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

      ```js
       /*     const user = {
                name: "ljk",
                age: 18
              } */
      
          const user = [1, 2, 3, 4]
      
          let propyUser = new Proxy(user, {
            get(target, prop) {
              console.log("拦截get")
              return Reflect.get(target, prop)
            },
      
            set(target, prop, value) {
              console.log("拦截set")
              return Reflect.set(target, prop, value)
            },
            deleteProperty(target, prop) {
              console.log("拦截del")
              return Reflect.deleteProperty(target, prop)
            }
          })
      ```

## 5.reactive对比ref

- 从定义数据角度对比：
  - ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
  - reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
  - 备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
- 从原理角度对比：
  - ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
  - reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
- 从使用角度对比：
  - ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
  - reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

## 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。
  
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 `this.$attrs`。

    - slots: 收到的插槽内容, 相当于 `this.$slots`。

    - ```js
          <template #aaa>
            我是插槽
          </template>
      ```

    - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

    - ```js
      export default defineComponent({
        props: ["msg"],
        emits: ["custom-event"],
        setup(props, { attrs, slots, emit }) {
          console.log(props)
          console.log(attrs)
          console.log(slots)
          console.log(emit)
          const fn = () => {
            emit("custom-event", 123)
          }
      
          return {
            msg2: attrs.msg2,
            fn
          }
        }
      })
      ```

## 7.计算属性与监视

### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
   //计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。
  
  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
   console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
   console.log('sum或msg变化了',newValue,oldValue)
  }) 
  //打印出来也是一个数组
  
  /* 情况三：监视reactive定义的响应式数据
     若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
     若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
   console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
   console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
   console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

底层都调用dowatch()，但watch会传入cb，但watchEffect不传入cb

## 8.生命周期

<strong>vue2.x的生命周期</strong>
<img src="./images/Vue2lifecycle.png" alt="lifecycle_2" style="zoom:33%;width:1200px" />

<strong>vue3.0的生命周期</strong>
<img src="./images/Vue3lifecycle.png" alt="lifecycle_2" style="zoom:33%;width:2500px" />






Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：

- ```beforeDestroy```改名为 ```beforeUnmount```
- ```destroyed```改名为 ```unmounted```

- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`==>`setup()`
  - `created`====>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`====>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` ====>`onUpdated`
  - `beforeDestroy` ==>`onBeforeUnmount`
  - `destroyed` ====>`onUnmounted`

## 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

## 10.toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性（修改值会影响原来的数据）。如果使用ref只是拷贝，修改ref的值不会影响原始数据
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。

- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

- 在return中使用toRefs:`...toRefs(rawState),`

## 11.ref 获取元素

> 我们知道vue2中是用this.$refs.xx,来获取元素或组件的，但是wue3中没有this的概念，应该如何获取元素呢这个时候我们可以使用之前学过的ref创建响应式数据的apl来获取元素

1. 使用ref创建响应式数据，假设叫X

2. 模板中绑定ref在性，值为上面的X
   + 注意不能使用v-bind动态绑定。
   + 这时X就是一个dom元素或组件了

示例:让输入框自动获取焦点

```vue
<template>
<!-- ref获取元素时不能用动态绑定 -->
<input type="text" ref="inputRef" placeholder="自动获取焦点" />
</template>

<script lang="ts">
    const inputref<HTMLElement|null>=ref(null);
    onMounted(() => {
      console.log("--onMounted");
      inputRef.value && inputRef.value.focus()
    })
</script>
```

## 12.nextTick

```js
nextTick(() => {
    inputRef.value && inputRef.value.focus()
})
```

## 13.自定义hook函数

1. 创建一个函数，函数的名称必须use开头

2. 函数必须return一些数据

实例：搜集用户鼠标点击页面的坐标

```vue
<template>
    <div>点击坐标{{ x }}-{{ y }}</div>
</template>
<script lang="ts">
    import { defineComponent, onMounted, onUnmounted, ref } from "vue"
    function useMousePosition() {
        const x = ref(-1)
        const y = ref(-1)
        const updatePosition = (e: MouseEvent) => {
            x.value = e.pageX;
            y.value = e.pageY
        };

        onMounted(() => {
            document.addEventListener("click", updatePosition)
        });
        onUnmounted(() => {
            document.removeEventListener("click", updatePosition)
        })

        return { x, y }
    }

    export default defineComponent({
        setup(){
            const {x,y}=useMousePosition();
            return {
                x,
                y
            }
        }
    })

</script>
```

## 14.自定义指令

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### 钩子参数

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式，只响应第一层数据的响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。（只有重新赋值时才是响应式）
- 什么时候使用?
  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```vue
<template>
	<div>
    <h2>shallowReactive和shallowRef</h2>
    <h3>m1:{{ m1 }}</h3>
    <h3>m2:{{ m2 }}</h3>
    <button @click="update">更新</button>
    </div>
</template>
<script lang="ts">
    const m1 = shallowReactive({ a: 1, b: { c: 2 } })
    const m2: any = shallowRef({ a: 1, b: { c: 2 } })
    const update = () => {
        // 页面重新渲染会更改页面数据，单独使用不会引起页面更新，只会改变值
        m1.b.c += 1//无效
        // m1.a += 1

        m2.value.a += 1//无效
        // m2.value = { a: 123 }
    }
    return {
        m1,
        m2,
        update,
    }
</script>
```



## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- 设置readonly后修改响应式数据会报错
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 设置shallowReadonly，修改响应式数据第一层会报错
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。不用展开符会影响源数据，但页面不会更新
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。
  - **__v_skip**:true,利用标记将对象跳过响应

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 接受一个工厂函数，两个参数分别用于追踪的track和用于触发响应的trigger，并返回一个带有get和set属性的对象

- 实现防抖效果：

  ```vue
  <template>
   <input type="text" v-model="keyword">
   <h3>{{keyword}}</h3>
  </template>
  
  <script>
   import {ref,customRef} from 'vue'
   export default {
    name:'Demo',
    setup(){
     // let keyword = ref('hello') //使用Vue准备好的内置ref
     //自定义一个myRef
     function myRef(value,delay){
      let timer
      //通过customRef去实现自定义
      return customRef((track,trigger)=>{
       return{
        get(){
         track() //告诉Vue这个value值是需要被“追踪”的
         return value
        },
        set(newValue){
         clearTimeout(timer)
         timer = setTimeout(()=>{
          value = newValue
          trigger() //告诉Vue去更新界面
         },delay)
        }
       }
      })
     }
     let keyword = myRef('hello',500) //使用程序员自定义的ref
     return {
      keyword
     }
    }
   }
  </script>
  ```

## 5.provide 与 inject

<img src="./images/provide-inject.png" />

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
      ......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
      ......
         const car = inject('car')
         return {car}
      ......
     }
     ```

## 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

## 7.v-memo

- **期望的绑定值类型：**`any[]`

- **详细信息**

  缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。举例来说：

  template

  ```vue
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  当组件重新渲染，如果 `valueA` 和 `valueB` 都保持不变，这个 `<div>` 及其子项的所有更新都将被跳过。实际上，甚至虚拟 DOM 的 vnode 创建也将被跳过，因为缓存的子树副本可以被重新使用。

  正确指定缓存数组很重要，否则应该生效的更新可能被跳过。`v-memo` 传入空依赖数组 (`v-memo="[]"`) 将与 `v-once` 效果相同。

  **与 `v-for` 一起使用**

  `v-memo` 仅用于性能至上场景中的微小优化，应该很少需要。最常见的情况可能是有助于渲染海量 `v-for` 列表 (长度超过 1000 的情况)：

  template

  ```vue
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```

  当组件的 `selected` 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的。`v-memo` 用在这里本质上是在说“只有当该项的被选中状态改变时才需要更新”。这使得每个选中状态没有变的项能完全重用之前的 vnode 并跳过差异比较。注意这里 memo 依赖数组中并不需要包含 `item.id`，因为 Vue 也会根据 item 的 `:key` 进行判断。

  警告

  当搭配 `v-for` 使用 `v-memo`，确保两者都绑定在同一个元素上。**`v-memo` 不能用在 `v-for` 内部。**

  `v-memo` 也能被用于在一些默认优化失败的边际情况下，手动避免子组件出现不需要的更新。但是一样的，开发者需要负责指定正确的依赖数组以免跳过必要的更新。



# 四、Composition API 的优势

## 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<img src="./images/f84e4e2c02424d9a99862ade0a2e4114_tplv-k3u1fbpfcp-watermark.image" style="zoom: 40%;" />



<img src="./images/e5ac7e20d1784887a826f6360768a368_tplv-k3u1fbpfcp-watermark.image" style="zoom:67%;" />




## 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<img src="./images/bc0be8211fc54b6c941c036791ba4efe_tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;" />



<img src="./images/6cc55165c0e34069a75fe36f8712eb80_tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;" />


# 五、新的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
   <div v-if="isShow" class="mask">
    <div class="dialog">
     <h3>我是一个弹窗</h3>
     <button @click="isShow = false">关闭弹窗</button>
    </div>
   </div>
  </teleport>
  ```

## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 生成异步组件
  - 在setup函数中返回一个promise，就是一个异步组件
  - setup函数写成async函数，也是一个异步组件


```vue
<template>
  <h2>AsyncComp</h2>
  <p>{{ msg }}</p>
</template>
<script lang="ts">
export default {
  name: "AsyncComp",
  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ msg: "abc" })
      }, 2000)
    })
  },
};
</script>
```

```vue
<template>
  <h2>AsyncComp2</h2>
  <p>{{ msg }}</p>
</template>

<script lang="ts">
export default {
  async setup() {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ msg: "abc" });
      }, 2000)
    })

    return result;
  }
}
</script>
```



- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
     <div class="app">
      <h3>我是App组件</h3>
      <Suspense>
       <template v-slot:default>
        <Child/>
       </template>
       <template v-slot:fallback>
        <h3>加载中.....</h3>
       </template>
      </Suspense>
     </div>
    </template>
    ```

# 六、其他

## 1.全局API的转移

1、全新的API

+ createApp()
+ defineProperty()
+ defineAsyncComponent()
+ nextTick()

2、将原来的全局api转移到应用对象

+ app.compoment()
+ app.config()
+ app.directive()
+ app.mount()
+ app.unmount()
+ app.use()

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |


3、 模板语法的变化

+ v-model本质变化
  + 在表单上使用没有变化
  + 在组件上使用默认的属性名和事件名发送变化
    + prop:value->modelValue
    + event:input->update:modelValue

+ 自定义modelValue的名字

```vue
<Child v-model:str="msg"></Child>
```

```js
//触发得改为update:str
emit("update:str")
```

+ 可以绑定多个v-model

```vue
<Child v-model:str="msg" v-model:name="username"/ >
```

+ .sync 修饰符已移除，由v-model代替

```vue
<!-- vue2中.sync的用法 -->
<Child :name.sync="usename"></Child>

<!-- vue3中使用 -->
<Child v-model:name="username"></Child>
```

+ v-if优先级高于v-for

在组件的模板表达式中，可以直接使用 `$emit` 方法触发自定义事件 (例如：在 `v-on` 的处理函数中)：



```vue
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

父组件可以通过 `v-on` (缩写为 `@`) 来监听事件：



```vue
<MyComponent @some-event="callback" />
```

同样，组件的事件监听器也支持 `.once` 修饰符：



```vue
<MyComponent @some-event.once="callback" />
```

像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 [prop 大小写格式](https://cn.vuejs.org/guide/components/props.html#prop-name-casing)一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

## 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......

# 七、 路由和状态管理

## 路由

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/page3/:id",
    name: "Page3",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Page3" */ "../views/page3.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

```

+ useRoute-获取当前路由对象

+ ```js
  import {useRoute} from "vue-router";
  setup(){
      const route=useRouter();
      console.log(route)
  }
  ```

+ useRouter-获取路由实例，可以进行路由跳转

+ ```js
  import {useRouter} from "vue-router"
  
  setup(){
      const router=useRouter();
      const goHome=()=>{
          
      }
  }
  ```

+ http://localhost:8080/page3/123/?a=1&b=2#aaa

## 状态管理

```ts
import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    update(state, value) {
      state.count = value;
    },
    plus(state) {
      state.count++;
    },
    minus(state) {
      state.count--;
    },
  },
  actions: {
    async getCount({ commit }) {
      const count = await new Promise((rs) => {
        setTimeout(() => {
          rs(parseInt((Math.random() * 10).toString(10)));
        }, 3000);
      });
      commit("update", count);
      return Promise.resolve()
    },
  },
  modules: {},
});

```



+ useStore-获取vuex实例

+ ```js
  import {useStore} from "vuex"
  setup(){
      const store=useStore()
      store.dispatch("xxx")
  }
  ```

+ ```vue
  <template>
    page3
    <button @click="goHome">回到主页</button>
    <hr>
    <p>count:{{ loading ? "加载中" : count }}</p>
    <p>{{ loading }}</p>
    <button @click="add">+1</button>
    <button @click="minus">-1</button>
  </template>
  <script lang="ts">
  import { defineComponent, toRaw, ref, computed } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { useStore } from "vuex"
  export default defineComponent({
    setup() {
      const route = useRoute()
      console.log(toRaw(route))
  
      const router = useRouter()
      console.log(toRaw(router))
  
      const goHome = () => {
        router.push("/")
      }
  
      const store = useStore()
  
      const count = computed(() => store.state.count)
  
  
      const loading = ref(true)
      store.dispatch("getCount").then(() => {
        loading.value = false
      })
  
      const add = () => {
        store.commit("plus")
      }
  
      const minus = () => {
        store.commit("minus")
      }
  
      return {
        goHome,
        count,
        loading,
        add,
        minus
      }
    }
  })
  </script>
  ```

# Vite

官方网站 [官网](https://vitejs.dev/)

## 特点：

+ 极速得服务启动
+ 轻量快速的热重载
+ 丰富的功能
+ 优化的构建
+ 通用的插件
+ 完全类型化的API

## 搭建第一个vite项目

```js
npm init vite@lastest
```

