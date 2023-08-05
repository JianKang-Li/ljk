# Python

## 输入与输出

### 输入

input():从标准输入读入一行**文本**

### 输出

print()：主要的输出函数

将变量或常量转化为字符串时使用

repr():产生一个解释器易读的表达式，（在pycharm中不能输出到屏幕上）

str()：函数返回一个用户易读的表达式

### 格式化

使用str.format()

不自动换行时使用```print(str,end='')```

rjust()方法将字符串靠右，并在左边填充空格

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

## urllib库使用

```python
import urllib.request

# 定义url
url='http://www.baidu.com'

# 模拟浏览器想服务器发请求
response=urllib.request.urlopen(url)

# read方法 返回的是字节形式的二进制数据
# 二进制转字符串 解码 decode('编码格式')
content=response.read().decode('utf-8')

print(content)
```

### 一个类型 六个方法

print(type(response))

+ content=response.read(5)

+ print(content)

+ response.readline()

+ response.readlines()

返回状态码

+ response.getcode()

+ response.geturl()

+ response.getheaders()

### 下载

```python
urllib.request.urlretrieve(url=url_video,filename='lisa.mp4')
```

### 请求对象定制

```python
# 请求对象定制

headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'}
# 参数顺序问题，不能直接写url,headers 中间有data
request=urllib.request.Request(url=url,headers=headers)
responce=urllib.request.urlopen(request)
content=responce.read().decode('utf-8')
print(content)
```

### get请求的quote方法

```python
url='http://www.baidu.com/s?wd='+urllib.parse.quote('周杰伦')
```

### get请求的urlencode方法

```python
base_url='https://www.baidu.com/s?'
data={
    'wd':'周杰伦',
    'sex':'男'
}
url=base_url+urllib.parse.urlencode(data)
```

### post请求

```python
# post 请求
url = 'https://fanyi.baidu.com/sug'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'}
data = {
    'kw':'spider'
}
data = urllib.parse.urlencode(data).encode('utf-8')
request = urllib.request.Request(url=url, headers=headers, data=data)
response = urllib.request.urlopen(request)

content = response.read().decode('utf-8')
//解析json
import json
obj=json.loads(content)
print(obj)
```

### 反扒2 cookie

```python

url = "https://fanyi.baidu.com/v2transapi?from=en&to=zh"
headers = {
    "Cookie": 'Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1646060014; REALTIME_TRANS_SWITCH=1;',
}
data = {
    "from": "en",
    "to": "zh",
    "query": "spider",
    "simple_means_flag": "3",
    "sign": "63766.268839",
    "token": "e613403a609bf836b2cd3b7876f7ce8c",
    "domain": "common",
}
data = urllib.parse.urlencode(data).encode("utf-8")
request = urllib.request.Request(url=url, headers=headers, data=data)
response = urllib.request.urlopen(request)

content = response.read().decode("utf-8")
import json

obj = json.loads(content)
print(obj)
```

### 豆瓣案例ajax的get请求

```python

def create_request(page):
    url='https://movie.douban.com/j/chart/top_list?type=24&interval_id=100:90&action=&start='+str((page-1)*20)+'&limit=20'
    # print(url)
    requests=getRequest(url)
    return requests

def get_content(request):
    response=urllib.request.urlopen(request)
    content=response.read().decode('utf-8')
    return content

def down_load(content,page):
    with open('douban'+str(page)+'.json','w',encoding='utf-8') as fp:
        fp.write(content)
        fp.close()


if __name__=='__main__':
    start_page=int(input('起始页码'))
    end_page=int(input('结束页码'))
    for page in range(start_page,end_page+1):
        request=create_request(page)
        content=get_content(request)
        # 下载
        down_load(content,page)
    print('done')
```

### KFC实例ajax的post请求

```python
# 肯德基ajax post请求
def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf-8')
    return content


def down_load(content, page):
    with open('KFC_' + str(page) + '.json', 'w', encoding='utf-8') as fp:
        fp.write(content)
        fp.close()


if __name__ == '__main__':
    start_page = int(input('起始页码'))
    end_page = int(input('结束页码'))
    for page in range(start_page, end_page + 1):
        url='http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname'
        data=ToObj('''
        cname: 北京
        pid: 
        pageIndex: %d
        pageSize: 10
        '''%(page))
        request=getRequest(url=url,data=data)
        content = get_content(request)
        # 下载
        down_load(content, page)
    print('done')
```

### urllib 异常

简介:

