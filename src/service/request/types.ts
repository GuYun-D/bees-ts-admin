import { AxiosResponse, AxiosRequestConfig } from 'axios'

interface BeeInterceptors<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFail?: (err: any) => any
  responseSuccess?: (config: T) => T
  responseFail?: (err: any) => any
}

export interface BeeAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BeeInterceptors<T>
}
