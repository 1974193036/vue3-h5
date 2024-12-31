import process from 'node:process'
import { unheadVueComposablesImports } from '@unhead/vue'
// import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
// import { VitePWA } from 'vite-plugin-pwa'
import Sitemap from 'vite-plugin-sitemap'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createViteVConsole } from './vconsole'
import { loadEnv } from 'vite'
import copyIndexTo404 from './vite-plugin-copy-index-to-404'
// import vitePluginMoveSourcemap from './vite-plugin-move-sourcemap'
import vitePluginUploadSourcemap from './vite-plugin-upload-sourcemap'
import { rumVitePlugin } from '@arms/rum-vite-plugin'

export function createVitePlugins(mode: string) {
  const env = loadEnv(mode, process.cwd())

  const plugins = [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/pages',
      exclude: ['src/pages/**/components/**'],
      dts: 'src/types/typed-router.d.ts',
    }),

    vue(),

    // https://github.com/jbaubree/vite-plugin-sitemap
    Sitemap({
      outDir: env.VITE_APP_OUT_DIR || 'dist',
    }),

    // https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    mockDevServerPlugin(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      resolvers: [VantResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/types/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        'vue',
        'vitest',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
        },
        unheadVueComposablesImports,
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [
        'src/composables',
      ],
      resolvers: [VantResolver()],
    }),

    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),

    // https://github.com/vadxq/vite-plugin-vconsole
    createViteVConsole(),

    // https://github.com/vuejs/devtools-next
    VueDevTools(),
  ]

  if (mode === 'production') {
    plugins.push(
      copyIndexTo404(),

      rumVitePlugin(),

      vitePluginUploadSourcemap({
        uid: env.VITE_APP_AliYUN_UID,
        pid: env.VITE_APP_AliYUN_ARMS_PID,
      }),

      // https://github.com/antfu/vite-plugin-pwa
      // VitePWA({
      //   registerType: 'autoUpdate',
      //   includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      //   manifest: {
      //     name: 'vue3-vant-mobile',
      //     short_name: 'vue3-vant-mobile',
      //     theme_color: '#ffffff',
      //     icons: [
      //       {
      //         src: '/pwa-192x192.png',
      //         sizes: '192x192',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/pwa-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //       },
      //       {
      //         src: '/pwa-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //         purpose: 'any maskable',
      //       },
      //     ],
      //   },
      // }),
    )
  }
  return plugins
}
