import type { ColumnFixed, IColumnSettingColumn } from './table'

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
}

interface IUpdateLocalTableConfig {
  tag: 'columnVisible' | 'fixed' | ''
}

type LocalStorageColumSettings = null | string | IColumnSettingColumn[]

export type { IChangeSetting, LocalStorageColumSettings, IColumnFixedInfo, IMoveColumnPosition, IUpdateLocalTableConfig }
