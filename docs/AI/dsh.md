# DeepSeek Harness（dsh）插件常用命令总结

> 核心命令族：`dsh plugin`  
> 最常用环境：`--profile web`  
> 未全局安装 `dsh` 时，可用 `npx @deepseek-ai/dsh` 替代命令开头的 `dsh`。

---

## 一、安装插件

安装统一使用 `add` 子命令，支持多种来源。

### 1. 从 npm 安装（最常用）

```bash
dsh plugin --profile web add <包名>
```

示例：

```bash
dsh plugin --profile web add dsh-ops
```

建议写**无标签包名**，直接解析 npm `latest`，不要固定 `@beta` 或某一具体版本号。

### 2. 安装指定版本

仅在需要回退或 `latest` 有问题时使用：

```bash
dsh plugin --profile web add <包名>@<版本号>
```

### 3. 从 GitHub 源码安装

```bash
dsh plugin --profile web add github:<owner>/<repo>
```

### 4. 从本地目录安装

插件开发调试常用：

```bash
dsh plugin --profile web add /绝对路径/to/plugin
```

### 5. 未全局安装 dsh 时

在上述任何 `dsh` 命令前用 `npx @deepseek-ai/dsh` 替代，例如：

```bash
npx @deepseek-ai/dsh plugin --profile web add <包名>
```

---

## 二、升级插件

升级使用 `update` 子命令，底层会将参数转发给 profile 目录中的 pnpm。

### 1. 升级全部已装插件

```bash
dsh plugin --profile web update
```

### 2. 只升级某一个插件

```bash
dsh plugin --profile web update <包名>
```

> 如果同时运行着其他 profile（如 `headless`），其插件需单独更新，例如：
>
> ```bash
> dsh plugin --profile headless update
> ```

---

## 三、卸载插件

卸载使用 `remove` 子命令：

```bash
dsh plugin --profile web remove <包名>
```

---

## 四、查看已安装插件与帮助

### 1. 列出当前 profile 下已安装的插件

```bash
dsh plugin --profile web list
```

### 2. 查看帮助

记不清子命令或参数时使用：

```bash
dsh plugin --help
dsh plugin add --help
```

### 3. 查看某个插件被谁依赖

排查依赖关系时有用：

```bash
dsh plugin --profile web why <包名>
```

---

## 五、补充要点

- **图形化操作**：如果习惯界面，DSH 的“插件市场”中也提供安装、更新、卸载的可视化入口，效果与命令行一致。
- **重启生效**：安装、卸载或更新插件后，通常需要**重启一次 `dsh web`**（或刷新页面），插件才会真正加载生效。
- **环境区分**：`--profile web` 是最常用的 Web UI 环境；如果使用 TUI 或 headless 模式，将 `web` 替换为对应的 profile 名称即可。