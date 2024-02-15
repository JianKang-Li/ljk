JavaWeb基础学习-浮生阁阁主

# JavaWeb基础

## web.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>servlet_all</servlet-name>
        <servlet-class>com.example.servlet_study.servlet_all</servlet-class>
        <init-param>
            <param-name>default-time</param-name>
            <param-value>50</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>servlet_all</servlet-name>
        <url-pattern>/servlet_all</url-pattern>
    </servlet-mapping>


    <context-param>
        <param-name>encoding</param-name>
        <param-value>GBK</param-value>
    </context-param>

    <session-config>
        <session-timeout>10</session-timeout>
    </session-config>

    <filter>
        <filter-name>filter</filter-name>
        <filter-class>com.example.servlet_study.filter</filter-class>
    </filter>

    <filter-mapping>
        <filter-name>filter</filter-name>
        <url-pattern>/servlet_all</url-pattern>
        <dispatcher>FORWARD</dispatcher>
    </filter-mapping>


</web-app>
```

## servlet文件

```java
package com.example.servlet_study;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.Enumeration;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.sql.DataSource;


@WebServlet(name="servlet_all", urlPatterns="/servlet_all",
initParams = {@WebInitParam(name = "encoding",value = "UTF-8"),
@WebInitParam(name="textType",value = "text/html;charset=utf-8"),
@WebInitParam(name="resencoding",value = "GBK")})
public class servlet_all extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //HTTP响应状态码
        //1、200  客户端响应成功
        //2、302  临时重定向  服务器返回的头部信息中会包含一个 Location 字段，内容是重定向到的url
        //3、400  客户端请求有语法错误，不被服务器端理解
        //4、401  请求未经授权，必须和WWW-Authenticate报头域一起使用
        //5、403  服务器收到请求，但拒绝提供服务
        //6、404  请求资源不存在
        //7、500  服务器发生不可预期的错误
        //8、503  服务器当前不能处理客户端的请求


//        get与post请求的区别有哪些
//        区别一：
//        get重点在从服务器上获取资源
//        post重点在向服务器发送数据
//        区别二：
//        get传输数据是通过URL请求，以field（字段）= value的形式，置于URL后，并用"?"连接，多个请求数据间用"&"连接，如http://127.0.0.1/Test/login.action?name=admin&password=admin，这个过程用户是可见的
//        post传输数据通过Http的post机制，将字段与对应值封存在请求实体中发送给服务器，这个过程对用户是不可见的
//        区别三：
//        Get传输的数据量小，因为受URL长度限制，但效率较高
//        Post可以传输大量数据，所以上传文件时只能用Post方式
//        区别四：
//        get是不安全的，因为URL是可见的，可能会泄露私密信息，如密码等
//        post较get安全性较高


//        简单描述Servlet生命周期
//        加载Servlet：当Tomcat第一次访问Servlet的时候，Tomcat会负责创建Servlet的实例
//        初始化：当Servlet被实例化后，Tomcat会调用init()方法初始化这个对象
//        处理服务：当浏览器访问Servlet的时候，Servlet 会调用service()方法处理请求
//        销毁：当Tomcat关闭时或者检测到Servlet要从Tomcat删除的时候会自动调用destroy()方法，让该实例释放掉所占的资源。一个Servlet如果长时间不被使用的话，也会被Tomcat自动销毁
//        卸载：当Servlet调用完destroy()方法后，等待垃圾回收。如果有需要再次使用这个Servlet，会重新调用init()方法进行初始化操作

        //实现servlet的方法：
        //实现Servlet接口:init()(只执行一次);service();destroy()(只执行一次),getServletConfig(),getServletInfo();
        //继承GenericServlet类:destroy(),init(),init(ServletConfig config),service()
        //继承HttpServlet类（常用）：init(),doGet(),doPost(),destroy()方法
        String encoding=this.getServletConfig().getInitParameter("encoding");//通过ServletConfig获取初始参数
        System.out.println("init-param:encoding="+encoding);
        String info=this.getServletInfo();
        System.out.println("ServletConfig:"+info);//获取servlet信息，默认为空
        //四大域 Request Page Session application

        System.out.println("*******Request常用方法*****");
        request.setCharacterEncoding(encoding);//设置request编码,解决页面传参为中文问题
        StringBuffer url=request.getRequestURL();//获取请求地址
        String uri= request.getRequestURI();//获取URI，URL去掉主机地址
        System.out.println("URL:"+url);
        System.out.println("URI:"+uri);
        String name=request.getParameter("name");//通过参数名获取客户端传递的参数，url传参数可用?参数1=参数值&参数2=参数值
        System.out.println("客户端参数：name="+name);
        String contextPath=request.getContextPath();//获取上下文路径
        System.out.println("ContextPath:"+contextPath);
        String[] values=request.getParameterValues("ball");//获取请求参数中的复选框值
        System.out.print("复选选项：");
        if(values!=null){//如果不判断，可能会报空指针错误
        for(String i:values){//循环打印复选框值
            System.out.print(i+"   ");
        }
        }
        System.out.println();
        request.setAttribute("time",100);//request设置变量
        int time=(int) request.getAttribute("time");
        System.out.println("request设置的变量time:"+time);
