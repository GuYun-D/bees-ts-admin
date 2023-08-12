<template>
  <el-menu
    router
    :default-active="defaultActiveIndex"
    :unique-opened="true"
    :background-color="theme.variables.menuBg"
    :text-color="theme.variables.menuText"
    :active-text-color="theme.variables.menuActiveText"
  >
    <SideBarItem v-for="item in routes" :key="item.path" :route="item"></SideBarItem>
  </el-menu>
</template>
<script setup lang="ts">
import { generatemenus, filterRoutes } from '@/utils/route'

import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'

import useTheme from '@/stores/modules/theme'

import { useRoute, useRouter } from 'vue-router'
const theme = useTheme()
const router = useRouter()
const routes = computed(() => {
  const res = filterRoutes(router.getRoutes())
  return generatemenus(res)
})

const route = useRoute()
const defaultActiveIndex = computed(() => route.path)
</script>
