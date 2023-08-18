import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import installElementPlus, { initAllElementPlusIcons } from './plugins/element'
import i18n from './i18n'
import initSvgIcons from './icons'

import 'normalize.css'
import './assets/css/index.scss'
import './permission'

const app = createApp(App)
installElementPlus(app)
initAllElementPlusIcons(app)
initSvgIcons(app)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
