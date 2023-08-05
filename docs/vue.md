# Vue 基础

## 创建Vue实例

```js
var vm = new Vue({
  // 选项
  el: '#app',
})
```

## 模板语法

+ 插值`{{}}`
+ `V-html`,输出html代码

## 指令

+ `v-bind`,单向绑定值,只有vm改变影响界面(缩写`:`)
+ `v-model`,双向绑定,相互影响,用于表单控件
+ 可以再`{{}}`,`v-bind`中使用简单javaScript代码
+ `v-if`,`v-show`,控制界面元素展示
+ `v-on`,绑定对应事件(缩写`@`)
+ v-text指令:

  1.作用:向其所在的节点中渲染文本内容。

  2.与插值语法的区别: v-text会替换掉节点中的内容，`{{xx}}`则不会。
+ v-html指令:

  1.作用:向指定节点中渲染包含html结构的内容。

  2.与插值语法的区别:

  (1).v-html会替换掉节点中所有的内容，模板语法则不会。

  (2).v-html可以识别html结构。

  3.严重注意:v-html有安全性问题!!!!

  (1).在网站上动态渲染任意HTAL是非常危险的,容易导致XSS攻击。

  (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上!
+ v-cloak指令（没有值):

  1.本质是一个特殊属性,Vue实例创建完毕并接管容器后，会那掉v-cloak属性。

  2.使用css配合v-cloak可以解决网速慢时页面展示出{(XXX}}的问题
+ v-once指令:

  1.v-once所在节点在初次动态渲染后，就视为静态内容了。

  2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
+ v-pre指令:

  1跳过其所在节点的编译过程。

  2.可利用它跳过:没有使用指令语法、没有使用插值语法的节点，会加快编译。

## sync

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```vue
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```vue
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```vue
<text-document v-bind:title.sync="doc.title"></text-document>
```

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

## 过滤器的使用（可以串联）

```js
<div id="app">
  {{ message | capitalize }}
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
    message: 'runoob'
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
</script>
```

## 条件语句

+ `v-if`
+ `v-else-if`
+ `v-else`

**v-else 、v-else-if 必须跟在 v-if 或者 v-else-if之后。**

## v-if 和 v-for的异同

+ 相同：都是用来控制元素的显示、隐藏，区别就在于它们各是通过什么去控制元素的显示、隐藏

+ 不同：
v-for:通过css样式中的dispaly：none；控制元素显示、隐藏
v-if：通过控制vue的虚拟dom树上的节点，来联动控制真实dom上的节点，从而控制元素的显示、隐藏

+ 使用场景：只判断一次使用v-if减少开销，多次操作使用v-for

## 循环语句

+ `v-for`

```js
<div id="app">
  <ol>
    <li v-for="site in sites">
      {{ site.name }}
    </li>
  </ol>
</div>
 
<script>
new Vue({
  el: '#app',
  data: {
    sites: [
      { name: 'Runoob' },
      { name: 'Google' },
      { name: 'Taobao' }
    ]
  }
})
</script>
```

**可以使用在数组、迭代对象、整数上**

如果迭代对象的话，第二个参数为键名，第三个参数为索引

## 计算属性

+ `computed`

```js
computed: {
    site: {
      // getter
      get: function () {
        return this.name + ' ' + this.url
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
```

## 监听属性

+ watch(完整为对象，缩写为方法)
+ 可选immediate，deep（在对象时）
+ immediate为true监听的这个对象会立即输出,oldValue输出可能为"undefined"

使用方法：

```html
<div id = "computed_props">
    千米 : <input type = "text" v-model = "kilometers">
    米 : <input type = "text" v-model = "meters">
</div>
<p id="info"></p>
<script type = "text/javascript">
    var vm = new Vue({
    el: '#computed_props',
    data: {
        kilometers : 0,
        meters:0
    },
    methods: {
    },
    computed :{
    },
    watch : {
        kilometers:function(val) {
            this.kilometers = val;
            this.meters = this.kilometers * 1000
        },
        meters :  {
            immediate:true,//初始值进行监听
            deep:true,//深度监听
            handler(val, oldVal){
            this.kilometers = val/ 1000;
            this.meters = val;
            }
        }
    }
    });
    // $watch 是一个实例方法
    vm.$watch('kilometers', function (newValue, oldValue) {
    // 这个回调将在 vm.kilometers 改变后调用
    document.getElementById ("info").innerHTML = "修改前值为: " + oldValue + "，修改后值为: " + newValue;
})
</script>
```

