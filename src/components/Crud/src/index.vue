<template>
  <div class="bee-crud-container">
    <BeeForm v-if="searchConfig" @seach="handleSeachTable" :search-config="searchConfig"></BeeForm>
    <BTable :table-data="tableData"></BTable>
    <div class="bee-el__pagination__wrapper">
      <el-pagination
        v-model:current-page="baseQueryInfo[tableSearchFieldsConfig.page!]"
        v-model:page-size="baseQueryInfo[tableSearchFieldsConfig.size!]"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalTableCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, onMounted } from 'vue'
import bus from './utils/bus'
import { TABLE_CONFIG_KEY, BEE_COMPONENTS_MAIN_COLOR } from './contants'
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
    mainColor?: string
  }>(),
  {
    mainColor: ''
  }
)

const tableData = ref<any>()
const totalTableCount = ref<number>(0)
const tableSearchFieldsConfig = ref<ICrudTabldeFieldMap>(fm.getField())
let tableSeachQuery: ICommonOBJ = {}
const baseQueryInfo = ref<IPageQuery>(pq.getQueryConfig())
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
    const res = await tableRequestApi({ ...baseQueryInfo.value, ...tableSeachQuery })
    formatData(res)
  } catch (error) {
    Promise.reject(error)
  }
}

/**
 * 点击搜索
 */
const handleSeachTable = async (queryInfo: ICommonOBJ, hiddenLoading: Function, isReset: boolean) => {
  isReset && (baseQueryInfo.value[tableSearchFieldsConfig.value.size!] = 20)
  isReset && (baseQueryInfo.value[tableSearchFieldsConfig.value.page!] = 1)
  try {
    tableSeachQuery = queryInfo
    await fetchTableData()
  } catch (error) {
  } finally {
    hiddenLoading && typeof hiddenLoading === 'function' && hiddenLoading()
  }
}

/**
 * 当前页发生变化
 */
const handleCurrentChange = (currentPage: number) => {
  baseQueryInfo.value[tableSearchFieldsConfig.value.page!] = currentPage
  fetchTableData()
}

/**
 * 当前size 发生变化
 */
const handleSizeChange = (currentPageSize: number) => {
  baseQueryInfo.value[tableSearchFieldsConfig.value.size!] = currentPageSize
  fetchTableData()
}

/**
 * 初始化接口返回值字段映射
 * 默认配置 全局配置 局部配置
 * @param fieldConfig
 */
const initFieldMap = (fieldConfig?: ICrudTabldeFieldMap) => {
  if (fieldConfig) {
    tableSearchFieldsConfig.value = fieldConfig
    // @ts-ignore
    fm.setField(fieldConfig)
    if (fieldConfig.page) {
      baseQueryInfo.value[fieldConfig.page!] = 1
      delete baseQueryInfo.value.page
    }

    if (fieldConfig.size) {
      baseQueryInfo.value[fieldConfig.size!] = 20
      delete baseQueryInfo.value.size
    }
  }
}

const initColumns = (tableConfig: ICrudTableProps) => {
  const { fieldsMap, requestApi } = tableConfig
  initFieldMap(fieldsMap)
  tableRequestApi = requestApi
  !props.searchConfig && fetchTableData()
  provide(TABLE_CONFIG_KEY, tableConfig)
  provide(BEE_COMPONENTS_MAIN_COLOR, props.mainColor)
}

watch(() => props.tableConfig, initColumns, {
  immediate: true,
  deep: true
})

watch(
  () => props.mainColor,
  (newColor) => {
    bus.emit('main-color-change', newColor)
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  bus.on('get-request-config', (cb) => {
    cb({
      queryInfo: pq.getQueryConfig(),
      queryConfig: fm.getField(),
      totalTableCount: totalTableCount.value
    })
  })

  bus.on('table-refresh', () => {
    handleSeachTable(
      {},
      () => {
        // TODO: 显示table loading
      },
      false
    )
  })
})
</script>

<style scoped lang="scss">
.bee-el__pagination__wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
