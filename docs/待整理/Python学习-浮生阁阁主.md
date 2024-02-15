Python学习-浮生阁阁主# Python

## 输入与输出

### 输入

input():从标准输入读入一行**文本**

### 输出

print()：主要的输出函数，直接使用print()会有一个换行

将变量或常量转化为字符串时使用

repr():产生一个解释器易读的表达式，（在pycharm中不能输出到屏幕上）

str()：函数返回一个用户易读的表达式

### 格式化

使用str.format()

不自动换行时使用```print(str,end='')```

rjust()方法将字符串靠右，并在左边填充空格
```python
s = "PYTHON"
print(format(s, '10'))  # 没有标志符，如果是字符串则默认左对齐，不足宽度部分默认用空格填充
print(format(13.14, '10'))  # 没有标志符，如果是数字则默认右对齐，不足宽度部分默认用空格填充
print(format(s, '0>10'))  # 右对齐，不足指定宽度部分用0填充
print(format(s, '>04'))  # 右对齐，因字符实际宽度大于指定宽度4，不用填充
print(format(s, '*>10'))  # 右对齐，不足部分用"*"填充
print(format(s, '>010'))  # 右对齐，不足部分用0填充
print(format(s, '>10'))  # 右对齐，默认用空格填充
print(format(s, '<10'))  # 左对齐，默认用空格填充
print(format(s, '<010'))  # 左对齐，不足部分用0填充
print(format(s, '@^10'))  # 中间对齐，不足部分用'@'填充，宽度为10个空格
print(format(13.14, '0<10'))  # 左对齐，不足部分用0填充
print(format(13.14, '@^10'))  # 中间对齐，不足部分用@填充
print(format(13.14, '0>10'))  # 右对齐，不足部分用0填充
print(format(-13.14, '0=10'))  # 右对齐，符号后面不足部分用0填充
```
参考博文[https://blog.csdn.net/xw1680/article/details/112729715?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163766830416780357285693%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=163766830416780357285693&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-112729715.pc_search_mgc_flag&utm_term=python%E6%A0%BC%E5%BC%8F%E5%8C%96%E8%BE%93%E5%87%BA&spm=1018.2226.3001.4187]

## 导入模块

```python
# 导入模块用import
import math
# 这是单行注释
'''这是多
行注释'''
```

## 1、number

```python
# 1、Number
a = 1
b = 3
print(a + b)

python负数的获取
str=input().split(" ")
start=int(str[0])
end=int(str[1])

```

## 2、String

```python
# 2、String
string1="第一个字符串"
print(string1)
string2="第二个字符串\n\"\\"
print(string1+string2)
#负数代表倒数
print(string1[0]+string1[-1])
print(string1[0:4])
#取0-3
```

## 3、函数

```python
# 3、函数
# define
def get_sum(sum1,sum2):
    result= sum1+sum2
    return result #会忽略return后的程序
a=1;b=2
c=get_sum(a,b)
print(c)
```

## 4、类

```python
# 4、类
class Person:
     #创建对象函数已固定为__init__(self):第一个参数必为self
    def __init__(self,name,height,wight,gender):
         self.name=name
         self.height=height
         self.wight=wight
         self.gender=gender

     def say_name(self):
         print("姓名:"+self.name)

     def say_hello(self,taeget_name):
         print("hello "+taeget_name+" ,my name is"+self.name)

person1=Person("ljk",170,100,"man")
person2=Person("xs",165,90,"women")

person1.say_name()
person2.say_name()
print(person1.height)
person1.say_hello("xs")

```

## 5、number常用方法

```python
# 5、Number
int float complex
"""
多行注释
"""
a=6.1
b=3
print(a/b)#除号结果为浮点数，其余有浮点数则结果为浮点数
 # 整除
c=8
s=3
print(c//s)
 #数据类型转换
d=7
s=-6.11
print(int(s))
print(float(d))
#绝对值abs()
print(abs(s))
#round,四舍五入
print(round(s))
#
#pow(),取幂
print(pow(a,2))

#ceil(),取大于本身的最小整数
print(math.ceil(a))
#
#floor,小于本身的最大整数
print(math.floor(a))



```

## 6、string常用方法

```python
# String补充
string1="hello wolrd"
print(string1[2:5])
# #
#len(),获取length
print(len(string1))
# #
#capitalize,第一个字符变大写
print(string1.capitalize())
# #
#upper,所有字符变大写
print(string1.upper())
# #
#lower,所有字符变小写
print(string1.lower())
# #
#replace,替换
print(string1.replace("wolrd","world"))
# #
#find,查找,返回下标，未找到返回-1
print(string1.find("ol"))

# boolean,布尔
a=True
b=False

string="hello world"
#
# #isupper
print(string.isupper())

# 有默认值的参数放在没有默认值的参数后面
def test(sum1,sum2=4):
    return sum1+sum2
print(test(0))

# split('【字符】切割位置',’【int类型】最多几刀‘)
string="HELLO WORLD"

print(string.split('O',1))

print(string.endswith("WORLD"))
```

## 7、列表

```python
# 列表
list1=["wolrd",True,3,4,5]

list1[1]=9

list1.append(6)

list1.pop(0)

list1.insert(0,0)

list1.reverse()#转置

list1.sort()

list1.remove(4)

print(list1)

print(len(list1))

print(list1.index(3))#索引
```

## 8、元组

```python
# 元组[不能修改的列表]

tuple1=(1,2,3)

tuple1[1]=4#不能修改

print(tuple1[1])

print(tuple1)

print(list(tuple1))#要修改需转化为列表

# #列表转元组

str1=[1,2,3]

print(tuple(str1))


# 字典 dictionary 通过键来获得值

dict1={"name":"ljk","height":170,"weight":100}

dict1["name"]="xs"

print(dict1["name"])

dict1["age"]=20


dict1.pop("age")

print(len(dict1))

print(dict1.keys())#获得所有的键放到列表中


print(dict1.values())#获得所有的值
```

## 9、集合

```python
# 集合 无重复元素 set 没有顺序概念，不能通过下标访问
set1={1,2,3,4,5,7,8}#会自动删除重复元素

set2=set((3,4,6))

print(set2)

set1.add(6)

set1.discard(5)

print(set1.intersection(set2))

print(set1.difference(set2))#集合1中有，集合2中没有才输出

print(set1)

print(set2.issubset(set1))#集合2是否是集合1的子集
```

## 10、类型

```python
#值类型Number,只传值本体不变
a=1
b=a
b=3
print("a:"+str(a))
print("b:"+str(b))


# 引用类型，
list2=[1,2,3]
list3=list2
list3[1]=4#会改变本体，类似指针
print("list2:"+str(list2))
print("list3:"+str(list3))


list2=[1,2,3]
list3=list2
list3=[2,3,4]#将地址改变
print("list2:"+str(list2))
print("list3:"+str(list3))


# 值类型：数字 布尔

# 引用类型： 列表 元组 字符串 集合 字典
```

## 11、条件控制

```python
# 条件控制

homework_finished=True
if(homework_finished):
  print("你可以去看电视了")
else:
  print("写作业")


# > <  >=  <=  == !=

prize=100

expensive=(prize>800)

 print(expensive)
 if(prize>800):
  print("太贵了")
 elif(prize>600):
  print("还是贵")
 elif(prize>200):
  print("再低点")
 else:
  print("成交")

```

## 12、循环

```python
# 循环

a=10

while(a>5):
 print(a)
 a-=1#python无自减，自增
print("循环结束")

```

## 13、序列

```python
# 序列： 字符串  列表  元组

string1="ljk"

for i in range(0,len(string1),1):#只有一个参数时为stop值，默认布距为1
 print(string1[i])

for char in string1:#前一个char是自定义变量名，后一个string1是循环主体
  print(char)


list1=["ljk","xs"]

for person in list1:
  print(person)

print(list(range(0,10,2)))

for i in range(10):
 print(i)
 if(i==5):
    break

a=10
while(a>5) :
 print(a)
 a-=1
 if (a==8):
    break


patients=[False, True ,False,False]

for patient in patients:
 if(patient):
    continue
 print("治疗这个病人")


i=input("请输入一个数")
print(i)
```

## 14、实例

```python
# 九九乘法表
for i in range(1,10):
 for x in range(1,i+1):
    print("%d x %d = %d"%(i,x,i*x),end="\t")
 print("\n")
```

```python
#异常捕获
# try:
#     print("-----test---1--")
#
#     f =open("123.txt","r")
#
#     print("-----test---2--")
# except IOError:#文件未找到，属于IO异常（输入输出异常）
#     pass#捕获异常后执行代码

# try:
#     print("-----test---1--")
#     f =open("test1.txt","r")
#     print("-----test---2--")
#
#     print(num)
# except (NameError,IOError):#异常类型要被捕获需要一致,可以将可能产生的异常放入括号中
#     print("产生异常")


#获取错误描述,并捕获所有异常
# try:
#     print("-----test---1--")
#     f =open("test1.txt","r")
#     print("-----test---2--")
#
#     print(num)
# except Exception as result:#异常类型要被捕获需要一致,可以将可能产生的异常放入括号中
#     print("产生异常")
#     print(result)



#try....finally和嵌套

# import time
# try:
#     f=open("test1.txt","r")
#     try:
#         while(True):
#             content=f.readline()
#             if len(content)==0:
#                 break
#             time.sleep(2)
#             print(content)
#     finally:
#         f.close()
#         print("文件关闭")
# except Exception as result:
#     print("发生异常")
#     print(result)
```

```python
#read 方法，读取指定的字符，开始时定位在文件头部，每执行一次向后移动指定字符
# f = open("text.txt","r")#打开文件，w模式（写模式），文件不存在就新建
#
# # f.write("hello world,i am here")#将字符串写入文件中
#
# content =f.read(5)
# print(content)
#
# content =f.read(10)
# print(content)
# f.close() #关闭文件

'''
f=open("text.txt","r")

content=f.readlines()#读完内容形成列表

# print(content)

i =1

for temp in content:
    print("%d:%s"%(i,temp))
    i+=1

f.close()
'''

# f=open("text.txt","r")
#
# content=f.readline()#读一行
#
# print("1:%s"%content)#%为占位符
#
#
# content=f.readline()
# print("2:%s"%content)
#
# f.close()

# import os
#
# os.rename("text.txt","test1.txt")
```
