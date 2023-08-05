# electron

## 主进程和渲染进程

+ 主进程：启动项目时运行的main.js脚本就是我们的主进程，在主进程运行的脚本中可以以创建web页面的象实展示GUI，主进程只有一个

+ 渲染进程：每个electron的页面都在运行着自己的进程，这样的进程称之为渲染进程(基于chromium的多进程结构)

主进程使用BrowserWindow创建实例，主进程销毁后，对应的渲染进程会被终止，主进程与渲染进程通过IPC方式(事件驱动)进行通信

## 关闭警告

```js
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"]='true'
```

配置CSP

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';script-src 'self';img-src 'self' data:; style-src 'self' 'unsafe-inline'">
```

## 主进程事件生命周期

```js
app.on("window-all-closed", () => {
  console.log('window-all-closed');
  // 对于MacOS系统->关闭窗口时，不会直接退出应用
  if (process.platform === 'darwin') {
    app.quit()
  }
})

app.on('quit', () => {
  console.log('quit');
})

app.whenReady().then(() => {
  createWindow()
  // 在MacOS下，当全部窗口关闭，点击dock图标，窗口再次打开
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
```

## 渲染进程使用node模块

```js
webPreferences: {
  nodeIntegration: true,//集成node
  contextIsolation: false,//不隔离渲染进程
}
```

在渲染进程中**不推荐不隔离渲染进程**

推荐使用preload

```js
// 实现渲染进程注入变量
const { contextBridge } = require("electron")
// console.log(contextBridge);

// 将变量注入到window对象上
contextBridge.exposeInMainWorld('myApi', {
  platform: process.platform
})
```

## 主进程与渲染进程通信

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self';script-src 'self';img-src 'self' data:; style-src 'self' 'unsafe-inline'">
  <title>electron</title>
  <script src="./render/app.js" defer></script>
</head>

<body>
  hello
  <button id="btn">按钮</button>

</body>

</html>
```

```js
// prrload.js
/* const fs = require("fs")

fs.writeFile("F:/git/ElectronStudy/test.txt", 'abc', () => {
  console.log('done');
}) */

// console.log(process.platform);
// 实现渲染进程注入变量
const { contextBridge, ipcRenderer } = require("electron")
// console.log(contextBridge);

const handleSend = async () => {
  let msg = await ipcRenderer.invoke('send-event', 'hello')
  console.log(msg);
}

// 将变量注入到window对象上
contextBridge.exposeInMainWorld('myApi', {
  platform: process.platform,
  handleSend
})
```

```js
// main.js
ipcMain.handle('send-event', (event, msg) => {
  // console.log(msg);
  return msg
})
```

## 主进程

### app

#### 事件

+ before-quit
在应用程序开始关闭窗口之前触发

+ browser-window-blur
在browserWindow失去焦点时触发

+ browser-window-focus
在browserWindow获得焦点时触发

#### 方法

+ app.quit()

+ app.getPath(name)
获取目录路径

### BrowserWindow

#### 实例方法

+ win.loadURL(url,options)和loadFile互斥

优雅显示窗口

+ ready-to-show事件

```js
let mainWindow=new BrowserWindow({show:false})
mainWindow.once('ready-to-show',()=>{
  mainWindow.show()
})
```

+ 设置backgroundColor(会附在body下面)

```js
let win =new BrowserWindow({backgroundColor:"#2e2cc9"})
```

#### 父子窗口

```js
const win2 = new BrowserWindow({
  width: 200,
  height: 300,
  parent: win,//父敞口
  modal: true//模态窗
})
```

#### 无边框窗口

frame: false,//无边框窗口

通过设置css实现拖动

```css
html {
  height: 100%;
}

body {
  height: 100%;
  user-select: none;
  -webkit-app-region: drag;
}
/* 防止拖动range移动 */
input{
  -webkit-app-region:no-drag;
}
```

titleBarStyle: "hidden",//显示操作按钮

#### 属性和方法

+ minWidth&&minHeight
+ 窗口焦点事件focus
+ getAllWindows()//获取所有窗口
+ maximize()//最大化窗口
+ win.setFullScreen(flag)//设置是否应处于全屏模式

#### state

> electorn-win-state 保持窗口的状态(窗口大小)
> npm install electorn-win-state

使用

```js
const WinState = require("electron-win-state").default

const browserWindow = WinState.createBrowserWindow({
 width: 800,
 height: 600,
 // your normal BrowserWindow options...
})
```

```js
const winState = new WinState({ 
 defaultWidth: 800,
 defaultHeight: 600,
 // other winState options, see below
})

const browserWindow = new BrowserWindow({
 ...winState.winOptions,
 // your normal BrowserWindow options...
 // 不能设置宽高会覆盖
})

// Attach the required event listeners
winState.manage(this.browserWindow)
```

#### webContents

> 是EventEmitter的实例，负责渲染和控制网页，是BrowserWindow对象的一个属性
方法

+ getAllWebContents()//返回WebContents所有实例的数组，包含Windows，webview,opened devtools和devtools扩展背景页的web内容

```js
const {webContents}=require("electron")
console.log(webContents.getAllWebContents());
```

实例事件

+ did-finish-load//页面加载完成
+ dom-ready//页面dom加载完成
+ new-window//监测打开窗口
+ context-menu//右键上下文信息

实例方法

+ executeJavaScript()//执行js代码

### dialog(对话框)

> 显示用于打开和保存文件、警告等的本机系统对话框

```js
//文件选择窗口
dialog.showOpenDialog({
  buttonLabel: "选择",//窗口标签
  defaultPath: path.resolve(__dirname),//默认窗口
  properties: ['createDirectory', 'multiSelections', 'openFile', 'openDirectory']//是否可以创建文件夹、多选，打开文件，打开文件夹
}).then((res) => {
  console.log(res);//res有是否取消，打开路径
})
```

```js
// 保存窗口
dialog.showSaveDialog({
}).then((res) => {
  console.log(res);//res有是否取消，打开路径
})
```

```js
//对话框
dialog.showMessageBox({
  title: "Message Box",
  message: "Please select an option",
  detail: "Message details",
  buttons: answers
}).then(({ response }) => {
  console.log(response);//下标
})
```

#### 快捷键+系统快捷键

> 快捷键：自定义键盘快捷键
> 系统快捷键: 在应用程序没有键盘焦点是，监听键盘事件
快捷方式使用register方法在globalShortcut模块中注册

```js
globalShortcut.register("CommandOrControl+G", () => {
  console.log('g');
  globalShortcut.unregisterAll()//注销快捷键
})
```

#### menu

自定义菜单栏

```js
const template = [
  {
    label: '帮助',
    submenu: [
      {
        label: "DevTools",
        role: "toggleDevTools",
        accelerator: 'Shift+i'
      },
      {
        label: "copy",
        role: 'copy'
      }
    ]
  },
]

const mainMenu = Menu.buildFromTemplate(template)

// 挂载
Menu.setApplicationMenu(mainMenu)
```

+ menuItem.type
string 表示菜单项的类型 可以是 normal, separator, submenu, checkbox 或 radio.

+ menuItem.role
一个 string 值(可选)，如果设置，表示菜单项的角色。 可以是： undo, redo, cut, copy, paste, pasteAndMatchStyle, delete, selectAll, reload, forceReload, toggleDevTools, resetZoom, zoomIn, zoomOut, toggleSpellChecker, togglefullscreen, window, minimize, close, help, about, services, hide, hideOthers, unhide, quit, startSpeaking, stopSpeaking, zoom, front, appMenu, fileMenu, editMenu, viewMenu, shareMenu, recentDocuments, toggleTabBar, selectNextTab, selectPreviousTab, mergeAllWindows, clearRecentDocuments, moveTabToNewWindow 或 windowMenu

+ menuItem.accelerator
Accelerator (可选) 若存在则指向该项的快捷键

##### 主菜单与主进程之间通信

```js
const { Menu, dialog } = require("electron")
const mainMenu = (args, cb) => {
return Menu.buildFromTemplate([
  {
    label: 'one',
    submenu: [
      {
        label: "submenu-1"
      },
      {
        label: "Greet",
        click: () => {
          // console.log('hello');
          /* dialog.showMessageBox({
                  title: args,
                  message: "这是消息窗口",
                  buttons: ['yes', 'no']
                }).then(({ response }) => {
                  console.log(response);
                }) */
          cb("hello 1")
        }
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: "DevTools",
        role: "toggleDevTools",
        accelerator: 'Shift+i'
      },
      {
        label: "copy",
        role: 'copy'
      },
    ]
  },
])
}
module.exports = mainMenu
```

#### ContextMenu(上下文菜单)

```js
let contextMenu = Menu.buildFromTemplate([
{ label: "调试" },
{ role: 'editMenu' }
])

wc.on('context-menu', () => {
  contextMenu.popup()
})
```

### Tray(托盘)

```js
const { Tray, Menu } = require("electron")

function createTary(app, win) {
  const tray = new Tray("./2022-8-10.jpg")
  tray.setToolTip("我的应用")
  tray.on("click", (e) => {
    if (e.shiftKey) {
      app.quit()
    } else {
      win.isVisible() ? win.hide() : win.show()
    }
  })
  tray.setContextMenu(Menu.buildFromTemplate(
    [
      {
        label: "quit", click: () => {
          app.quit()
        }
      }
    ]
  ))
}

module.exports = createTary
```

## 渲染进程

### clipboard

> 在系统剪贴板上进行复制和粘贴操作
> 在主进程和渲染进程上都可用

+ readText()
返回字符串，剪贴板中的内容为纯文本

+ writeText(text)
将文本作为纯文本写进剪贴板

```js
const copy = () => {
  clipboard.writeText('hello electron')
}

const parse = () => {
  let res = clipboard.readText()
  console.log(res);
}
```

### desktopCapturer

> 使用navigator.mediaDevices.getUserMedia API访问可以从坐桌面捕获音频和视频的媒体源信息，只在主进程可用

```js
//渲染进程
const capture = async () => {
  let sources = await ipcRenderer.invoke('capture-event')
  // console.log(msg);
  // console.log(sources);
  for (let source of sources) {
    if (source.name === 'Entire Screen') {
      // console.log(source);
      let str = source.thumbnail.crop({ x: 0, y: 30, width: 1200, height: 1170 })
      strData = str.toDataURL()
      console.log(strData);
      return strData
    }
  }
}
```

```js
//主进程
ipcMain.handle('capture-event', async () => {
  return desktopCapturer.getSources({
    types: ['window', 'screen'],
  }).then(async sources => {
    // console.log(sources);
    return sources
  })
})
```

### nativeImage

+ createFromDataURL()

+ createEmpty()

+ createFromPath()

+ toPNG()

+ toJPEG()

+ getSize()

+ crop()//裁剪
