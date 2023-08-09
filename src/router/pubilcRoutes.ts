import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        // 个人中心
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-first-aid-kit'
        }
      },
      {
        // 404
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        // 401
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

export default publicRoutes
