import { TIME_STAMP, TOKEN_TIME_OUT } from '@/contsant'
import { getItem, setItem } from '@/utils/storage'

// 获取时间戳
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

// 更新时间戳
export const setTimeStamp = () => {
  setItem(TIME_STAMP, Date.now())
}

// 判断当前token是否失效
export const isCurrentTokenTimeout = (): boolean => {
  const currentDate = Date.now()
  const localTokenDate = getTimeStamp()
  return currentDate - localTokenDate > TOKEN_TIME_OUT
}