+ 1HTTPError类是URLError类的子类
+ 2.导入的包urllib.error.HTTPError   urllib.error. URLError
+ 3.http错误: http错误是针对浏览器无法连接到服务器而增加出来的错误提示。引导并告诉浏览者该页是哪里出了问题。
+ 4.通过urllib发送请求的时候，有可能会发送失败，这个时候如果想让你的代码更加的健壮，可以通过try-except进行捕获异常,异常有两类，URLError\HTTPError

#### URLError

#### HTTPError

### cookie登录

```python
# 微博cookie登录
# 适应场景 数据采集时需要绕过登录进入到某个页面
# 个人信息页面是UTF-8还报错，因为并没有进入个人信息页面，而是跳转到登录界面
url = 'https://weibo.cn/6451491586/info'
headers = '''
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
cache-control: max-age=0
cookie: _T_WM=61efd0dc8d4be9ad9478aee3aa4ed494; SCF=AoNO2g0wGmhNtrs_QQKDg9ggeAEPtFsGkUmP_GfUw6F95CCYr_WacLS-UUnE-xzlRGW5fQXQPN9RDDm3ftbHkaI.; SUB=_2A25OKTppDeRhGeBK7lsZ8yzNyjyIHXVt0kYhrDV6PUJbktANLWHxkW1NR7K7KRo3fNoK_LEIbuLckHtaa1VTi-Xi; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhTsslY3hOmxwBz1N_W1bLU5NHD95QcSh-41heEeK27Ws4Dqcj_i--ci-zfi-88i--NiK.XiKLsi--4iK.RiKnpi--4iK.RiKnpi--Xi-zRi-iF; SSOLoginState=1663912505
referer: https://passport.weibo.cn/
sec-ch-ua: "Microsoft Edge";v="105", " Not;A Brand";v="99", "Chromium";v="105"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: document
sec-fetch-mode: navigate
sec-fetch-site: same-site
sec-fetch-user: ?1
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42
'''
headers=ToObj(headers)
request=getRequest(url=url,headers=headers)

response=urllib.request.urlopen(request)
content=response.read().decode('utf-8')

with open('weibo.html','w',encoding='utf-8') as fp:
    fp.write(content)

```

cookie 携带登录信息

referer 判断当前路径是不是由上一个路径进来的，一般做图片防盗链

### handler处理器

> Handler
> 定制更高级的请求头（随着业务逻辑的复杂请求对象的定制已经满足不了我们的需求（动态cookie和代理不能使用请求对象的定制)

```python
# handler处理器的基本使用
url='http://www.baidu.com'

request=getRequest(url=url)
# 获取handler对象
handler=urllib.request.HTTPHandler()

# 获取opener对象
opener=urllib.request.build_opener(handler)

# 调用open方法
response=opener.open(request)
content=response.read().decode('utf-8')

print(content)
```

### 代理服务器

> 1.代理的常用功能?
>
> > 1.突破自身IP访问限制，访问国外站点。
> >
> > 2.访问一些单位或团体内部资源
> >
> > > 扩展:某大学FTP(前提是该代理地址在该资源的允许访问范国之内)，使用教育网内地址段免费代理服务器，就可以用于对教育网开放的各类FTP下载上传，以及各类资料查询共享等服务。
> >
> > 3.提高访问速度
> >
> > > 扩展:通常代理服务器都设置一个较大的硬盘缓冲区，当有外界的信息通过时，同时也将其保存到缓冲区中，当其他用户再访问相同的信息时，则直接由缓冲区中取出信息，传给用户，以提高访问速度。
> > 4.隐藏真实IP
> > > 扩展:上网者也可以通过这种方法隐藏自己的IP，免受攻击。
>
> 2.代码配置代理
>
> + 创建Reuqest对象
> + 创建ProxyHandler对象
> + 用handler对象创建opener对象使用opencr.open的数发送请求

```python
url = 'https://www.ip138.com/'

request = getRequest(url=url)

proxies={
    "https":"113.200.56.13:8081"
}

# response = urllib.request.urlopen(request)
handler=urllib.request.ProxyHandler(proxies=proxies)
opener=urllib.request.build_opener(handler)
response=opener.open(request)
content = response.read().decode('utf-8')
saveF('daili.html', content)
```

### xpath

路径查询

+ /表示子代
+ //表示所有后代

谓词查询

+ //div[@id]
+ //div[@id='maincontent']

属性查询

+ //@class

模糊查询

+ //div[contains(@id,'he')]
+ //div[starts-with(@id,'he')]

内容查询

+ //div/h1/text()

逻辑运算

+ //div[@id='head' and @class='s_down']
+ //title|/price

### BeautifulSoup

