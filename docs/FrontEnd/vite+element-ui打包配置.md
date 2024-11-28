配置文件
// vite.config.js
```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})

```
// chrome 插件 manifest.json

```json
{
  "manifest_version": 3,
  "name": "gitlab",
  "version": "0.0.1",
  "description": "gitlab待办",
  "action": {
    "default_icon": "favicon.ico",
    "default_title": "gitlab待办",
    "default_popup": "index.html"
  },
  "icons": {
    "128": "favicon.ico",
    "48": "favicon.ico",
    "16": "favicon.ico"
  },
  "content_scripts": [
    {
      "matches": [
        "*://*/*"
      ],
      "js": [
        "background.js"
      ]
    }
  ],
  "permissions": [
    "storage"
  ]
}
```