## 计算属性和监听属性的区别

+ 计算属性是依赖的值改变后重新计算结果更新DOM，会进行缓存；

+ 属性监听的是属性值，当定义的值发生变化时，执行对应的函数

## 样式绑定

使用v-bind动态绑定class

### 方式1 直接判断Boolean

```html
<div class="static"
     v-bind:class="{ 'active' : isActive, 'text-danger' : hasError }">
</div>
```

### 方式2 绑定对象

```html
<div id="app">
  <div v-bind:class="classObject"></div>
</div>
```

### 方式3 绑定数组

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

### 方式4 绑定计算属性

```js
  new Vue({
  el: '#app',
  data: {
    isActive: true,
    error: {
      value: true,
      type: 'fatal'
    }
  },
  computed: {
    classObject: function () {
      return {
        base: true,
        active: this.isActive && !this.error.value,
        'text-danger': this.error.value && this.error.type === 'fatal',
      }
    }
  }
})
```

## 事件处理

+ `v-on`

### 事件修饰符

| 修饰符   | 作用                   |
| -------- | ---------------------- |
| .stop    | 阻止冒泡               |
| .prevent | 阻止默认事件           |
| .capture | 阻止捕获               |
| .self    | 只监听触发该元素的事件 |
| .once    | 只触发一次             |
| .left    | 左键事件               |
| .right   | 右键事件               |
| .middle  | 中间滚轮事件           |

### 按键修饰符

按键别名

+ `.enter`
+ `.tab`
+ `.delete` (捕获 "删除" 和 "退格" 键)
+ `.esc`
+ `.space`
+ `.up`
+ `.down`
+ `.left`
+ `.right`
+ `.ctrl`
+ `.alt`
+ `.shift`
+ `.meta`

