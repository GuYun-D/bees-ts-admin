import type { IColumnSettingColumn, IExcelEnMapZh } from '../types'
import * as exporter from './export2Excel'

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
 * 格式化带字典的数据
 */
const formatDictsData = (data: any, prop: string, columns: IColumnSettingColumn[], index: number, columnData: any) => {
  console.log('你是啥', columnData)

  const currentColumn = columns.find((column) => column.prop === prop)
  if (currentColumn) {
    if (prop === 'index') {
      return currentColumn.setIndex ? currentColumn.setIndex(index) : index
    } else if (currentColumn.dicts) {
      const dicts = currentColumn.dicts
      const currentDict = dicts.find((item) => item.value === data)
      if (currentDict) {
        return currentDict.label
      }
    } else if (currentColumn.defaultValue) {
      return !data ? (typeof currentColumn.defaultValue === 'function' ? currentColumn.defaultValue(columnData) : currentColumn.defaultValue) : currentColumn.defaultValue
    } else {
      return data
    }
  } else {
    return data
  }
}

/**
 * 格式化excel 数据
 */
export const formatExcelData = <T = any>(header?: string[], data?: T[], columns?: IColumnSettingColumn[]) => {
  if (!header || !data) {
    console.error('the excel-header and data is required')
    return
  }

  if (!columns) {
    console.warn('config error')
    return
  }

  const maps = generateZhAndEnMap(header, columns)

  return data.map((column, index) => {
    return Object.keys(maps).map((key) => {
      const enTitle = maps[key]
      // @ts-ignore
      const rowData = column[enTitle]
      if (['function', 'object'].includes(typeof rowData)) {
        return JSON.stringify(rowData)
      } else {
        return formatDictsData(rowData, enTitle, columns, index, column)
      }
    })
  })
}

/**
 * 导出excel
 */
export const exportExcelFc = (excelHeader: string[], data: any[], originColumns: IColumnSettingColumn[], filename?: string) => {
  return new Promise((resolve, reject) => {
    try {
      exporter.export_json_to_excel({
        header: excelHeader,
        data: formatExcelData(excelHeader, data, originColumns),
        filename: filename || Date.now()
      })
      resolve('')
    } catch (error) {
      reject(error)
    }
  })
}
