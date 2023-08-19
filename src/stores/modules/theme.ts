import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import cssVar from '@/assets/css/variables.module.scss'
import { IThemeStore } from '@/model/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/contsant'
import i18n from '@/i18n'
import { setItem } from './../../utils/storage'
import { generatePrimaryColor } from '@/utils/theme'

export default defineStore('themeStore', {
  state(): IThemeStore {
    return {
      variables: cssVar,
      mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
    }
  },

  actions: {
    toggleMainColor(mainColor: string) {
      if (!mainColor) {
        ElMessage.warning(i18n.global.t('sys.nullTheme'))
        return
      }

      setItem(MAIN_COLOR, mainColor)
      this.mainColor = mainColor
      this.variables.menuBg = mainColor

      generatePrimaryColor(mainColor)
    }
  }
})