//        request.getRequestDispatcher("转发地址").forward(request,response);//请求转发，转发时可以通过setAttribute()传递参数信息

        System.out.println("****Response****");
        String text=this.getInitParameter("textType");
        response.setContentType(text);//使客户端浏览器，区分不同种类的数据
        response.setCharacterEncoding(this.getServletConfig().getServletContext().getInitParameter("encoding"));//设置响应编码
        PrintWriter out=response.getWriter();//页面输出对象
        out.println(name+"欢迎进入后端的大门！");
//        response.sendRedirect("重定向地址"+"?参数1名=参数值&参数2=参数值");//重定向，通过重写url地址实现传参


        System.out.println("*****ServletConfig*****");
        ServletConfig config=this.getServletConfig();//获取ServletConfig对象
        String textType=config.getInitParameter("textType");//通过ServletConfig获取初始参数
        System.out.println("textType:"+textType);
        String servletname=config.getServletName();
        System.out.println("ServletName:"+servletname);
        Enumeration<String> inits=config.getInitParameterNames();//获取所有初始化参数名称,返回值为Enumeration对象
        while(inits.hasMoreElements()){
            System.out.print(inits.nextElement()+"  ");
        }
        System.out.println();


        System.out.println("*****ServletContext*****");
        //WEB容器在启动时，它会为每个WEB应用程序都创建一个对应的ServletContext对象，它代表当前web应用,当前应用下的所有servlet都可以访问其参数
        ServletContext application=this.getServletContext();//利用GenericServlet.getServletContext()获取
        ServletContext application1=this.getServletConfig().getServletContext();//利用ServletConfig.getServletContext()获取
        //HttpSession session=request.getSession();//获取Session
        HttpSession session=request.getSession(true);//填写参数为true则表示没有则创建,注意session的类为HttpSession
        ServletContext  application2=session.getServletContext();//利用Session.getServletConfig()获取
        //application可以获取全局变量，全局变量在web.xml中设置，使用
        // <context-param>
        //        <param-name>time</param-name>
        //        <param-value>100</param-value>
        //</context-param>
        String contextencoding=application.getInitParameter("encoding");
        System.out.println("ContextEncoding参数："+contextencoding);
        //ServletContext操作数据
        //void setAttribute()
        //object getAttribute()
        //void removeAttribute()
        //Enumeration getAttributeNames()
//        response.setHeader("Refresh","3;url=http://www.bilibili.com");//实现自动跳转到指定页面


        System.out.println("****Cookie&&Session****");
//        为了跟踪客户状态，Web服务器通常提供了四种方式：
//        HTML表单中隐藏数据（CourseEX09/hidden.html+GetHiddenInfo.java ）
//        重写URL（ CourseEX09/EncodeURL.java+RewriteServlet.java）
//        Cookie：辨别用户身份而储存在浏览器上的文本信息
//        Session：使用 HttpSession 对象保存单个用户访问时的信息

        Cookie cookie=new Cookie("test","1");//创建一个新的cookie对象
        cookie.setPath("/");//将Path设置为“/”可以使cookie能被多个web项目共享
        cookie.setValue("2");//更改cookie的值
