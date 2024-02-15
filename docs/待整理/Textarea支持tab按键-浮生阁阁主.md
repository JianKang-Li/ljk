Textarea支持tab按键-浮生阁阁主```js
function tab(obj) {
	if (event.keyCode == 9) {
		let start = obj.selectionStart;
		let end = obj.selectionEnd;
		if (start) {
			var txt = obj.value
			var result = txt.substring(0, start) + "  " + txt.substring(end)
			obj.value = result
			// 防止光标跳到最后
			obj.selectionStart = start + 2
			obj.selectionEnd = start + 2
		}
		event.returnValue = false;
	}
}
```