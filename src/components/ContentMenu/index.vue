<template>
  <ul class="content-menu-container" v-bind="$attrs">
    <slot>
      <li v-for="item in menuList" :key="item.value" @click="handleClickMenuItem(item)">
        {{ item.label }}
      </li>
    </slot>
  </ul>
</template>

<script setup lang="ts">
export interface IContentMenuItem<T = any> {
  label: string
  value: T
  disabled?: boolean
}

defineProps<{
  menuList: IContentMenuItem[]
}>()

const emits = defineEmits<{
  (e: 'menuClick', data: IContentMenuItem): void
}>()

const handleClickMenuItem = (data: IContentMenuItem) => {
  emits('menuClick', data)
}
</script>

<style scoped lang="scss">
.content-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 10px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  z-index: 1000000000000;

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
