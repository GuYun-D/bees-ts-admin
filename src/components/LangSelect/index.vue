<template>
  <el-dropdown @command="handleSetLanguage" trigger="click">
    <div style="cursor: pointer">
      <BeeIcon icon="s-lang-select"></BeeIcon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import BeeIcon from '../BeeIcon/index.vue'
import useApp from '@/stores/modules/app'

const app = useApp()
const i18n = useI18n()
const { language } = storeToRefs(app)

const handleSetLanguage = (lang: string) => {
  i18n.locale.value = lang
  app.toggleLanguage(lang)
  ElMessage.success(i18n.t('messageTip.switchLanguage'))
}
</script>

<style scoped lang="scss"></style>
