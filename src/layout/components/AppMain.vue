<template>
  <div class="bee-app-main-view">
    {{ sidebarOpened }}
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import useApp from '@/stores/modules/app'
import { storeToRefs } from 'pinia'
const app = useApp()
const { sidebarOpened } = storeToRefs(app)
</script>

<style scoped lang="scss">
.bee-app-main-view {
  min-height: calc(100vh);
  width: 100%;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 239, 246);
}
</style>
