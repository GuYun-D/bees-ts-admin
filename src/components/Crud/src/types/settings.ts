import type { IColumnSettingColumn } from './table'

interface IColumnFixedInfo {
  [key: string]: any
}

interface IChangeSetting {
  columnVisibleList: string[]
  columnFixedInfo: IColumnFixedInfo
}

type LocalStorageColumSettings = null | string | IColumnSettingColumn[]

export type { IChangeSetting, LocalStorageColumSettings, IColumnFixedInfo }
