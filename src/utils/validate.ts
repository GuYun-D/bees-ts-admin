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
