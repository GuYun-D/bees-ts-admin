<template>
  <div @click="handleChooseThemeColor" v-bind="$attrs" id="guide-theme">
    <BeeIcon icon="s-theme-select"></BeeIcon>
  </div>

  <el-dialog :close-on-click-modal="false" :title="$t('dialog.title')" v-model="themeSelectVisible" width="22%">
    <div class="content">
      <p class="title">{{ $t('sys.theme') }}</p>
      <el-color-picker v-model="myColor" :predefine="predefineColors"></el-color-picker>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="themeSelectVisible = false">{{ $t('dialog.cancel') }}</el-button>
        <el-button size="mini" type="primary" @click="handleConfirmSelectColor"> {{ $t('dialog.confirm') }} </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BeeIcon from '../BeeIcon/index.vue'
import useTheme from '@/stores/modules/theme'
import { generatePrimaryColor, writeNewStyle } from '@/utils/theme'

const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
  'rgb(13, 0, 255)'
]

const themeStore = useTheme()
const themeSelectVisible = ref<boolean>(false)
const myColor = ref<string>(themeStore.mainColor)

const handleChooseThemeColor = () => {
  themeSelectVisible.value = true
}

const handleConfirmSelectColor = async () => {
  const newStyle = await generatePrimaryColor(myColor.value)
  writeNewStyle(newStyle)
  themeStore.toggleMainColor(myColor.value)
  themeSelectVisible.value = false
}
</script>

<style scoped lang="scss">
.content {
  text-align: center;

  .title {
    margin-bottom: 12px;
  }
}
</style>
