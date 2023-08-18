import i18n from '@/i18n'

/**
 * 国际化切换
 * @param text 要转换语言的key
 * @param prefixStr
 * @returns 转换后的文字
 */
export const generateTitle = (text: string, prefixStr = 'route') => {
  return i18n.global.t(`${prefixStr}.${text}`)
}
