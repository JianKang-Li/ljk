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
