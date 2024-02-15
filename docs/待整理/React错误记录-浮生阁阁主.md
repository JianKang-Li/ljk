React错误记录-浮生阁阁主# React错误记录

## 在React18中使用lazy报错

```js
react.development.js:1363 Uncaught TypeError: Cannot read properties of undefined (reading 'then')
    at lazyInitializer (react.development.js:1363:1)
    at mountLazyComponent (react-dom.development.js:19944:1)
    at beginWork (react-dom.development.js:21593:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:4164:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:1)
    at invokeGuardedCallback (react-dom.development.js:4277:1)
    at beginWork$1 (react-dom.development.js:27451:1)
    at performUnitOfWork (react-dom.development.js:26557:1)
    at workLoopSync (react-dom.development.js:26466:1)
    at renderRootSync (react-dom.development.js:26434:1)
```

原因可能为在使用时嵌套了大括号
修改使用该语句为

```js
const About = lazy(() => import("./About"))
```
