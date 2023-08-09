/**
 * 判断当前对象是否是一个空数组或者空对象
 * @param value
 * @returns
 */
export const isEmptyObj = (value: any) => {
  try {
    return ['{}', '[]'].includes(JSON.stringify(value))
  } catch (error) {
    return false
  }
}

/**
 * 判断一个数据是否为空
 * @param value
 * @returns
 */
export const isNull = (value: any) => {
  if (!value) return true
  if (JSON.stringify(value) === '{}') return true
  if (JSON.stringify(value) === '[]') return true
}
