import type { AxiosResponse, AxiosRequestConfig } from 'axios'

interface BeeInterceptors<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFail?: (err: any) => any
  responseSuccess?: (config: T) => any
  responseFail?: (err: any) => any
}

export interface BeeAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BeeInterceptors<T>
}

export interface HttpServerData<T = any> {
  code: number
  data: T
  message?: string
  success: boolean
}
