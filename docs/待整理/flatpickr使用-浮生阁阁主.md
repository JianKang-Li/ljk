flatpickr使用-浮生阁阁主[github仓库地址](https://github.com/flatpickr/flatpickr)

## 全局设置默认参数
```js
import 'flatpickr'

window.flatpickr.setDefaults({
  dateFormat: 'Y-m-d H:i:S',
  time_24hr: true,
  enableTime: true,
  enableSeconds: true,
  minuteIncrement: 1,
  allowInput: true
})
```
**设置static属性后会自动生成一个flatpickr-wrapper元素，日期选择器会固定向下向右，不自动布局**
源码positionCalendar中有判断。

**不设置static可能出现日期选择器错位**

**在botstrap中使用flatpickr可能出现报错Maximum call stack size exceeded using bootstrap v.4 modal**
解决方法为添加static属性，[参考issues](https://github.com/flatpickr/flatpickr/issues/1730)