import type { ColumnFixed, IColumnSettingColumn } from './table'

type CacheType = 'visible' | 'excel' | 'fixed' | 'sort'
interface IColumnSort {
  [key: string]: number
}

interface IColumnFixedInfo {
  [key: string]: {
    fixed: ColumnFixed
    currentIndex?: number
    originIndex?: number
  }
}

interface IMoveColumnPosition {
  oldIndex: number
  newIndex: number
}

interface IChangeSetting {
  columnVisibleList: string[]
  columnFixedInfo: IColumnFixedInfo
  columnSort: IColumnSort
}

interface IUpdateLocalTableConfig {
  tag: 'columnVisible' | 'fixed' | ''
}

type LocalStorageColumSettings = null | string | IColumnSettingColumn[]
type UpdateLcalstorageSettings = string[] | IColumnFixedInfo | IColumnSort

export type { IChangeSetting, LocalStorageColumSettings, IColumnFixedInfo, IMoveColumnPosition, IUpdateLocalTableConfig, CacheType, UpdateLcalstorageSettings, IColumnSort }
