# React

**用于构建用户界面的JavaScript库**

## 特点

+ 采用组件化模式、声明式编码，提高开发效率及组件复用率
+ 在React Native中可以使用React语法进行移动端开发
+ 使用虚拟DOM+优秀的Diffing算法，减少与真实DOM的交互

## 基本使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 导入核心库-->
  <script src="../js/react.development.js"></script>
     <!-- 导入DOM操作库-->
  <script src="../js/react-dom.development.js"></script>
  <script src="../js/babel.min.js"></script>
  <title>hello</title>
</head>

<body>

  <div id="test"></div>


  <script type="text/babel">
    /*
    此处一定要写babel表示使用babel进行转换
    */
    //  创建虚拟dom
    const VDOM = <h1>Hello,React</h1>/* 此处不是字符串，不加单引号 */
    // 渲染DOM
    ReactDOM.render(VDOM, document.querySelector("#test"))

  </script>
</body>

</html>
```

## 虚拟DOM的两种写法

### JS创建

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="../js/react.development.js"></script>
  <script src="../js/react-dom.development.js"></script>
  <title>2_js创建</title>
</head>

<body>

  <div id="test"></div>


  <script>
    // 创建虚拟DOM
    const VDOM = React.createElement('h1', { id: "title" }, "Hello React")

    // 渲染DOM
    ReactDOM.render(VDOM, document.querySelector("#test"))

  </script>
</body>

</html>
```

### 关于虚拟DOM

1. 本质是Object类型的对象（一般对象）

2. 虚拟DOM比较'轻'，真实DOM重，因为虚拟DOM是React内部使用，无需太多属性

3. 虚拟DOM会被React转化为真实DOM，呈现再页面上

## JSX

jsx语法规则
      1. 定义虚拟DOM时，不要写引号

      2. 标签中混入JS表达式时使用{}
    
      3. 样式类名使用className
    
      4. 内联样式要用style={{key:'value'}}
    
      5. 虚拟DOM只有一个根标签
    
      6. 标签必须闭合
    
      7. 标签首字母
    
            + 若小写开头，则将标签转为html同名元素，若html中没有该标签则报错
    
            + 若为大写开头，React去渲染对应组件，若未定义则报错

### 小练习

```html
<script type="text/babel">

    const data = ["Augular", "React", 'Vue']
    const VDOM = (
      <div>
        <h1>前端js框架列表</h1>
        <ul>
          {
            data.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
    </ul>
    </div>
    )

    ReactDOM.render(VDOM, document.querySelector("#test"))
</script>
```

## 组件

### 函数式组件

```html
<script type="text/babel">
    // 创建函数式组件
    function MyComponent() {
      return <h2>我是函数定义的组件(适用于【简单组件】的定义)</h2>
    }

    ReactDOM.render(<MyComponent />, document.querySelector("#test"))
</script>
```

执行了ReactDOM.render(\<MyComponent /\>...之后

+ React解析组件标签，找到MyComponent组件

+ 发现组件时使用函数定义的，随后调用该幻术，将返回的虚拟DOM转为真实DOM，随后呈现在页面中

### 类组件

```html
<script type="text/babel">
/* 
    继承自React.Component
    必有render函数
    */
    class MyComponent extends React.Component {
      render() {
        //render放在原型对象上，供实例使用
        //this指向MyComponent的实例,MyComponent组件实例对象
        return <h2>我是类式定义的组件（使用于[复杂组件]的定义）</h2>
      }
    }

    ReactDOM.render(<MyComponent />, document.querySelector("#test"))
</script>
```

执行了ReactDOM.render(\<MyComponent /\>...之后

+ React解析组件标签，找到MyComponent组件

+ 发现使用类定义，new出来该类的实例，并提供该实例调用原型上的render方法

+ 将render返回的虚拟DOM转为真实DOM，随后渲染

### 简单组件和复杂组件的区别

+ 复杂组件有状态
+ 简单组件没有状态

### 组件绑定事件

```html
<script type="text/babel">
    class Weather extends React.Component {
      constructor(props) {
        super(props)
        // 初始化状态
        this.state = {
          isHot: true,
        }
      }
      render() {
        //读取状态
        const { isHot } = this.state
        return <h1 id="title" onClick={demo}>今天天气很{isHot ? "炎热" : "寒冷"}</h1>
      }
    }

    ReactDOM.render(<Weather />, document.querySelector("#test"))
    const title = document.querySelector("#title")
    /* title.addEventListener('click', () => {
      console.log('标题被点击了')
    }) */

    function demo() {
      console.log("click")
    }
</script>
```

## state

**状态不能直接更改，否则无法响应**

### state的使用与修改

```html
<script type="text/babel">
    class Weather extends React.Component {
      // 构造器调用几次  执行一次
      constructor(props) {
        console.log(1);
        super(props)
        // 初始化状态
        this.state = {
          isHot: true,
          wind: "微风"
        }
        // 解决this丢失
        this.changeWeather = this.changeWeather.bind(this)
      }
      // render调用1+n次，初始化时调用一次，n为状态更新次数
      render() {
        //读取状态
        const { isHot, wind } = this.state
        return <h1 id="title" onClick={this.changeWeather}>今天天气很{isHot ? "炎热" : "寒冷"}，{wind}</h1>
      }
      // changeWeather点几次调用几次
      changeWeather() {
        // console.log("click")
        // 由于changeWeather作为onClick的回调，所以不是通过实例调用，而是直接调用
        // 类中方法默认开启严格模式，所以this为undefined
        // console.log(this)
        const isHot = this.state.isHot
        // 状态不能直接更改，不能像下面一样
        // this.state.isHot=!isHot
        // 状态通过setState更改,且更新是一种合并不是直接替换
        this.setState({ isHot: !isHot })
      }
    }

    ReactDOM.render(<Weather />, document.querySelector("#test"))
    const title = document.querySelector("#title")
    /* title.addEventListener('click', () => {
      console.log('标题被点击了')
    }) */
</script>
```

### state的简写

```html
<script type="text/babel">
    class Weather extends React.Component {
      // 初始化状态
      state = {
        isHot: true,
        wind: "微风"
      }

      render() {
        const { isHot, wind } = this.state
        return <h1 id="title" onClick={this.changeWeather}>今天天气很{isHot ? "炎热" : "寒冷"}，{wind}</h1>
      }
   // 箭头函数+赋值语句
      // 利用箭头函数的this在定义时就固定绑定this
      changeWeather = () => {
        const isHot = this.state.isHot
        this.setState({ isHot: !isHot })
      }
    }

    ReactDOM.render(<Weather />, document.querySelector("#test"))
</script>
```

## props

+ 每个组件对象都会有props（properties的简写）属性
+ 组件标签的所有属性都保存在props中

### 基本使用

```html
<script type="text/babel">
    class Person extends React.Component {
      render() {
        const { name, age, sex } = this.props
        return (<ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age}</li>
    </ul>)
      }
    }

    ReactDOM.render(<Person name="tom" age={18} sex="男" />, document.querySelector("#test"))
</script>
```

### props批量传递

```html
<script type="text/babel">
const p = { name: "老牛", age: 18, sex: "男" }
    ReactDOM.render(<Person {...p} />, document.querySelector("#test"))
</script>
```

### 对props进行限制

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
  <script src="../js/react.development.js" defer></script>
  <script src="../js/react-dom.development.js" defer></script>
  <script src="../js/babel.min.js" defer></script>
  <script src="../js/prop-types.js" defer></script>
  <title></title>
</head>

<body>

  <div id="test"></div>


  <script type="text/babel">
    class Person extends React.Component {
      render() {
        const { name, age, sex } = this.props
        return (<ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age + 1}</li>
        </ul>)
      }
    }

    //对标签属性值进行类型、必要性的限制
    Person.propTypes = {
      name: PropTypes.string.isRequired,//限制字符串并必传
      sex: PropTypes.string,
      speak: PropTypes.func
    }

    Person.defaultProps = {
      sex: "男",
      age: 18
    }

    const p = {
      name: "老牛", age: 18, sex: "男", speak
    }
    ReactDOM.render(<Person {...p} />, document.querySelector("#test"))

    function speak() {
      console.log("我")
    }

  </script>
</body>

</html>
```

**props是只读的**

### props简写

```js
class Person extends React.Component {
    render() {
        const { name, age, sex } = this.props
        return (<ul>
                <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age + 1}</li>
        </ul>)
        }

        static propTypes = {
            name: PropTypes.string.isRequired,
            sex: PropTypes.string,
            speak: PropTypes.func
        }

        static defaultProps = {
            sex: "男",
            age: 18
        }
}
```

### 是否需要构造器

```js
constructor(props) {
    // 构造器是否接收props，是否传递给super取决于是否希望在构造器通过this访问props
    console.log(props)
    super(props)
}
```

### 函数式组件使用props

```html
<script type="text/babel">
    function Person(props) {
      const { name, sex, age } = props
      return (<ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age + 1}</li>
    </ul>)
    }
    // 渲染
    const p = {
      name: "老牛",
      age: 11,
      sex: "男"
    }


    Person.propTypes = {
      name: PropTypes.string.isRequired,
      sex: PropTypes.string,
      age: PropTypes.number
    }

    Person.defaultProps = {
      sex: "男",
      age: 18
    }
    ReactDOM.render(<Person {...p} />, document.querySelector("#test"))
