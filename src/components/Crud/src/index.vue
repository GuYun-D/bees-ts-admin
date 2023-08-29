<template>
  <div class="bee-crud-container">
    <BTable :handles="tableHanldes" :table-config="tableColumns!" :table-data="tableData" :events="tableEvents"></BTable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BTable from './components/BTable/index.vue'
import type { ICrudTableProps, ICrudTabldeFieldMap, IPageQuery, ICrudTableColumn, ICrudTableHandle, ITableEvents } from './types'
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
const tableColumns = ref<ICrudTableColumn[]>()
const tableHanldes = ref<ICrudTableHandle>()
const tableEvents = ref<ITableEvents>()
// const currentPage = ref<number | string>(pq.getQueryConfig().page)

/**
 * 整理数据
 */
const formatData = (data: any) => {
  const finalFields = fm.getField()
  tableData.value = data[finalFields.data!]

  console.log('来了老弟', tableData)
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
    console.log(fm.getField())
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
  const { fieldsMap, columns, requestApi, handle, events } = tableConfig
  if (fieldsMap) {
    initFieldMap(fieldsMap)
  }
  fetchTableData(requestApi)
  tableColumns.value = columns
  tableHanldes.value = handle
  tableEvents.value = events
}

watch(() => props.tableConfig, initColumns, {
  immediate: true,
  deep: true
})
</script>

<style scoped lang="scss"></style>
