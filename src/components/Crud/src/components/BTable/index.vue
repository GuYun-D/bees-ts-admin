<template>
  <div class="bee-crud-table-container">
    <TableSettings :settings="tableSettings"></TableSettings>
    <el-table @currentChange="tableEvents?.currentChange" :data="tableData" :highlight-current-row="isUseSelectColumnItem" style="width: 100%" @selection-change="handleMuiltChooseChange">
      <template v-for="column in tableColumns" :key="column.prop">
        <!-- 多选 -->

        <el-table-column
          :fixed="column.fixed"
          v-if="column.type && column.type === 'selection' && column.columVisible"
          type="selection"
          :width="column?.width"
          v-bind="column?.options"
          :label="column.label"
        >
        </el-table-column>

        <!-- 索引 -->
        <el-table-column
          v-bind="column?.options"
          v-if="column?.type === 'index' && column.columVisible"
          :label="column.label"
          type="index"
          :index="column.setIndex"
          :width="column.width"
          :fixed="column.fixed"
        ></el-table-column>

        <!-- 普通列 -->
        <el-table-column
          v-if="!column.type && column.prop !== 'action' && column.columVisible"
          v-bind="column.options"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :type="column.type"
          :fixed="column.fixed"
        >
          <template #default="scope" v-if="column.prop !== 'handle'">
            {{ scope.row[column.prop] || (typeof column.defaultValue === 'function' ? column.defaultValue(scope.row) : column.defaultValue) }}
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column :fixed="column.fixed" v-bind="tableHandleColumn?.options" v-if="column.prop === 'action' && column.columVisible" label="操作">
          <template #default="scope">
            <el-button @click="button.click(scope.row)" v-bind="button.options" v-for="button in tableHandleColumn?.items" :key="button.name">{{ button.name }}</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import bus from '../../utils/bus'
import { TABLE_CONFIG_KEY, COLUMN_SETTINGS_PREFIX } from '../../contants'
import type {
  IColumnFixedInfo,
  ITableEvents,
  ICrudTableColumn,
  IColumnSettingColumn,
  ICrudTableHandle,
  HandleMulitChoose,
  IColumnSettingItem,
  IChangeSetting,
  LocalStorageColumSettings
} from '../../types'
import TableSettings from '../TableSettings/index.vue'

withDefaults(
  defineProps<{
    tableData: any[]
  }>(),
  {}
)
const tableConfig = inject(TABLE_CONFIG_KEY)
const tableColumns = ref<IColumnSettingColumn[]>([])
const tableSettings = ref<IColumnSettingItem[]>([])
const tableHandleColumn = ref<ICrudTableHandle>()
const isUseSelectColumnItem = ref<boolean>(false)
let tableEvents: ITableEvents
let handleMuiltChooseChange: HandleMulitChoose

/**
 * 生成配置
 * @param tableColumns
 */
const generateColumnSettings = (tableColumns: IColumnSettingColumn[]) => {
  tableSettings.value = tableColumns.map((column) => {
    return {
      label: column.label,
      prop: column.prop,
      excelExportVisible: column.excelExportVisible,
      columVisible: column.columVisible,
      type: column.type,
      fixed: column.fixed
    }
  })
}

/**
 * 更改配置
 * @param tableColumnsConfig
 * @param handles
 */
const changeColumnSetting = (newColumnSettings: IChangeSetting) => {
  const { columnVisibleList, columnFixedInfo } = newColumnSettings
  tableSettings.value = tableSettings.value?.map((item) => {
    item.columVisible = columnVisibleList.includes(item.label)
    item.fixed = columnFixedInfo[item.prop]
    return item
  })

  tableColumns.value.map((item) => {
    item.columVisible = columnVisibleList.includes(item.label)
    item.fixed = columnFixedInfo[item.prop]
    return item
  })

  localStorage.setItem(COLUMN_SETTINGS_PREFIX + tableConfig?.name?.toUpperCase(), JSON.stringify(tableSettings.value))
}

const initTable = (tableColumnsConfig: ICrudTableColumn[], showColumnLabels?: string[], columnFixedInfo?: IColumnFixedInfo) => {
  // TODO: 刷新之后action为隐藏
  const handles = tableConfig?.handle
  tableColumns.value = tableColumnsConfig.map((column) => {
    if (column.type && column.type === 'selection') {
      if (column.selectionChage) {
        handleMuiltChooseChange = column.selectionChage
      }
    }

    const columVisible = showColumnLabels ? showColumnLabels.includes(column.label) : true
    const fixed = (column.fixed = columnFixedInfo ? columnFixedInfo[column.prop] : false)

    const newColumn: IColumnSettingColumn = { ...column, excelExportVisible: true, columVisible, fixed }
    return newColumn
  })

  if (handles?.items.length) {
    tableHandleColumn.value = handles
    tableColumns.value.push({
      label: handles?.label ?? '操作',
      prop: 'action',
      excelExportVisible: true,
      columVisible: true,
      fixed: columnFixedInfo ? columnFixedInfo.action : 'right'
    })
  }

  console.log('你没得', tableColumns.value)

  generateColumnSettings(tableColumns.value)
}

const initEvents = (events?: ITableEvents) => {
  if (events) {
    tableEvents = events
    isUseSelectColumnItem.value = typeof events.currentChange === 'function'
  }
}

if (tableConfig) {
  const { events, columns } = tableConfig
  let localSettingConfig: LocalStorageColumSettings = localStorage.getItem(COLUMN_SETTINGS_PREFIX + tableConfig?.name?.toUpperCase())

  if (localSettingConfig) {
    localSettingConfig = JSON.parse(localSettingConfig)
    const columnFixedInfo: IColumnFixedInfo = {}
    const showColumnLabels: string[] = []
    if (Array.isArray(localSettingConfig)) {
      // debugger
      // const showColumnLabels = localSettingConfig.filter((item) => item.columVisible).map((item) => item.label)

      localSettingConfig.forEach((item) => {
        if (item.columVisible) {
          showColumnLabels.push(item.label)
        }

        if (item.fixed && item.prop && typeof item.prop === 'string') {
          columnFixedInfo[item.prop] = item.fixed
        }
      })

      console.log('我丢了', columnFixedInfo)

      initTable(columns, showColumnLabels, columnFixedInfo)
    }
  } else {
    initTable(columns)
  }

  initEvents(events)
}

onMounted(() => {
  bus.on('change-column-setting', (newColumnSettings) => changeColumnSetting(newColumnSettings))
})
</script>

<style scoped lang="scss"></style>
