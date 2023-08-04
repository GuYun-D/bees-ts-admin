import { defineStore } from 'pinia'
import md5 from 'md5'
import type { ILoginForm, IUserState } from '@/model/login'
import { userLoginApi, getUserDetailInfoApi } from '../../service/api/login/index'
import { TOKEN } from '@/contsant'
import { setItem, getItem } from '@/utils/storage'
import router from '@/router'
import { isEmptyObj } from './../../utils/validate'

export default defineStore('userStore', {
  state(): IUserState {
    return {
      token: getItem(TOKEN),
      userInfo: {}
    }
  },

  actions: {
    async fetchUserLogin(loginForm: ILoginForm) {
      const { password, username } = loginForm

      return new Promise((resolve, reject) => {
        userLoginApi({
          username,
          password: md5(password)
        })
          .then(({ token }) => {
            setItem(TOKEN, token)
            this.token = token
            router.push('/')
            resolve(token)
          })
          .catch(reject)
      })
    },

    async fetchUserInfo() {
      const res = await getUserDetailInfoApi()
      this.userInfo = res
      return res
    }
  },

  getters: {
    hasUserInfo(): boolean {
      return !isEmptyObj(this.userInfo)
    }
  }
})
