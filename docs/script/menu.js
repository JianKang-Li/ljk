const fs = require('fs').promises
const path = require('path')
const ignore = ['.gitignore', '.nojekyll', 'favicon.ico', '_sidebar.md','index.html']
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

// 创建目录内容
function generateSidebar(data, dir = '', parentPath = '') {
  let sidebar = ''

  const files = data.files.map(file => {
    const filePath = path.join(file)
    const { name } = path.parse(filePath)
    return `* [${name}](${filePath})`
  })

  const subDirs = Object.keys(data.dirs).map(subDir => {
    const subDirPath = path.join(parentPath, subDir)
    sidebar += `* [${subDir}](${subDir}/)\n`
    generateSidebar(data.dirs[subDir], subDir, subDirPath)
  })

  fs.writeFile(path.join(__dirname, parentPath, '_sidebar.md'), `${sidebar}${files.join('\n')}`, (err) => {
    if (err) {
      console.error('创建目录错误', err)
      return
    }
    console.log(`创建目录文件${path.join(__dirname, parentPath, '_sidebar.md')}成功`)
  })
}

getAllFilesAndDirs('../').then(res => {
  generateSidebar(res, '', '../')
})
