export const validatePassword = () => {
  return (rule: any, value: string, callback: (errMs?: Error | string) => void) => {
    if (value.length < 6) {
      callback(new Error('登录密码至少为6位'))
    } else {
      callback()
    }
  }
}

export const loginRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请填写登录账号'
    }
  ],

  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
}
