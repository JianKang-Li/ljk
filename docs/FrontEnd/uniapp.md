uniapp使用第三方组件
uView Pro 是一个专为 UniApp Vue3 项目打造的多端 UI 组件库，它全面支持 TypeScript，提供了 70 多个精选组件，能帮助你快速开发兼容安卓、iOS、微信小程序、H5 等多端的应用。

下面是一个汇总了主要配置步骤的表格，方便你快速了解：

| 步骤         | 操作内容                                  | 关键点/命令                                                      | 所在文件             |
| :----------- | :---------------------------------------- | :--------------------------------------------------------------- | :----------------- |
| 1. 安装       | 使用 npm、yarn 或 pnpm 安装 uView Pro      | `npm install uview-pro`                                          | 项目根目录           |
| 2. 引入库     | 在 `main.ts` 中引入并使用 uView Pro         | `import uViewPro from 'uview-pro'`<br>`app.use(uViewPro)`          | `main.ts`          |
| 3. 引入基础样式 | 在 `App.vue` 的样式表中引入基础样式文件        | `@import "uview-pro/index.scss";`                                | `App.vue`          |
| 4. 引入主题变量 | 在 `uni.scss` 中引入全局 SCSS 变量文件        | `@import 'uview-pro/theme.scss';`                                | `uni.scss`         |
| 5. 配置按需引入 | 在 `pages.json` 中配置 `easycom` 规则        | `"^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"`                | `pages.json`       |
| 6. 重启项目   | 重新运行项目使配置生效                          | 重启 HBuilderX 或重新编译项目                                      | -                  |
| 7. 使用组件   | 直接在页面模板中使用组件                        | `<u-button>按钮</u-button>`                                       | 任意 `.vue` 页面文件 |

🧭 **详细配置说明**

1. 📦 **安装 uView Pro**
    你可以在项目根目录下通过以下命令之一安装 uView Pro：

    ```bash
    # 使用 npm
    npm install uview-pro


    # 使用 yarn
    yarn add uview-pro


    # 使用 pnpm
    pnpm add uview-pro
    ```

    也可以通过 [DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=24633) 下载。

2. 🔧 **引入 uView Pro 库**
    在你的 `main.ts` 文件中引入并使用 uView Pro：

    ```typescript
    // main.ts
    import { createSSRApp } from 'vue';
    import App from './App.vue';
    // 1. 引入 uView Pro
    import uViewPro from 'uview-pro'; // npm 安装方式
    // import uViewPro from '@/uni_modules/uview-pro'; // uni_modules 安装方式


    export function createApp() {
      const app = createSSRApp(App);
      // 2. 使用 uView Pro
      app.use(uViewPro);
      return {
        app
      };
    }
    ```

3. 🎨 **引入基础样式**
    在 `App.vue` 文件的 `<style>` 标签中引入 uView Pro 的基础样式文件（**注意：需要声明 `lang="scss"`**）：

    ```vue
    <!-- App.vue -->
    <style lang="scss">
    /* npm 安装方式 */
    @import "uview-pro/index.scss";
    /* uni_modules 安装方式 */
    /* @import "@/uni_modules/uview-pro/index.scss"; */
    </style>
    ```

4. 🌈 **引入全局 SCSS 变量文件**
    在项目根目录的 `uni.scss` 文件中引入 uView Pro 的主题变量文件，以便在整个项目中可以使用其定义的变量（如颜色、间距等）：

    ```scss
    /* uni.scss */
    /* npm 安装方式 */
    @import 'uview-pro/theme.scss';
    /* uni_modules 安装方式 */
    /* @import '@/uni_modules/uview-pro/theme.scss'; */
    ```

5. ⚙️ **配置 easycom 组件模式（按需引入）**
    在 `pages.json` 文件中配置 `easycom` 规则，这使得你可以直接在页面中使用组件而无需手动导入。

    ```json
    // pages.json
    {
      "easycom": {
        "custom": {
          // 注意：配置需要放置在 "custom" 对象内才能生效
          // npm 安装方式（如果你的项目根目录没有中文路径）
          "^u-(.*)": "uview-pro/components/u-$1/u-$1.vue"
          // uni_modules 安装方式
          // "^u-(.*)": "@/uni_modules/uview-pro/components/u-$1/u-$1.vue"
        }
      },
      // ... 你原有的 pages 等配置
    }
    ```

    **重要**：修改 `pages.json` 的 `easycom` 规则后，**务必重新运行或重新编译项目**（例如重启 HBuilderX），配置才会生效。

6. 🔄 **重启项目**
    无论是通过 HBuilderX 还是命令行，在完成上述配置后，请确保**重新启动你的开发服务或重新编译项目**，这样所有配置才能正确生效。

7. 🎯 **使用组件**
    完成以上配置后，你就可以直接在任意页面的模板中使用 uView Pro 的组件了，无需在任何地方 `import`：

    ```vue
    <template>
      <view>
        <u-button>这是一个按钮</u-button>
        <u-icon name="home"></u-icon>
        <!-- 其他 uView Pro 组件 -->
      </view>
    </template>
    ```

💡 **提示与注意事项**

* **SCSS 支持**：uView Pro 依赖 SCSS。确保你的项目已安装 `sass` 和 `sass-loader`。在 HBuilderX 中，通常可以通过菜单 `工具 -> 插件安装` 找到 "scss/sass编译" 插件并安装。
* **项目路径**：使用 npm 安装方式时，**项目根目录名称请勿使用中文字符**，否则可能导致 easycom 规则失效。
* **版本查询**：你可以通过 `console.log(uni.$u.config.v)` 或在代码中查看 `/uview-ui/libs/config/config.js` 文件来确认当前使用的 uView Pro 版本。
* **发行与体积**：在开发阶段，代码可能包含所有组件。但当**点击 HBuilderX 的“发行”菜单进行正式发布时，构建工具会自动进行摇树优化（Tree-shaking）**，移除未使用的组件，有效控制最终打包体积。开发时若担心体积，可在 HBuilderX 中勾选“运行时是否压缩代码”选项。
* **学习资源**：遇到复杂组件（如使用 `u-picker` 实现省市区三级联动）或特定用法时，除了查阅官方文档，也可以搜索社区中的实践文章和示例代码。

🧐 **官方文档与支持**

* **uView Pro 官方文档**：<https://uview-pro.netlify.app/>
* **DCloud 插件市场页面**：<https://ext.dcloud.net.cn/plugin?id=24633>
  * 这里可以获取最新的安装包、查看更新日志和官方示例。
* **交流反馈**：遇到问题时，可以尝试加入官方 QQ 交流群进行咨询。

uView Pro 的这套配置流程已经非常成熟，按照步骤操作一般都能成功。如果在特定环节遇到问题，可以重点检查该步骤的细节是否正确。
