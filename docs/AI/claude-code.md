# Claude Code CLI 使用指南

## 目录

- [Claude Code 是什么](#claude-code-是什么)
  - [Claude Code 与 Agent 的关系](#claude-code-与-agent-的关系)
- [安装](#安装)
- [配置文件路径与优先级](#配置文件路径与优先级)
- [Skills：概念、安装与编写](#skills概念安装与编写)
- [Subagents（子 Agent）](#subagents子-agent)
- [自定义 Slash Commands](#自定义-slash-commands)
- [MCP 是什么](#mcp-是什么)
- [运行模式切换](#运行模式切换)
- [常用对话内命令](#常用对话内命令)
- [资源链接](#资源链接)
- [AI 知识补充](#ai-知识补充)
- [好用 skills/MCP 仓库](#好用skills或mcp仓库)
- [浏览器插件分享](#浏览器插件分享)
- [常见模型提供商官方](#常见模型提供商)
- [目前免费的模型提供商](#目前免费的模型提供商)
- [tips](#tips)

---

## Claude Code 是什么

Claude Code 是 Anthropic 官方推出的 **AI 编码命令行工具**，把 Claude 大模型嵌入你的终端，能直接读写项目代码、运行命令、调用 MCP 工具、并发派发子 Agent。它包含：

- **CLI 主程序**（`claude`）：终端交互入口
- **桌面应用**：macOS / Windows
- **Web 版**：claude.ai/code
- **IDE 扩展**：VS Code、JetBrains
- **Agent SDK**：用于把同一套能力嵌入自家应用

### Claude Code 与 Agent 的关系

一句话：**Claude Code 本身就是一个 Agent**，同时它内部还能派发更多 Agent（subagent）。

层级关系：

```md
Claude 模型（大脑，只会思考）
   └─ Agent（大脑 + 工具循环，能动手干活）
        └─ Claude Agent SDK（造 Agent 的工具箱，Python / TS）
             └─ Claude Code（Anthropic 用 SDK 造的官方编码 Agent）
                  └─ Subagent（CC 通过 Task 工具临时派发的子 Agent）
```

核心概念速查：

| 名词 | 一句话 | 类比 |
| --- | --- | --- |
| **Claude 模型** | 会推理的「大脑」，本身不能调工具 | 只会动嘴的顾问 |
| **Agent** | 模型 + 工具调用循环（看 → 想 → 调工具 → 再想…） | 给顾问配上手和电脑 |
| **Agent SDK** | 把 Agent 循环封装成可编程的库 | 造 Agent 的乐高积木 |
| **Claude Code** | 用 SDK 做出来的官方 Agent 旗舰产品，专攻编码 | 拼好的「编码工人」 |
| **Subagent** | CC 通过 `Task` 工具派发的短生命周期子 Agent，独立 200K 上下文，只回摘要 | 工人雇的临时帮手 |

要点：

- **包含关系**：Agent 是上位概念，Claude Code 是其中一种具体实现；Codex CLI / Cline / Cursor Composer 都是同类「Agent 应用」
- **SDK 与 CC 同源**：Anthropic 把 CC 内核抽出来开源成 Agent SDK，再用 SDK 反过来重写了 CC，所以你完全可以用 SDK 造一个 CC 等价物
- **Subagent ≠ 独立程序**：它是主 CC 进程内派发的轻量分身，干完即销毁，详见 [Subagents 章节](#subagents子-agent)

#### 同类 AI 编码 Agent 一览

**CLI 终端类**（和 CC 同形态，最直接的替代品）：

| 工具 | 厂商/作者 | 模型生态 | 开源 | 链接 |
| --- | --- | --- | --- | --- |
| **Claude Code** | Anthropic | Claude 系列（可改 Base URL 接入第三方） | ❌ | <https://github.com/anthropics/claude-code> |
| **Codex CLI** | OpenAI | GPT 系列（GPT-5 / o 系列） | ✅ Apache-2.0 | <https://github.com/openai/codex> |
| **Gemini CLI** | Google | Gemini 系列（免费层额度较大） | ✅ Apache-2.0 | <https://github.com/google-gemini/gemini-cli> |
| **OpenCode** | SST 团队 | 模型无关，可接 Claude/GPT/本地 | ✅ MIT | <https://github.com/sst/opencode> |

**独立 IDE 类**（VSCode fork 或全新 IDE，内置 Agent 模式）：

| 工具 | 厂商 | 定位 | 开源 | 链接 |
| --- | --- | --- | --- | --- |
| **Cursor** | Anysphere | 老牌商业 AI IDE，Composer 模式 | ❌ | <https://cursor.com> |
| **Qoder** | 阿里巴巴 | 主打 Repo Wiki / Quest Mode | ❌ | <https://qoder.com> |
| **Trae** | 字节跳动 | 字节出品的 AI IDE | ❌ | <https://trae.ai> |
| **Zed** | Zed Industries | Rust 自研编辑器，内置 Agent Panel | ✅ 编辑器开源 | <https://zed.dev> |

#### 怎么选

- **想要和 CC 形态完全一致**：Codex CLI（OpenAI 生态）、Gemini CLI（Google 生态）、OpenCode（多模型）
- **追求 IDE 体验、不在乎闭源**：Cursor、Qoder、Trae
- **国内能直连**：Qoder、Trae（国内厂商）、或用 [ccr / cc-switch](#ai-知识补充) 给 CC 配国内中转

---

## 安装

### 系统要求

| 项 | 要求 |
| --- | --- |
| 操作系统 | macOS 12+ / Ubuntu 20.04+ / Debian 10+ / RHEL 8+ / Windows 10/11（原生支持） |

### 原生安装

**macOS / Linux / WSL：**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows（PowerShell）：**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows（winget）：**

```powershell
winget install Anthropic.ClaudeCode
```

配置文件存放位置：

- macOS / Linux：`~/.claude/`（含 `settings.json`、`CLAUDE.md`、`commands/`、`agents/`、`skills/`、`plugins/` 等）
- Windows：`%USERPROFILE%\.claude\`（即 `C:\Users\<你>\.claude\`）
- 项目级配置：`<project>/.claude/`（团队共享，可入 git）

> 注意：`~/.claude/` 是**配置目录**，不是二进制目录；CLI 二进制由安装器单独放在 PATH 上（如 `~/.local/bin/claude` 或 winget 包目录）。

**升级直接执行 `claude update`**

### 首次启动

```bash
cd path/to/your/project
claude
```

第一次启动会进入登录引导（Claude Pro/Max 订阅 OAuth）。如果你想**跳过登录、直接用 API Key 运行**，先按下文"配置 API Key / 模型 / Base URL"配置好 `ANTHROPIC_API_KEY` 再启动 `claude`，CLI 检测到环境变量/`settings.json` 中已有有效 Key 时会自动绕过登录界面。

> 若想强制重置登录流程，删除 `~/.claude/.credentials.json`（macOS Keychain / Windows 凭据管理器中对应条目）后重启 `claude`。

### 配置 API Key / 模型 / Base URL

如需使用自有 API Key、切换模型，或接入第三方兼容网关（如自部署代理、Azure、国内中转），可通过以下三种方式之一配置：

#### 方式 A：环境变量（最快）

**macOS / Linux**（写入 `~/.bashrc` 或 `~/.zshrc`）：

```bash
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxx"
export ANTHROPIC_MODEL="claude-sonnet-4-6"
export ANTHROPIC_BASE_URL="https://api.anthropic.com"   # 第三方网关替换为对应 URL
```

**Windows（PowerShell，持久化到用户环境变量）**：

```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY",  "sk-ant-xxxxxxxxxxxx", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_MODEL",    "claude-sonnet-4-6",   "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.anthropic.com", "User")
```

设置后重启终端生效。

#### 方式 B：写入 `settings.json`（推荐，可入版本管理）

编辑 `~/.claude/settings.json`（用户全局）或 `<project>/.claude/settings.json`（项目级），最小配置只需 3 个字段：

```json
{
  "model": "claude-sonnet-4-6",
  "env": {
    "ANTHROPIC_API_KEY": "sk-ant-xxxxxxxxxxxx",
    "ANTHROPIC_BASE_URL": "https://api.anthropic.com"
  }
}
```

> ⚠️ 含密钥的文件请放进 `settings.local.json` 并加入 `.gitignore`，避免泄漏。完整 `settings.json` 字段详见 [配置文件路径与优先级](#配置文件路径与优先级) 章节。

#### 方式 C：会话内 `/config` 或 `/login`

- `/login`：使用 Claude Pro/Max 订阅账号 OAuth 登录（无需 API Key）
- `/config`：图形化切换模型、主题等

#### 常见 Base URL 配置示例

Claude Code 原生只识别 **Anthropic Messages API** 协议。市面上的中转方案大致分两类：

##### 1. OpenAI 兼容接口 → 需要协议转换代理

如果你手上的 Key 走的是 OpenAI 协议（`/v1/chat/completions`，如 OpenAI、DeepSeek、Qwen、Kimi、智谱、OpenRouter 等），**不能**直接把它们的 URL 填到 `ANTHROPIC_BASE_URL`，需要在中间架一层把 OpenAI 协议翻译成 Anthropic 协议的代理：

| 代理项目 | 仓库 / 说明 |
| --- | --- |
| `claude-code-proxy` | <https://github.com/1rgs/claude-code-proxy> |
| `y-router` | <https://github.com/luohy15/y-router>（OpenRouter 转 Anthropic） |
| `LiteLLM` Proxy | <https://docs.litellm.ai/docs/anthropic_completion>（支持 100+ 模型） |

启动代理后：

```bash
export ANTHROPIC_BASE_URL="http://localhost:8082"   # 代理监听地址
export ANTHROPIC_API_KEY="sk-你后端模型平台的key"
export ANTHROPIC_MODEL="deepseek-chat"
claude
```

##### 2. 厂商直接提供 Anthropic 协议端点 → 直接填 URL

部分厂商/网关原生支持 Anthropic Messages API 协议，可直接当 `ANTHROPIC_BASE_URL` 使用，无需代理：

| 场景 | 配置 |
| --- | --- |
| Anthropic 官方 | `ANTHROPIC_BASE_URL=https://api.anthropic.com` |
| 国内中转（如 `aicodemirror`、`packycode`、`gaccode` 等） | 厂商会给出形如 `https://api.xxx.com/anthropic` 的 URL，直接填入 |

> 选择前先看厂商文档：**支持「Claude Code 直连」或「Anthropic Messages API 兼容」的可直接配 URL**；只写「OpenAI 兼容」的必须走代理。

#### 验证配置生效

```bash
claude --debug         # 启动时打印实际生效的 API 地址与模型
# 或会话内：
/status                # 查看当前账号、模型、配额
```

---

## 配置文件路径与优先级

### settings.json 层级

| 层级 | macOS / Linux 路径 | Windows 路径 | 进 git？ |
| --- | --- | --- | --- |
| 用户全局 | `~/.claude/settings.json` | `%USERPROFILE%\.claude\settings.json` | 否 |
| 项目共享 | `<project>/.claude/settings.json` | 同左 | **是** |
| 项目本地 | `<project>/.claude/settings.local.json` | 同左 | **否**（应 .gitignore） |
| 企业管控 | `/Library/Application Support/ClaudeCode/managed-settings.json`（macOS）<br>`/etc/claude-code/managed-settings.json`（Linux）<br>`C:\ProgramData\ClaudeCode\managed-settings.json`（Windows） | — | — |

**优先级（高 → 低）**：

1. 企业 managed-settings（最高，无法被覆盖）
2. 命令行参数
3. 项目 `.claude/settings.local.json`
4. 项目 `.claude/settings.json`
5. 用户 `~/.claude/settings.json`

### settings.json 字段示例

```json
{
  "model": "claude-sonnet-4-6",
  "env": {
    "ANTHROPIC_API_KEY": "sk-ant-...",
    "ANTHROPIC_BASE_URL": "https://api.anthropic.com"
  },
  "permissions": {
    "allow": ["Bash(npm run test:*)", "Read", "Edit", "Bash(git diff:*)"],
    "deny":  ["Bash(rm -rf:*)", "Read(./.env)"],
    "ask":   ["Bash(git push:*)"]
  },
  "hooks": {
    "PreToolUse":  [{ "matcher": "Bash", "hooks": [{ "type": "command", "command": "echo running" }] }],
    "PostToolUse": [],
    "Stop": [],
    "UserPromptSubmit": []
  },
  "statusLine": {
    "type": "command",
    "command": "node ~/.claude/statusline.js",
    "refreshInterval": 5
  },
  "enabledPlugins": { "superpowers@claude-plugins-official": true },
  "extraKnownMarketplaces": {
    "claude-plugins-official": {
      "source": { "source": "github", "repo": "anthropics/claude-plugins-official" }
    }
  }
}
```

### CLAUDE.md（记忆 / 上下文文件）

| 位置 | 加载时机 | 适合放什么 |
| --- | --- | --- |
| `~/.claude/CLAUDE.md` | 全局所有会话 | 个人偏好（称呼、语言、通用风格） |
| `<project>/CLAUDE.md` | 进入项目时 | 架构、构建命令、约定、禁忌 |
| `<project>/<subdir>/CLAUDE.md` | cwd 进入子目录时追加 | 子模块独有说明 |
| `<project>/CLAUDE.local.md` | 进入项目时（不入 git） | 你的私人备注 |

- 加载顺序：**全局 → 项目 → 子目录 → 本地**，后者补充/覆盖前者。
- 可在 CLAUDE.md 中用 `@path/to/file.md` 导入其他文件（最多 5 层递归）。
- 会话内命令：`/memory` 查看、`/init` 自动生成项目 CLAUDE.md。

---

## Skills：概念、安装与编写

### Skill 是什么

**Skill（技能）** 是一段已命名的、可被 Claude **按需自动加载**的扩展指令包。

- 启动时只把所有 Skill 的 `name + description`（metadata）加载进上下文（很小）。
- 当你的对话内容匹配某个 Skill description 中的「Use when …」触发条件时，Claude 才把对应 `SKILL.md` 全文载入。
- 既扩展了能力，又避免一次性把所有 prompt 都塞进上下文。

### Skill vs Slash Command vs Subagent

> 三者是 Claude Code 扩展能力的三个维度

| 维度 | Skill | Slash Command | Subagent |
| --- | --- | --- | --- |
| **触发方式** | Claude 根据 description **自动判断**调用（也可显式） | 用户输入 `/cmd` **手动**触发 | 主 Claude 通过 `Task` 工具**主动派发** |
| **上下文消耗** | 仅 metadata 常驻；命中后才载入正文 | 每次执行时**整体注入**主会话 | 独立 200K 窗口，结果摘要回主会话 |
| **返回值** | 加载到主会话继续推进 | 加载到主会话继续推进 | 摘要文本 / 结构化 JSON |
| **是否带参数** | ❌ | ✅ `$ARGUMENTS` / 位置参数 | ✅ 派发时通过 `prompt` 传入 |
| **工具限制** | `allowed-tools` 软限定 | `allowed-tools` 软限定 | `tools` 字段 **runtime 硬约束** |
| **模型** | 可指定 `model` | 可指定 `model` | 可指定 `model`（独立于主会话） |
| **文件位置** | `<dir>/skills/<name>/SKILL.md` | `.claude/commands/<name>.md` | `.claude/agents/<name>.md` |
| **适合场景** | 可复用的「做某类事的标准流程」 | 高频快捷指令、需手动控制时机 | 长任务 / 隔离上下文 / 并发探索 |

### 内置 / 官方 Skills 一览（节选）

来自官方市场 `claude-plugins-official` 的常见 plugin：

- **superpowers**：`brainstorming`、`writing-plans`、`executing-plans`、`test-driven-development`、`systematic-debugging`、`verification-before-completion`、`requesting-code-review`、`using-git-worktrees`、`writing-skills` 等
- **skill-creator**：`skill-creator`
- **frontend-design**

### 安装 Skill

#### 方式 A：通过 plugin marketplace（推荐）

```bash
# 添加官方市场
/plugin marketplace add anthropics/claude-plugins-official

# 安装一个 plugin（带的所有 skill 一并启用）
/plugin install superpowers@claude-plugins-official
```

或在 `~/.claude/settings.json` 手写：

```json
{
  "extraKnownMarketplaces": {
    "claude-plugins-official": {
      "source": { "source": "github", "repo": "anthropics/claude-plugins-official" }
    }
  },
  "enabledPlugins": {
    "superpowers@claude-plugins-official": true
  }
}
```

#### 方式 B：本地直接放文件

| 位置 | 作用域 |
| --- | --- |
| `~/.claude/skills/<skill-name>/SKILL.md` | 个人全局 |
| `<project>/.claude/skills/<skill-name>/SKILL.md` | 项目内（可入 git 与团队共享） |

### 调用 Skill

- **自动**：正常对话，Claude 看 prompt 是否匹配 Skill description 中的「Use when …」。
- **显式**：直接说"调用 xxx skill"，或某些 plugin 暴露 `/<plugin>:<skill>` 的 slash 形式。
- **查看已加载**：`/skills` 或 `/plugin`。

### 自己编写 Skill

#### 最小目录结构

```
.claude/skills/my-skill/
├── SKILL.md             # 必需：frontmatter + 正文
├── reference.md         # 可选：详细参考文档
├── scripts/             # 可选：可执行脚本
│   └── helper.sh
└── templates/           # 可选：模板文件
    └── boilerplate.md
```

#### frontmatter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` | ✅ | 短横线命名，唯一标识 |
| `description` | ✅ | **必须包含触发条件**，形如 `<能力概述>. Use when <场景1>, <场景2>, ...` |
| `allowed-tools` | ❌ | 限制可用工具，如 `Read, Grep, Bash(git diff:*)` |
| `model` | ❌ | 指定使用模型 |

#### description 编写要点

1. 首句一句话讲清做什么（**动词开头**）。
2. 用 `Use when …` 列出 2–3 个典型触发场景，越具体越好。
3. 覆盖用户可能说的关键词（中英文都覆盖）。
4. 控制在 ~250 字符以内，过长会被截断。

#### 完整 SKILL.md 模板

```markdown
---
name: commit-message-writer
description: Generate a high-quality Conventional Commits message from the current staged diff. Use when the user asks to write a commit message, 生成 commit, "帮我提交", or runs `/commit` after staging changes. Do NOT use for full PR descriptions.
allowed-tools: Bash(git diff:*), Bash(git status), Bash(git log:*), Read
---

# Commit Message Writer

## When to use this skill
- User explicitly asks for a commit message
- User has staged changes (`git diff --cached` non-empty) and asks "commit"
- Do NOT use when no changes are staged — ask user to stage first

## Steps
1. Run `git diff --cached --stat` to overview.
2. Run `git diff --cached` and read the actual hunks.
3. Classify the change type: feat / fix / refactor / docs / test / chore / perf / build / ci / style.
4. Write a message in Conventional Commits format:
   - Subject: `<type>(<scope>): <subject>` (<= 72 chars, imperative mood)
   - Blank line
   - Body: bullet points of WHY, not WHAT
   - Footer (optional): `BREAKING CHANGE:`, `Refs #123`
5. Show the message to the user for confirmation; do not auto-commit.

## Rules
- Never invent issue numbers.
- Keep subject under 72 characters.
- Use the project's primary language (detect from existing log).

## References
- Conventional Commits spec: @reference.md
```

> 调试技巧：若 Claude 不主动调用，多半是 description 没有写清楚 "Use when"。可调用 `superpowers:writing-skills` 走一遍官方写作流程。

---

## Subagents（子 Agent）

### Subagent 是什么

**Subagent（子 Agent）** 是主 Claude 通过 `Task` / `Agent` 工具派发出去的**独立 Claude 实例**，拥有自己的 200K 上下文窗口，执行完任务后只把**结果摘要**返回主会话。

**核心价值**：

- **隔离上下文**：子 Agent 读 50 个文件不会污染主会话窗口
- **并发探索**：一次派多个子 Agent 并行干活（搜索/审查/重构）
- **专项能力**：每个 Subagent 可以绑定专属 system prompt、工具集、模型

### Subagent vs Skill vs Slash Command

详见 [Skills 章节中的统一对比表](#skill-vs-slash-command-vs-subagent)。简言之：

- **Skill** 是「方法论」，注入主会话由 Claude 亲自执行
- **Slash Command** 是「快捷指令」，用户手动触发 prompt 模板
- **Subagent** 是「分身」，派出去独立干活，只回结论

### 为什么需要自定义 Subagent

内置 subagent 只有 5 个通用型（`general-purpose` / `Explore` / `Plan` / `claude` / `statusline-setup`），它们的 system prompt、工具集、模型都是**固定**的。当你有重复出现、**领域特定**的任务时，通用型就不够用了。自定义 subagent 解决四件事：

1. **固化"角色 + 流程"，避免每次重新教**
   团队规定"代码审查必须先 `git diff --stat`、按 🔴🟡🟢 三级输出、只指出问题不改代码"——固化成 `code-reviewer.md` 后，主 Claude 看到"审查 diff"就自动派发，无需用户重复说明规则。
2. **工具白名单 —— 安全 + 性能双收益**
   `tools: Read, Grep, Bash(git diff:*)` 这种 frontmatter 是 **runtime 硬约束**，审查 agent 物理上无法 Edit/Write 或 `rm`；工具列表短，function-calling 决策也更快、更少误用。内置 `general-purpose` 给的是全集，做审查相当于"开飞机送外卖"。
3. **模型分级 —— 省钱**
   `model: haiku` 给文档/翻译/commit-msg；`sonnet` 给默认编码/审查；`opus` 给架构规划。主会话不变，子 agent 自动落到便宜模型上，同一会话能省一半 token 费。内置 subagent 继承主会话模型，做不到分级。
4. **让主 Claude 自动调度**
   只要 `description` 写好 `Use when …`，主 Claude 看到匹配场景**自己**派发——这是和 slash command（必须 `/cmd`）、和 skill（注入主会话流程）最大的差异。

### 目录结构

```
.claude/agents/
├── code-reviewer.md          # 项目级 subagent（可入 git）
├── bug-hunter.md
└── doc-writer.md

~/.claude/agents/
└── personal-assistant.md     # 用户全局 subagent
```

> **加载顺序**：项目 `.claude/agents/` 优先；同名时项目级覆盖用户级。

### 文件结构（frontmatter + 正文）

```markdown
---
name: code-reviewer
description: 审查 git diff。Use when 用户说"审查代码"、"review my changes"。
tools: Read, Grep, Bash(git diff:*)
model: sonnet
---

你是资深前端架构师，审查 git diff：
1. `git diff --stat` 看范围 → `git diff` 读 hunks
2. 按 🔴 必须修 / 🟡 建议改 / 🟢 提示 三级输出
3. 引用 `file:line`；只指出问题，不改代码
```

### frontmatter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` | ✅ | 短横线命名，主 Claude 用此名调度 |
| `description` | ✅ | 描述何时派发；与 Skill 类似要带 `Use when …` |
| `tools` | ❌ | 允许使用的工具列表（逗号分隔），不填则继承主会话全部工具 |
| `model` | ❌ | `haiku` / `sonnet` / `opus`，按任务难度选；不填用主会话模型 |
| `color` | ❌ | UI 显示颜色（`red` / `blue` / `green` …） |

### 派发方式

#### 1. 主 Claude 自动派发（推荐）

写好 `description` 后，主 Claude 看到匹配场景会自动调用 `Task` 工具派发。例如你说"帮我审查刚才的改动"，主 Claude 会自动派发 `code-reviewer`。

#### 2. 显式触发

```
请用 code-reviewer subagent 审查当前 diff
```

#### 3. 并发派多个（关键能力）

主 Claude 在**一条消息里**同时发出多个 `Task` 调用，subagent 会并发执行。底层伪代码：

```json
[
  { "tool": "Task", "subagent_type": "Explore",       "prompt": "搜 src/ 下 useState 用法..." },
  { "tool": "Task", "subagent_type": "Explore",       "prompt": "搜 tests/ 下相关 fixture..." },
  { "tool": "Task", "subagent_type": "code-reviewer", "prompt": "审查当前 git diff..." }
]
```

三个 Task 并发执行，各自独立 200K 上下文，完成后摘要回主会话。

引导主 Claude 并发的话术：

- "**同时**派 3 个 Explore agent，分别搜 A / B / C"
- "**并发**审查 frontend、backend、tests 三块改动"
- 直接调用 skill：`使用 superpowers:dispatching-parallel-agents skill`

反例（以下都**不会**并发）：

```
❌ 多条消息分发
  消息1: "派 Explore 搜 A"
  消息2: "派 Explore 搜 B"      ← 串行，等上一条返回

❌ 一个 Task 内列多任务
  Task(subagent_type=Explore, prompt="同时搜 A、B、C")   ← 单 agent 顺序做

❌ /cmd 触发并发
  /search-all                  ← Slash 是 prompt 注入，不拆 Task
```

✅ 正确：一条消息里发 N 个 `Task` 工具调用。

实测一条消息可塞 10+ 个 Task，但建议 ≤ 5，避免摘要回写时 token 暴涨；想真正大规模并发用 `Workflow` 工具或 SDK 的 `parallel()` / `pipeline()`。

### 实战场景

| 场景 | Subagent |
| --- | --- |
| 大型代码搜索 | `Explore` 派 N 个，各搜不同关键词 |
| 代码审查 | `code-reviewer`，`tools: Read, Grep, Bash(git diff:*)` |
| 写测试 | `test-writer`，`tools: ..., Bash(npm test:*)` |
| 重构计划 | `Plan` 出步骤 → 分发给执行 agent |
| 文档/PR 描述 | `doc-writer` / `pr-describer`，限定工具范围 |

### 调试 Subagent

- **查看可用 agent**：会话内输入 `/agents`，或看 `.claude/agents/` 目录
- **看派发参数**：`claude --debug` 启动可打印 Task 工具调用日志
- **不被自动调用**：检查 `description` 是否包含明确的 `Use when` 触发词
- **执行失败**：subagent 报错会以摘要返回主会话；让主 Claude 重派或手动检查 prompt

### 自定义 Subagent vs 在 Skill 里写"请派 subagent"

很多人容易把"自定义一个 subagent"和"在 skill 正文里写'请派一个 subagent 来 XYZ'"等同起来，但两者运行机制完全不同：

| 维度 | 自定义 Subagent | 在 Skill 里写"请派 subagent" |
| --- | --- | --- |
| **本体** | 一个独立 Claude 实例（自己的 system prompt + 200K 窗口） | 一段注入主会话的文字指令 |
| **system prompt** | agent 文件正文整体作为 system prompt | 没有独立 system prompt，仍是主会话的 |
| **工具集** | 由 `tools` 字段决定，**是硬约束** | 仍是主会话工具集，skill 的 `allowed-tools` 只能"减"不能"换" |
| **模型** | 由 `model` 字段决定 | 仍是主会话模型 |
| **约束强度** | runtime 强制 | 软约束（prompt 里说说，模型可能违反） |
| **主窗口开销** | 几乎零（描述只 metadata 常驻） | skill 正文 + 派发指令都占主窗口 token |
| **派发动作** | `Task(subagent_type: code-reviewer)` | `Task(subagent_type: general-purpose, prompt: 临时拼出来的角色描述...)` |
| **可观测/复用** | `/agents` 能列、git 可追踪、跨项目共享 | 散落在 skill 文本里 |
| **并发** | 主 Claude 一条消息多 Task 调用，各指定不同 agent type | 主窗口里要写 N 段 prompt，token 暴涨 |

**用同一个审查场景对比：**

**方案 A（skill 里写"派 subagent"）**：

```markdown
---
name: review
description: Use when 用户说审查代码
---
请派一个 general-purpose subagent，读 git diff、按 🔴🟡🟢 输出、只用 Read/Grep。
```

派出的仍是 `general-purpose`，工具集是**全集**——"只用 Read/Grep"是软约束，可被违反。

**方案 B（自定义 subagent）**：

```markdown
---
name: code-reviewer
description: 审查 git diff。Use when 用户说审查代码
tools: Read, Grep, Bash(git diff:*)
model: haiku
---
按 🔴🟡🟢 三级输出，不改代码。
```

主 Claude 直接 `Task(subagent_type=code-reviewer)`，**不污染主窗口**，工具集 runtime 硬约束，自动落 haiku。

### 反例

❌ 在 skill 正文里写"派 subagent"：

```markdown
---
name: review
---
请派一个 general-purpose subagent，告诉它工具只用 Read/Grep，按 🔴🟡🟢 输出。
```

派出的仍是 `general-purpose`（工具全集），"只用 Read/Grep" 是软约束可违反；skill 正文还白白吃主窗口 token。

✅ 改成自定义 `code-reviewer.md`——`tools: Read, Grep` 是 runtime 硬约束，主窗口零开销。

> skill 里**唯一**正当的 subagent 用法：教主 Claude "**何时**派发哪个已存在的 subagent"（如 `superpowers:dispatching-parallel-agents`），而不是在 skill 里临时定义一个。

### 怎么选

| 需求 | 选什么 |
| --- | --- |
| 教 Claude 一套做事的方法/流程，需要主会话**亲自执行** | **Skill** |
| 派出去**隔离干活**，只要结论；任务有固定角色、需要工具白名单、需要独立模型 | **自定义 Subagent** |
| 跨多个独立子任务**并发**（搜索 + 审查 + 计划） | **多个自定义 Subagent**，主 Claude 一条消息里多 Task 调用 |
| 用户**手动**触发的高频快捷动作 | **Slash Command** |
| 复杂到要"先用 skill 教方法 + 再派 subagent 隔离执行" | **组合用**——subagent 在自己窗口里照样能加载 skills |

## 自定义 Slash Commands

### 它是什么

**Slash Command（斜杠命令）** 是一段写在 markdown 文件里的**用户级快捷指令**。在输入框敲 `/` 就能看到所有可用命令，回车后文件内容会被注入到对话里作为 prompt。

**和 Skill 的关键区别**：Slash Command 是**用户手动**触发的 prompt 模板，每次执行整体注入主会话；Skill 是 Claude 根据 description **自动判断**加载的方法论。完整对比详见 [Skills 章节中的统一对比表](#skill-vs-slash-command-vs-subagent)。

### 目录结构

```
.claude/commands/
├── commit.md              # 项目级命令（可入 git）
├── review.md
└── fix-bug.md

~/.claude/commands/
└── daily-report.md        # 用户全局命令
```

- 文件名即命令名：`commit.md` → `/commit`
- 子目录支持命名空间：`.claude/commands/git/sync.md` → `/git:sync`
- 项目命令优先于用户命令；同名时项目级覆盖

### 文件结构（frontmatter + 正文）

```markdown
---
description: 根据当前暂存的 diff 生成 Conventional Commits 风格的提交信息
argument-hint: [可选的额外说明]
allowed-tools: Bash(git diff:*), Bash(git status), Bash(git log:*), Read
model: sonnet
---

# 任务

你是 commit message 专家。请根据下面的 diff 写一条高质量提交信息。

## 当前改动概览

!`git diff --cached --stat`

## 完整 diff

!`git diff --cached`

## 最近 5 条提交（参考风格）

!`git log --oneline -5`

## 额外说明

$ARGUMENTS

## 要求

- 格式：`<type>(<scope>): <subject>`
- subject ≤ 72 字符，祈使句
- 用项目原有语言（中/英）
- 输出到代码块里方便复制
```

### frontmatter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `description` | ❌（强推荐） | `/` 菜单里显示的一行说明 |
| `argument-hint` | ❌ | 参数提示，显示在命令名后面，引导用户输入 |
| `allowed-tools` | ❌ | 限制本次命令可用的工具 |
| `model` | ❌ | 指定模型（`haiku` / `sonnet` / `opus`） |
| `disable-model-invocation` | ❌ | `true` 则禁止 Claude 程序化调用，仅限用户手动触发 |

### 正文里的三种魔法字符

| 语法 | 作用 | 示例 |
| --- | --- | --- |
| `$ARGUMENTS` | 用户调用命令时跟的所有参数（字符串） | `/commit 紧急修复` → `$ARGUMENTS = "紧急修复"` |
| `$1` `$2` … | 位置参数（按空格切分） | `/deploy prod v1.2` → `$1=prod $2=v1.2` |
| `` !`<shell>` `` | 在命令注入前**先执行 shell**，把输出嵌入 prompt | `` !`git diff` `` → 替换为 diff 实际输出 |
| `@path/to/file` | 引用文件内容（Claude 自动读取） | `@package.json` |

> ⚠️ `` !`...` `` 只在 frontmatter 写了 `allowed-tools: Bash(<对应命令>:*)` 时才会执行；否则会变成普通文本。

### 调用方式

```bash
# 无参数
/commit

# 带参数（$ARGUMENTS 接收）
/commit 紧急 hotfix 修复登录 bug

# 位置参数
/deploy prod v1.2.0

# 命名空间命令
/git:sync
```

### 实战示例

**`/review-pr`** — 审查 PR：

```markdown
---
description: 审查当前分支改动
allowed-tools: Bash(git:*), Read, Grep
---
!`git diff main...HEAD`
按 🔴 必须修 / 🟡 建议改 / 🟢 提示 输出。
```

**`/sync-translations <模块>`** — 同步翻译：

```markdown
---
description: 同步缺失的英文翻译
argument-hint: <模块名>
allowed-tools: Read, Edit
---
对比 `src/locales/zh-CN/$1.json` 和 `en-US/$1.json`，翻译缺失的 key 并写回。
```

**`/daily-report`** — 日报：

```markdown
---
description: 根据 git log 生成今日日报
allowed-tools: Bash(git log:*)
---
!`git log --since="today 00:00" --author="ljk" --oneline`
按「完成 / 进行中 / 明日计划」输出。
```

### 调试技巧

- **命令不显示**：检查文件后缀是否 `.md`，frontmatter `---` 是否成对
- **`!` 不执行**：检查 `allowed-tools` 是否覆盖对应 Bash 子命令
- **参数为空**：用 `$ARGUMENTS` 而不是 `{ARGUMENTS}`，注意大小写
- **看注入后的实际 prompt**：`claude --debug` 启动可看完整 prompt

### 内置 Slash Command vs 自定义

| 内置（不可改） | 自定义（你写的） |
| --- | --- |
| `/help` `/clear` `/compact` `/status` `/init` `/memory` `/config` `/login` `/mcp` `/skills` `/plugin` 等 | `.claude/commands/*.md` 和 `~/.claude/commands/*.md` |

> 别用 `commit`、`review` 这类名字覆盖系统命令；如果重名，自定义命令不会生效。

---

## MCP 是什么

- **MCP（Model Context Protocol）**：由 **Anthropic** 于 **2024 年 11 月**开源的协议，现已被 OpenAI、Google 等广泛采纳。
- 目标：给 LLM 一套**标准化的"插上即用"接口**，让任意客户端（Claude Code、Claude Desktop、Cursor、自研 Agent…）通过同一协议调用任意服务端（数据库、文件系统、Jira、GitHub、Chrome…）。
- 类比：**MCP 之于 AI 工具，相当于 LSP 之于编辑器** —— 一次实现，处处可用。

### 架构

```
+--------------------+         +-------------+
|  Host  (e.g.       |  spawn  |  MCP Server |
|  Claude Code CLI)  |  <--->  |  (per tool) |
|  contains 1..N     |  JSON-  |             |
|  MCP Clients       |  RPC    +-------------+
+--------------------+
```

- **Host**：用户交互的应用（如 Claude Code）。
- **Client**：Host 内的连接器，每个 Server 对应一个。
- **Server**：实际提供能力的进程或远程服务，暴露三类对象：
  - **Tools**（动作，模型可调用，类似 function calling）
  - **Resources**（数据，URI 形式，可被 `@` 引用）
  - **Prompts**（预定义对话模板，类似 slash command）

### 三种 Transport

| Transport | 何时用 | 关键字段 |
| --- | --- | --- |
| **stdio** | 本地进程，最常见 | `command + args + env` |
| **SSE** | 远程，Server-Sent Events | `url`（http/https） |
| **HTTP** | 远程，Streamable HTTP（2025 新增） | `url`（更现代，推荐用于云服务） |

### `claude mcp` 命令

```bash
# 列出所有已配置 server
claude mcp list

# 增加 stdio server（最常见）
claude mcp add <name> -- <command> [args...]
# 例：本地文件系统
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/work

# 增加 SSE server
claude mcp add --transport sse linear https://mcp.linear.app/sse

# 增加 HTTP server
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# 指定作用域
claude mcp add --scope user    <name> -- <cmd>   # 用户全局
claude mcp add --scope project <name> -- <cmd>   # 项目级，写入 .mcp.json（团队共享）
claude mcp add --scope local   <name> -- <cmd>   # 本机本项目（默认）

# 删除 / 查看 / 调试
claude mcp remove <name>
claude mcp get <name>
claude --debug             # 启动时打印 MCP 连接日志
```

### 作用域 (scope)

| Scope | 写入位置 | 入 git | 共享范围 |
| --- | --- | --- | --- |
| `local`（默认） | `~/.claude.json`（按项目路径键存） | ❌ | 当前机器 + 当前项目 |
| `project` | `<project>/.mcp.json` | ✅ | 团队共享 |
| `user` | `~/.claude.json` 顶层 / `~/.claude/settings.json` | ❌ | 你的所有项目 |

### `.mcp.json` 文件示例（项目级共享）

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}" }
    },
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    },
    "linear": {
      "type": "sse",
      "url": "https://mcp.linear.app/sse"
    },
    "sentry": {
      "type": "http",
      "url": "https://mcp.sentry.dev/mcp",
      "headers": { "Authorization": "Bearer ${SENTRY_TOKEN}" }
    }
  }
}
```

### 常用 MCP Server

| 名称 | 包 / URL | 作用 |
| --- | --- | --- |
| chrome-devtools | `chrome-devtools-mcp` | Chrome DevTools 协议（性能、网络、DOM、截图） |

完整目录：<https://github.com/modelcontextprotocol/servers> · 第三方索引：<https://mcp.so>

### 在对话中使用 MCP

1. **工具调用**：自动。MCP 工具名形如 `mcp__<server>__<tool>`，可在 `permissions.allow` 中按 ID 授权：

   ```json
   {
     "permissions": {
       "allow": [
         "mcp__github__search_issues",
         "mcp__chrome-devtools__*"
       ]
     }
   }
   ```

2. **资源引用**：在输入框打 `@` 唤起选择器，挑选 MCP 暴露的资源（文件、issue、page…）作为上下文。URI 形如 `@github:issue://owner/repo/123`。

3. **Prompt（MCP slash command）**：MCP server 暴露的 prompt 在 `/` 菜单里显示为 `/mcp__<server>__<prompt-name>`。

4. **调试**：

   ```bash
   claude mcp list       # 列出可用 server
   claude --debug        # 启动时看握手日志
   ```

   会话内：`/mcp` 查看 server 实时状态。

---

## 运行模式切换

Claude Code 内置了 4 种**权限模式（permission mode）**，决定 Claude 调用工具（特别是 Edit / Write / Bash）前是否要询问你。模式只影响"动手前要不要问一句"，不影响 Claude 的思考与读取能力。

### 模式总览

| 模式 | 写文件 | 跑 Bash | 状态栏文字（左下角） | 适用场景 |
| --- | --- | --- | --- | --- |
| **default** | 询问 | 询问 | *（空，无提示）* | 默认；安全保底 |
| **plan** | ❌ 禁止 | ❌ 禁止 | `⏸ plan mode on (shift+tab to cycle)` | 只读规划，先看 Claude 怎么打算再批准 |
| **auto** | 询问（智能放行低风险） | 询问（智能放行低风险） | `⚡ auto mode on (shift+tab to cycle)` | 较新模式，CLI 自行判断低风险动作放行、高风险仍问 |
| **acceptEdits** | ✅ 自动 | 询问 | `⏵⏵ accept edits on (shift+tab to cycle)` | 信任的编辑改动，跑命令仍要确认 |
| **bypassPermissions** | ✅ 自动 | ✅ 自动 | `⏵⏵ bypass permissions on (shift+tab to cycle)` | 沙箱里全自动；本机慎用 |

> 状态栏在终端**左下角输入框上方**显示，颜色也会变：plan 是黄色 `⏸`，auto 是蓝色 `⚡`，acceptEdits 是绿色 `⏵⏵`，bypassPermissions 是红色 `⏵⏵`，default 不显示任何前缀。看一眼颜色/图标就能知道当前模式，避免误操作。
>
> `/agents` `/clear` 这类 slash 不归权限模式管。

### 切换方式

#### 1. 会话内热键（最常用）

| 按键 | 作用 |
| --- | --- |
| **Shift + Tab** | 在 `default → acceptEdits → plan → auto` 间循环；底部状态栏显示当前模式 |
| **Esc**（plan 模式下回答时）| 退出 plan，进入执行流程 |

> ⚠️ **Shift+Tab 不会循环到 `bypassPermissions`**——CLI 故意把它排除在快捷键之外，避免误按导致 Bash 全自动放权。要用 bypass 必须显式：启动 flag、`settings.json` 默认值、或 `/permissions` 命令切换。

#### 2. 启动参数

```bash
claude --permission-mode plan                  # 进入 plan 模式
claude --permission-mode auto                  # 智能自动模式
claude --permission-mode acceptEdits           # 自动接受所有编辑
claude --permission-mode bypassPermissions     # 全自动（仅沙箱）
claude --dangerously-skip-permissions          # 等价直接以 bypassPermissions 启动
claude --allow-dangerously-skip-permissions    # 默认仍是 default，但允许会话内切到 bypass
```

> `--dangerously-skip-permissions` 与 `--allow-dangerously-skip-permissions` 区别：前者**启动即开 bypass**，后者只是**解锁开关**，会话内仍需手动切换才会真正放权。后者更适合 IDE 集成场景。
>
> 全部可选值（`claude --help` 输出）：`default` / `plan` / `auto` / `acceptEdits` / `bypassPermissions`。

#### 3. settings.json 默认值

```json
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
```

写在项目 `.claude/settings.json` 里可让团队默认共享同一模式。

### 什么时候用什么模式

| 情景 | 推荐模式 | 原因 |
| --- | --- | --- |
| 第一次让 Claude 做大改动 / 不熟悉的需求 | **plan** | 先看实施步骤再点头，避免方向跑偏 |
| 小修小补、已经讨论清楚怎么改 | **default** | 每步确认，零失误 |
| 长任务、批量重构、测试驱动循环 | **acceptEdits** | 跳过 Edit/Write 询问；Bash 仍受保护 |
| CI / 容器 / 一次性脚本任务 | **bypassPermissions** | 无人值守必须全自动；前提是环境隔离 |
| 本机改重要 repo 跑构建/部署命令 | **default**（不要 bypass） | Bash 一旦放权，`rm -rf` 类命令也会被默许 |

### plan 模式的特殊行为

- 进入 plan 模式后，Claude 仍能 Read / Grep / Glob / WebFetch，但**任何修改型工具被禁用**。
- 它会先在主会话里写出一份"实施计划"（通常分点列出步骤）。
- 你按 **Esc** 或回复"同意"，Claude 才会退出 plan 模式实际执行。
- 适合：架构决策、复杂重构、跨文件改动、不确定 Claude 思路是否正确时。

### 配合 permissions.allow / ask / deny

模式是**全局开关**，而 `permissions` 是**细粒度规则**。两者叠加：

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": ["Bash(npm run test:*)"],
    "ask":   ["Bash(git push:*)"],
    "deny":  ["Bash(rm -rf:*)", "Read(./.env)"]
  }
}
```

即便在 `acceptEdits` / `bypassPermissions` 模式下，`deny` 列表仍**强制拦截**——这是防 `rm` 类灾难的最后一道闸。

---

## 常用对话内命令

| 命令 | 作用 |
| --- | --- |
| `/help` | 查看所有命令 |
| `/init` | 自动生成项目 CLAUDE.md |
| `/memory` | 查看 / 编辑当前记忆栈 |
| `/skills` | 列出本会话已加载 skill |
| `/plugin` | 管理插件（list / install / marketplace add） |
| `/mcp` | 查看 MCP server 状态 |
| `/config` | 打开设置面板（主题、模型等） |
| `/status` | 查看当前账号、模型、配额、token 用量 |
| `/context` | 查看当前会话上下文构成（系统提示、CLAUDE.md、工具、历史等占多少 token） |
| `/clear` | **清空**当前会话上下文（彻底重置） |
| `/compact` | **压缩**当前会话上下文（保留摘要继续对话） |
| `/resume` | 恢复历史会话 |
| `/cost` | 查看本会话累计 token 消耗与费用 |
| `/add-dir <path>` | 把额外目录加入本会话的可访问范围（跨项目读写） |
| `/fast` | 切换 Opus 快速输出模式 |
| `/login` `/logout` | 切换登录 |
| `! <cmd>` | 在当前会话中直接执行 shell 命令（输出进入对话） |

### `/clear` vs `/compact` 怎么选

两者都用于"对话太长、上下文快满"时解围，但语义完全不同：

| 维度 | `/clear` | `/compact` |
| --- | --- | --- |
| 行为 | 把上下文**全部丢弃**，只保留 CLAUDE.md / skills 等启动加载项 | 让 Claude 把历史对话**总结**为一段摘要，新轮次继续基于摘要 |
| 历史对话 | ❌ 完全丢失 | ✅ 以摘要形式保留 |
| 适用场景 | 切换到**完全不相关**的新任务 | 同一任务继续推进，但已经聊得太长 |
| token 释放 | 接近 100% | 大约释放 50%~80%，留下摘要部分 |

**什么时候用 `/clear`：**

- 上一个任务已经完成（如 bug 修好、PR 提了），现在开始**全新任务**
- 不希望 Claude 被前面的上下文带偏（如刚做完 A 项目，现在切到 B 项目）
- 看到状态栏 token 用量过半但任务已结束，主动重置可以省钱
- 调试 prompt 行为时，需要"干净环境"复现

**什么时候用 `/compact`：**

- 同一个长任务**还没做完**，但状态栏提示 token 接近上限（出现 `Context low` 警告）
- 长会话中前面的代码探索/思考已经"用过"，现在只需要保留结论继续推进
- 想保留任务记忆但又不想被早期的无关试错占用窗口
- Claude 主动提示"need to compact to continue" 时

**实用经验：**

- 优先用 `/compact`，避免任务中途"失忆"；只有真要换任务才 `/clear`
- 写代码任务在大型改动前先 `/compact` 一次，能显著降低 Claude 复述老内容的概率
- `/compact` 可加自定义摘要重点：`/compact 重点保留刚才确定的 API 设计与未完成的 TODO`

### `/add-dir`：扩展工作目录

Claude Code 启动时默认只允许在**当前 cwd 及其子目录**内读写文件。如果任务需要跨目录访问（例如同时改两个 repo，或参考隔壁项目的实现），用 `/add-dir` 把目标目录加进白名单。

**基本用法：**

```bash
# 单个目录
/add-dir /path/to/another-project

# Windows 路径（正反斜杠都可）
/add-dir E:/FrontEnd/git/shared-lib
/add-dir C:\Users\ljk\work\monorepo

# 相对路径（基于当前 cwd 解析）
/add-dir ../sibling-project

# 一次加多个（空格分隔）
/add-dir ../api-server ../shared-types
```

**何时需要用：**

- **跨 repo 重构**：前端调后端接口，需要同时读后端代码确认契约
- **monorepo 子包间联调**：你在 `apps/web` 启动了 claude，但要改 `packages/ui`
- **参考实现**：让 Claude 读隔壁项目的相似模块抄思路
- **临时调试外部库**：需要让 Claude 看 `node_modules/<pkg>/src` 源码定位 bug

**注意事项：**

- 新增的目录**只在本次会话生效**，重启 `claude` 后失效；要长期生效写到 `~/.claude/settings.json` 的 `permissions.additionalDirectories` 或用启动参数 `claude --add-dir <path>`
- 仍受 `permissions` 规则约束（如 `deny: ["Read(./.env)"]` 依然拦截）
- 加进来的目录会被 Claude 当成"项目的一部分"，子目录里的 `CLAUDE.md` 也会被自动加载

**启动时加：**

```bash
claude --add-dir ../shared-lib --add-dir ../docs
```

**写进 `settings.json` 长期生效：**

```json
{
  "permissions": {
    "additionalDirectories": [
      "~/work/shared-lib",
      "~/work/internal-docs"
    ]
  }
}
```

---

## 资源链接

### 官方资源

| 用途 | URL |
| --- | --- |
| 文档主站 | <https://docs.claude.com/en/docs/claude-code/overview> |
| 文档短链 | <https://code.claude.com/docs> |
| GitHub 仓库 | <https://github.com/anthropics/claude-code> |
| Agent SDK 文档 | <https://docs.claude.com/en/api/agent-sdk> |
| 官方 plugin 市场 | <https://github.com/anthropics/claude-plugins-official> |
| MCP 协议官网 | <https://modelcontextprotocol.io> |
| 官方 MCP Server 列表 | <https://github.com/modelcontextprotocol/servers> |
| 第三方 MCP 索引 | <https://mcp.so> |

---

> ⚠️ Claude Code 演进很快。命令 flag、frontmatter 字段、原生安装脚本 URL 等细节请以 <https://code.claude.com/docs> 现版本为准。

## AI 知识补充

### 常见缩写对照

> 社区里 AI 相关缩写非常多，新人极易混淆（例如同样写 `cc` 既可能指 Claude Code，也可能指 Cursor Composer）。下表收录目前最常见的缩写，按字母排序。

| 缩写 | 全称 | 类别 | 含义 / 项目 |
| --- | --- | --- | --- |
| **CC** | **Claude Code** | 工具 | Anthropic 官方 CLI，本文档主角；社区也偶尔指 Cursor Composer，需看上下文 |
| **ccr** / **CCR** | **Claude Code Router** | 工具 | 把 CC 请求转发到任意兼容 OpenAI/Anthropic 协议的后端，<https://github.com/musistudio/claude-code-router> |
| **ccswitch** | **Claude Code Switch** | 工具 | 在多个 Claude API 配置/中转站之间快速切换的辅助 CLI，<https://github.com/farion1231/cc-switch> |
| **ccusage** | Claude Code Usage | 工具 | 分析 CC 本地日志，统计 token 消耗与花费，<https://github.com/ryoppippi/ccusage> |
| **Cursor** | — | 工具 | 商业 AI IDE，深度集成 Claude / GPT |
| **Codex** | — | 工具 | OpenAI 出的命令行 AI Coding 工具，对标 CC |
| **Copilot** | GitHub Copilot | 工具 | 微软/GitHub 的 AI 编码助手 |
| **GPT** | Generative Pre-trained Transformer | 模型族 | OpenAI 的模型家族 |
| **LLM** | Large Language Model | 概念 | 大语言模型总称（Claude / GPT / Gemini / Qwen 等） |
| **MCP** | **Model Context Protocol** | 协议 | Anthropic 开源的模型-工具交互协议，本文档大量出现 |
| **OpenRouter** | — | 服务 | 统一多家 LLM 的 API 网关 |

### 与 Claude Code 强相关的几个生态项目

社区里围绕 CC 衍生了一批高频使用的工具，列在这里方便区分：

| 项目 | 一句话定位 | 链接 |
| --- | --- | --- |
| **cc-switch** | 多份 API Key/中转站之间一键切换 | <https://github.com/farion1231/cc-switch> |
| **claude-code-router (ccr)** | 把 CC 请求路由到任意 OpenAI/Anthropic 兼容后端（含本地模型） | <https://github.com/musistudio/claude-code-router> |
| **ccusage** | 解析本地 JSONL 日志，统计 token / 美元成本 | <https://github.com/ryoppippi/ccusage> |
| **superpowers** | 一套开发流程闭环的 skill 集合（设计 → 计划 → 实现 → 自检 → 提交） | <https://github.com/obra/superpowers> |

## 好用skills或mcp仓库

[superpowers](https://github.com/obra/superpowers) 开发流程闭环（设计 -> 计划文档 -> 实现 -> 自己检查 -> 提交；可以一条龙，适合新项目）
[agent-skills](https://github.com/addyosmani/agent-skills)
[andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)
[ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) UI设计
[claude 官方Skills](https://github.com/anthropics/skills) 有前端设计，ppt，docx，pdf文件支持
[chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) 使AI可以自己操控浏览器

## 浏览器插件分享

[网页提示词快捷输入插件](https://github.com/wenyuanw/quick-prompt)

## 常见模型提供商

> 整理目前主流大模型的厂商、代表模型与官网入口；API 控制台、Base URL 等开发者细节请进入对应官网查看。下表模型名以 **2026 年 6 月各厂商官网/文档** 为准。

### 国外

| 厂商 | 代表模型 | 官网 |
| --- | --- | --- |
| **OpenAI** | GPT-5.5 / GPT-5.4 / GPT-5.4 mini | <https://openai.com> |
| **Anthropic** | Claude Fable 5 / Opus 4.8 / Sonnet 4.6 / Haiku 4.5 | <https://www.anthropic.com> |
| **Google** | Gemini 3.1 Pro / 3.5 Flash / 3.1 Flash-Lite | <https://gemini.google.com> |
| **xAI** | Grok 4.3 / Grok Build 0.1 | <https://x.ai> |

### 国内

| 厂商 | 代表模型 | 官网 |
| --- | --- | --- |
| **智谱 GLM** | GLM-5.2 / GLM-5.1 / GLM-5 / GLM-5-Turbo | <https://www.zhipuai.cn> |
| **阿里通义 Qwen** | Qwen3.7-Max / 3.7-Plus | <https://tongyi.aliyun.com> |
| **月之暗面 Kimi** | Kimi K2.7 Code / K2.6（多模态） | <https://www.moonshot.cn> |
| **MiniMax** | MiniMax-M3 / M2.7 / Hailuo 2.3 | <https://www.minimax.io> |
| **小米 MiMo** | MiMo-v2.5 pro | <https://github.com/XiaomiMiMo> |
| **DeepSeek** | DeepSeek-V4-Pro / DeepSeek-V4-Flash | <https://www.deepseek.com> |
| **字节豆包 Doubao** | Doubao Seed 2.1 Pro / Seed 2.1 Turbo / Seedance 2.0 / Seedream 5.0 | <https://www.doubao.com> |
| **百度文心 ERNIE** | ERNIE 5.1 / 5.0 / 4.5 Turbo / X1.1 / X1 Turbo | <https://chat.baidu.com> |
| **腾讯混元 Hunyuan** | Hunyuan-A13B / T1-Vision / TurboS-Vision-Video / Translation | <https://hunyuan.tencent.com> |
| **阶跃星辰 Step** | Step 3.7 Flash / Step 3.5 Flash / Step 3 | <https://www.stepfun.com> |

### 怎么挑

- **配 Claude Code 体验最佳**：原生 Anthropic（Fable 5 / Opus 4.8）> GLM-5.2（官方支持 Claude Code）> Qwen3.7-Max > Kimi K2.7 Code / DeepSeek-V4
- **国内直连不折腾**：智谱、Qwen、DeepSeek、Kimi、豆包

> 📌 模型版本随时间快速迭代，请以各厂商官网现版本为准。

## 目前免费的模型提供商
|名称 |模型 | 网址|
|opencode| deepseek-v4-flash, mimo-v2.5, Qwen3.6 Plus Free|https://opencode.ai/workspace|

## tips
+ skill 和 mcp 不是越多越好
+ command 会全加载到上下文，mcp会把名称和方法名，方法使用方法描述全加载到上下文，skill会加载名称和描述到上下文（过多会导致上下文过多，你能够发送的消息变少）
+ 如果是 token plan 注意 token 消耗
+ openai 转 claude 格式工具 https://github.com/musistudio/claude-code-router
