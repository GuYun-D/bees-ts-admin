<template>
  <!-- svg 图标 -->
  <svg v-if="svgIconName" @click="$emit('click')" :class="className" class="bee-icon" aria-hidden="true">
    <use :xlink:href="svgIconName" />
  </svg>

  <!-- element-plus 图标 -->
  <el-icon v-if="elIconName" @click="$emit('click')" :class="className" :size="size" :color="color">
    <component :is="elIconName"></component>
  </el-icon>
  <!-- 其他图标 -->
  <div v-if="otherIconStyle" @click="$emit('click')" :style="otherIconStyle" class="bee-icon bee-external-icon" :class="className"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface IBeeIcon {
  icon?: string
  className?: string
  size?: number
  color?: string
}

interface ISvgIconStyle {
  mask: string
  '-webkit-mask': string
}

const elIconName = ref<string | undefined>(undefined)
const svgIconName = ref<string | undefined>(undefined)
const otherIconStyle = ref<ISvgIconStyle | undefined>(undefined)

const props = withDefaults(defineProps<IBeeIcon>(), {
  size: 16
})

watch(
  () => props.icon,
  (iconName) => {
    if (iconName) {
      if (iconName.includes('el-')) {
        const name = iconName.replace('el-icon-', '')
        elIconName.value = name[0].toUpperCase() + name.slice(1)
      } else if (iconName.includes('s-')) {
        svgIconName.value = `#icon-${iconName.replace('s-', '')}`
      } else {
        otherIconStyle.value = {
          mask: `url(${props.icon}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
        }
      }
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.bee-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}

.bee-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
