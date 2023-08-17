import { defineStore } from 'pinia'

export default defineStore('app', {
  state() {
    return {
      sidebarOpened: false
    }
  },

  actions: {
    toggleSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})