</script>
```

## refs

### 字符串类型

```js
 class Demo extends React.Component {
      // 展示左侧输入框的值
      showData = () => {
        // console.log(this);
        alert(this.refs['input1'].value);
      }

      showData2 = () => {
        alert(this.refs['input2'].value)
      }
      render() {
        return (
          <div>
            <input type="text" ref='input1' placeholder='点击提示数据' />&nbsp;
            <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
            <input type="text" onBlur={this.showData2} ref='input2' placeholder='失去焦点提示数据' />&nbsp;
          </div>
        )
      }
    }
```

### 回调形式的ref

```js
class Demo extends React.Component {
      // 展示左侧输入框的值
      showData = () => {
        // console.log(this);
        alert(this['input1'].value);
      }

      showData2 = () => {
        alert(this['input2'].value)
      }
      render() {
        return (
          <div>
            <input type="text" ref={(c) => this.input1 = c} placeholder='点击提示数据' />&nbsp;
            <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
            <input type="text" ref={(c) => this.input2 = c} placeholder='失焦提示数据' onBlur={this.showData2} />&nbsp;
          </div>
        )
      }
    }
```

### 回调次数

**当使用内联式回调ref时更新时调用两次，第一次调用传入null，第二次传入当前节点**

因为上一次的函数会被清空

```js
class Demo extends React.Component {
      state = {
        isHot: true
      }
      // 展示左侧输入框的值
      showInfo = () => {
        // console.log(this);
        alert(this['input1'].value);
      }

      changeWeather = () => {
        const { isHot } = this.state
        this.setState({ isHot: !isHot })
      }

      saveInput = (c) => {
        this.input1 = c;
        console.log('@', c);
      }

      render() {
        const { isHot } = this.state
        return (
          <div>
            <h2>今天天气很{isHot ? '炎热' : "凉爽"}</h2>
            {/* <input type="text" ref={(c) => { this.input1 = c; console.log('@', c); }} placeholder='点击提示数据' /><br /><br />*/}
            <input type="text" ref={this.saveInput} placeholder='点击提示数据' /><br /><br />
            <button onClick={this.changeWeather}>切换天气</button>
            <button onClick={this.showInfo}>点我提示左侧数据</button>&nbsp;
          </div>
        )
      }
    }
```

### jsx注释

`{/* 这是注释 */}`

### createRef

```js
 class Demo extends React.Component {
      /* 
      关于createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点
      该容器是'专人专用'的
      */
      myRef = React.createRef()
      myRef2 = React.createRef()
      // 展示左侧输入框的值
      showData = () => {
        // console.log(this);
        // alert(this['input1'].value);
        alert(this.myRef.current.value);
      }
      showData2 = () => {
        alert(this.myRef2.current.value)
      }
      render() {
        return (
          <div>
            <input type="text" ref={this.myRef} placeholder='点击提示数据' />&nbsp;
            <button onClick={this.showData}>点我提示左侧数据</button>&nbsp;
            <input type="text" ref={this.myRef2} onBlur={this.showData2} placeholder='失焦提示数据' />&nbsp;
          </div>
        )
      }
    }

```

## 事件处理

(1).通过onXxx属性指定事件处理函数(注意大小写)

​    a.React使用的是自定义(合成)事件,而不是使用的原生DOM事件

为了更好的兼容性

​    b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)

为了高效

(2).通过event.target得到发生事件的DOM元素对象

不要过度使用ref

## React 收集表单数据

### 非受控组件

```js
class Login extends React.Component {

      handleSubmit = (event) => {
        const { username, password } = this
        alert(`你输入的用户名是${username.value}，密码是${password.value}`)
        event.preventDefault();
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            用户名：<input type="text" ref={c => this.username = c} name='username' />
            密码：<input type="password" ref={c => this.password = c} name="password" />
            <button>登录</button>
          </form>
        )
      }
    }
