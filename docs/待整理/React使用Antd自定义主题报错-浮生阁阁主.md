React使用Antd自定义主题报错-浮生阁阁主## 安装包

+ "customize-cra": "^1.0.0",
+ "customize-cra-less-loader": "^2.0.0",
+ "less": "^4.1.3",
+ "less-loader": "^11.1.0",

## 修改config-overrides.js

```js
const { override, fixBabelImports } = require('customize-cra')
const addLessLoader = require("customize-cra-less-loader")

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': 'orange'
        },
      }
    }
  }),
)
```
