import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import installElementPlus, { initAllElementPlusIcons } from './plugins/element'

import 'normalize.css'
import './assets/css/index.scss'

const app = createApp(App)
installElementPlus(app)
initAllElementPlusIcons(app)
app.use(pinia)
app.use(router)
app.mount('#app')