```

### 受控组件

```js
class Login extends React.Component {
      // 初始化状态
      state = {
        username: "",
        password: ''
      }

      handleSubmit = () => {
        /* const { username, password } = this
        alert(`你输入的用户名是${username.value}，密码是${password.value}`) */
        alert(`你输入的用户名是${this.state.username}，密码是${this.state.password}`)
        event.preventDefault();
      }

      saveUsername = (event) => {
        // console.log(event.target.value);
        this.setState({ username: event.target.value })
      }

      savePassword = (event) => {
        this.setState({ password: event.target.value })
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            用户名：<input type="text" onChange={this.saveUsername} name='username' />
            密码：<input type="password" onChange={this.savePassword} name="password" />
            <button>登录</button>
          </form>
        )
      }
    }
```

**受控组件，页面输入框可以随着输入将数据维护到状态中，用的时候直接用状态里的数据**

### 高阶函数和函数柯里化

```js
/* 
        高阶函数:如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
            1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
            2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。
        常见的高阶函数：promise，setTimeout,arr.map等
        函数的柯里化:通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。
    
    */
    class Login extends React.Component {
      // 初始化状态
      state = {
        username: "",
        password: ''
      }

      handleSubmit = () => {
        /* const { username, password } = this
        alert(`你输入的用户名是${username.value}，密码是${password.value}`) */
        alert(`你输入的用户名是${this.state.username}，密码是${this.state.password}`)
        event.preventDefault();
      }

      /* saveUsername = (event) => {
        // console.log(event.target.value);
        this.setState({ username: event.target.value })
      }

      savePassword = (event) => {
        this.setState({ password: event.target.value })
      } */

      // 保存表单数据
      saveFormData = (dataType) => {
        // console.log(dataType);
        return (event) => {
          // console.log('@');
          // console.log(dataType, event.target.value);
          this.setState({ [dataType]: event.target.value })
        }
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            用户名：<input type="text" onChange={this.saveFormData("username")} name='username' />
            密码：<input type="password" onChange={this.saveFormData("password")} name="password" />
            <button>登录</button>
          </form>
        )
      }
    }
```

### 不使用柯里化

```js
class Login extends React.Component {
      // 初始化状态
      state = {
        username: "",
        password: ''
      }

      handleSubmit = () => {
        /* const { username, password } = this
        alert(`你输入的用户名是${username.value}，密码是${password.value}`) */
        alert(`你输入的用户名是${this.state.username}，密码是${this.state.password}`)
        event.preventDefault();
      }

      // 保存表单数据
      saveFormData = (dataType, event) => {
        // console.log(dataType);
        this.setState({ [dataType]: event.target.value })
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            用户名：<input type="text" onChange={event => this.saveFormData('username', event)} name='username' />
            密码：<input type="password" onChange={event => this.saveFormData('password', event)} name="password" />
            <button>登录</button>
          </form>
        )
      }
    }
```

## 生命周期

### 引出生命周期

```js
 class Life extends React.Component {

      state = {
        opacity: 0.5
      }

      death = () => {
        // 卸载组件
        ReactDOM.unmountComponentAtNode(document.querySelector("#test"))
      }

      // 组件挂载完毕
      componentDidMount() {
        this.timer = setInterval(() => {
          let { opacity } = this.state
          opacity -= 0.1

          if (opacity <= 0) {
            opacity = 1
          }
          this.setState({ opacity })
        }, 200)
      }

      // 组件将要卸载
      componentWillUnmount() {
        clearInterval(this.timer)
      }

      // render调用时机  初始化渲染，状态更新之后
      render() {
        return (
          <div>
            <h2 style={{ opacity: this.state.opacity }} >React学不会怎么办?</h2>
            <button onClick={this.death}>不活了</button>
          </div>
        )
      }
    }

```

### react生命周期（旧）

![](../images/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%EF%BC%88%E6%97%A7%EF%BC%89.png)

```js
//正常更新
class Count extends React.Component {
      // 构造器
      constructor(props) {
        super(props)
        console.log('Count-constructor');
        this.state = {
          count: 0
        }
      }

      // 组件将要挂载的钩子
      componentWillMount() {
        console.log('Count-componentWillMount');
      }

      add = () => {
        const { count } = this.state
        this.setState({ count: count + 1 })
      }

      // 组件挂载完毕
      componentDidMount() {
        console.log('Count-componentDidMount');
      }

      // 卸载组件按钮的回调
      death = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector("#test"))

      }

      //组件将要卸载
      componentWillUnmount() {
        console.log('Count-componentWillUnmount');
      }

      // 控制组件更新的阀门
      shouldComponentUpdate() {
        console.log('Count-shouldComponentUpdate');
        return true
      }

      // 组件将要更新
      componentWillUpdate() {
        console.log('Count-componentWillUpdate');
      }

      // 组件完成更新
      componentDidUpdate() {
        console.log('Count-componentDidUpdate');
      }

      render() {
        console.log('Count-render');
        const { count } = this.state
        return (
          <div>
            <h2>当前求和为{count}</h2>
            <button onClick={this.add}>点我+1</button>
            <button onClick={this.death}>卸载组件</button>
          </div>
        )
      }
    }
```

强制更新

```js
// 强制更新
force = () => {
    this.forceUpdate()
}
```

```js
//父子组件更新
class A extends React.Component {
      state = {
        carName: "奔驰"
      }

      changeCar = () => {
        this.setState({ carName: '奥拓' })
      }

      render() {
        return (
          <div>
            <div>我是A</div>
            <button onClick={this.changeCar}>换车</button>
            <B carName={this.state.carName} />
          </div>
        )
      }
    }

    class B extends React.Component {
      componentWillReceiveProps(props) {
        console.log('B-componentWillReceiveProps', props);
      }

      render() {
        return (
          <div>我是B组件，车是{this.props.carName}</div>
        )
      }
    }
```

总结

1.初始化阶段:由ReactDOM.render()触发--初次渲染

1. constructor()

2. componentWillMount()
3. render()
4. componentDidMount()====常用，

+ 一般做一些初始化
+ 开启定时器
+ 发送网络请求
+ 订阅消息

2.更新阶段:由组件内部this.setSate()或父组件重新render触发

1. shouldComponentUpdate()

2. componentWillUpdate()
3. render()
4. componentDidUpdate()

3.卸载组件:由ReactDOM.unmountcomponentAtNode()触发

1. componentWillUnmount()====常用
   + 一般做收尾的事
   + 关闭定时器
   + 取消订阅

### react生命周期(新)

![](../images/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%96%B0.png)

17版本中三个UNSAFE方法

+ componentWillMount()
+ componentWillUpdate()
+ componentWillReceiveProps

使用需要加上UNSAFE_前缀

`getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容。

