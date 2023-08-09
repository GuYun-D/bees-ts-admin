import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import publicRoutes from './pubilcRoutes'
import privateRoutes from './privateRoutes'

const routes: Array<RouteRecordRaw> = [...publicRoutes, ...privateRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
