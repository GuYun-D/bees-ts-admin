import { storeToRefs } from 'pinia'
import pinia from './stores'
import router from './router/index'
import useUserStore from './stores/modules/user'

const userStore = useUserStore(pinia)
const { token } = storeToRefs(userStore)

const whiteList = ['/login']

router.beforeEach((to, _, next) => {
  if (token.value) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
