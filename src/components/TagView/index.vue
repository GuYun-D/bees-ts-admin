<template>
  <div class="bee-tag-view-container">
    <router-link
      @contextmenu.prevent="handleOpenMenu($event, index)"
      :style="{
        backgroundColor: isActive(route) ? mainColor : '',
        borderColor: isActive(route) ? mainColor : ''
      }"
      :class="{ active: isActive(route) ? 'active' : '' }"
      class="tag-view-item"
      :to="{ path: route.fullPath }"
      v-for="(route, index) in tagViewList"
      :key="route.fullPath"
      >{{ route.title }}
      <BeeIcon @click.stop.prevent="handleRemoveTag(index)" icon="el-icon-close" v-if="!isActive(route)" class-name="el-icon-close"></BeeIcon>
    </router-link>

    <ContentMenu :style="contextMenuStyle" v-show="contextMenuVisible" @menu-click="handleClickMenuItem" :menu-list="menuList"></ContentMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BeeIcon from '@/components/BeeIcon/index.vue'
import useApp from '@/stores/modules/app'
import useTheme from '@/stores/modules/theme'
import type { IRemoveTag, ITag, RemoveTag } from '@/model/sys'
import ContentMenu from '@/components/ContentMenu/index.vue'
import type { IContentMenuItem } from '@/components/ContentMenu/index.vue'
import useContextMenu from '@/hooks/useContextMenu'
import emitter, { emitterEvents } from '@/utils/emitter'

const app = useApp()
const router = useRouter()
const currentTagIndex = ref<number>()
const { tagViewList, currentActiveRoute } = storeToRefs(app)
const { mainColor } = storeToRefs(useTheme())
const { contextMenuStyle, contextMenuVisible, openContextMenu } = useContextMenu()

const menuList = ref<IContentMenuItem<RemoveTag>[]>([
  {
    label: '刷新',
    value: 'refresh'
  },
  {
    label: '关闭右侧',
    value: 'right'
  },
  {
    label: '关闭左侧',
    value: 'left'
  },
  {
    label: '关闭其他',
    value: 'other'
  }
])

emitter.on(emitterEvents.TAG_REFERSH, () => {
  // TODO: 刷新表格 ？ 刷新整个页面 ？
  router.go(0)
})

const isActive = (tag: ITag) => {
  return currentActiveRoute.value === tag.path
}

const handleRemoveTag = (index: number) => {
  const removeTagInfo: IRemoveTag = {
    index,
    type: 'index',
    fullPath: app.tagViewList[index].fullPath,
    router: router
  }

  app.removeTag(removeTagInfo)
}

const handleOpenMenu = (event: MouseEvent, index: number) => {
  currentTagIndex.value = index
  openContextMenu(event)
}

const handleClickMenuItem = (data: IContentMenuItem) => {
  const { value } = data
  app.removeTag({
    index: currentTagIndex.value!,
    type: value,
    fullPath: app.tagViewList[currentTagIndex.value!].fullPath,
    router
  })
}
</script>

<style scoped lang="scss">
.bee-tag-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  /* .tags-view-wrapper { */
  .tag-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    transition: all 200ms;
    display: inline-flex;
    align-items: center;
    border-radius: 10px;

    .close-wrapper {
      display: inline-block;
    }

    &:first-of-type {
      margin-left: 5px;
    }
    &:last-of-type {
      margin-right: 5px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    ::v-deep .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      margin-left: 10px;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  /* } */
}
</style>
