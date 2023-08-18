import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh from './lang/zh'
import useApp from '@/stores/modules/app'
import store from '@/stores'

type langTypeSchema = typeof zh

const messages = { zh, en }
const app = useApp(store)

const i18n = createI18n<[langTypeSchema], 'zh' | 'en'>({
  legacy: false,
  globalInjection: true,
  locale: app.language,
  messages
})

export default i18n
