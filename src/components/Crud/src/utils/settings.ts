import { COLUMN_SETTINGS_PREFIX } from '../contants'
import { IColumnSettingColumn, IColumnSettingItem, IChangeSetting, IColumnFixedInfo } from '../types'

/**
 * 获取表格本地配置
 */
export const getColumnLocalSettings = (tableName?: string): null | IColumnSettingItem[] => {
  let localTableSettings = null
  if (tableName) {
    const localSettings = localStorage.getItem(COLUMN_SETTINGS_PREFIX + tableName.toUpperCase())
    if (localSettings) {
      // 已经存在了获取配置
      localTableSettings = JSON.parse(localSettings)
    }
  }

  return localTableSettings
}

/**
 * 初始化表格的本地配置
 * @param tableName
 */
export const initColumnLocalSettings = (tableName: string): IChangeSetting | {} => {
  const columnVisibleList: string[] = []
  const columnFixedInfo: IColumnFixedInfo = {}

  const localTableSettings = getColumnLocalSettings(tableName)
  if (localTableSettings) {
    localTableSettings.forEach((column) => {
      if (column.label && column.columVisible) {
        columnVisibleList.push(column.label)
      }

      if (column.prop) {
        columnFixedInfo[column.prop] = {
          fixed: column.fixed || false
        }
      }
    })

    return {
      columnFixedInfo,
      columnVisibleList
    }
  }

  return {}
}

/**
 * 生成表格默认配置
 */
export const generateDefaultSettings = (columns: IColumnSettingColumn[], tableName?: string): IColumnSettingItem[] | null => {
  if (!tableName) return null

  const localTableSettings = getColumnLocalSettings(tableName)

  if (localTableSettings) {
    return localTableSettings
  } else {
    const columnDefaultSettings = columns.map((column, index) => {
      return {
        label: column.label,
        prop: column.prop,
        excelExportVisible: column.excelExportVisible,
        columVisible: column.columVisible,
        type: column.type,
        fixed: column.fixed,
        currentIndex: index,
        originIndex: index
      }
    })

    if (!getColumnLocalSettings(tableName)) {
      localStorage.setItem(COLUMN_SETTINGS_PREFIX + tableName.toUpperCase(), JSON.stringify(columnDefaultSettings))
    }

    return columnDefaultSettings
  }
}

/**
 * 更新本地数据table设置数据
 */
// export const updateTableSettings = (tableName: string) => {
//   const localTableSettings = getColumnLocalSettings(tableName)
// }
