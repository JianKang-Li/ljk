使用Web Component自定义组件-浮生阁阁主```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <my-btn><span slot="text">test1</span></my-btn>
  <my-btn>
    <span slot="text">test2</span>
  </my-btn>


  <script>
    class myBtn extends HTMLElement {
      constructor() {
        super()
        let template = document.createElement('template')
        template.innerHTML = `
          <style>
              button {
                display: inline-block;
                padding: 0.5rem 1rem;
                background-color: rgb(0, 153, 255);
                color: rgb(255, 255, 255);
                border: 0;
                border-radius: 0.3rem;
                cursor: pointer;
                transition: all .5 linear;
              }

              button:active {
                transform: scale(0.9);
                background-color: rgba(0, 153, 255, 0.8);
              }
          </style>
          <button>
            <slot name="text">text</slot>
          </button>
        `
        this._shadowRoot = this.attachShadow({ mode: 'closed' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
    customElements.define('my-btn', myBtn);


    /*
    常用的生命周期方法如下:

    connectedCallback

    当 web component 被添加到 DOM 时，会调用这个回调函数，这个函数只会被执行一次。可以在这个回调函数中完成一些初始化操作，比如更加参数设置组件的样式。

    disconnectedCallback

    当 web component 从文档 DOM 中删除时执行。

    adoptedCallback

    当 web component 被移动到新文档时执行。

    attributeChangedCallback

    被监听的属性发生变化时执行。
    */

  </script>
</body>

</html>
```
