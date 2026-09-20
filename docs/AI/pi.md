# Pi-coding-agent 使用和常见设置

## 模型配置
models.json
```json
{
  "providers": {
    "claude": {
      "baseUrl": "http://127.0.0.1:9527",
      "api": "anthropic-messages",
      "apiKey": "claude",
      "models": [
        {
          "id": "deepseek-v4.1-flash",
          "contextWindow": 1000000,
          "reasoning": true
        }
      ]
    }
  }
}
```

## mcp 复用

[私人项目](https://github.com/JianKang-Li/pi-mcp-bridge)
