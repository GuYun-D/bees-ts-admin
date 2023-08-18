import type { App } from 'vue'
import BeeIcon from '@/components/BeeIcon/index.vue'

const svgRequire = require.context('./svg', false, /\.svg/)
svgRequire.keys().forEach((icon) => svgRequire(icon))

export default (app: App) => {
  app.component('bee-icon', BeeIcon)
}
