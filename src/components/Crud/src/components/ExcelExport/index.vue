<template>
  <el-dialog v-model="excelExportDialogVisible" title="excel 导出" width="40%">
    <div class="bee-excel__export__body">
      <el-input v-model="excelTableName" placeholder="请填写导出excel表格名称">
        <template #prepend>
          <el-select v-model="excelExportMode" placeholder="Select" style="width: 115px">
            <el-option label="导出所选" value="1" />
            <el-option label="导出当前页" value="2" />
            <el-option label="导出全部" value="3" />
          </el-select>
        </template>
      </el-input>

      <h6 style="margin: 30px 0 10px 0">请选择要导出的字段</h6>
      <!-- 选择导出字段 -->
      <el-checkbox-group v-model="excelExportSelectFields">
        <el-checkbox :label="field" v-for="field in excelExportFields" :key="field" />
      </el-checkbox-group>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="excelExportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleExportExcel" :loading="isLoading"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { ElMessage } from 'element-plus'
import bus from '../../utils/bus'
import type { IColumnSettingColumn } from '../../types'
import { TABLE_CONFIG_KEY } from '../../contants'
import * as exporter from '../../utils/export2Excel'
import { formatExcelData } from '../../utils/excelUtil'

const tableConfig = inject(TABLE_CONFIG_KEY)
const excelExportDialogVisible = ref<boolean>(false)
const excelTableName = ref<string>()
const excelExportMode = ref<string>('2')
const excelExportFields = ref<string[]>([])
const excelExportSelectFields = ref<string[]>([])
const originTableColumns = ref<IColumnSettingColumn[]>([])
const isLoading = ref<boolean>(false)

const show = (tableColumns: IColumnSettingColumn[]) => {
  excelExportDialogVisible.value = true
  originTableColumns.value = tableColumns
  tableColumns.forEach((column) => {
    if (column.label && column.prop !== 'action') {
      excelExportFields.value.push(column.label)
      if (column.excelExportVisible) {
        excelExportSelectFields.value.push(column.label)
      }
    }
  })
}

/* 点击导出excel */
const handleExportExcel = () => {
  try {
    isLoading.value = true
    bus.emit('get-request-config', async (config) => {
      const { queryConfig, queryInfo } = config
      const res = await tableConfig?.requestApi(queryInfo)
      const excelExportData = res[queryConfig.data!]
      exporter.export_json_to_excel({
        header: excelExportSelectFields.value,
        data: formatExcelData(excelExportSelectFields.value, excelExportData, originTableColumns.value),
        filename: excelTableName.value || Date.now()
      })
      ElMessage.success('excel 导出成功')
      excelExportDialogVisible.value = false
    })
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

watch(
  () => excelExportDialogVisible.value,
  (visible) => {
    if (!visible) {
      excelExportFields.value = []
      excelExportSelectFields.value = []
    }
  }
)

defineExpose({
  show
})
</script>

<style scoped></style>
