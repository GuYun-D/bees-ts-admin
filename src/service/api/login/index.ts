import { ILoginForm, ILoginResult, IUserInfo } from '@/model/login'
import request from '@/service'

// 用户登录
export const userLoginApi = (data: ILoginForm) => {
  return request.post<ILoginResult>({
    url: '/sys/login',
    data
  })
}

// 获取用户信息
export const getUserDetailInfoApi = () => {
  return request.get<IUserInfo>({
    url: '/sys/profile'
  })
}
