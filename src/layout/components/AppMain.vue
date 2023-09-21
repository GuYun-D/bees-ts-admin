<template>
  <el-scrollbar class="bee-app-main-view">
    <!-- TODO: 优化滚动条的位置 -->
    <!-- <div> -->
    <router-view v-slot="{ Component, route }">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </Transition>
    </router-view>
    <!-- </div> -->
  </el-scrollbar>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { isSaveTag } from '@/utils/validate'
import { generateTitleByRoute } from '@/utils/route'
import useApp from '@/stores/modules/app'
import useLanguageSwitch from '@/hooks/useLanguageSwitch'
import { ITag } from '@/model/sys'

const route = useRoute()
const app = useApp()
const watchLanguageChange = useLanguageSwitch()

watch(
  () => route,
  (to: RouteLocationNormalizedLoaded) => {
    if (isSaveTag(to.path)) {
      const { meta, name, params, path, query, fullPath } = to
      app.setActiveRoute(fullPath)
      app.addTag({
        meta,
        params,
        query,
        path,
        fullPath,
        name,
        title: generateTitleByRoute(to)
      })
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watchLanguageChange(() => {
  app.tagViewList.forEach((tag: ITag, index: number) => {
    app.upDateTag({ ...tag, title: generateTitleByRoute(tag) }, index)
  })
})
</script>

<style scoped lang="scss">
.bee-app-main-view {
  height: calc(100vh);
  width: 100%;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  overflow: auto;
}
</style>
