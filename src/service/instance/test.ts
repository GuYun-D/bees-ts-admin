import type { AxiosResponse } from 'axios'
import Request from '../request'
import type { HttpServerData } from '@/service/request/types'
import { ElMessage } from 'element-plus'
import pinia from '@/stores'
import useUserStore from '../../stores/modules/user'

const test = new Request({
  baseURL: process.env.VUE_APP_TEST_API,
  timeout: 10000,
  interceptors: {
    requestSuccess(config) {
      return config
    },
    requestFail(err) {
      return Promise.reject(err)
    },
    responseSuccess(response: AxiosResponse<HttpServerData, any>) {
      const { success, data, message } = response.data
      if (success) {
        return data
      } else {
        ElMessage.error(message)
        return Promise.reject(new Error(message))
      }
    },
    responseFail(error) {
      if (error.response && error.response.data && error.response.data.code === 401) {
        const userStore = useUserStore(pinia)
        userStore.logout()
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  }
})

export { test }
