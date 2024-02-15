python刷题常用方法-浮生阁阁主# 1、int()
将input()获取的字符串类型转为int型
# 2、type()
获取变量类型
# 3、split()
将字符串分割成为元组
# 4、len()
获取字符串或元组等的长度
# 5、print("",end="")
修改print的结尾
```python
#类型转换
float()#浮点数
int()#整数
complex()#复数

type('123')#判断变量类型
isinstance()#判断某个值或变量是否为给定类型
len()#返回长度，可用于字符串，列表
chr()ascii码转字符
ord()字符转ascii码

#字符串方法
from tokenize import String
String.find()#查找字符串返回索引
String.replace()#替换
String.split()#以sep为分隔符，分隔为列表
String.join()#加入sep为结尾分隔
String.strip()#去掉两边的空格
String.lstrip()#去掉左边的空格
String.rstrip()#去掉右边的空格
String.rjust()#右对齐，用空格补
String.ljust()#左对齐，用空格补
String.zfill()#右对齐用0补
String.center()#中间对齐
String.lower()#小写
String.upper()#大写
```
# 6、分数
```python
#分数
import fractions
t= fractions.Fraction(11.5)#参数可以为浮点数，（分子，分母），字符串
print(t)
#获取分母
print(t.numerator)
#获取分子
print(t.denominator)
fractions.gcd(11,10)#得到a，b的最大公约数

int(t)#可以获取分数整数部分
t-int(t)#可以获取分数部分
将分数化为整数+分数形式
```

**python不支持switch可以使用字典代替使用get()获取操作**

**对于没有循环体结构的循环使用pass来代替循环体**

# 7、复数
```python
#字符串转复数
complex('2+3j')
real#用于取得实数部分
imag#用于取得虚数部分
abs()#可用于计算复数的模
```


# 8、 列表
```python
#列表[]
#遍历
#使用in操作符遍历
#使用range(listLen),xrange()函数遍历
#使用iter(list)函数遍历。迭代器函数
#使用enumerate(list)函数遍历。用于遍历序列中的元素及其下标
#切片
list[m,n]#从m到n-1
list[:]#与list一样
list[m:]#从m到结尾
list[:n]#从开头到n-1
#更新列表
append()
#删除
del
#返回并删除，后面元素前移,默认为最后一个
pop()
#'+'可以合并列表，'*'用于重复列表，in ,not in 判断元素是否在列表中
len(list)#计算元素个数
max(list)#返回最大值
sum(list)#求和
list(seq)#将元组转为列表
count()#统计某个元素在列表中出现次数
extend()#一次性追加,添加列表不会作为一个元素
insert(index,obj)#插入
remove()#删除第一个匹配项
reverse()#反向列表
sort(cmp,key,reverse)#排序
# cmp -- 可选参数, 如果指定了该参数会使用该参数的方法进行排序。
# key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
# reverse -- 排序规则，reverse = True 降序， reverse = False 升序（默认）
#append()如果添加一个列表，则会作为一个元素
```

# 二进制操作
&：0&0=0; 0&1=0; 1&0=0; 1&1=1。

|：0|0=0; 0|1=1; 1|0=1; 1|1=1。

\^：0\^0=0; 0\^1=1; 1\^0=1; 1\^1=0。

# for循环
递增 `for i in range(0,10):`
递减 `for i in range(10,0,-1):`



# 进制转换函数
十进制转十六进制  hex()
十进制转八进制    oct()
十进制转二进制    bin()
字符转ASCII码    ord()
ASCII码转字符    chr()

# 创建二维数组并打印杨辉三角
```python
n=int(input())
a = [[0 for i in range(14)] for j in range(n)]
for i in range(0,n):
    a[i][0]=1
for i in range(1,n):
    for j in range(1,i+1):
        a[i][j]=a[i-1][j-1]+a[i-1][j]
for i in range(0,n):
    for j in range(0,i+1):
        print('%-4d'%(a[i][j]),end='')
    print()
```

#  计算两个日期之间差多少天
```python
import datetime
str1=input().split("-")
y1=int(str1[0])
m1=int(str1[1])
d1=int(str1[2])
str2=input().split("-")
y2=int(str2[0])
m2=int(str2[1])
d2=int(str2[2])
day1 = datetime.datetime(y1,m1,d1)
day2 = datetime.datetime(y2,m2,d2)
interval = abs(day2 - day1)
if(interval.days%2!=0):
    print('我们生日相差%d天\n对不起,我们有缘无份'%interval.days)
else:
    print('我们生日相差%d天\n傻瓜,我心仪的人其实是你呀!'%interval.days)
```


# 未告诉输入数据量
```python
while True:
	try:
		strs=input()
	except:
		exit(0)

```

# 数字格式化
```python
print(format(s, ','))
```