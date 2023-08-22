import { RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n'
const path = require('path')

export interface ISearchData {
  path: string
  title: string[]
}

export const generateSearchData = (routes: RouteRecordRaw[], basePath = '/', prefixTitle: string[] = []) => {
  let result: ISearchData[] = []

  for (const route of routes) {
    const data: ISearchData = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }

    if (route.children) {
      const tempRoutes = generateSearchData(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        result = [...result, ...tempRoutes]
      }
    }
  }

  return result
}