```python
# bs4的一些函数
# find
# 根据title返回第一个符合条件的数据
# print(soup.find('a',title='a2'))

# 根据class的值来找到节点
# print(soup.find('a',class_='a1'))

# find_all
# 返回一个列表,并返回所有标签
# print(soup.find_all('a'))
# 查找所有a和span
# print(soup.find_all(['a','span']))
# 限制数量
# print(soup.find_all('li',limit=2))


# select(推荐)
# select返回列表,返回多个数据
# print(soup.select('a'))
# 类似于js中的document.querySelectAll()
# print(soup.select('.a1'))
```

```python
# bs4 星巴克
url='https://www.starbucks.com.cn/menu/'

resquest=getRequest(url=url)

response=urllib.request.urlopen(resquest)
content=response.read().decode('utf-8')
# print(content)
soup=BeautifulSoup(content,'lxml')
# print(soup.select(''))
# //ul[@class="grid padded-3 product"]//strong
name_list=soup.select("ul[class='grid padded-3 product'] strong")
for name in name_list:
    print(name.get_text())
```

### Selenium

[官网](https://www.selenium.dev/zh-cn/documentation/overview/)

#### 1.Selenium

1.什么是selenium?

+ (1) selenium是一个用于web应用程序测试的工灵。
+ (2) selenium测试直接运行在浏览器中，就像真正的用户在操作一样。
+ (3)支持通过各种driver(FirfoxDriver，IternetExplorerDriver ，OperaDriver，ChromeDriver)驱动真实浏览器完成测试。
+ (4) selenium也是支持无界面浏览器操f作的。

2.为什么使用selenium?
 模拟浏览器功能，自动执行网页中的js代码，实现动态加载

3.如何安装sclenium?

+ (1)操作谷歌浏览器驱动下载地址
  <http://chromedriver.storage.googleapis.com/index.html>
+ (2）谷歌驱动和谷歌浏览器版本之问的映射表
  <http://blog.csdn.net/huilan_same/article/details/51896672>
+ (3)查看谷歌浏览器版本
  谷歌浏览器右上角-->帮助-->关于
+ (4) pip install selenium

#### 基本使用

```python
from selenium import webdriver

path='chromedriver.exe'
# 调用浏览器
def open_browser():
    # 定义全局变量
    global driver
    driver = webdriver.Chrome(path)
    return driver

url="https://www.jd.com/"
browser=open_browser()
browser.get(url)
# 获取网页源码
content=browser.page_source
print(content)
```

#### 元素定位

```python
seleniun的元素定位?
元素定位:自动化要做的就是模拟鼠标和键盘来操作来操作这些元素，点击、输入等等。操作这些元素前首先要找到它们，webDriver提供很多定位元亲的方法
方法:
1.find_element_by_id
eg:button = browser.find_element_by_id( 'su')
2.find_elements_by_name
eg:name = browser-find_eleaent_by_name( "wd' )
3.find_elements_by_xpath
eg:xpath=browser.find_elements_by_xpath( '//input[@id-"su"]'）
4.find_elements_by_tag_name
eg : names = browser.find_elements_by_tag_name( "input " )
5.find_elements_by_css_selector
eg : my_input=browser.find_elements_by_ess_selector ('#kua')[0]
6.find_elements_by_link_text
eg :browser.find_element_by_link_text("新闻")
```

#### 访问元素信息

+ get_attribute()
+ .text
+ .tag_name

#### 交互

+ .click()
+ .send_keys()
+ .execute_script()

```python
#selenium4
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
# path='chromedriver.exe'
# 调用浏览器
def open_browser(url):
    # 定义全局变量
    global driver
    browser = webdriver.Chrome()
    browser.get(url)
    return browser

url="https://www.baidu.com/"
browser=open_browser(url)
# browser.get(url)
# 获取网页源码
# content=browser.page_source
# print(content)


# plants = browser.find_elements(by=By.CSS_SELECTOR, value=".mnav.c-font-normal.c-color-t")

input=browser.find_element(by=By.ID,value="kw")
button=browser.find_element(by=By.ID,value='su')
input.send_keys('周杰伦')
time.sleep(2)
button.click()
time.sleep(2)
# 滑动
js_button='document.documentElement.scrollTop=10000'
browser.execute_script(js_button)
btn_next=browser.find_element(by=By.CLASS_NAME,value='n')
time.sleep(2)
btn_next.click()
time.sleep(2)
browser.forward()
time.sleep(3)
# 退出
browser.quit()
```

#### 无界面浏览器

**selenium4不支持PhantomJS**

```python
# phantomjs

from selenium import webdriver
from time import sleep

path='phantomjs.exe'

browser=webdriver.PhantomJS(path)

url="https://www.baidu.com"

browser.get(url)

browser.save_screenshot('baidu.png')
sleep(2)
input=browser.find_element_by_id('kw')
input.send_keys('昆凌')
sleep(3)
browser.save_screenshot('kunling.png')
browser.quit()
```

##### chrome-headless

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# 封装headless
def share_browser():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')

    path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

    chrome_options.binary_location = path

    browser = webdriver.Chrome(chrome_options=chrome_options)
    return  browser


url="https://www.baidu.com"
browser=share_browser()
browser.get(url)
```

### requests

基本使用

```python
import requests

url='http://www.baidu.com'

response=requests.get(url=url)

# Response类型
# print(type(response))

# 设置响应的编码格式
# response.encoding='utf-8'

# 返回网页源码
# print(response.text)

# 返回url地址
# print(response.url)

# 返回二进制数据
# print(response.content)

# 返回响应状态码
# print(response.status_code)

# 返回响应头
# print(response.headers)
```

#### get请求

```python
# requests get请求
url = 'http://www.baidu.com/s?'

headers = getSimpHeader()

data = {
    'wd': '北京'
}

# url 路径 params 参数 kwargs 字典
response=requests.get(url=url,params=data,headers=headers)

content=response.text

# 参数使用params传递
# 参数无需编码
# 不需要请求对象的定制
print(content)
```

#### Requests post请求

```python
# post请求
url='https://fanyi.baidu.com/sug'
headers=getSimpHeader()
data={
    'kw':'eye'
}
response=requests.post(url=url,data=data,headers=headers)
response.encoding='utf-8'
content=response.text

import json

obj=json.loads(content)
print(obj)
```

#### 代理

```python
```

#### session cookie登录

```python
# 登陆页的url
headers = getSimpHeader()
url = 'https://so.gushiwen.cn/user/login.aspx?from=http://so.gushiwen.cn/user/collect.aspx'

# 获取源码
response = requests.get(url=url, headers=headers)
content = response.text
# print(content)

# 解析页面源码 获取 __VIEWSTATE __VIEWSTATEGENERATOR
soup = BeautifulSoup(content, 'lxml')

# 获取 __VIEWSTATE
viewstate = soup.select('#__VIEWSTATE')[0].attrs.get('value')
viewstategenerator = soup.select('#__VIEWSTATEGENERATOR')[0].attrs.get('value')

# 获取验证码图片
code = soup.select('#imgCode')[0].attrs.get('src')
code_url = 'https://so.gushiwen.cn' + code
# print(code_url)
# urllib.request.urlretrieve(url=code_url,filename='code.jpg')
# requests里面有一个方法session() 通过session的返回值 就能使请求变成一个对象
session=requests.session()
response_code=session.get(code_url)
# 使用二进制数据
content_code=response_code.content
with open('code.jpg','wb')as fp:
    fp.write(content_code)

# 获取验证码的图片下载到本地,在控制台输入
# code的参数

code_name = input('请输入你的验证码')
url_post = 'https://so.gushiwen.cn/user/login.aspx?from=http://so.gushiwen.cn/user/collect.aspx'
data_post = {
    '__VIEWSTATE': viewstate,
    '__VIEWSTATEGENERATOR': viewstategenerator,
    'from': 'http://so.gushiwen.cn/user/collect.aspx',
    'email': '3104653373@qq.com',
    'pwd': '18216548093',
    'code': code_name,
    'denglu': ' 登录'
}

response_post=session.post(url=url_post,data=data_post,headers=headers)

content_post=response_post.text

with open('gushiwen.html','w',encoding='utf-8') as fp:
    fp.write(content_post)
    fp.close()
```

### Scrapy

(1) scrapy是什么?
Scrapy是一个为了爬取网站数据，提取结构性数据而编写的应用框架。可以应用在包括数据挖掘，信息处理或存储历史数据等一系列的程序中。

创建项目

`scrapy startproject scrapy_baidu`

```python
1 创建爬虫项目
scrapy startproject 项目的名字
不能使用数字开头 不能包含中文

2 创建爬虫文件
在spiders文件夹下创建爬虫文件

创建爬虫文件
scrapy genspider 爬虫文件的名字 要爬取网页
scrapy genspider baidu http://www.baidu.com

3 允许爬虫代码
scrapy crawl 爬虫的名字

修改setting不遵守ROBOTSTXT_OBEY = True
```

#### 目录结构

+ spiders文件夹
  + init
  + 自定义爬虫文件  核心功能文件

+ items 定义数据结构的地方 爬取的数据都包含哪些
+ middleware 中间件 代理
+ pipelines 管道  用来处理下载的数据
+ settings 配置文件  robots协议  ua定义等

#### response方法

+ .text 获取的是响应的字符串
+ .body 获取二进制文件
+ .xpath 直接是xpath方法来解析response中的内容
+ .extract() 提取selector对象的data属性
+ .extract_first() 提取selector列表的第一个数据

#### 架构组成

+ 引擎
  + 自动运行无需关注，自动组织所有的请求对象，分发给下载器
+ 下载器
  + 从引擎获取到请求对象后，请求数据
+ spiders
  + 定义如何爬取某个网站，包括爬取动作
+ 调度器
  + 有自己的调度规则，无需关注
+ 管道
  + 最终处理数据的管道，预留接口供我们数据处理，当Item在spider中被收集之后，它会被传递到Item Pipeline，一些组件会按照一定顺序执行对Item的处理
  + 应用
    + 清理HTML数据
    + 验证爬取的数据
    + 查重
    + 将数据结果保存到数据库中

#### 工作原理

+ 引擎向spider要url
+ 引擎将url给调度器
+ 调度器将url生成请求对象，放入队列中
+ 从队列中出队一个请求
+ 引擎将请求交给下载器进行处理
+ 下载器发送请求获取互联网数据
+ 下载器将数据返回给引擎
+ 引擎将数据再次交给spiders
+ spiders通过xpath解析数据，得到数据或url
+ spider将数据或url给到引擎
+ 引擎判断数据还是url，是数据交给管道垂，url交给调度器

#### scrapy shell

安装ipython后直接在cmd中使用scrapy shell 就可以自动进入ipython

使用scrapy shell可以随手验证

#### 使用

items.py

```python
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ScrapyDangdangItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # 通俗的说就是要下载的数据都有些什么
    # 图片
    src=scrapy.Field()
    # 名字
    name=scrapy.Field()
    # 价格
    price=scrapy.Field()

```

pipelines.py

```python
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

# 如果想使用管道就必须在setting中开启管道
class ScrapyDangdangPipeline:
    # 爬虫文件执行前 执行方法
    def open_spider(self,spider):
        self.fp=open('books.json','w',encoding='utf-8')
        self.fp.write('[')
    # item 就是yield 后面的book对象
    def process_item(self, item, spider):
        # item 不是str

        # 对文件操作过于频繁
        # with open('books.json','a',encoding='utf-8') as fp:
        #     fp.write(str(item)+',')
        self.fp.write(str(item).replace("'",'"')+',')
        return item

    # 爬虫文件执行后执行方法
    def close_spider(self,spider):
        self.fp.write(']')
        self.fp.close()

import urllib.request
# 多条管道开启
# 1 定义管道类
# 2 在setting中开启管道
class ScrapyDangdangDownloadPipeline:
    def process_item(self, item, spider):
        url='http:'+item.get('src')
        filename="./books/"+item.get('name')+'.jpg'
        urllib.request.urlretrieve(url=url,filename=filename)

        return item
```

settings.py

```python
#开管道
ITEM_PIPELINES = {
   #  管道可以有很多个 管道有优先级 优先级的范围是1到1000 值越小优先级越高
   'scrapy_dangdang.pipelines.ScrapyDangdangPipeline': 300,
   # DangDangDownloadPipeline
   'scrapy_dangdang.pipelines.ScrapyDangdangDownloadPipeline': 301,
}

```

#### CrawlSpider

`from scrapy.linkextractors import LinkExtractor`

```python
 link=LinkExtractor(allow='/book/1188_\d+.html')
 link.extract_links(response)
```

#### 日志信息和日志级别

##### 日志级别

+ CRITICAL 严重错误
+ ERROR 一般错误
+ WARNING 警告
+ INFO 一般信息
+ DEBUG 调试信息

默认日志等级是DEBUG

只要是DEBUG或者DEBUG以上等级的日志

那么这些日志就会打印

settings.py文件设置

+ 默认的级别为DEBUG就会显示上面信息
+ LOG_FILE 将屏幕显示的信息全部记录到文件中，屏幕不再显示，文件后缀一定是.log
+ LOGE_LEVEL 设置日志显示等级

```python
# 指定日志级别
# LOG_LEVEL='WARNING'
LOG_FILE='logdemo.log'
```

#### Scrapy post请求

```python
# 不用start_urls 和 parse方法
def start_requests(self):
    url="https://fanyi.baidu.com/sug"
    
    data={
        'kw':"final"
    }
    
    yield scrapy.FromRequest(url=url,formdata=data,callback=self.parse_second)
    
def parse_second(self,response):
    content=response.text
    obj=json.loads(content,encoding='utf-8')
    print(obj)
```
