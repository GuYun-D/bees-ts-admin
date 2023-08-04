import { storeToRefs } from 'pinia'
import pinia from './stores'
import router from './router/index'
import useUserStore from './stores/modules/user'

const userStore = useUserStore(pinia)
const { token, hasUserInfo } = storeToRefs(userStore)

const whiteList = ['/login']

router.beforeEach(async (to, _, next) => {
  if (token.value) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!hasUserInfo.value) {
        const { permission } = await userStore.fetchUserInfo()
        console.log('我的权限', permission)
        return next(to.path)
      }
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
