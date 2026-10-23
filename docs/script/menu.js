const fs = require('fs').promises
const path = require('path')
const ignore = ['.gitignore', '.nojekyll', 'favicon.ico', '_sidebar.md', 'index.html']
const ignoreDir = ['images', 'script']

// 循环获取目录和文件列表
async function getAllFilesAndDirs(dirPath) {
  const fileList = {
    files: [],
    dirs: {}
  }

  try {
    const files = await fs.readdir(dirPath)
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const stats = await fs.stat(filePath)
      if (stats.isDirectory()) {
        if (!ignoreDir.includes(file)) {
          fileList.dirs[file] = await getAllFilesAndDirs(filePath)
        }
      } else {
        if (!ignore.includes(file)) {
          fileList.files.push(file)
        }
      }
    }
  } catch (err) {
    console.log('Error:', err)
  }

  return fileList
}

// 解析已有 _sidebar.md，取条目链接顺序
function parseSidebarOrder(content) {
  const hrefs = []
  for (const line of content.split('\n')) {
    const match = line.match(/^\*\s+\[[^\]]*\]\(([^)]*)\)$/)
    if (match) {
      hrefs.push(match[1])
    }
  }
  return hrefs
}

// 已有条目按原顺序排列，新增条目按名称排序追加，删除的条目自动剔除
function sortEntries(entries, oldHrefs) {
  const entryMap = new Map(entries.map(entry => [entry.href, entry]))
  const sorted = []
  for (const href of oldHrefs) {
    const entry = entryMap.get(href)
    if (entry) {
      sorted.push(entry)
      entryMap.delete(href)
    }
  }
  sorted.push(...[...entryMap.values()].sort((a, b) => a.label.localeCompare(b.label, 'zh')))
  return sorted
}

// 创建目录内容
async function generateSidebar(data, parentPath = '') {
  const sidebarPath = path.join(__dirname, parentPath, '_sidebar.md')

  let oldHrefs = []
  try {
    oldHrefs = parseSidebarOrder(await fs.readFile(sidebarPath, 'utf-8'))
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('读取目录文件错误', err)
    }
  }

  const subDirEntries = Object.keys(data.dirs).map(subDir => {
    return { href: path.join(parentPath, subDir) + '/', label: subDir }
  })
  const fileEntries = data.files.map(file => {
    const { name } = path.parse(file)
    return { href: file, label: name }
  })

  const subDirs = sortEntries(subDirEntries, oldHrefs)
  const files = sortEntries(fileEntries, oldHrefs)

  const sidebar = [
    ...subDirs.map(entry => `* [${entry.label}](${entry.href})`),
    ...files.map(entry => `* [${entry.label}](${entry.href})`)
  ].join('\n')

  try {
    await fs.writeFile(sidebarPath, sidebar)
    console.log(`创建目录文件${sidebarPath}成功`)
  } catch (err) {
    console.error('创建目录错误', err)
    return
  }

  await Promise.all(Object.keys(data.dirs).map(subDir => {
    return generateSidebar(data.dirs[subDir], path.join(parentPath, subDir))
  }))
}

getAllFilesAndDirs('../').then(res => {
  return generateSidebar(res, '../')
})
