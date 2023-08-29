<template>
  <div>
    <BCrud :table-config="tableColums"></BCrud>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { BCrud, ICrudTableProps } from '@/components/Crud'
import { getTableConfig } from './config'

const tableColums = ref<ICrudTableProps>(getTableConfig())
</script>

<style scoped lang="scss"></style>
