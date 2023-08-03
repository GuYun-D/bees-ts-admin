import { ILoginForm, ILoginResult } from '@/model/login'
import request from '@/service'

export const userLoginApi = (data: ILoginForm) => {
  return request.post<ILoginResult>({
    url: '/sys/login',
    data,
    method: 'POST'
  })
}
