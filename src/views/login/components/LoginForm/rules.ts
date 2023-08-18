import i18n from '@/i18n'

export const validatePassword = () => {
  return (rule: any, value: string, callback: (errMs?: Error | string) => void) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('login.passwordRule')))
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
      message: i18n.global.t('login.usernameRule')
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