//        cookie.setMaxAge(10);//设置cookie的有效秒数，设置为0表示立即删除，默认值为-1
//        跨域共享cookie的方法：设置cookie.setDomain("域名");
        response.addCookie(cookie);//向客户端发送cookie
        Cookie[]  cookies=request.getCookies();
        for (Cookie s:cookies) {
            System.out.println("cookie名称："+s.getName()+"     cookie的值："+s.getValue());
        }
        //Session 来自HttpSession类，通过request.getSession()获取,Session 有效时长默认为30分钟
        String ID=session.getId();//获取session的ID,session通过Cookie技术存储在客户端
        System.out.println("SessionID:"+ID);
//        session.setMaxInactiveInterval(10);//设置session的失效时间，单位为分钟
//        session.invalidate();//使session立即失效
        session.setAttribute("sessiontest","test");//利用session存储对象
        String s=(String) session.getAttribute("sessiontest");
        System.out.println(s);
        //可以在web.xml文件中设置session的默认失效时间

        //****JavaBean****
//        使用get和set方法定义属性；（注意：属性其实是通过set和get方法定义的）
//        一个无参构造方法；
//        Private的实例变量；
//        Public的getter和setter

        System.out.println("****JDBC****");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");//加载驱动
            Connection conn= DriverManager.getConnection("jdbc:mysql://localhost:3306/users","root","123456");//建立连接
            PreparedStatement ps=conn.prepareStatement("select * from users where username=?");//创建sql语句
            //PrepareStatement继承自Statement类，但PrepareStatement可以防止sql注入，且PrepareStatement有预编译
            ps.setString(1,"xs");//设置参数
            ResultSet rs=ps.executeQuery();//执行sql语句，返回执行结果
            //不同执行语句的区别
//            execute()方法：用来执行返回多个结果集的sql语句
//            executeQuery()方法：用于产生单个结果集的语句
//            executeUpdate()：用于执行 INSERT、UPDATE 、 DELETE 语句或不返回任何内容的 SQL 语句
            while(rs.next()){
                System.out.println(rs.getString("id")+"   "+rs.getString("username")+"  "+rs.getString("pswd"));
            }
            conn.close();
            ps.close();
            rs.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        DataSource ds=null;
        System.out.println("****Tomcat数据源使用****");
        try{
            Context initctx=new InitialContext();
            Context envctx=(Context) initctx.lookup("java:comp/env");
            ds=(DataSource) envctx.lookup("Tomcat");
            Connection coon=ds.getConnection();
            String sql="select * from users";
            PreparedStatement ps=coon.prepareStatement(sql);
            ResultSet rs=ps.executeQuery();
            while(rs.next()){
                System.out.println(rs.getString("id")+"   "+rs.getString("username")+"   ");
            }
            coon.close();
            ps.close();
            rs.close();
        }catch (Exception e){
            e.printStackTrace();
        }


    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        doGet(request, response);

    }

}


```

## Filter文件

```java
package com.example.servlet_study;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "filter",urlPatterns ={ "/servlet_all"}
        ,initParams = {
        @WebInitParam(name="encoding",value = "utf-8"),
        @WebInitParam(name="boss",value = "ljk,xs")
})//注册过滤器：name 为过滤器名字  urlPatterns为过滤的请求路径
//在web.xml中注册Filter可以选择在filter-mapping中声明dispatcher,用以声明触发方式，默认为REQUEST;还可以是INCLUDE,FORWARD,ERROR
public class filter implements Filter {
    FilterConfig config=null;
    private  String[] booslist;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
            this.config=filterConfig;//获取FilterConfig对象，便于后面使用
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String use=servletRequest.getParameter("name");
        String boss=config.getInitParameter("boss");
        booslist=boss.split(",");
        if (!check(use)){
            filterChain.doFilter(servletRequest,servletResponse);
        }
        else{
            HttpServletResponse response=(HttpServletResponse) servletResponse;
            servletRequest.getRequestDispatcher("./boss.jsp").forward(servletRequest,response);
        }
    }

    public boolean check(String use){
        for (String user:booslist){
            if (user.equals(use)){
                return true;
            }
        }
        return false;
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}

