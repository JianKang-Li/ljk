Python发送qq邮件-浮生阁阁主```python
# -*- codeing = utf-8 -*-
# @Author: ljk
# @Time: 2021/12/19 15:35
# @File: email.py
# @Software: PyCharm
import smtplib
from  email.mime.text  import  MIMEText#构建邮件正文
from email.header import Header#构建邮件头

#登录邮件服务器

smtp_obj=smtplib.SMTP_SSL("smtp.qq.com",465)#邮件服务器端口号
smtp_obj.login('example@qq.com','xxxxxxx')#发送登录
# smtp_obj.set_debuglevel(1)#展示测试信息

msg=MIMEText("这是一封由Python发出的邮件","plain",'utf-8')#文本
msg['From']=Header('ljk','utf-8')#邮件发送者
msg["To"]=Header("tester",'utf-8')#邮件发送者名
msg['Subject']=Header("test",'utf-8')#邮件主题


smtp_obj.sendmail("发送者@qq.com","接受者@qq.com",msg.as_string())#发送邮件
```