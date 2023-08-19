<template>
  <ElConfigProvider :locale="language">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import enLanguagePackage from 'element-plus/lib/locale/lang/en'
import zhLanguagePackage from 'element-plus/lib/locale/lang/zh-cn'
import useApp from '@/stores/modules/app'
import useTheme from '@/stores/modules/theme'
import { writeNewStyle, generatePrimaryColor } from '@/utils/theme'

const appStore = useApp()
const themeStore = useTheme()

const language = computed(() => {
  return appStore.language === 'en' ? enLanguagePackage : zhLanguagePackage
})

generatePrimaryColor(themeStore.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})
</script>
