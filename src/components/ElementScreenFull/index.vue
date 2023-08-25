<template>
  <div class="element-screen-full-container" id="guide-full">
    <slot>
      <BeeIcon :icon="screenFullIcon"></BeeIcon>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BeeIcon from '../BeeIcon/index.vue'

const props = defineProps<{
  isScreenFull: boolean
}>()

const screenFullIcon = computed(() => {
  return props.isScreenFull ? 's-out-screen' : 's-full-screen'
})
</script>

<style scoped lang="scss"></style>
