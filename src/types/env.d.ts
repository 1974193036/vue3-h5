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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
