import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import publicRoutes from './pubilcRoutes'

const routes: Array<RouteRecordRaw> = publicRoutes

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
