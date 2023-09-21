<template>
  <el-dialog v-model="excelExportDialogVisible" title="excel 导出" width="40%">
    <div class="bee-excel__export__body">
      <el-input v-model="excelTableName" placeholder="请填写导出excel表格名称">
        <template #prepend>
          <el-select v-model="excelExportMode" placeholder="Select" style="width: 115px">
            <el-option :disabled="!exportSelectData.length" label="导出所选" value="1" />
            <el-option :disabled="!currentPageData.length" label="导出当前页" value="2" />
            <el-option label="导出全部" value="3" />
          </el-select>
        </template>
      </el-input>

      <ul class="tip-wrapper">
        <li v-if="!exportSelectData.length" class="tip">当前您未选择任何需要导出的数据</li>
        <li v-if="!currentPageData.length" class="tip">当前页面没有数据</li>
      </ul>

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
import bus from '../../utils/bus'
import type { IColumnSettingColumn } from '../../types'
import { TABLE_CONFIG_KEY } from '../../contants'
import { exportExcelFc } from '../../utils/excelUtil'
import { ElMessage } from 'element-plus'

const tableConfig = inject(TABLE_CONFIG_KEY)
const excelExportDialogVisible = ref<boolean>(false)
const excelTableName = ref<string>()
const excelExportMode = ref<string>('1')
const excelExportFields = ref<string[]>([])
const excelExportSelectFields = ref<string[]>([])
const originTableColumns = ref<IColumnSettingColumn[]>([])
const isLoading = ref<boolean>(false)
const exportSelectData = ref<any[]>([])
const currentPageData = ref<any[]>([])

const show = (tableColumns: IColumnSettingColumn[], selectColumnData: any[], currentTableData: any) => {
  excelExportDialogVisible.value = true
  originTableColumns.value = tableColumns
  exportSelectData.value = selectColumnData
  currentPageData.value = currentTableData
  tableColumns.forEach((column) => {
    if (column.label && column.prop !== 'action' && column.type !== 'selection') {
      excelExportFields.value.push(column.label)
      if (column.excelExportVisible) {
        excelExportSelectFields.value.push(column.label)
      }
    }
  })
}

/* 点击导出excel */
const handleExportExcel = async () => {
  try {
    isLoading.value = true
    switch (excelExportMode.value) {
      case '1':
        await exportExcelFc(excelExportSelectFields.value, exportSelectData.value, originTableColumns.value, excelTableName.value)
        ElMessage.success('excel 导出成功')
        excelExportDialogVisible.value = false
        break

      case '2':
        await exportExcelFc(excelExportSelectFields.value, currentPageData.value, originTableColumns.value, excelTableName.value)
        ElMessage.success('excel 导出成功')
        excelExportDialogVisible.value = false
        break

      case '3':
        bus.emit('get-request-config', async (config) => {
          const { queryConfig, queryInfo, totalTableCount } = config
          if (queryConfig.size) {
            queryInfo[queryConfig.size] = totalTableCount
          }

          const res = await tableConfig?.requestApi(queryInfo)
          const excelExportData = res[queryConfig.data!]
          await exportExcelFc(excelExportSelectFields.value, excelExportData, originTableColumns.value, excelTableName.value)
          ElMessage.success('excel 导出成功')
          excelExportDialogVisible.value = false
        })
        break
    }
  } catch (error) {
    ElMessage.error('excel 导出失败')
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

<style scoped lang="scss">
.tip-wrapper {
  margin-top: 10px;
  .tip {
    color: #ccc;
    font-size: 24upx;
    line-height: 1.5;
    color: #f56c6c;
  }
}
</style>
