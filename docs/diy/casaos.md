# orange pi 安装casaos

## 连接wifi

1. 命令 `nmtui` 图形化连接wifi 即可

2. 设置请求代理

    ```shell
    export http_proxy="http://10.10.1.10:8080/"
    export https_proxy="http://10.10.1.10:8080/"
    ```

3. 安装casaos `curl -fsSL https://get.casaos.io | sudo bash`

4. 卸载casaos `casaos-uninstall`

5. 设置docker 源 修改目录 `/etc/docker/daemon.json`

6. 重启docker服务 `systemctl restart docker`

## 默认设置

casaos 官方app仓库地址`https://casaos.app/store/main.zip`

