import rgbHex from 'rgb-hex'
import cssColorFunction from 'css-color-function'
import axios from 'axios'
import formulaData from '@/contsant/formula'
import themeStaticColor from '@/assets/css/variables.module.scss'
import { isValidKey } from './validate'

/**
 * 把生成的演示表写到style中
 * @param {*} newStyle
 */
export const writeNewStyle = (newStyle: string) => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色生成新的样式表
 * @param mainColor 主色值
 * @returns
 */
export const generatePrimaryColor = async (mainColor: string) => {
  if (!mainColor) {
    return themeStaticColor.menuBg
  }
  const colors = generateCmyk(mainColor)
  let cssText = await getElementPlusOriginStyle()

  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })

  return cssText
}

/**
 * 生成色值表
 * @param mainColor 主色值
 * @returns
 */
export const generateCmyk = (primary: string) => {
  if (!primary) {
    return themeStaticColor.menuBg
  }
  const colors: { primary: string; [key: string]: string } = { primary }
  Object.keys(formulaData).forEach((key) => {
    if (isValidKey(key, formulaData)) {
      const value = (formulaData[key] as string).replace(/primary/g, primary)
      colors[key] = `#${rgbHex(cssColorFunction.convert(value))}`
    }
  })
  return colors
}

/**
 * 获取element-plus样式表
 */
export const getElementPlusOriginStyle = async () => {
  const elementPlusVersion = require('element-plus/package.json').version
  const url = `https://cdn.bootcdn.net/ajax/libs/element-plus/${elementPlusVersion}/index.css`
  const { data } = await axios.get(url)
  return getStyleTemplate(data)
}

/**
 * 把需要进行替换的色值打上标记
 * @param {*} data
 */
export const getStyleTemplate = (data: string) => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#337ecc': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((key) => {
    if (isValidKey(key, colorMap)) {
      const value = colorMap[key]
      data = data.replace(new RegExp(key, 'ig'), value)
    }
  })
  return data
}
