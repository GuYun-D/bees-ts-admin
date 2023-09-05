import { ICrudTableColumn, IColumnSettingColumn } from '../types'
/**
 * 初始化列设置
 * @param tableName
 * @param columns
 * @returns
 */
export const setDefaultColumnSettings = (tableName: string, columns: ICrudTableColumn[]): IColumnSettingColumn[] => {
  const newColumns = columns.map((column) => {
    return {
      ...column,
      columVisible: true,
      excelExportVisible: true
    }
  })

  localStorage.setItem(`column-${tableName}`, JSON.stringify(newColumns))
  return newColumns
}
