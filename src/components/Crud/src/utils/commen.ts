import type { ICrudTableColumn, IRenderSearchConfig } from '../types'

/**
 * 判断一个对象是否为空
 */
export const isEmptyObj = (value: any) => {
  try {
    return ['{}', '[]'].includes(JSON.stringify(value))
  } catch (error) {
    return false
  }
}

/**
 * 判断一个对象是否是数组且含有元素
 */
export const isHasItemArray = (arr?: any) => {
  if (!arr) return false
  return Array.isArray(arr) && !!arr.length
}

/**
 * 获取 prop 的 数据
 */
export const getSearchConfigByProp = (tableColumns: ICrudTableColumn[], prop: string): IRenderSearchConfig | false => {
  const currentColumn = tableColumns.find((column) => column.prop === prop)
  if (!currentColumn) return false
  return {
    label: currentColumn.label,
    prop,
    dicts: currentColumn.dicts,
    component: isHasItemArray(currentColumn.dicts) ? 'select' : 'input'
  }
}
