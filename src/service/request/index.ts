import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { BeeAxiosRequestConfig } from './types'
import i18n from './../../i18n/index'

export default class Request {
  instance: AxiosInstance

  constructor(config: BeeAxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      // 全局拦截器
      (config) => {
        // @ts-ignore
        config.headers.icode = '5072D7B5717F6D83'
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },

      // TODO: 为什么全局请求成功的拦截没有触发？为什么局部的error请求在存在全局的err处理后会失效？

      (err) => {
        const { response } = err
        const { data, status } = response

        switch (status) {
          case 403:
            ElMessage.error(data.message || i18n.global.t('request.403'))
            break

          case 500:
            ElMessage.error(data.message || i18n.global.t('request.500'))
            break
        }

        return Promise.reject(err)
      }
    )

    // 局部拦截器
    this.instance.interceptors.request.use(config.interceptors?.requestSuccess, config.interceptors?.requestFail)
    this.instance.interceptors.response.use(config.interceptors?.responseSuccess, config.interceptors?.responseFail)
  }

  request<T = any>(config: BeeAxiosRequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((response) => {
          if (config.interceptors?.responseSuccess) {
            response = config.interceptors.responseSuccess(response)
          }
          resolve(response)
        })
        .catch(reject)
    })
  }

  get<T = any>(config: BeeAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: BeeAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: BeeAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  put<T = any>(config: BeeAxiosRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}
