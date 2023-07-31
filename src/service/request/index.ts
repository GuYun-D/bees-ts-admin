import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { BeeAxiosRequestConfig } from './types'

export default class Request {
  instance: AxiosInstance

  constructor(config: BeeAxiosRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (err) => {
        return err
      }
    )

    // 局部拦截器
    this.instance.interceptors.request.use(config.interceptors?.requestSuccess, config.interceptors?.requestFail)
    this.instance.interceptors.response.use(config.interceptors?.responseSuccess, config.interceptors?.responseFail)
  }

  request<T = any>(config: BeeAxiosRequestConfig<T>) {
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }

    return new Promise<T>((resolve, reject) => {
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
