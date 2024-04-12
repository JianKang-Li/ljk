# Vue3使用

### computed

computed后返回为一个对象，要获取其值需要使用`.value`

### watch 新属性

#### 一次性监听（3.4+）

设置 once: true

#### 触发时机

1. 获取更新后的DOM flush: ‘post’
2. 同步使用 flush: ‘sync’

#### 停止监听

`unwatch()`

### ref

`ref` attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数

### 限制对子组件的访问

`expose` 选项可以用于限制对子组件实例的访问



