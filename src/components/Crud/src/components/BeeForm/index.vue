<template>
  <div class="search-container">
    <div class="search-item" v-for="item in renderFormItem" :key="item.label">
      <div class="search-label" v-if="item.label && item.placeholder">{{ item.label }}</div>

      <template v-if="item.component === 'input'">
        <el-input style="width: 200px" v-model="formData[item.prop]" :placeholder="item.placeholder ? item.placeholder : item.label" />
      </template>

      <template v-if="item.component === 'select'">
        <el-select style="width: 200px" v-model="formData[item.prop]" :placeholder="item.placeholder ? item.placeholder : item.label">
          <el-option v-for="option in item.dicts" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
    </div>

    <el-button class="search-item" @click="handleSeach" type="primary"> <BeeIcon icon="el-icon-search"></BeeIcon> 搜索</el-button>
    <el-button @click="handleResetForm" style="margin-left: 0 !important" class="search-item" type="info"> <BeeIcon icon="el-icon-refreshLeft"></BeeIcon> 重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { watch, inject, ref } from 'vue'
import { TABLE_CONFIG_KEY } from '../../contants'
import { ICrudSearchProps, ICurdSearchItem, IRenderSearchConfig, ICommonOBJ } from '../../types'
import { getSearchConfigByProp } from '../../utils'
import BeeIcon from '@/components/BeeIcon/index.vue'

const props = defineProps<{
  searchConfig?: ICrudSearchProps
}>()

const emits = defineEmits<{
  (e: 'seach', value1: ICommonOBJ, value2: () => void): void
}>()

const isLoading = ref<boolean>(false)
const tableConfig = inject(TABLE_CONFIG_KEY)
const formData = ref<any>({})
const renderFormItem = ref<IRenderSearchConfig[]>([])

/**
 * 整合搜索配置
 */
const initFormField = (formItems: ICurdSearchItem[]) => {
  formItems.forEach((searchColumn) => {
    if (typeof searchColumn === 'object') {
      renderFormItem.value.push({ ...searchColumn, component: searchColumn.component || 'input' })
      formData[searchColumn.prop] = ''
    } else if (typeof searchColumn === 'string') {
      const detailColumnInfo = getSearchConfigByProp(tableConfig!.columns, searchColumn)
      detailColumnInfo && renderFormItem.value.push(detailColumnInfo)
      detailColumnInfo && (formData[detailColumnInfo.prop] = '')
    }
  })
}

/**
 * 初始化搜索
 */
const inintForm = (searchConfig?: ICrudSearchProps) => {
  if (searchConfig) {
    if (Array.isArray(searchConfig)) {
      initFormField(searchConfig)
    } else if (typeof searchConfig === 'object') {
      const { options, style, items } = searchConfig
      console.log('form参数', options)
      console.log('样式', style)
      initFormField(items)
    }
  }
}

/**
 * 点击搜索
 */
const handleSeach = () => {
  isLoading.value = true
  emits('seach', formData.value, () => {
    isLoading.value = false
  })
}

/**
 * 点击重置
 */
const handleResetForm = () => {
  formData.value = {}
  isLoading.value = true
  emits('seach', formData.value, () => {
    isLoading.value = false
  })
}

watch(() => props.searchConfig, inintForm, { immediate: true })
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .search-item {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}

::v-deep .el-icon {
  margin-right: 5px;
}
</style>