即 state 的值在任何时候都取决于 props

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用

```js
 class Count extends React.Component {
      // 构造器
      constructor(props) {
        super(props)
        console.log('Count-constructor');
        this.state = {
          count: 0
        }
      }



      add = () => {
        const { count } = this.state
        this.setState({ count: count + 1 })
      }


      // 强制更新
      force = () => {
        this.forceUpdate()
      }

      // 卸载组件按钮的回调
      death = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector("#test"))
      }

      // 若state的值在任何时候都取决于props
      static getDerivedStateFromProps(props) {
        console.log('Count-getDeriveStateFromProps', props);
        return null
      }

      // 在更新之前获取快照
      getSnapshotBeforeUpdate(props) {
        console.log('getSnapshotBeforeUpdate', props);
        return 'atguigu'
      }

      // 组件挂载完毕
      componentDidMount() {
        console.log('Count-componentDidMount');
      }

      //组件将要卸载
      componentWillUnmount() {
        console.log('Count-componentWillUnmount');
      }

      // 控制组件更新的阀门
      shouldComponentUpdate() {
        console.log('Count-shouldComponentUpdate');
        return true
      }


      // 组件完成更新
      componentDidUpdate(preProps, preState, snapshot) {
        console.log('Count-componentDidUpdate', preProps, preState, snapshot);
      }

      render() {
        console.log('Count-render');
        const { count } = this.state
        return (
          <div>
            <h2>当前求和为{count}</h2>
            <button onClick={this.add}>点我+1</button>
            <button onClick={this.death}>卸载组件</button>
            <button onClick={this.force}>不更改状态中的数据，强制更新</button>
          </div>
        )
      }
    }
```

getSnapshotBeforeUpdate

```js
 class NewsList extends React.Component {
      state = {
        newsArr: []
      }

      componentDidMount() {
        setInterval(() => {
          const { newsArr } = this.state
          // 模拟一条新闻
          const news = '新闻' + (newsArr.length + 1)
          // 更新状态
          this.setState({ newsArr: [news, ...newsArr] })
        }, 1000)
      }

      getSnapshotBeforeUpdate() {
        return this.refs.list.scrollHeight
      }

      componentDidUpdate(preProps, preState, height) {
        this.refs.list.scrollTop += this.refs.list.scrollHeight - height
      }

      render() {
        return (
          <div className="list" ref='list'>
            {this.state.newsArr.map((n, index) => {
              return <div className='news' key={index}>{n}</div>
            })}
          </div>
        )
      }
    }
```

1.初始化阶段:由ReactDOM.render()触发---初次渲染

1. constructor()

2. getDerivedStateFromProps
3. render(
4. componentDidMount()

2.更新阶段:由组件内部this.setSate()或父组件重新render触发

1. getDeivedstateFromProps
2. shouldComponentupdate()
3. render()

4. getSnapshotBeforeUpdate
5. componentDidUpdate()

3.卸载组件:由ReactDOM.unmountComponentAtNode()触发

1. componentwillUnmount()

## DOM的Diffing算法

## React脚手架

`npm install -g create-react-app`

### 文件目录说明

public ---- 静态资源文件夹

+ favicon.icon ------ 网站页签图标

+ **index.html -------- 主页面**

+ logo192.png ------- logo 图

+ logo512.png ------- logo 图

+ manifest.json ----- 应用加壳的配置文件

+ robots.txt -------- 爬虫协议文件

src ---- 源码文件夹

+ App.css -------- App 组件的样式

+ **App.js --------- App 组件**

+ App.test.js ---- 用于给 App 做测试

+ index.css ------ 样式

+ **index.js ------- 入口文件**

+ logo.svg ------- logo 图

+ reportWebVitals.js --- 页面性能分析文件(需要 web-vitals 库的支持)

+ setupTests.js ---- 组件单元测试的文件(需要 jest-dom 库的支持)

### index.html

```html
<meta charset="utf-8" />
  <!-- %PUBLIC_URL%代表public文件夹的路径 -->
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <!-- 用于开启理想视口，做移动端适配 -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- 用于配置浏览器页签+地址栏的颜色，针对安卓手机浏览器 -->
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <!--指定添加到手机桌面的图标  -->
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <!-- 应用加壳 -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

### CSS模块化

```jsx
import React, { Component } from "react"
import hello from  "./index.module.css"
export default class Hello extends Component {
  render() {
    return (<h2 className={hello.title}>Hello React</h2>)
  }
}
```

```css
/*index.module.css*/
.title {
  background-color: orange;
}
```

## TodoList案例

一、todoList案例相关知识点
1.拆分组件、实现静态组件，注意: className、 style的写法

2.动态初始化列表，如何确定将数据放在哪个组件的state中 ?

+ 某个组件使用:放在自身的state中
+ 某些组件使用:放在他们共同的父组件state中（官方称此操作为:状态提升)

3.关于父子之间的通信

+ 【父组件】给【子组件】传递数据:通过props传递
+ 【子组件】给【父组件】传递数据:通过props传递，要求父提前给子传递一个函数
+ 注意defaultChecked 和 checked的区别，类似的还有:defaultValue 和 value
+ 状态在哪里,操作状态的方法就在哪里

## 配置代理

package.json

```json
"proxy": "http://localhost:5000"
```

setupProxy.js

```js
//新版配置代码
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api1', { //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //请求转发给谁 配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true,  //控制服务器收到请求头中host字段的值：标识请求从哪里发出来的
      /*
      changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      changeOrigin默认值为false，但我们一般将changeOrigin值设为true
    */
      pathRewrite: { '^/api1': '' } //重写请求路径，不加会报错  控制服务器接收到的请求头中host字段的值 去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),

    createProxyMiddleware('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^/api2': '' }
    })
  )
}
```

## 兄弟之间传值

PubSubjs

消息发布于订阅

## React路由

web使用`react-router-dom`

### 基本使用

```jsx
  <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html中靠a跳转 */}
              {/* <a className="list-group-item" href="./about.html">About</a>
              <a className="list-group-item active" href="./home.html">Home</a> */}
              <Link className="list-group-item" to="/home">Home</Link>
              <Link className="list-group-item" to="/about">About</Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Route path="/about" component={About}></Route>
                <Route path="/home" component={Home}></Route>
              </div>
            </div>
          </div>
        </div>