```

## Listener文件

```java
package com.example.servlet_study;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener//注解声明监听器直接使用@WebListener
//监听接口的分类
//ServletContext
//ServletRequest
//HttpSession
//ServletContext：创建与销毁、属性的更改（常用于全局域对象）
//HttpSession：创建与销毁、属性的更改、绑定和激活事件（常用于记录访问人数和访问日志）
//ServletRequest：创建与销毁、属性的更改（常用于读取参数和记录访问历史）
//八个监听器
//ServletContextListener
//HttpSessionListener
//ServletRequestListener
//ServletContextAttributeListener
//ServletRequestAttributeListener
//HttpSessionAttributeListener
//HttpSessionBindingListener(绑定，解除绑定)
//HttpSessionActivationListener(钝化，活化)


//六个Event类别
//ServletContextEvent
//ServletContextAttributeEvent
//HttpSessionBindingEvent
//HttpSessionEvent
//RequestEvent
//HttpSessionBindingEvent

//接口方法
//contextInitialized()
//contextDestroyed()
//sessionCreated()
//sessionDestroyed()
//attributeAdded()
//attributeRemoved()
//attributeReplaced()
//requestInitialized()
//requestDestroy()
//valueBound()
//valueUnbound()
//sessionDidActivate()
//sessionWillPassivate()
public class ContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Context对象被创建了！");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Context对象销毁");
    }

}

```

## JSP文件

```jsp
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/10/29
  Time: 21:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="java.util.*" language="java" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Servlet_all.jsp</title>
</head>
<body>
   <form action="./servlet_all" method="get">
    姓名：<input type="text" name="name"><br>
    密码：<input type="password" name="pswd"><br>
    兴趣爱好：<br>
       <input type="checkbox" name="ball" value="足球">足球
       <input type="checkbox" name="ball" value="篮球">篮球
       <input type="checkbox" name="ball" value="羽毛球">羽毛球
       <input type="checkbox" name="ball" value="网球">网球<br>
       <input type="submit" value="提交"><input type="reset" value="重置">
   </form>

    <hr>
   <p>JSP编程</p>

</body>
</html>

```
## context.xml
```xml
<Context path="/demo_jndi" docBase="/demo_jndi">
           <Resource
             name="jndi/mybatis"
             type="javax.sql.DataSource"
             driverClassName="com.mysql.jdbc.Driver"
             maxIdle="2"
             maxWait="5000"
             username="root"
             password="123456"
             url="jdbc:mysql://localhost:3306/appdb"
             maxActive="4"/>
        </Context>
```
## JavaWeb实现验证码功能
```java
package com.example.ex8;

import javax.imageio.ImageIO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

@WebServlet(name = "GenerateCodeServlet",urlPatterns = "/GenerateCodeServlet")
public class GenerateCodeServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session= request.getSession(true);
        int width=80,height=20,code_len=4;
        BufferedImage image=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);

        Graphics g=image.createGraphics();
        g.setColor(new Color(200,200,200));
        g.fillRect(0,0,width,height);
        char[] codeChar="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
        String temp = "";
        Random random = new Random();
        for (int i=0;i<code_len;i++){
            int index=random.nextInt(codeChar.length);
            g.setColor(Color.black);
            g.setFont(new Font("Times New Roman",Font.PLAIN,18));
            temp+=codeChar[index];
            g.drawString(temp,10,17);

        }
        System.out.println(temp);
        session.setAttribute("randStr",temp);

        ImageIO.write(image,"jpg",response.getOutputStream());

    }
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      doGet(request,response);
    }
}

```
```jsp
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login.jsp</title>
</head>
<body>
<h3>用户登录</h3>
<form method="post" action="${pageContext.request.contextPath}/validateServlet">
用户名：<input type="text" name="username"><br/>
密码： <input type="password" name="password"><br/>
验证码：<input type="text" name="code"><br/>
<img id="codeImg" alt="这是验证码" src="${pageContext.request.contextPath}/GenerateCodeServlet"><br/>
    <a href="javaScript:change();">换一张</a><br/><br/>
    <input type="submit" value="登录"/>
</form>

<script>
    function change(){
        var t=new Date();
        document.getElementById("codeImg").src="${pageContext.request.contextPath}/GenerateCodeServlet?time="+t;
    }
</script>
</body>
</html>
```


JavaWeb中html页面经过过滤器过滤后出现中文乱码，设置编码等方法无法正常显示时可以尝试将html页面的utf-8编码改为GBK编码。

在idea中修改html代码后页面还是与预期不符，chrome浏览器中可以使用```shift+F5/ctrl+F5```进行刷新尝试