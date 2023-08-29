import { ILoginForm, ILoginResult, IUserInfo } from '@/model/login'
import { request, test } from '@/service'

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

/**
 * 测试crud组件
 */
export const testCrudComponentsApi = (data: any) => {
  return test.get<any>({
    url: '/table',
    params: data
  })
}
