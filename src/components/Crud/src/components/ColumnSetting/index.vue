<template>
  <div class="colum-setting-container" v-if="settings">
    <div class="main">
      <el-descriptions title="列设置" direction="vertical" :column="2" border>
        <el-descriptions-item title="基本设置">
          <div class="setting-item">
            <el-divider content-position="left">
              <h6><BeeIcon icon="s-column-item"></BeeIcon> <span>是否显示</span></h6>
            </el-divider>
            <el-checkbox-group v-model="columnVisibleList">
              <el-checkbox size="small" :label="column.label" v-for="column in settings" :key="column.prop" />
            </el-checkbox-group>
          </div>

          <div class="setting-item">
            <el-divider content-position="left">
              <h6><BeeIcon icon="s-column-export"></BeeIcon> <span>是否导出</span></h6>
            </el-divider>
            <el-checkbox-group v-model="columnExportList">
              <template v-for="column in settings" :key="column.prop">
                <el-checkbox v-if="!(column.type ? ['selection'].includes(column.type) : column.prop === 'action')" size="small" :label="column.label" />
              </template>
            </el-checkbox-group>
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="表头排序">
          <ul style="width: 150px" ref="sortableRef">
            <template v-for="(column, index) in settings" :key="column.label">
              <li v-if="index === column.currentIndex">
                <BeeIcon icon="s-move"></BeeIcon>
                <span>{{ column.label }}</span>
                <BeeIcon class="move" :color="columnFixedInfo[column.prop].fixed === 'left' ? mainColor : ''" @click="handleFixed(column.prop, 'left')" icon="s-left-move"></BeeIcon>
                <BeeIcon
                  class="move"
                  :color="columnFixedInfo[column.prop] && columnFixedInfo[column.prop].fixed === 'right' ? mainColor : ''"
                  @click="handleFixed(column.prop, 'right')"
                  icon="s-right-move"
                ></BeeIcon>
              </li>
            </template>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, inject } from 'vue'
import Sortable from 'sortablejs'
import bus from '../../utils/bus'
import { IColumnFixedInfo, IColumnSettingItem } from '../../types'
import BeeIcon from '@/components/BeeIcon/index.vue'
import { BEE_COMPONENTS_MAIN_COLOR, DEFAULT_MAIN_COLOR } from '../../contants'

const props = withDefaults(
  defineProps<{
    settings?: IColumnSettingItem[]
  }>(),
  {
    settings: undefined
  }
)

const columnVisibleList = ref<string[]>([])
const columnExportList = ref<string[]>([])
const columnFixedInfo = ref<IColumnFixedInfo>({})
const sortableRef = ref<HTMLElement>()
const mainColor = ref<string>(inject(BEE_COMPONENTS_MAIN_COLOR) || DEFAULT_MAIN_COLOR)

const initSettings = (newSettings?: IColumnSettingItem[]) => {
  if (newSettings?.length) {
    newSettings.forEach((column, index) => {
      if (column.label) {
        column.columVisible && columnVisibleList.value.push(column.label)
        column.excelExportVisible && columnExportList.value.push(column.label)
      }

      columnFixedInfo.value[column.prop!] = {
        fixed: column.fixed ?? false,
        currentIndex: index,
        originIndex: index
      }
    })
  } else {
    columnVisibleList.value = []
  }
}

watch(() => props.settings, initSettings, { immediate: true })
watch(
  () => columnVisibleList.value,
  (newColumnSetting) => {
    bus.emit('change-column-visible', newColumnSetting)
  }
)
watch(
  () => columnExportList.value,
  (newColumnSetting) => {
    bus.emit('change-column-export', newColumnSetting)
  }
)

onMounted(() => {
  Sortable.create(sortableRef.value!, {
    animation: 150,
    onEnd(moveInfo) {
      const { oldIndex, newIndex } = moveInfo
      if ((oldIndex || oldIndex === 0) && (newIndex || newIndex === 0)) {
        bus.emit('move-column-position', { newIndex, oldIndex })
      }
    }
  })
})

/**
 * 修改固定列表信息
 * @param prop
 * @param direction
 */
const handleFixed = (prop: string, direction: 'right' | 'left') => {
  const currentFixedPosition = columnFixedInfo.value[prop].fixed
  if (currentFixedPosition === direction) {
    columnFixedInfo.value[prop]!.fixed = false
  } else {
    columnFixedInfo.value[prop]!.fixed = direction
  }

  bus.emit('change-column-fixed', columnFixedInfo.value)
}

bus.on('main-color-change', (newColor: string) => {
  mainColor.value = newColor
})
</script>

<style scoped lang="scss">
.colum-setting-container {
  h6 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;

    span {
      margin-left: 4px;
    }
  }

  ul {
    li {
      display: flex;
      align-items: center;
      cursor: move;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 14px;
      color: #3d3d3d;
      user-select: none;

      span {
        margin: 0 10px;
        flex: 1;
      }

      ::v-deep .move {
        cursor: pointer;
        margin-left: 5px;
        color: #f40;
      }

      &:hover {
        background-color: #f0efef;
      }
    }
  }
}
</style>
