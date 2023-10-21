<template>
  <div>
    <BCrud :table-config="tableColums" :main-color="mainColor" :search-config="searchConfig"></BCrud>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useTheme from '@/stores/modules/theme'

import { BCrud, ICrudTableProps } from '@/components/Crud'
import { getTableConfig, getSearchConfig } from './config'

const themeStore = useTheme()
const tableColums = ref<ICrudTableProps>(getTableConfig())
const searchConfig = getSearchConfig()

const mainColor = computed(() => {
  return themeStore.mainColor
})
</script>

<style scoped lang="scss"></style>
