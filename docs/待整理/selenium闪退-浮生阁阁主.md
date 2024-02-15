selenium闪退-浮生阁阁主```python
def open_browser(url):
    # 定义全局变量
    global driver
    browser = webdriver.Chrome()
    browser.get(url)
    return browser
```

将driver设置为全局变量否则执行完会自动退出