```

```js
<React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
</React.StrictMode>
```

### 与一般组件的区别

+ 写法不同
+ 存放位置不同
+ 接收的props不同
  + 一般组件：写组件标签时传递什么就接收什么
  + 路由组件：接收到三个固定的内容

+ **history**:

+ 1. **go**: *ƒ go(n)*
  2. **goBack**: *ƒ goBack()*
  3. **goForward**: *ƒ goForward()*
  4. **push**: *ƒ push(path, state)*
  5. **replace**: *ƒ replace(path, state)*

+ **location**:

+ 1. **pathname**: "/about"
  2. **search**: ""
  3. **state**: undefined

+ **match**:

+ 1. **params**: {}
  2. **path**: "/about"
  3. **url**: "/about"

### NavLink

使用时点击就追加默认active类

activeClassName修改追加类名

封装NavLink

```jsx
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    // console.log(this.props);
    return (
      <NavLink activeClassName='atguigu' className="list-group-item" {...this.props} />
    )
  }
}

```

1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名

2.标签体内容是一个特殊的标签属性

3.通过this.props.children可以获取标签体内容

`<Switch>`组件使得匹配只匹配一个就不再匹配

1.通常情况下，path和component是一一对应的关系。

2.Switch可[以提高路由匹配效率(单一匹配)。

### 解决样式丢失

+ 去掉点就是直接从localhost:3000请求资源

+ 或使用HashRouter

+ 使用 %PUBLIC_URL%/

### 严格匹配或精准匹配

 exact 开启精准匹配

默认模糊匹配

**不一定要严格匹配**

1.默认使用的是模糊匹配（简单记:【输入的路径】必须包含要【匹配的路径】，且顺序要一致)

2.开启严格匹配:<Route exact={true} path=" /about" component={ About}/>

3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

### Redirect的使用

1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

2.具体编码:

```jsx
<Switch>
<Route path="/about" component={About}/>
<Route path="/home" component=(Home}/>
<Redirect to="/about" / >
</Switch>
```

### 嵌套路由

1.注册子路由时要写上父路由的path值

2.路由的匹配是按照注册路由的顺序进行的

### 向路由组件传递参数

1.params参数

+ 路由链接(携带参数): \<Link -to=' /demo/test/tom/18'}>详情\</Link>
+ 注册路山(卢明按收): <Route path=" /demo/test/: name/ :age"component=(Test}/>
+ 接收参数: const {name,age} = this.props.match.params

2.search参数

+ 路由链接(携带参数):<Link to='/demo/test?name=tom&age=18'}>详情\</Link>
+ 注册路山(无需声明，正常注册即可):\<Route path="/demo/test"  component={Test}/>
+ 接收参数: const isearch} = this.props.location
+ 备注:获取到的search是urlencoded编码字符串，需要借助querystring解析

3.state参数

+ 路由链接(携带参数): <Link to=iipath : ' /demo/test' ,state :{name : 'tom ',age:18}}}>详情\</Link>
+ 注册路由(无需声明，正:常注册即可): \<Route path="/demo/test" component={Test)/>
+ 接收参数: this.props.location.state
+ 备注:刷新也可以保留住参数使用BrowserRouter

### replace模式

开启后将不记录

### 编程式路由导航

+ 借助this.props.history对象上的API对操作路由跳转、前进、后退
+ this.props.history.push()
+ this.props.history.replace()
+ this.props.history.goBack()
+ this.props.history.goForward()
+ this.props.history.go()

### withRouter

withRouter可以加工一般组件，让其具备路由组件所特有的API

withRouter返回一个新组件

### BrowserRouter 和 HashRouter的区别

1.底层原理不一样:

+ BrowserRouter使用的是H5的history API不兼容IE9及以下版本。
+ HashRouter使用的是URL的哈希值。

2.url表现形式不一样

+ BrowserRouter的路径中没有#,例如: localhost:3000/demo/test
+ HashRouter的路径包含#,例如: loca1host:3000/#/demo/test

3.刷新后对路由state参数的影响

+ (1).BrowserRouter没有任何影响，因为state保存在history对象中。
+ (2).HashRouter刷新后会导致路由state参数的丢失。

4.备注: HashRouter可以用于解决一些路径错误相关的问题。

## antd组件库按需导入

`npm install react-app-rewired customize-cra babel-plugin-import`

```json
/* package.json */
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
}
```

```js
//config-overrides.js
const { override, fixBabelImports } = require('customize-cra');

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
 );
```

## 自定义主题

`npm install less less-loader customize-cra customize-cra-less-loader react-app-rewired`

`react-app-rewired start`

```js
//config-overrides.js
const { override, fixBabelImports } = require('customize-cra')
const addLessLoader = require("customize-cra-less-loader")

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': 'orange'
        },
      }
    }
  }),
)
```

## redux

+ redux是一个专门用于做状态管理的JS库(不是react插件库)。

+ 作用:集中式管理react应用中多个组件共享的状态

![redux原理图](../images/redux原理图.png)

### 三个核心概念

#### action

+ type
+ data

#### reducer

+ 用于初始化或加工状态
+ 加工时，根据旧的state和action,产生新的state的纯函数

#### store

+ 将state、action、reducer联系在一起的对象

### API

store.getState()用于获取数据

store.dispatch()触发数据修改

store.subscribe()监听数据变化

```js
//index.js 全局监听数据变化
store.subscribe(() => {
  root.render(
    <App />
  );
})
```

redux

```js
/**
* 该文件用于创建一个为Count组件服务的reducer，reducer本质就是一个函数
*  reducer函数会接到两个参数分别为之前的状态，动作对象
*  
**/

const initState = 0

export default function countReducer(preState = initState, action) {
  // console.log(preState, action);
  const { type, data } = action
  switch (type) {
    case "increment": {
      return preState + data
    }
    case "decrement": {
      return preState - data
    }
    default:
      // 初始化
      return preState
  }
}
```

store

```js
// 导入createStore,创建store
import { legacy_createStore as createStore } from 'redux'
// 引入为count服务的reducer
import countReducer from "./count_reducer"
// 暴露store
export default createStore(countReducer)

```

1.count_action.js专门用于创建action对象

2.constant.js放置由于编码疏忽写错的type值

异步action

需要安装`npm i redux-thunk`

使用

```js
// 导入createStore,创建store
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
// 引入为count服务的reducer
import countReducer from "./count_reducer"
// 引入redux-thunk
import thunk from "redux-thunk"
// 暴露store
export default createStore(countReducer, applyMiddleware(thunk))

```

### react-redux

![react-redux模型图](../images/react-redux模型图.png)

安装`npm i react-redux`

```jsx
//App.jsx
<div>
 {/* store需要使用props的形式引入 */}
 <Count store={store}></Count>
