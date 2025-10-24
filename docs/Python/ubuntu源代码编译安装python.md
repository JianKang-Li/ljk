# 在 Ubuntu 20.04 中安装 Python 3.14

根据您的历史查询，您使用的是 Ubuntu 20.04（Focal Fossa）。Python 3.14 已于 2025 年 10 月 7 日正式发布，但 Ubuntu 20.04 的官方仓库和 deadsnakes PPA 不支持此版本（PPA 仅限 22.04 和 24.04）。因此，推荐从源代码手动编译安装。这是最可靠的方法，不会覆盖系统默认的 Python 3.8，且包含完整功能（如 venv 和开发头文件）。整个过程需 10-30 分钟，需 sudo 权限和至少 2GB RAM。

## 准备工作

- 更新系统：

  ```shell
  sudo apt update && sudo apt upgrade -y
  ```

- 安装编译依赖（包括 SSL、SQLite 等，确保 3.14 支持加密和模块）：

  ```shell
  sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev tk-dev libxml2-dev libxmlsec1-dev liblzma-dev -y
  ```

## 步骤 1: 下载 Python 3.14.0 源代码

切换到临时目录并下载最新稳定版（从 [python.org](https://www.python.org/downloads/release/python-3140/)）：

```shell
cd /tmp
wget https://www.python.org/ftp/python/3.14.0/Python-3.14.0.tgz
```

## 步骤 2: 解压源代码

```shell
tar -xf Python-3.14.0.tgz
cd Python-3.14.0
```

## 步骤 3: 配置编译选项

启用优化（提升性能）和 pip/venv 支持：

```shell
./configure --enable-optimizations --with-ensurepip=install
```

## 步骤 4: 编译并安装

使用多核加速（`$(nproc)` 为 CPU 核心数）：

```shell
make -j $(nproc)
sudo make altinstall
```

- `altinstall` 安装到 `/usr/local/bin/python3.14`，避免冲突。

## 步骤 5: 验证安装

检查版本：

```shell
python3.14 --version
```

预期：`Python 3.14.0`

测试 venv：

```shell
python3.14 -m venv test_env
source test_env/bin/activate
python --version  # 应为 3.14.0
deactivate
rm -rf test_env
```

## 步骤 6: 安装 pip（若需）

```shell
python3.14 -m ensurepip --upgrade
```

### 注意事项

- **路径管理**：使用 `python3.14` 调用。添加 PATH（可选）：`echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc`。
- **开发头文件**：自动包含在 `/usr/local/include/python3.14/`，用于 C 扩展。
- **卸载**：移除 `/usr/local/bin/python3.14*` 和 `/usr/local/lib/python3.14`。
- **常见问题**：
  - 编译失败（如缺少依赖）：检查错误（e.g., "No module named _ssl" → 确认 libssl-dev 安装）。
  - 空间不足：确保 /tmp 有 500MB+。
- **替代方案**：
  - **Pyenv**（推荐多版本管理）：安装 pyenv（`curl https://pyenv.run | bash`），然后 `pyenv install 3.14.0 && pyenv global 3.14.0`。更灵活，无需 root。
  - **升级 Ubuntu**：若可能，升级到 22.04 或 24.04，使用 `sudo apt install python3.14`（官方支持）。
- **为什么源代码**：20.04 已过标准支持期（至 2025 年 4 月），PPA 不兼容，但源安装稳定。
