<template>
  <div class="side-bar-container">
    <div class="logo-container">
      <el-avatar size="small" shape="square" :src="require('../../../assets/image/logo.png')"></el-avatar>
      <h1 class="logo-title" v-if="!app.sidebarOpened">{{ $t('sys.title') }}</h1>
    </div>

    <el-scrollbar>
      <SidebarMenu id="guide-sidebar"></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from './components/SideBarMenu.vue'

import useApp from '@/stores/modules/app'
const app = useApp()
</script>

<style scoped lang="scss">
.side-bar-container {
  height: 100%;
  /* background-color: #fd792f; */
  background-color: #304156;
  .logo-container {
    height: 44px;
    padding: 10px 0 22px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-title {
      margin-left: 10px;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }

    ::v-deep .el-avatar {
      background-color: transparent !important;
    }
  }
}
</style>
