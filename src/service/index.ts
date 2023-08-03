import Request from './request'
import { AxiosResponse } from 'axios'
import { HttpServerData } from '@/service/request/types'
import { ElMessage } from 'element-plus'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
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
        // TODO： 退出登录
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  }
})

export default request
