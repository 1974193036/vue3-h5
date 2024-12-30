import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import 'virtual:uno.css'
import '@/styles/app.less'
import '@/styles/var.less'

// Vant 桌面端适配
import '@vant/touch-emulator'

/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import ArmsRum from '@arms/rum-browser'

ArmsRum.init({
  pid: 'g8drvq0cf6@675755662129c46',
  endpoint: 'https://g8drvq0cf6-default-cn.rum.aliyuncs.com',
  spaMode: 'history',
  evaluateApi: async (options, response) => {
    // 返回的字段会覆盖默认内容，不返回的字段会依然使用SDK自定生成内容
    return {
      // 以下可选
      snapshots: JSON.stringify({
        params: options, // 请求入参
        resBody: response, // 响应体
      }),
    }
  },
})

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(pinia)

app.mount('#app')
