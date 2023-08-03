type PasswordStatus = 'password' | 'text'
type PasswordPrefixIconName = 'el-Lock' | 'el-Unlock'
interface ILoginForm {
  username: string
  password: string
}

interface ILoginResult {
  token: string
}

interface IUserState {
  token: string
}

export type { PasswordStatus, PasswordPrefixIconName, ILoginForm, ILoginResult, IUserState }
