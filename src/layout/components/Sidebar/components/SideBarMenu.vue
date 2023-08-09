<template>
  <el-menu router :unique-opened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <SideBarItem v-for="item in routes" :key="item.path" :route="item"></SideBarItem>
  </el-menu>
</template>
<script setup lang="ts">
import { generatemenus, filterRoutes } from '@/utils/route'

import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const routes = computed(() => {
  const res = filterRoutes(router.getRoutes())
  return generatemenus(res)
})
</script>

<style scoped lang="scss"></style>
