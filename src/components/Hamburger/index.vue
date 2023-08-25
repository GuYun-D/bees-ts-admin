<template>
  <div class="hamburger-wrapper" id="guide-hamburger" @click="app.toggleSidebarOpened">
    <BeeIcon className="hamburger" :icon="hamburgerIcoNamae"></BeeIcon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useApp from '@/stores/modules/app'
import BeeIcon from '../BeeIcon/index.vue'

const app = useApp()

const hamburgerIcoNamae = computed(() => {
  return 'el-icon-fold'
})
</script>

<style scoped lang="scss">
.hamburger-wrapper {
  padding: 0 16px;

  ::v-deep .hamburger {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #3d3d3d;
  }
}
</style>
