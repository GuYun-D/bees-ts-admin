import { defineStore } from 'pinia'
import { LANGUAGE } from '@/contsant'
import { getItem, setItem } from '@/utils/storage'

export default defineStore('app', {
  state() {
    return {
      sidebarOpened: false,
      language: getItem(LANGUAGE) || 'zh'
    }
  },

  actions: {
    toggleSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },

    toggleLanguage(newLanguage: string) {
      setItem(LANGUAGE, newLanguage)
      this.language = newLanguage
    }
  }
})
