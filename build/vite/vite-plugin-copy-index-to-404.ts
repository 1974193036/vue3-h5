import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export default function copyIndexTo404(): Plugin {
  return {
    name: 'copy-index-to-404',
    writeBundle() {
      const indexPath = path.resolve(process.cwd(), 'dist', 'index.html')
      const fourZeroFourPath = path.resolve(process.cwd(), 'dist', '404.html')

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fourZeroFourPath)
      }
      else {
        console.error('index.html not found in dist directory')
      }
    },
  }
}
