<template>
  <div class="colum-setting-container" v-if="settings">
    <div class="main">
      <el-descriptions title="列设置" direction="vertical" :column="2" border>
        <el-descriptions-item label="是否显示">
          <el-checkbox-group v-model="columnVisibleList">
            <el-checkbox :label="column.label" v-for="column in settings" :key="column.prop" />
          </el-checkbox-group>
        </el-descriptions-item>
        <el-descriptions-item label="表头排序">
          <ul style="width: 150px" ref="sortableRef">
            <template v-for="(column, index) in settings" :key="column.label">
              <li v-if="index === column.currentIndex">
                <BeeIcon icon="s-move"></BeeIcon>
                <span>{{ column.label }}</span>
                <BeeIcon class="move" :color="columnFixedInfo[column.prop].fixed === 'left' ? '#409eff' : ''" @click="handleFixed(column.prop, 'left')" icon="s-left-move"></BeeIcon>
                <BeeIcon
                  class="move"
                  :color="columnFixedInfo[column.prop] && columnFixedInfo[column.prop].fixed === 'right' ? '#409eff' : ''"
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
import { watch, ref, onMounted } from 'vue'
import Sortable from 'sortablejs'
import bus from '../../utils/bus'
import { IColumnFixedInfo, IColumnSettingItem } from '../../types'
import BeeIcon from '@/components/BeeIcon/index.vue'

const props = withDefaults(
  defineProps<{
    settings?: IColumnSettingItem[]
  }>(),
  {
    settings: undefined
  }
)

const columnVisibleList = ref<string[]>([])
const columnFixedInfo = ref<IColumnFixedInfo>({})
const sortableRef = ref<HTMLElement>()

const initSettings = (newSettings?: IColumnSettingItem[]) => {
  if (newSettings?.length) {
    newSettings.forEach((column, index) => {
      if (column.label && column.columVisible) {
        columnVisibleList.value.push(column.label)
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
</script>

<style scoped lang="scss">
.colum-setting-container {
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
