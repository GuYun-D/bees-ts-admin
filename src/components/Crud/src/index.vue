<template>
  <div class="bee-crud-container">
    <BTable :table-data="tableData"></BTable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue'
import { TABLE_CONFIG_KEY } from './contants'
import BTable from './components/BTable/index.vue'
import type { ICrudTableProps, ICrudTabldeFieldMap, IPageQuery } from './types'
import { FieldMap, PageQuery } from './utils'
import { defaultFieldMap, defaultQueryData, defaultQuerySetting } from './config'

const fm = new FieldMap(defaultFieldMap)
const pq = new PageQuery(defaultQueryData, defaultQuerySetting)

const props = withDefaults(
  defineProps<{
    tableConfig: ICrudTableProps
  }>(),
  {}
)

const tableData = ref<any>()
// const currentPage = ref<number | string>(pq.getQueryConfig().page)

/**
 * 整理数据
 */
const formatData = (data: any) => {
  const finalFields = fm.getField()
  tableData.value = data[finalFields.data!]
}

/**
 * 获取表格数据
 * @param query
 */
const fetchTableData = async (requestApi: (query: IPageQuery) => Promise<any>) => {
  try {
    const baseQueryInfo = pq.getQueryConfig()
    const res = await requestApi(baseQueryInfo)
    formatData(res)
  } catch (error) {
    Promise.reject(error)
  }
}

/**
 * 初始化接口返回值字段映射
 * 默认配置 全局配置 局部配置
 * @param fieldConfig
 */
const initFieldMap = (fieldConfig: ICrudTabldeFieldMap) => {
  // @ts-ignore
  fm.setField(fieldConfig)
}

const initColumns = (tableConfig: ICrudTableProps) => {
  const { fieldsMap, requestApi } = tableConfig
  if (fieldsMap) {
    initFieldMap(fieldsMap)
  }
  fetchTableData(requestApi)
  provide(TABLE_CONFIG_KEY, tableConfig)
}

watch(() => props.tableConfig, initColumns, {
  immediate: true,
  deep: true
})
</script>

<style scoped lang="scss"></style>
