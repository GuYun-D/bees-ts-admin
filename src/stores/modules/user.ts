import { defineStore } from 'pinia'
import md5 from 'md5'
import type { ILoginForm, IUserState } from '@/model/login'
import { userLoginApi } from '../../service/api/login/index'
import { TOKEN } from '@/contsant'
import { setItem, getItem } from '@/utils/storage'
import router from '@/router'

export default defineStore('userStore', {
  state(): IUserState {
    return {
      token: getItem(TOKEN)
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
    }
  }
})
