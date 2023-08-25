<template>
  <div class="guide-container" @click="handleDriver">
    <div id="start-guide">
      <BeeIcon icon="s-guide"></BeeIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import BeeIcon from '@/components/BeeIcon/index.vue'
import useLanguageSwitch from '@/hooks/useLanguageSwitch'
import getSteps from './steps'

const i18n = useI18n()
const watchLanguageChange = useLanguageSwitch()
let driverInstance: ReturnType<typeof driver>

const getBaseConfig = () => {
  return {
    animate: true,
    overlayColor: 'rgba(0, 0, 0, 0.8)',
    allowClose: true,
    showProgress: false,
    nextBtnText: i18n.t('sys.guide.next'),
    doneBtnText: i18n.t('sys.guide.close'),
    prevBtnText: i18n.t('sys.guide.prev'),
    popoverClass: 'driverjs-theme',
    stagePadding: 4,
    steps: getSteps(i18n)
  }
}

onMounted(() => {
  driverInstance = driver(getBaseConfig())
})

watchLanguageChange(() => {
  driverInstance = driver(getBaseConfig())
})

const handleDriver = () => {
  driverInstance.drive(0)
}
</script>

<style lang="scss" scoped></style>
