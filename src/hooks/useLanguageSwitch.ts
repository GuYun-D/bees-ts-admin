import { watch } from 'vue'
import store from '@/stores'
import useApp from '@/stores/modules/app'

type SwitchLanguageCb = (language: string) => void

export default () => {
  const appStore = useApp(store)
  return (...cbs: SwitchLanguageCb[]) => {
    watch(
      () => appStore.language,
      (newLanguage: string) => {
        cbs.forEach((cb) => cb(newLanguage))
      }
    )
  }
}
