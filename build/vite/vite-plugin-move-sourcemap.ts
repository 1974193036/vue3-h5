import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'

export default function vitePluginSourcemap(options: { outDir: string }): Plugin {
  const { outDir } = options // 获取输出目录 dist

  return {
    name: 'vite-plugin-move-sourcemap',
    async writeBundle() {
      const targetFileName = `${outDir}/sourcemaps`

      const files = fg.sync(`${outDir}/**/*.map`)

      // 遍历文件列表并移动文件到指定目录
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })

      for (const filePath of files) {
        const destinationPath = `${targetFileName}/${path.basename(filePath)}`

        if (!fs.existsSync(path.resolve(targetFileName))) {
          // 创建目标文件夹
          fs.mkdirSync(targetFileName)
        }
        fs.rename(filePath, destinationPath, (err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
        // eslint-disable-next-line no-console
        console.log(`Moved file: ${filePath} to ${destinationPath}`)
      }
    },
  }
}
