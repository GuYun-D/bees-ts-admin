import Layout from '@/layout/index.vue'

export default [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: '/user/manage',
        name: 'user-manage',
        component: () => import('../views/user-mange/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'el-icon-cpu'
        }
      },
      {
        path: '/user/role',
        name: 'role-list',
        component: () => import('../views/role-list/index.vue'),
        meta: {
          title: 'roleManage',
          icon: 'el-icon-house'
        }
      },
      {
        path: '/user/permission',
        name: 'permission-list',
        component: () => import('../views/permission-list/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'el-icon-warning'
        }
      },
      {
        path: '/user/info/:id',
        name: 'user-info',
        component: () => import('../views/user-info/index.vue'),
        meta: {
          title: '用户信息'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('../views/import/index.vue'),
        meta: {
          title: 'importExcel'
        }
      }
    ]
  }
]
