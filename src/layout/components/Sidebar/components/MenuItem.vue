<template>
  <!-- element-plus icon -->
  <i v-if="icon.includes('el-icon')" class="bee-menu-icon" :class="icon"></i>
  <!-- other icon -->
  <BeeIcon v-else :icon="icon"></BeeIcon>

  <span>{{ title }}</span>
</template>

<script setup lang="ts">
import BeeIcon from '@/components/BeeIcon/index.vue'
defineProps<{
  icon: string
  title: string
}>()
</script>

<style scoped lang="scss"></style>
