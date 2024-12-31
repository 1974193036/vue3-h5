import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export default function copyIndexTo404(options?: { outDir: string }): Plugin {
  return {
    name: 'copy-index-to-404',
    writeBundle(outputOptions) {
      let { dir: _outDir } = outputOptions
      if (!_outDir) {
        _outDir = options?.outDir || 'dist'
      }
      const indexPath = path.resolve(process.cwd(), _outDir, 'index.html')
      const fourZeroFourPath = path.resolve(process.cwd(), _outDir, '404.html')

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fourZeroFourPath)
      }
      else {
        console.error('index.html not found in dist directory')
      }
    },
  }
}
