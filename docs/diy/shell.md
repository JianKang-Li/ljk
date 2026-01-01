# shell 脚本开发

## 更换 shell 环境为 bash

1. 查看当前环境 `ls -l /bin/sh`
2. 删除 dash 缩减环境 `sudo dpkg-reconfigure dash` 选择`否/NO`

## windows PowerShell 设置别名

1. 确定运行目录（没有就创建）
`echo $profile`

2. 加入自己的别名函数

```shell
function gpr {
 git pull --rebase
}

function gil  {
 git log
}

function gs {
 git stash
}

function gsp {
 git stash pop
}

function gc {
 git checkout
}

function gs {
 git status
}
```

## windows11 没有本地策略

```powershell
@echo off 
pushd "%~dp0" 

dir /b %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt 
dir /b %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt 

for /f %%i in ('findstr /i . List.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i" 
pause
```

## windows 安装 oh-my-posh

参考教程:

1. 安装 powershell 可应用商店安装
2. 安装 oh-my-posh 可应用商店安装 `winget install JanDeDobbeleer.OhMyPosh`
3. [创建配置文件](https://learn.microsoft.com/zh-cn/windows/terminal/tutorials/custom-prompt-setup#choose-and-apply-a-powershell-prompt-theme)
4. 安装字体 oh-my-posh font install
5. 设置 powershell 权限 (按需设置)

教程链接：

  1. <https://learn.microsoft.com/zh-cn/windows/terminal/tutorials/custom-prompt-setup>
  2. <https://ohmyposh.dev/docs/installation/windows>
