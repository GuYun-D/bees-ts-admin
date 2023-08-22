<template>
  <el-sub-menu :index="route.path" v-if="route.children && route.children.length">
    <template #title>
      <MenuItem :title="route?.meta?.title" :icon="route?.meta?.icon"></MenuItem>
    </template>

    <SideBarItem v-for="item in route.children" :key="item.path" :route="item"></SideBarItem>
  </el-sub-menu>

  <el-menu-item v-else :index="route.path"> <MenuItem :title="route?.meta?.title" :icon="route?.meta?.icon"> </MenuItem></el-menu-item>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'

defineProps<{
  route: RouteRecordRaw
}>()
</script>

<style scoped lang="scss"></style>
