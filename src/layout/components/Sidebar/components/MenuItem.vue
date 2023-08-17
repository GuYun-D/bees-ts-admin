<template>
  <!-- element-plus icon -->
  <i v-if="icon.includes('el-icon')" class="bee-menu-icon" :class="icon"></i>
  <!-- other icon -->
  <BeeIcon v-else class-name="bee-menu-icon" :icon="icon"></BeeIcon>

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
