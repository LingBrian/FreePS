// vueform.config.(js|ts)

import en from '@vueform/vueform/locales/en'
import zh_CN from '@vueform/vueform/locales/zh_CN'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

// You might place these anywhere else in your project
import '@vueform/vueform/dist/vueform.css';

export default defineConfig({
  theme: vueform,
  locales: { zh_CN,en },
  locale: 'zh_CN',
})