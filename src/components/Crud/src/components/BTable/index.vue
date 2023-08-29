<template>
  <div class="bee-crud-table-container">
    <el-table @currentChange="events?.currentChange" :data="tableData" :highlight-current-row="isRadio" style="width: 100%" @selection-change="selectionColumConfig?.selectionChage">
      <!-- 多选 -->
      <el-table-column
        type="selection"
        :width="selectionColumConfig?.width"
        v-bind="selectionColumConfig?.options"
        v-if="selectionColumConfig?.type === 'selection'"
        :label="selectionColumConfig.label"
      >
      </el-table-column>

      <!-- 索引 -->
      <el-table-column
        v-bind="indexColumnConfig?.options"
        v-if="indexColumnConfig?.type === 'index'"
        :label="indexColumnConfig.label"
        type="index"
        :index="indexColumnConfig.setIndex"
        :width="indexColumnConfig.width"
      ></el-table-column>

      <!-- 普通列 -->
      <template v-for="column in tableColumnConfig" :key="column.prop">
        <el-table-column v-bind="column.options" :prop="column.prop" :label="column.label" :width="column.width" :type="column.type">
          <template #default="scope" v-if="column.prop !== 'handle'">
            {{ scope.row[column.prop] || (typeof column.defaultValue === 'function' ? column.defaultValue(scope.row) : column.defaultValue) }}
          </template>
        </el-table-column>
      </template>

      <!-- 操作 -->
      <el-table-column v-bind="handles?.options" v-if="handles" label="操作">
        <template #default="scope">
          <el-button @click="button.click(scope.row)" v-bind="button.options" v-for="button in handles.items" :key="button.name">{{ button.name }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import type { ICrudTableColumn, ICrudTableHandle, ITableEvents } from '../../types'

const props = withDefaults(
  defineProps<{
    tableData: any[]
    tableConfig: ICrudTableColumn[]
    handles?: ICrudTableHandle
    events?: ITableEvents
  }>(),
  {
    handles: undefined
  }
)

const tableColumnConfig = ref<ICrudTableColumn[]>([])
const indexColumnConfig = ref<ICrudTableColumn>()
const selectionColumConfig = ref<ICrudTableColumn>()
const isRadio = ref<boolean>(false)

watch(
  () => props.events,
  (newEvents) => {
    if (newEvents) {
      const { currentChange } = newEvents
      if (typeof currentChange === 'function') {
        isRadio.value = true
      }
    }
  },
  {
    immediate: true
  }
)

watch(
  () => props.tableConfig,
  (newTableConfig) => {
    // tableColumnConfig.value = newTableConfig

    newTableConfig.forEach((column) => {
      const { type } = column

      if (type) {
        if (type === 'index') {
          indexColumnConfig.value = column
        } else if (type === 'selection') {
          selectionColumConfig.value = column
        }
      } else {
        tableColumnConfig.value.push(column)
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped lang="scss"></style>
