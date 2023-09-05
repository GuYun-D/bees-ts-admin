<template>
  <div class="colum-setting-container" v-if="settings">
    <div class="main">
      <el-descriptions title="列设置" direction="vertical" :column="2" border>
        <el-descriptions-item label="是否显示">
          <el-checkbox-group v-model="columnVisibleList">
            <el-checkbox :label="column.label" v-for="column in settings" :key="column.prop" />
          </el-checkbox-group>
        </el-descriptions-item>
        <el-descriptions-item label="表头排序"> 排序字段 </el-descriptions-item>
        <!-- <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province </el-descriptions-item> -->
      </el-descriptions>
    </div>

    <div class="footer">
      <el-button type="info">取消</el-button>
      <el-button type="primary" @click="handleConfirmColumSetting">确定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import bus from '../../utils/bus'
import { IChangeSetting, IColumnSettingItem } from '../../types'

const props = withDefaults(
  defineProps<{
    settings?: IColumnSettingItem[]
  }>(),
  {
    settings: undefined
  }
)

// const emits = defineEmits<{
//   (e: emitterEvents.CHANGE_COLUMN_VISIBLE, configInfo: IChangeSetting): void
// }>()

const columnVisibleList = ref<string[]>([])

const initSettings = (newSettings: IColumnSettingItem[]) => {
  columnVisibleList.value = newSettings.filter((column) => column.label && column.columVisible).map((item) => item.label)
}

watch(() => props.settings, initSettings, { immediate: true })

/**
 * 确定修改
 */
const handleConfirmColumSetting = () => {
  const newColumnSetting: IChangeSetting = {
    columnVisibleList: columnVisibleList.value
  }
  bus.emit('change-column-setting', newColumnSetting)
}
</script>

<style scoped lang="scss">
.colum-setting-container {
  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
