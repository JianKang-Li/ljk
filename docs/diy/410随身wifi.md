# 高通410随身wifi刷debian系统

## 准备工作

1. 410处理器的随身wifi

2. 固件

  ```url
  随身WiFi助手（来自@酷铵水遍）：
  https://pan.quark.cn/s/3b64d7a927cd
  
  随身WIFI Debian固件：
  https://pan.quark.cn/s/576e5fccccfa
  
  随身WIFI OpenWRT固件：
  https://pan.quark.cn/s/631323a0be44
  
  MobaXterm（官网）：
  https://mobaxterm.mobatek.net
  ```

## 刷机步骤

1. 查看设备信息（wifi助手 01 查看主板型号【也可拆机查看主板】）
2. 安装驱动 （wifi助手 1 选择 1 vivo驱动 【安装vivo手机驱动】）
3. 开启随身wifi adb（wifi助手 02 根据品牌选择选项 后台地址看包装上）
4. 进入9008 （wifi助手 05 再输入 1 重启后看到选择9008工具即可 设备管理器上会有9008）
5. 打开miko 备份固件（Read-> Partition Backup/Erase->Load Partition Structure->全选-> Firmware Folder Path-> Read Full Image）
6. 插拔随身wifi重启
7. 刷入debian （解压固件-> 解压目录cmd-> `adb devices`-> `adb reboot bootloader`-> 双击flash.bat-> 按任意键（一直回车到all done）） 
8. 打开设备管理器查看状态
   1. 其他设备显示 RNDIS （右键更新驱动，浏览我的电脑查找，从可用驱动中选择，网络适配器->Microsoft-> 基于远程NDIS的Internet 共享设备 到状态2 ）
   2. 网络适配器显示 基于远程NDIS的Internet 共享设备
   3. Android Device 显示 安卓ADB  interface (右键卸载设备，勾选尝试删除此设备驱动，重新插拔到状态1)
9. 使用MobaXterm ssh 连接随身wifi
10. 联网 `nmtui` 编辑连接 bridge -> 光标选择wifi ->删除（随身wifi功能）->返回启用连接，连接wifi
11. 更换软件源

```shell
echo -e 'nnnnnnnnnn####################################n'
sudo rm /etc/apt/sources.list
sudo touch /etc/apt/sources.list
sudo echo -e "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释nndeb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-freen# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-freenndeb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-freen# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-freenndeb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-freen# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-freenndeb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-freen# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free" >> /etc/apt/sources.list
echo -e '1、默认软件源修改完成！nn'
sudo sed -i '1c deb http://mirrors.tuna.tsinghua.edu.cn/Adoptium/deb buster main' /etc/apt/sources.list.d/AdoptOpenJDK.list
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 843C48A565F8F04B
sudo gpg --armor --export 843C48A565F8F04B | sudo apt-key add -
echo -e 'nn2、AdoptOpenJDK报错修复完成！nn'
sudo sed -i '1c #deb http://repo.mobian-project.org/ bullseye main non-free'  /etc/apt/sources.list.d/mobian.list
echo -e '3、Mobian源报已屏蔽！'
echo -e 'nn####################################nn即将开始更新软件源list......n'
sleep 5
sudo apt-get update
echo -e 'nn4、更新软件源list更新完成！'
echo -e 'nn####################################nn即将开始升级系统程序至最新版......'
sleep 5
sudo apt-mark hold openssh-server
sudo apt-get -y upgrade
sudo apt-mark unhold openssh-server
echo -e 'nn5、系统程序更新完成！nn####################################nnnn'
```

12. 完成系统安装



