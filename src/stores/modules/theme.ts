import { defineStore } from 'pinia'
import cssVar from '@/assets/css/variables.module.scss'
import { IThemeStore } from '@/model/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/contsant'

export default defineStore('themeStore', {
  state(): IThemeStore {
    return {
      variables: cssVar,
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
    }
  }
})
