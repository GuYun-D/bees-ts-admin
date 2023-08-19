<template>
  <!-- element-plus icon -->
  <!-- <i v-if="icon.includes('el-icon')" class="bee-menu-icon" :class="icon"></i> -->
  <!-- other icon -->
  <BeeIcon class-name="bee-menu-icon" :icon="icon"></BeeIcon>

  <span>{{ generateTitle(title) }}</span>
</template>

<script setup lang="ts">
import BeeIcon from '@/components/BeeIcon/index.vue'
import { generateTitle } from '@/utils/i18n'
defineProps<{
  icon: string
  title: string
}>()
</script>

<style scoped lang="scss"></style>
