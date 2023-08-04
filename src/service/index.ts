import { storeToRefs } from 'pinia'
import type { AxiosResponse } from 'axios'
import Request from './request'
import type { HttpServerData } from '@/service/request/types'
import { ElMessage } from 'element-plus'
import pinia from '../stores'
import useUserStore from '../stores/modules/user'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  interceptors: {
    requestSuccess(config) {
      const userStore = useUserStore(pinia)
      // @ts-ignore
      config.headers.Authorization = `Bearer ${userStore.token}`
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
        // TODO： 退出登录
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  }
})

export default request