[按键值参考](https://www.cnblogs.com/wuhua1/p/6686237.html)

## 表单

使用`v-model`

**多选绑定数组**

修饰符

| 修饰符  | 作用                               |
| ------- | ---------------------------------- |
| .lazy   | 在change中同步                     |
| .number | 自动将用户的输入值转为 Number 类型 |
| .trim   | 自动过滤用户输入的首尾空格         |

## 组件

### 注册全局组件

```js
Vue.component(tagName, options)

//使用时<tagName></tagName>
```

### 局部组件

在实例中注册

```html
<div id="app">
    <runoob></runoob>
</div>
 
<script>
var Child = {
  template: '<h1>自定义组件!</h1>'
}
 
// 创建根实例
new Vue({
  el: '#app',
  components: {
    // <runoob> 将只在父模板可用
    'runoob': Child
  }
})
</script>
```

### 父组件给子组件传值

+ props:["message"]

prop验证

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

可用类型：

+ `String`
+ `Number`
+ `Boolean`
+ `Array`
+ `Object`
+ `Date`
+ `Function`
+ `Symbol`

## 自定义事件，子组件给父组件传值

+ 使用 `$on(eventName)` 监听事件
+ 使用 `$emit(eventName)` 触发事件

```html
<div id="app">
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
</div>
 
<script>
Vue.component('button-counter', {
  template: '<button v-on:click="incrementHandler">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementHandler: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
</script>
```

## data 必须是一个函数

+ 这样的好处就是每个实例可以维护一份被返回对象的独立的拷贝，如果 data 是一个对象则会影响到其他实例

+ 组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件

## 自定义指令

```js
<div id="app">
    <p>页面载入时，input 元素自动获取焦点：</p>
    <input v-focus>
</div>
 
<script>
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 创建根实例
new Vue({
  el: '#app'
})
</script>
```

自定义指令可用使用的钩子

+ `bind`: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
+ `inserted`: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
+ `update`: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
+ `componentUpdated`: 被绑定元素所在模板完成一次更新周期时调用。
+ `unbind`: 只调用一次， 指令与元素解绑时调用。

钩子函数的参数有：

+ **el**: 指令所绑定的元素，可以用来直接操作 DOM 。

+ binding

  : 一个对象，包含以下属性：

  + **name**: 指令名，不包括 `v-` 前缀。
  + **value**: 指令的绑定值， 例如： `v-my-directive="1 + 1"`, value 的值是 `2`。
  + **oldValue**: 指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  + **expression**: 绑定值的表达式或变量名。 例如 `v-my-directive="1 + 1"` ， expression 的值是 `"1 + 1"`。
  + **arg**: 传给指令的参数。例如 `v-my-directive:foo`， arg 的值是 `"foo"`。
  + **modifiers**: 一个包含修饰符的对象。 例如： `v-my-directive.foo.bar`, 修饰符对象 modifiers 的值是 `{ foo: true, bar: true }`。

+ **vnode**: Vue 编译生成的虚拟节点。

+ **oldVnode**: 上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

![vue过程](./images/Vue.png)

## 过渡和动画

Vue 提供了内置的过渡封装组件，该组件用于包裹要实现过渡效果的组件。

### 语法格式

```html
<transition name = "nameoftransition">
   <div></div>
</transition>
```

Vue在元素显示与隐藏的过渡中，提供了 6 个 class 来切换：

+ `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
+ `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
+ `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
+ `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
+ `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
+ `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

### 自定义过渡的类名

我们可以通过以下特性来自定义过渡类名：

+ `enter-class`
+ `enter-active-class`
+ `enter-to-class` (2.1.8+)
+ `leave-class`
+ `leave-active-class`
+ `leave-to-class` (2.1.8+)

使用

```html
<style>
    .my-enter,
    .my-leave-to {
        opacity: 0;
        transform: translateY(70px);
    }

    .my-enter-active,
    .my-leave-active {
        transition: all 0.8s ease;
    }
</style>


<transition name="my">
    <h6 v-if="flag2">这是h6</h6>
</transition>
```

CSS 动画用法类似 CSS 过渡，但是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

在这种情况下你可以用 `<transition>` 组件上的 `duration` 属性定制一个显性的过渡持续时间 (以毫秒计)：

```html
<transition :duration="1000">...</transition>
```

### 动画钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
 
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
// ...
methods: {
  // --------
  // 进入中
  // --------
 
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
 
  // --------
  // 离开时
  // --------
 
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。

当只用 JavaScript 过渡的时候，**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。否则，它们将被同步调用，过渡会立即完成。

推荐对于仅使用 JavaScript 过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

### 初始渲染的过渡

可以通过 `appear` 特性设置节点在初始渲染的过渡

```html
<transition appear>
  <!-- ... -->
</transition>
```

这里默认和进入/离开过渡一样，同样也可以自定义 CSS 类名。

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

自定义 JavaScript 钩子：

```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

### v-for过渡

```html
<transition-group appear tag="ul">
    <!--在实现列表过渡的时候，如果需要过渡的元素，是通过v-for 
循环渲染出来的，不能使用transition包裹，需要使用transition-group -->
    <!--如果要为 v-for 循环创建的元素设置动画，必须为每一个元素设置 :key 属性-->
    <!-- 给transition-group添加appear属性，实现页面刚展示出来，入场时侯的效果 -->

    <li v-for="(item,i) in list" :key="item.id" @click="del(i)">
        {{item.id}}----{{item.name}}
    </li>
</transition-group>
```

## 响应式数据接口

如果我们需要在运行过程中实现属性的添加或删除，则可以使用全局 Vue，Vue.set 和 Vue.delete 方法。

### vue.set

Vue.set 方法用于设置对象的属性，它可以解决 Vue 无法检测添加属性的限制，语法格式如下：

```js
Vue.set( target, key, value )
```

参数说明：

+ target: 可以是对象或数组
+ key : 可以是字符串或数字
+ value: 可以是任何类型

### Vue.delete

Vue.delete 用于删除动态添加的属性 语法格式：

```
Vue.delete( target, key )
```

参数说明：

+ target: 可以是对象或数组
+ key : 可以是字符串或数字
