import { defineStore } from 'pinia'
import emitter, { emitterEvents } from '@/utils/emitter'
import { LANGUAGE, TAGS_VIEW_LIST, CURRENT_ACTIVE_ROUTE } from '@/contsant'
import { getItem, setItem } from '@/utils/storage'
import { ITag, ISysStore, IRemoveTag } from '@/model/sys'

export default defineStore('app', {
  state(): ISysStore {
    return {
      sidebarOpened: false,
      language: getItem(LANGUAGE) || 'zh',
      tagViewList: getItem(TAGS_VIEW_LIST) || [],
      currentActiveRoute: getItem(CURRENT_ACTIVE_ROUTE) || ''
    }
  },

  actions: {
    toggleSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },

    toggleLanguage(newLanguage: string) {
      setItem(LANGUAGE, newLanguage)
      this.language = newLanguage
    },

    // 添加tag
    addTag(tag: ITag) {
      const isExits = this.tagViewList.find((item) => tag.path === item.path)
      if (!isExits) {
        this.tagViewList.push(tag)
        setItem(TAGS_VIEW_LIST, this.tagViewList)
      }
    },

    // 更新tag
    upDateTag(tag: ITag, index: number) {
      this.tagViewList[index] = tag
    },

    // 设置当前激活的路由
    setActiveRoute(currentActiveRoute: string) {
      this.currentActiveRoute = currentActiveRoute
    },

    removeTag(reMoveTag: IRemoveTag) {
      const { index, type, router } = reMoveTag
      const setActiveRoute = () => {
        if (this.tagViewList.length) {
          const isActiveExist = this.tagViewList.find((item) => item.fullPath === this.currentActiveRoute)
          if (!isActiveExist) {
            this.setActiveRoute(this.tagViewList[0].fullPath)
          }
        } else {
          router.push('/')
        }
      }

      switch (type) {
        case 'index':
          if (this.tagViewList[index].fullPath !== this.currentActiveRoute) {
            this.tagViewList.splice(index, 1)
          }
          break

        case 'refresh':
          emitter.emit(emitterEvents.TAG_REFERSH)
          break

        case 'right':
          this.tagViewList.splice(index + 1)
          setActiveRoute()
          break

        case 'left':
          this.tagViewList.splice(0, index)
          setActiveRoute()
          break

        case 'other':
          this.tagViewList.splice(index + 1)
          this.tagViewList.splice(0, index)
          setActiveRoute()
          break
      }

      setItem(TAGS_VIEW_LIST, this.tagViewList)
    }
  }
})
