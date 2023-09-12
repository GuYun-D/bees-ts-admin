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
            <template v-if="!column.dicts && !column.valueType">
              {{ scope.row[column.prop] || scope.row[column.prop] === 0 ? scope.row[column.prop] : typeof column.defaultValue === 'function' ? column.defaultValue(scope.row) : column.defaultValue }}
            </template>

            <ValueType
              v-else
              :name="typeof column.valueType === 'string' ? column.valueType : column.valueType?.name"
              :options="column.valueTypeOption || (typeof column.valueType === 'object' && column.valueType.options ? column.valueType.options : undefined)"
              :events="typeof column.valueType === 'object' ? column.valueType.events : undefined"
              :dicts="column.dicts"
              :value="
                scope.row[column.prop] || scope.row[column.prop] === 0 ? scope.row[column.prop] : typeof column.defaultValue === 'function' ? column.defaultValue(scope.row) : column.defaultValue
              "
            ></ValueType>
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
import { TABLE_CONFIG_KEY } from '../../contants'
import type { IColumnSort, IColumnFixedInfo, ITableEvents, ICrudTableColumn, IColumnSettingColumn, ICrudTableHandle, HandleMulitChoose, IColumnSettingItem, IChangeSetting } from '../../types'
import TableSettings from '../TableSettings/index.vue'
import { initColumnLocalSettings, generateDefaultSettings, isEmptyObj, updateTableSettings } from '../../utils'
import ValueType from '../ValueType/index.vue'

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
const tableColumnName = ref<string>()
const isUseSelectColumnItem = ref<boolean>(false)
let tableEvents: ITableEvents
let handleMuiltChooseChange: HandleMulitChoose

const initTable = (tableColumnsConfig: ICrudTableColumn[], showColumnLabels?: string[], columnFixedInfo?: IColumnFixedInfo, columnSort?: IColumnSort) => {
  console.log(tableColumnsConfig)

  const handles = tableConfig?.handle
  tableColumns.value = tableColumnsConfig.map((column, index) => {
    if (column.type && column.type === 'selection') {
      if (column.selectionChage) {
        handleMuiltChooseChange = column.selectionChage
      }
    }

    const columVisible = showColumnLabels ? showColumnLabels.includes(column.label) : true
    let fixed
    if (columnFixedInfo && columnFixedInfo[column.prop] && columnFixedInfo[column.prop].fixed) {
      fixed = columnFixedInfo[column.prop].fixed
    } else {
      fixed = false
    }

    const currentIndex = column.prop && columnSort ? columnSort[column.prop] : 0

    const newColumn: IColumnSettingColumn = { ...column, excelExportVisible: true, columVisible, fixed, originIndex: index, currentIndex }
    return newColumn
  })

  if (handles?.items.length) {
    tableHandleColumn.value = handles
    tableColumns.value.push({
      label: handles?.label ?? '操作',
      prop: 'action',
      excelExportVisible: true,
      columVisible: showColumnLabels ? showColumnLabels.includes('操作') : true,
      fixed: columnFixedInfo ? columnFixedInfo.action!.fixed : 'right',
      originIndex: tableColumns.value.length + 1,
      currentIndex: columnSort ? columnSort.action : 0
    })
  }

  tableColumns.value.sort((a, b) => a.currentIndex - b.currentIndex)

  if (tableColumnName.value) {
    tableSettings.value = generateDefaultSettings(tableColumns.value, tableColumnName.value, columnSort) as IColumnSettingColumn[]
  }
}

const initEvents = (events?: ITableEvents) => {
  if (events) {
    tableEvents = events
    isUseSelectColumnItem.value = typeof events.currentChange === 'function'
  }
}

if (tableConfig) {
  const { events, columns, name } = tableConfig

  if (name) {
    tableColumnName.value = name
    const initLocalTableConfig = initColumnLocalSettings(name)
    if (initLocalTableConfig && !isEmptyObj(initLocalTableConfig)) {
      initTable(columns, (initLocalTableConfig as IChangeSetting).columnVisibleList, (initLocalTableConfig as IChangeSetting).columnFixedInfo!, (initLocalTableConfig as IChangeSetting).columnSort!)
    } else {
      initTable(columns)
    }
  } else {
    initTable(columns)
  }

  initEvents(events)
}

onMounted(() => {
  bus.on('change-column-visible', (newColumnVisibleArr) => {
    tableColumns.value = tableColumns.value.map((item) => {
      item.columVisible = newColumnVisibleArr.includes(item.label)
      return item
    })

    tableColumnName.value && updateTableSettings(tableColumnName.value, 'visible', newColumnVisibleArr)
  })
  bus.on('change-column-fixed', (newColumnFixedInfo) => {
    tableColumns.value = tableColumns.value.map((item) => {
      item.fixed = newColumnFixedInfo[item.prop]!.fixed ?? false
      return item
    })

    tableColumnName.value && updateTableSettings(tableColumnName.value, 'fixed', newColumnFixedInfo)
  })
  bus.on('move-column-position', ({ newIndex, oldIndex }) => {
    if (newIndex > oldIndex) {
      const left = tableColumns.value.slice(0, oldIndex)
      const center = tableColumns.value.slice(oldIndex + 1, newIndex + 1)
      const target = tableColumns.value[oldIndex]
      const rigth = tableColumns.value.slice(newIndex + 1)
      tableColumns.value = [...left, ...center, target, ...rigth]
    } else if (newIndex < oldIndex) {
      const left = tableColumns.value.slice(0, newIndex)
      const target = tableColumns.value[oldIndex]
      const center = tableColumns.value.slice(newIndex, oldIndex)
      const rigth = tableColumns.value.slice(oldIndex + 1)
      tableColumns.value = [...left, target, ...center, ...rigth]
    }

    const newColumnSort: IColumnSort = {}
    tableColumns.value.forEach((column, index) => {
      if (column.prop) {
        newColumnSort[column.prop] = index
      }
    })
    tableColumnName.value && updateTableSettings(tableColumnName.value, 'sort', newColumnSort)
  })
})
</script>

<style scoped lang="scss"></style>
