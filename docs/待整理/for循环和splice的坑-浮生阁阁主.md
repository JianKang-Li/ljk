for循环和splice的坑-浮生阁阁主使用for循环遍历数组删除元素时会出现漏删的情况
```js
let arr=["a","a","a","b","e","f"];
for(let i=0;i<arr.length;i++){
	if(arr[i]==="a"){
		arr.splice(i,1);
	}
}
console.log(arr)//["a","b","e","f"]
```
原因：当数组长度改变时i继续改变会跳过其中的元素
解决方法：
1. 使用i--
```js
let arr=["a","a","a","b","e","f"];
for(let i=0;i<arr.length;i++){
	if(arr[i]==="a"){
		arr.splice(i,1);
	i--;
	}
}
console.log(arr)//["b","e","f"]
```

2.使用倒序删除(未处理的元素相对位置没变)
```js
let arr=["a","a","a","b","e","f"];
for(let i=arr.length-1;i>=0;i--){
	if(arr[i]==="a"){
		arr.splice(i,1);
	}
}
console.log(arr)//["b","e","f"]
```