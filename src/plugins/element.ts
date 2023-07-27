import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import type { App } from 'vue'
import '../element-variables.scss'

export default (app: App) => {
  app.use(ElementPlus, { locale })
}

export const initAllElementPlusIcons = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIcons)) {
    app.component(key, component)
  }
}
