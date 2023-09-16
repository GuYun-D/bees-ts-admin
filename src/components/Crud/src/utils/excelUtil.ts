import { IColumnSettingColumn, IExcelEnMapZh } from '../types'

/**
 * 生成 zh-en 映射表
 */
export const generateZhAndEnMap = (exportKeys: string[], tableColumns: IColumnSettingColumn[]): IExcelEnMapZh => {
  const mapObj: IExcelEnMapZh = {}
  tableColumns.forEach((column) => {
    if (exportKeys.includes(column.label)) {
      mapObj[column.label] = column.prop
    }
  })

  return mapObj
}

/**
 * 格式化excel 数据
 */
export const formatExcelData = <T = any>(header?: string[], data?: T[], columns?: IColumnSettingColumn[]) => {
  if (!header || !data) {
    console.error('this excel-header and data is required')
    return
  }

  if (!columns) {
    console.warn('config error')
    return
  }

  const maps = generateZhAndEnMap(header, columns)

  return data.map((column) => {
    return Object.keys(maps).map((key) => {
      const enTitle = maps[key]
      // @ts-ignore
      const rowData = column[enTitle]
      if (['function', 'object'].includes(typeof rowData)) {
        return JSON.stringify(rowData)
      } else {
        return rowData
      }
    })
  })
}
