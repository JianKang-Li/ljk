lxc基本使用-浮生阁阁主## 安装lxc
`sudo apt install lxc -y`
`sudo apt-get install lxd`
## 检验lxc是否安装成功
`lxc --version`
## 初始化
`lxc init`
## 查看本地所有容器
`lxc list`
## 更换镜像源
`sudo lxc remote add tuna-images https://mirrors.tuna.tsinghua.edu.cn/lxc-images/ --protocol=simplestreams --public`
## 创建并加载容器
`sudo lxc launch tuna-images:ubuntu/16.04 u1604-2`
launch 参数说明：

- 参数1 使用源与系统版本
- 参数2 容器名字
## 启动并进入容器
`lxc start u1604-2`
`lxc exec u1604-2 bash`
## 停止容器
`sudo lxc-stop --name=NAME`
## 删除容器
`lxc stop containerName`
`lxc delete containerName`
