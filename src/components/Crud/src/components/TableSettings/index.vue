<template>
  <div class="table-settings-container">
    <div class="right">
      <el-button v-if="tableConfig?.showExcelExport" type="success" @click="handleExportExcel"> <BeeIcon color="#fff" icon="s-excel-export" style="margin-right: 5px"></BeeIcon> excel 导出</el-button>
      <el-popover v-if="tableConfig?.showSetting" placement="bottom" :width="600" trigger="click">
        <template #reference>
          <el-button type="primary"> <BeeIcon style="margin-right: 5px" icon="el-icon-setting"></BeeIcon> 列设置</el-button>
        </template>

        <div style="width: 100%">
          <ColumnSetting :settings="settings"></ColumnSetting>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ColumnSetting from '../ColumnSetting/index.vue'
import type { IColumnSettingItem } from '../../types'
import BeeIcon from '@/components/BeeIcon/index.vue'
import bus from '../../utils/bus'
import { TABLE_CONFIG_KEY } from '../../contants'

const tableConfig = inject(TABLE_CONFIG_KEY)

withDefaults(
  defineProps<{
    settings?: IColumnSettingItem[]
  }>(),
  {
    settings: undefined
  }
)

const handleExportExcel = () => {
  bus.emit('export-excel')
}
</script>

<style lang="scss" scoped>
.table-settings-container {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
