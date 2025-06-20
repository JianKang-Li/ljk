## wordpress使用

支持html代码

```html
<!-- wp:html -->

html代码
<!-- /wp:html -->
```

添加自定义栏目`is_page:1`
如果页面404 可能需要设置别名为含`_tab`

登陆后台地址`/wp-login.php?loggedout=true`



### 官网设置

1. style 为404， 需要先进入主题文件夹安装npm包然后执行`yarn build` 生成 style.css 和 main.css等
2. 如果nginx无法访问可以尝试删除镜像后重新拉取

### wordpress 设置用户的权限为admine

```mysql
SELECT ID FROM wp_users WHERE user_login = 'develop';

UPDATE wp_usermeta SET meta_value = 'a:1:{s:13:"administrator";b:1;}' WHERE user_id = ID AND meta_key = 'wp_capabilities'; // 修改权限

SELECT meta_value FROM wp_usermeta WHERE user_id = 10 AND meta_key = 'wp_capabilities'; // 查询确定

```

```css
@media(min-width:768px){         
  body{
    background-color: pink;
  }
}
@media (min-width:992px) {              
  body{
    background-color: skyblue;
  }
}
@media (min-width:1200px) {           
  body{
    background-color: green;
  }
}
```

