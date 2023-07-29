import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus, { initAllElementPlusIcons } from './plugins/element'

import 'normalize.css'
import './assets/css/index.scss'

const app = createApp(App)
installElementPlus(app)
initAllElementPlusIcons(app)
app.use(router).mount('#app')
