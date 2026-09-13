# llama.cpp

## 克隆项目

`git clone -depth 1 git@github.com:ggml-org/llama.cpp.git`

## 创建生成目录

`mkdir build`

## 生成 cmake 配置项

```shell
cmake -B build
cmake --build build --config Release -j
```

## 生成产物解析

llama-server 服务器模式启动，会启动一个聊天界面
llama-cli 命令行模式启动，没有聊天窗口

## 常用启动参数

```shell
-c 131072 -ctk q8_0 -ctv q8_0 --flash-attn on  -t 12 --jinja
```

+ -c 上下文大小
+ -ctk -ctv 量化 KV Cache
+ -t 核心数量
+ --jinja 用于启用模型内置的对话模板
