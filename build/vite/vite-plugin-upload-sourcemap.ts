import type { Plugin } from 'vite'
import path from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'
import OSS from 'ali-oss'
import packageJSON from '../../package.json'
import picocolors from 'picocolors'
import ConcurrencyTask from '../utils'

const concurrencyTask = new ConcurrencyTask(3)
const { green, cyan, red, bold } = picocolors
const version = packageJSON.version

interface IOptions {
  // accessKeyId: string
  // accessKeySecret: string
  pid: string
  uid: string
  outDir?: string
}
export default function vitePluginUploadSourcemap(options: IOptions): Plugin {
  const { uid, pid } = options // 获取输出目录 dist

  // 环境变量注入到 github actions 中
  const accessKeyId = process.env.VITE_APP_ALIYUN_RAM_ACCESSKEYID
  const accessKeySecret = process.env.VITE_APP_ALIYUN_RAM_ACCESSKEYSECRET

  const client = new OSS({
    // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-hangzhou',
    // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量 .env.local
    accessKeyId,
    accessKeySecret,
    authorizationV4: true,
    // 填写Bucket名称。
    bucket: 'arms-rum-sourcemap-hz',
  })

  const prefix = `${uid}/${pid}/${version}/`

  return {
    name: 'vite-plugin-upload-sourcemap',
    async writeBundle(outputOptions) {
      let { dir: _outDir } = outputOptions
      if (!_outDir) {
        _outDir = options?.outDir || 'dist'
      }
      const files = fg.sync(`${path.basename(_outDir)}/**/*.map`)
      files.forEach((file) => {
        concurrencyTask.add(() => upload(client, `${prefix}${path.basename(file)}`, file)).then(() => {
          // eslint-disable-next-line no-console
          console.log(
            bold(
              cyan(
                `ARMS RUM ${green('Info')}: ${file} 上传成功`,
              ),
            ),
          )
        }).catch(() => {
          // eslint-disable-next-line no-console
          console.log(
            bold(
              red(
                `ARMS RUM Info: ${file} 上传失败`,
              ),
            ),
          )
        })
      })
      // const promises = files.map(file => upload(client, `${prefix}${path.basename(file)}`, file))
      // Promise.all(promises).then(() => {
      //   // eslint-disable-next-line no-console
      //   console.log(
      //     bold(
      //       cyan(
      //         `ARMS RUM ${green('Info')}: sourcemap上传成功`,
      //       ),
      //     ),
      //   )
      // })
    },
  }
}

async function upload(client, from, to) {
  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    await client.put(from, to)

    // 上传完毕后删除sourcemap文件
    // 当sourcemap设置成hidden，删不删都一样
    // fs.unlink(to, (err) => {
    //   if (err) {
    //     // eslint-disable-next-line no-console
    //     console.log(err)
    //   }
    // })
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return Promise.reject(e)
  }
}
