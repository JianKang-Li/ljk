Python操作excel表格的基本操作-浮生阁阁主```python
# -*- codeing = utf-8 -*-
# @Author: ljk
# @Time: 2021/12/19 13:59
# @File: excel.py
# @Software: PyCharm
from openpyxl import Workbook,load_workbook#第三方库

# 创建表格
#实例化
wb=Workbook()
#获取当前active的sheet
sheet=wb.active
print(sheet.title)
sheet.title="URL"#重命名sheet名字
#
# #写数据，按cell来操作
sheet['A1']='名称'
sheet['C1']='网址'
#添加内容，在有数据的下面一行，追加
sheet.append(['百度','https://www.biadu.com'])
#
#加时间
#
wb.save("url.xlsx")#保存表格

#加载已有文件
wb2=load_workbook('url.xlsx')
print(wb2.sheetnames)#获取所有子表的名称
url=wb2['URL']#获取子表
print(url['A1'].value)#获取单元格值
print(url['A1:A5'])

#循环遍历
for cell in url["A1:A4"]:#获取到的是小元组，需要选择；获取指定列的数据
    print(cell[0].value)


#循环表数据
for row in url:
  # print(row)
  for cell in row:
		print(cell.value,end=" ")
print()

#行：rows   列：columns

#指定循环行
for row in url.iter_rows(min_row=1,max_row=2,max_col=3):
    for cell in row:
        print(cell.value,end=",")
print()


#指定循环列
for col in url.iter_cols(min_col=1,max_col=2,max_row=4):
    for row in col:
        print(row.value,end=",")
print()


#删除表
Sheet1=wb2['Sheet1']#获取子表
wb2.remove(Sheet1)
#
wb2.save('url.xlsx')
# #或者
# del wb2['Sheet1']


```