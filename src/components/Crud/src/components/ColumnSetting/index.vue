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
          <ul v-for="column in settings" :key="column.label" style="width: 150px">
            <li>
              <BeeIcon icon="s-move"></BeeIcon>
              <span>{{ column.label }}</span>

              <BeeIcon class="move" :color="columnFixedInfo[column.prop] === 'left' ? '#409eff' : ''" @click="handleFixed(column.prop, 'left')" icon="s-left-move"></BeeIcon>
              <BeeIcon
                class="move"
                :color="columnFixedInfo[column.prop] && columnFixedInfo[column.prop] === 'right' ? '#409eff' : ''"
                @click="handleFixed(column.prop, 'right')"
                icon="s-right-move"
              ></BeeIcon>
            </li>
          </ul>
        </el-descriptions-item>
        <!-- <el-descriptions-item label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province </el-descriptions-item> -->
      </el-descriptions>
    </div>

    <div class="footer">
      <el-button type="info">取消</el-button>
      <el-button type="primary" @click="handleConfirmColumSetting">确定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import bus from '../../utils/bus'
import { IChangeSetting, IColumnFixedInfo, IColumnSettingItem } from '../../types'
import BeeIcon from '@/components/BeeIcon/index.vue'

const props = withDefaults(
  defineProps<{
    settings?: IColumnSettingItem[]
  }>(),
  {
    settings: undefined
  }
)

// const emits = defineEmits<{
//   (e: emitterEvents.CHANGE_COLUMN_VISIBLE, configInfo: IChangeSetting): void
// }>()

const columnVisibleList = ref<string[]>([])
const columnFixedInfo = ref<IColumnFixedInfo>({})

const initSettings = (newSettings?: IColumnSettingItem[]) => {
  if (newSettings?.length) {
    newSettings.forEach((column) => {
      if (column.label && column.columVisible) {
        columnVisibleList.value.push(column.label)
      }

      columnFixedInfo.value[column.prop] = column.fixed
    })
  } else {
    columnVisibleList.value = []
  }
}

watch(() => props.settings, initSettings, { immediate: true })

/**
 * 确定修改
 */
const handleConfirmColumSetting = () => {
  const newColumnSetting: IChangeSetting = {
    columnVisibleList: columnVisibleList.value,
    columnFixedInfo: columnFixedInfo.value
  }
  bus.emit('change-column-setting', newColumnSetting)
}

/**
 * 修改固定列表信息
 * @param prop
 * @param direction
 */
const handleFixed = (prop: string, direction: 'right' | 'left') => {
  if (columnFixedInfo.value[prop]) {
    columnFixedInfo.value[prop] = false
  } else {
    columnFixedInfo.value[prop] = direction
  }
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

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
