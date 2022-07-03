# Linux常用命令

修改文件权限
sudo chmod 644 ××× （所有者有读和写的权限，组用户只有读的权限）

sudo chmod 777 ××× （每个人都有读和写以及执行的权限）

查询ip
ifconfig

使用navtic连接虚拟机mysql时关闭防火墙
systemctl stop firewalld

## 查看文件内容

`cat`

## 查看进程号

`ps -aux`查看全部进程

搜索进程 `ps -ef|grep 进程名`

杀进程`kill 进程号`

## apt

`apt update`

`apt install`

`apt upgrade`

