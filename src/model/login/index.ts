type PasswordStatus = 'password' | 'text'
type PasswordPrefixIconName = 'el-icon-Lock' | 'el-icon-Unlock'
interface ILoginForm {
  username: string
  password: string
}

interface ILoginResult {
  token: string
}

interface IUserInfo {
  avatar?: string
  id?: string
  permission?: any
  role?: any[]
  title?: string
  username?: string
}

interface IUserState {
  token: string
  userInfo: IUserInfo
}

export type { PasswordStatus, PasswordPrefixIconName, ILoginForm, ILoginResult, IUserState, IUserInfo }
