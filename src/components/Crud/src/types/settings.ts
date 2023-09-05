import type { IColumnSettingColumn } from './table'

interface IChangeSetting {
  columnVisibleList: string[]
}

type LocalStorageColumSettings = null | string | IColumnSettingColumn[]

export type { IChangeSetting, LocalStorageColumSettings }