</div>
```

Containers/Count/index.jsx

```jsx
// 引入connect用于连接UI组件和redux
import { connect } from 'react-redux'
import CountUI from "../../components/Count"
import { createDecrementAction, createIncrementAction, createIncrementAsyncAction } from "../../redux/count_action"

// 该函数返回值作为状态传递给UI组件
/* 
返回对象的key就作为传递props的key，value就是value
*/
function mapStateToProps(state) {
  return {
    count: state
  }
}

// 该函数返回值作为传递给UI组件操作状态的方法
function mapDispatchToProps(dispatch) {
  return {
    jia: (value) => { dispatch(createIncrementAction(value)) },
    jian: (value) => { dispatch(createDecrementAction(value)) },
    asyncJia: (value, time) => { dispatch(createIncrementAsyncAction(value, time)) }
  }
}

// 创建并暴露一个容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)

```

优化

```jsx
import { connect } from 'react-redux'
import CountUI from "../../components/Count"
import { createDecrementAction, createIncrementAction, createIncrementAsyncAction } from "../../redux/count_action"

export default connect(
  (state) => ({
    count: state
  }),
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    asyncJia: createIncrementAsyncAction
  }
)
  (CountUI)

```

可以自动检测redux的变化

不用自己给容器组件传入props

使用

```jsx
//App.jsx
import React from "react"
import ReactDOM from 'react-dom/client';
import App from "./App"
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

```

将UI组件和容器组件整合

```jsx
import { connect } from 'react-redux'
// import CountUI from "../../components/Count"
import { createDecrementAction, createIncrementAction, createIncrementAsyncAction } from "../../redux/count_action"


import React, { Component } from 'react'

// 定义UI组件
class Count extends Component {
  // 加法
  increment = () => {
    const { value } = this.selectNumber
    // 通知redux
    this.props.jia(value * 1)
  }
  // 减法
  decrement = () => {
    const { value } = this.selectNumber
    this.props.jian(value * 1)
  }

  // 奇数加
  incrementIfOdd = () => {
    const { value } = this.selectNumber
    if (this.props.count % 2 !== 0) {
      this.props.jia(value * 1)
    }
  }

  // 异步加
  incrementAsync = () => {
    const { value } = this.selectNumber
    this.props.asyncJia(value * 1, 1000)
  }


  render() {
    // console.log(this.props);
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}


export default connect(
  (state) => ({
    count: state
  }),
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    asyncJia: createIncrementAsyncAction
  }
)
  (Count)
```

### 数据共享

```js
const allReducer = combineReducers({ he: countReducer, rens: personReducer })
// 暴露store
export default createStore(allReducer, applyMiddleware(thunk))
```

合并后总状态为对象

**在进行操作时react会比较是否地址相同，相同不会更新页面**

### 纯函数

一类特别的函数:只要是同样的输入(实参)，必定得到同样的输出(返回)

+ 不得改写参数数据-
+ 不会产生任何副作用例如网络请求，输入和输出设备
+ 不能调用Date.now()或者Math.random()等不纯的方法
+ redux的reducer 函数必须是一个纯函数

### 开发者工具

需要配合库使用

`npm i redux-devtools-extension`

修改代码

store.js

```js
// 导入createStore,创建store
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
// 引入为count服务的reducer
import countReducer from "./reducers/count"
import personReducer from "./reducers/person"
// 引入redux-thunk
import thunk from "redux-thunk"
// 引入devtools
import { composeWithDevTools } from "redux-devtools-extension"

