import { COLUMN_SETTINGS_PREFIX } from '../contants'
import { IColumnSettingColumn, IColumnSettingItem, IChangeSetting, IColumnFixedInfo, CacheType, UpdateLcalstorageSettings, IColumnSort } from '../types'

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
 * 设置本地存储
 */
export const setLocalColumnSettings = <T>(key: string, value: T) => {
  if (!key || !value) {
    console.warn('key and value is required')
    return
  }
  localStorage.setItem(COLUMN_SETTINGS_PREFIX + key.toUpperCase(), JSON.stringify(value))
}

/**
 * 初始化表格的本地配置
 * @param tableName
 */
export const initColumnLocalSettings = (tableName: string): IChangeSetting | {} => {
  const columnVisibleList: string[] = []
  const columnFixedInfo: IColumnFixedInfo = {}
  const columnSort: IColumnSort = {}

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

        columnSort[column.prop] = column.currentIndex
      }
    })

    return {
      columnFixedInfo,
      columnVisibleList,
      columnSort
    }
  }

  return {}
}

/**
 * 生成表格默认配置
 */
export const generateDefaultSettings = (columns: IColumnSettingColumn[], tableName?: string, columnSort?: IColumnSort): IColumnSettingItem[] | null => {
  if (!tableName) return null
  const localTableSettings = getColumnLocalSettings(tableName)

  if (localTableSettings) {
    if (columnSort) {
      return localTableSettings
        .map((column, index) => {
          if (column.prop) {
            column.currentIndex = columnSort[column.prop] || 0
            column.originIndex = index
          }
          return column
        })
        .sort((a, b) => a.currentIndex - b.currentIndex)
    } else {
      return localTableSettings
    }
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
export const updateTableSettings = (tableName: string, cacheType: CacheType, config: UpdateLcalstorageSettings) => {
  let localTableSettings = getColumnLocalSettings(tableName)
  console.log(config)

  if (localTableSettings) {
    switch (cacheType) {
      case 'visible':
        localTableSettings = localTableSettings.map((column) => {
          if (column.prop) {
            column.columVisible = (config as string[]).includes(column.label)
          }
          return column
        })

        setLocalColumnSettings(tableName, localTableSettings)
        break

      case 'fixed':
        localTableSettings = localTableSettings.map((column) => {
          if (column.prop) {
            column.fixed = (config as IColumnFixedInfo)[column.prop].fixed ?? false
          }
          return column
        })

        setLocalColumnSettings(tableName, localTableSettings)
        break

      case 'sort':
        localTableSettings = localTableSettings.map((column) => {
          if (column.prop) {
            column.currentIndex = (config as IColumnSort)[column.prop] ?? 0
          }
          return column
        })

        setLocalColumnSettings(tableName, localTableSettings)
        break
    }
  }
}
