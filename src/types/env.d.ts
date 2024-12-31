/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // eslint-disable-next-line ts/no-empty-object-type
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_PREVIEW: string
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_PUBLIC_PATH: string

  readonly VITE_APP_AliYUN_RAM_ACCESSKEYID: string
  readonly VITE_APP_AliYUN_RAM_ACCESSKEYSECRET: string
  readonly VITE_APP_AliYUN_UID: string
  readonly VITE_APP_AliYUN_ARMS_PID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
