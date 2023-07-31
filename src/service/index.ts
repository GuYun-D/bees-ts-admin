import Request from './request'

const request = new Request({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  interceptors: {
    requestSuccess (config) {
      return config
    },
    requestFail (err) {
      console.log('请求失败', err)
    },
    responseSuccess (res) {
      // TDDO: 后端服务未启动时的错误
      console.log('响应成功', res)
      return res
    },
    responseFail (err) {
      console.log('响应失败', err)
    }
  }
})

export default request
