export const tagsWhiteList = ['/login', '/404', '401']

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

/**
 *
 * @param key 判断一个key是否是一个obj上的key
 * @param object
 * @returns
 */
export const isValidKey = (key: string | number | symbol, object: object): key is keyof typeof object => {
  return key in object
}

/**
 * 判断当前路由是否需要保存
 * @param path
 * @returns
 */
export const isSaveTag = (path: string): boolean => {
  return !tagsWhiteList.includes(path)
}
