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

const app = useApp()
const language = computed(() => {
  return app.language === 'en' ? enLanguagePackage : zhLanguagePackage
})
</script>
