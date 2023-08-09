import type { RouteRecordRaw } from 'vue-router'
import { isNull } from './validate'
const path = require('path')

/**
 * 过滤出所有子路由
 * @param routes
 */
const getAllChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (route.children && route.children.length > 0) {
      res.push(...route.children)
    }
  })

  return res
}

// 找到一级路由
export const filterRoutes = (routes: RouteRecordRaw[]) => {
  const allChildrenRoutes = getAllChildrenRoutes(routes)
  // console.log('所有的子路由', allChildrenRoutes)

  return routes.filter((route) => {
    return !allChildrenRoutes.find((childRoute) => {
      return childRoute.path === route.path
    })
  })
}

// 根据路由生成menu数据
export const generatemenus = (routes: RouteRecordRaw[], basePath = '') => {
  const result: RouteRecordRaw[] = []

  routes.forEach((route) => {
    // 不存在children和meta
    if (isNull(route.children) && isNull(route.meta)) return
    // 不存在meta但是存在children
    if (!isNull(route.children) && isNull(route.meta)) {
      return result.push(...generatemenus(route.children!))
    }

    // 存在children和meta或者存在mate不存在children
    const routePath = path.resolve(basePath, route.path)
    let existentRoute = result.find((item) => item.path === routePath)
    if (!existentRoute) {
      existentRoute = {
        ...route,
        path: routePath,
        children: []
      }

      if (existentRoute.meta && existentRoute.meta.title && existentRoute.meta.icon) {
        result.push(existentRoute)
      }
    }

    // 存在children，继续迭代
    if (route.children) {
      existentRoute.children!.push(...generatemenus(route.children!, existentRoute.path))
    }
  })

  return result
}
