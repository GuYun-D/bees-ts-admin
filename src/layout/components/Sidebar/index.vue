<template>
  <div class="side-bar-container">
    <div class="logo-container">
      <el-avatar size="44" shape="square" :src="require('../../../assets/image/logo.png')"></el-avatar>
      <h1 class="logo-title">团蜂科技</h1>
    </div>

    <el-scrollbar>
      <SidebarMenu id="guide-sidebar"></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from './components/SidebarMenus.vue'
</script>

<style scoped lang="scss">
.side-bar-container {
  height: 100%;
  background-color: #fd792f;
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

    .el-avatar {
      --el-avatar-background-color: none;
      margin-right: 12px;
    }
  }
}
</style>
