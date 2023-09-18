<template>
  <div class="bee-crud-container">
    <BeeForm @seach="handleSeachTable" :search-config="searchConfig"></BeeForm>
    <BTable :table-data="tableData"></BTable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, onMounted } from 'vue'
import bus from './utils/bus'
import { TABLE_CONFIG_KEY } from './contants'
import BTable from './components/BTable/index.vue'
import BeeForm from './components/BeeForm/index.vue'
import type { ICrudTableProps, ICrudTabldeFieldMap, IPageQuery, ICrudSearchProps, ICommonOBJ } from './types'
import { FieldMap, PageQuery } from './utils'
import { defaultFieldMap, defaultQueryData, defaultQuerySetting } from './config'

const fm = new FieldMap(defaultFieldMap)
const pq = new PageQuery(defaultQueryData, defaultQuerySetting)

const props = withDefaults(
  defineProps<{
    tableConfig: ICrudTableProps
    searchConfig?: ICrudSearchProps
  }>(),
  {}
)

const tableData = ref<any>()
const totalTableCount = ref<number>(0)
let tableSeachQuery: ICommonOBJ = {}
let tableRequestApi: (query: IPageQuery) => Promise<any>
// const currentPage = ref<number | string>(pq.getQueryConfig().page)

/**
 * 整理数据
 */
const formatData = (data: any) => {
  const finalFields = fm.getField()
  totalTableCount.value = data[finalFields.totalCount!]
  tableData.value = data[finalFields.data!]
}

/**
 * 获取表格数据
 * @param query
 */
const fetchTableData = async () => {
  if (!tableRequestApi) {
    console.error('请在table-config配置中添加请求接口')
    return
  }

  try {
    const baseQueryInfo = pq.getQueryConfig()
    const res = await tableRequestApi({ ...baseQueryInfo, ...tableSeachQuery })
    formatData(res)
  } catch (error) {
    Promise.reject(error)
  }
}

/**
 * 点击搜索
 */
const handleSeachTable = async (queryInfo: ICommonOBJ, hiddenLoading: () => void) => {
  try {
    tableSeachQuery = queryInfo
    await fetchTableData()
  } catch (error) {
  } finally {
    hiddenLoading && typeof hiddenLoading === 'function' && hiddenLoading()
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
  tableRequestApi = requestApi
  fetchTableData()
  provide(TABLE_CONFIG_KEY, tableConfig)
}

watch(() => props.tableConfig, initColumns, {
  immediate: true,
  deep: true
})

onMounted(() => {
  bus.on('get-request-config', (cb) => {
    cb({
      queryInfo: pq.getQueryConfig(),
      queryConfig: fm.getField(),
      totalTableCount: totalTableCount.value
    })
  })
})
</script>

<style scoped lang="scss"></style>