const allReducer = combineReducers({
  he: countReducer,
  rens: personReducer
})
// 暴露store 
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
```

# 扩展

## 1. setState

### setState更新状态的2种写法

```
 (1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
     
 (2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
  1.对象式的setState是函数式的setState的简写方式(语法糖)
  2.使用原则：
    (1).如果新状态不依赖于原状态 ===> 使用对象方式
    (2).如果新状态依赖于原状态 ===> 使用函数方式
    (3).如果需要在setState()执行后获取最新的状态数据, 
     要在第二个callback函数中读取
```

```jsx
add = () => {
    // 对象式的setState
    /*   const { count } = this.state
      this.setState({ count: count + 1 }, () => {
        console.log(this.state.count);
      }) */

    // 函数式的setState
    this.setState((state, props) => {
        console.log(state, props);
        return {
            count: state.count + 1
        }
    })
```

------

## 2. lazyLoad

### 路由组件的lazyLoad

```js
 //1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
 const Login = lazy(()=>import('@/pages/Login'))
 
 //2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
 <Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

------

## 3. Hooks

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
     componentWillUnmount()
不传第二个参数监视所有，传入空数组当做componentDidMount使用，
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```

```jsx
import React from 'react'
// import ReactDOM from 'react-dom'
import root from "../../index"
/* class Demo extends React.Component {
  state = {
    count: 0
  }

  myRef = React.createRef()

  add = () => {
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    })
  }

  unmount = () => {
    root.unmount()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }))
    }, 1000)
  }

  show = () => {
    alert(this.myRef.current.value)
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.myRef} />
        <h2>当前求和为{this.state.count}</h2>
        <button onClick={this.add}>+1</button>
        <button onClick={this.unmount}>卸载</button>
        <button onClick={this.show}>展示数据</button>
      </div>
    )
  }
} */

function Demo() {
  const [count, setCount] = React.useState(0)
  let myRef = React.useRef()

  function add() {
    // console.log('点击了加号');
    // setCount(count + 1) //第一种写法
    setCount((value) => {
      return value + 1
    })
  }

  function unmount() {
    root.unmount()
  }

  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => {
      console.log('###');
      clearInterval(timer)
    }
  }, [])

  function show() {
    alert(myRef.current.value)
  }
  return (
    <div>
      <input type="text" ref={myRef} />
      <h2>当前求和为{count}</h2>
      <button onClick={add}>+1</button>
      <button onClick={unmount}>卸载</button>
      <button onClick={show}>展示数据</button>
    </div>
  )
}

export default Demo

```

------

## 4. Fragment

### 使用

 <Fragment><Fragment>
 只能有一个key属性
 <></>
 不能有任何属性

### 作用

> 可以不用必须有一个真实的DOM根标签了

<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
 const XxxContext = React.createContext()  
 
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
 <xxxContext.Provider value={数据}>
  子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

 //第一种方式:仅适用于类组件 
   static contextType = xxxContext  // 声明接收context
   this.context // 读取context中的value数据
   
 //第二种方式: 函数组件与类组件都可以
   <xxxContext.Consumer>
     {
       value => ( // value就是context中的value数据
         要显示的内容
       )
     }
   </xxxContext.Consumer>
```

### 注意

 在应用开发中一般不用context, 一般都用它的封装react插件

```jsx
import React, { Component } from 'react'

import "./index.css"

const UserNameContext = React.createContext()

export default class A extends Component {
  state = {
    username: "tom",
    age: 18
  }
  render() {
    const { username, age } = this.state
    return (
      <div className='parent'>
        <h3>我是A组件</h3>
        <h4>我的用户名是{username}</h4>
        <UserNameContext.Provider value={{ username, age }}>
          <B></B>
        </UserNameContext.Provider>
      </div>
    )
  }
}


class B extends Component {
  render() {
    return (
      <div className='child'>
        <h3>我是B组件</h3>
        <C></C>
      </div>
    )
  }
}

/* class C extends Component {
  static contextType = UserNameContext
  render() {
    console.log(this.context);
    return (
      <div className='grand'>
        <h3>我是C组件</h3>
        <h4>我从A组件接收的用户名是{this.context.username}</h4>
      </div>
    )
  }
} */

function C() {
  return (

    <div className='grand'>
      <h3>我是C组件</h3>
      <h4>我从A组件接收的用户名是
        <UserNameContext.Consumer>
          {
            value => `${value.username}年龄是${value.age}`
          }
        </UserNameContext.Consumer>
      </h4>
    </div>
  )
}
```

<hr/>

## 6. 组件优化

### Component的2个问题

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>
> 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

### 效率高的做法

> 只有当组件的state或props数据发生改变时才重新render()

### 原因

> Component中的shouldComponentUpdate()总是返回true

### 解决

 办法1:
  重写shouldComponentUpdate()方法
  比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
 办法2:  
  使用PureComponent
  PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
  注意:
   只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
   不要直接修改state数据, 而是要产生新数据
 项目中一般使用PureComponent来优化

```jsx
import React, { PureComponent } from 'react'
import "./index.css"
export default class Parent extends PureComponent {
  state = {
    carName: "奔驰"
  }

  changeCar = () => {
    // 底层浅比较，只比较地址
    this.setState({ carName: "迈巴赫" })
  }

  /*   shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps || this.state !== nextState) {
        return true
      }
      return false
    } */

  render() {
    const { carName } = this.state
    console.log('parent----');
    return (
      <div className='parent'>
        <h3>我是parent组件</h3>
        <span>车名：{carName}</span><br />
        <button onClick={this.changeCar}>点我换车</button>
        <Child ></Child>
      </div>
    )
  }
}


class Child extends PureComponent {
  /*   shouldComponentUpdate(nextProps, nextState) {
       console.log(nextProps, nextState);
       console.log(this.props, this.state);
      if ((this.props !== nextProps) || this.state !== nextState) {
        return true
      }
      return false
    } */

  render() {
    console.log('child----');
    return (
      <div className='child'>
        <h3>我是Child组件</h3>
        {/* <span>我接到的车是：{this.props.carName}</span> */}
      </div>
    )
  }
}
```

<hr/>

## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

 Vue中:
  使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
 React中:
  使用children props: 通过组件标签体传入结构
  使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

### children props

 <A>
   <B>xxxx</B>
 </A>
 {this.props.children}
 问题: 如果B组件需要A组件内的数据, ==> 做不到

### render props

 <A render={(data) => <C data={data}></C>}></A>
 A组件: {this.props.render(内部state数据)}
 C组件: 读取A组件传入的数据显示 {this.props.data}

```jsx
import React, { Component } from 'react'
import "./index.css"
export default class Parent extends Component {
  render() {
    return (
      <div className='parent'>
        <h3>我是Parent组件</h3>
        <A render={(name) => <B name={name}></B>}>
        </A>
      </div>
    )
  }
}


class A extends Component {
  state = {
    name: "tom"
  }
  render() {
    const { name } = this.state
    return (
      <div className='a'>
        <h3>我是A组件</h3>
        {this.props.render(name)}
        {/* <B></B> */}
      </div>
    )
  }
}



class B extends Component {
  render() {
    return (
      <div className='b'>
        <h3>我是B组件</h3>
        <span>{this.props.name}</span>
      </div>
    )
  }
}
```

<hr/>

## 8. 错误边界

#### 理解

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

#### 特点

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

```jsx
import React, { Component } from 'react'
import Child from './Child'
export default class Parent extends Component {
  state = {
    hasError: null//用于标识子组件是否有错误
  }
  // 当parent的子组件出现错误时调用，并携带错误信息
  static getDerivedStateFromError(error) {
    //只能处理生命周期的错误
    console.log(error);
    return { hasError: error }
  }

  componentDidCatch() {
    console.log('此处统计错误，反馈错误');
  }

  render() {
    return (
      <div>
        <h2>我是Parent组件</h2>
        {this.state.hasError ? <h2>出错了</h2> : <Child></Child>}
      </div>
    )
  }
}
```

## 9. 组件通信方式总结

#### 组件间的关系

+ 父子组件
+ 兄弟组件（非嵌套组件）
+ 祖孙组件（跨级组件）

#### 几种通信方式

  1.props：
   (1).children props
   (2).render props
  2.消息订阅-发布：
   pubs-sub、event等等
  3.集中式管理：
   redux、dva等等
  4.context:
   生产者-消费者模式

#### 比较好的搭配方式

  父子组件：props
  兄弟组件：消息订阅-发布、集中式管理
  祖孙组件(跨级组件)：消息订阅-发布、集中式管理、context(开发用的少，封装插件用的多)

# React Router 6

## 1.概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：

   1. react-router: 路由的核心库，提供了很多的：组件、钩子。
   2. <strong style="color:#dd4d40">**react-router-dom:**</strong > <strong style="color:#dd4d40">包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等 </strong>。
   3. react-router-native: 包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:`<NativeRouter>`等。

2. 与React Router 5.x 版本相比，改变了什么？

   1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。

   2. 语法的变化：`component={About}` 变为 `element={<About/>}`等。

   3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等。

   4. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>

      ......

## 2.Component

### 1. `<BrowserRouter>`

1. 说明：`<BrowserRouter>`用于包裹整个应用。

2. 示例代码：

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   
   ReactDOM.render(
     <BrowserRouter>
       {/* 整体结构（通常为App组件） */}
     </BrowserRouter>,root
   );
   ```

### 2. `<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter>` 的用法与 5.x 相同。

### 3. `<Routes/> 与 <Route/>`

1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4. `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当URL发生变化时，`<Routes>`都会查看其所有子`<Route>` 元素以找到最佳匹配并呈现组件 。

6. `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码：

   ```jsx
   <Routes>
       /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
       <Route path="/login" element={<Login />}></Route>
   
     /*用于定义嵌套路由，home是一级路由，对应的路径/home*/
       <Route path="home" element={<Home />}>
          /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
         <Route path="test1" element={<Test/>}></Route>
         <Route path="test2" element={<Test2/>}></Route>
     </Route>
    
     //Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
       <Route path="users">
          <Route path="xxx" element={<Demo />} />
       </Route>
   </Routes>
   ```

### 4. `<Link>`

1. 作用: 修改URL，且不发送网络请求（路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：

   ```jsx
   import { Link } from "react-router-dom";
   
   function Test() {
     return (
       <div>
        <Link to="/路径">按钮</Link>
       </div>
     );
   }
   ```

### 5. `<NavLink>`

1. 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

2. 示例代码：

   ```jsx
   // 注意: NavLink默认类名是active，下面是指定自定义的class
   
   //自定义样式
   <NavLink
       to="login"
       className={({ isActive }) => {
           console.log('home', isActive)
           return isActive ? 'base one' : 'base'
       }}
   >login</NavLink>
   
   /*
    默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
    当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
   */
   <NavLink to="home" end >home</NavLink>
   ```

### 6. `<Navigate>`

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是push）。

3. 示例代码：

   ```jsx
   import React,{useState} from 'react'
   import {Navigate} from 'react-router-dom'
   
   export default function Home() {
    const [sum,setSum] = useState(1)
    return (
     <div>
      <h3>我是Home的内容</h3>
      {/* 根据sum的值决定是否切换视图 */}
      {sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
      <button onClick={()=>setSum(2)}>点我将sum变为2</button>
     </div>
    )
   }
   ```

### 7. `<Outlet>`

1. 当`<Route>`产生嵌套时，渲染其对应的后续子路由。

2. 示例代码：

   ```jsx
   //根据路由表生成对应的路由规则
   const element = useRoutes([
     {
       path:'/about',
       element:<About/>
     },
     {
       path:'/home',
       element:<Home/>,
       children:[
         {
           path:'news',
           element:<News/>
         },
         {
           path:'message',
           element:<Message/>,
         }
       ]
     }
   ])
   
   //Home.js
   import React from 'react'
   import {NavLink,Outlet} from 'react-router-dom'
   
   export default function Home() {
    return (
     <div>
      <h2>Home组件内容</h2>
      <div>
       <ul className="nav nav-tabs">
        <li>
         <NavLink className="list-group-item" to="news">News</NavLink>
        </li>
        <li>
         <NavLink className="list-group-item" to="message">Message</NavLink>
        </li>
       </ul>
       {/* 指定路由组件呈现的位置 */}
       <Outlet />
      </div>
     </div>
    )
   }
   
   ```

## 3.Hooks

### 1. useRoutes()

1. 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

2. 示例代码：

   ```jsx
   //路由表配置：src/routes/index.js
   import About from '../pages/About'
   import Home from '../pages/Home'
   import {Navigate} from 'react-router-dom'
   
   export default [
    {
     path:'/about',
     element:<About/>
    },
    {
     path:'/home',
     element:<Home/>
    },
    {
     path:'/',
     element:<Navigate to="/about"/>
    }
   ]
   
   //App.jsx
   import React from 'react'
   import {NavLink,useRoutes} from 'react-router-dom'
   import routes from './routes'
   
   export default function App() {
    //根据路由表生成对应的路由规则
    const element = useRoutes(routes)
    return (
     <div>
      ......
         {/* 注册路由 */}
         {element}
       ......
     </div>
    )
   }
   
   ```

### 2. useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useNavigate} from 'react-router-dom'
   
   export default function Demo() {
     const navigate = useNavigate()
     const handle = () => {
       //第一种使用方式：指定具体的路径
       navigate('/login', {
         replace: false,
         state: {a:1, b:2}
       }) 
       //第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
       navigate(-1)
     }
     
     return (
       <div>
         <button onClick={handle}>按钮</button>
       </div>
     )
   }
   ```

### 3. useParams()

1. 作用：回当前匹配路由的`params`参数，类似于5.x中的`match.params`。

2. 示例代码：

   ```jsx
   import React from 'react';
   import { Routes, Route, useParams } from 'react-router-dom';
   import User from './pages/User.jsx'
   
   function ProfilePage() {
     // 获取URL中携带过来的params参数
     let { id } = useParams();
   }
   
   function App() {
     return (
       <Routes>
         <Route path="users/:id" element={<User />}/>
       </Routes>
     );
   }
   ```

### 4. useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。

3. 示例代码：

   ```jsx
   import React from 'react'
   import {useSearchParams} from 'react-router-dom'
   
   export default function Detail() {
    const [search,setSearch] = useSearchParams()
    const id = search.get('id')
    const title = search.get('title')
    const content = search.get('content')
    return (
     <ul>
      <li>
       <button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
      </li>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
     </ul>
    )
   }
   
   ```

### 5. useLocation()

1. 作用：获取当前 location 信息，对标5.x中的路由组件的`location`属性。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useLocation} from 'react-router-dom'
   
   export default function Detail() {
    const x = useLocation()
    console.log('@',x)
     // x就是location对象: 
    /*
     {
         hash: "",
         key: "ah9nv6sz",
         pathname: "/login",
         search: "?name=zs&age=18",
         state: {a: 1, b: 2}
       }
    */
    return (
     <ul>
      <li>消息编号：{id}</li>
      <li>消息标题：{title}</li>
      <li>消息内容：{content}</li>
     </ul>
    )
   }
   
     
   
   
   ```

### 6. useMatch()

1. 作用：返回当前匹配信息，对标5.x中的路由组件的`match`属性。

2. 示例代码：

   ```jsx
   <Route path="/login/:page/:pageSize" element={<Login />}/>
   <NavLink to="/login/1/10">登录</NavLink>
   
   export default function Login() {
     const match = useMatch('/login/:x/:y')
     console.log(match) //输出match对象
     //match对象内容如下：
     /*
      {
         params: {x: '1', y: '10'}
         pathname: "/LoGin/1/10"  
         pathnameBase: "/LoGin/1/10"
         pattern: {
          path: '/login/:x/:y', 
          caseSensitive: false, 
          end: false
         }
       }
     */
     return (
      <div>
         <h1>Login</h1>
       </div>
     )
   }
   ```

### 7. useInRouterContext()

​   作用：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。

### 8. useNavigationType()

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。

### 9. useOutlet()

1. 作用：用来呈现当前组件中渲染的嵌套路由。

2. 示例代码：

   ```jsx
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由没有挂载,则result为null
   // 如果嵌套路由已经挂载,则展示嵌套的路由对象
   ```

### 10.useResolvedPath()

1. 作用：给定一个 URL值，解析其中的：path、search、hash值。
