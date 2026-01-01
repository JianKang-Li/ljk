# copyparty

## 配置文件

sudo vim /etc/systemd/system/myscript.service

```shell
[Unit]
Description=My Python Script
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/python3.11 /root/localStorage/copyparty-sfx.py -a "user:xxx" -v .::A,user
WorkingDirectory=/home/username
StandardOutput=inherit
StandardError=inherit
Restart=on-failure
User=username

[Install]
WantedBy=multi-user.target
```

## 开机自启动

```shell
sudo systemctl enable myscript.service
sudo systemctl start myscript.service
```
