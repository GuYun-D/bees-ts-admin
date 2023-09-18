import { ICrudTableProps, ICrudSearchProps } from '@/components/Crud/index'
import { testCrudComponentsApi } from '@/service/api/login'

export const getTableConfig = (): ICrudTableProps => {
  return {
    requestApi(query) {
      return testCrudComponentsApi(query)
    },

    showSetting: true,
    showExcelExport: true,
    name: 'test-column-setting',

    handle: {
      options: {
        width: 100,
        fix: 'right'
      },
      items: [
        {
          name: '删除',
          click: function (data) {
            console.log('点接了', data)
          },
          options: {
            type: 'danger'
          }
        }
      ]
    },

    events: {
      currentChange: (currentRow: any) => {
        console.log('单选的结果', currentRow)
      }
    },

    columns: [
      {
        prop: 'selection',
        type: 'selection',
        label: '多选',
        selectionChage: (info) => {
          console.log('拿到了选中的内容', info)
        }
      },
      // {
      //   prop: 'index',
      //   label: '#',
      //   type: 'index',
      //   options: {
      //     align: 'center'
      //   }
      // },
      {
        prop: 'suoyin',
        label: '索引',
        width: 100,
        defaultValue: () => '函数执行索引'
      },
      {
        prop: 'name',
        label: '用户姓名',
        width: 100
      },
      {
        prop: 'role',
        label: '用户角色',
        dicts: [
          {
            label: '超级管理员',
            value: 0
          },
          {
            label: '管理员',
            value: 1
          },
          {
            label: '员工',
            value: 2
          }
        ],
        valueTypeOption: {
          type: 'danger'
        }
      },
      {
        prop: 'avatar',
        label: '用户头像',
        valueType: 'avatar',
        options: {
          align: 'center'
        },
        valueTypeOption: {}
      },
      // {
      //   prop: 'img',
      //   label: '风景画',
      //   options: {
      //     align: 'center'
      //   },
      //   valueType: {
      //     name: 'img',
      //   }
      // },
      {
        prop: 'age',
        label: '年龄',
        defaultValue: '没写',
        width: 100,
        options: {
          sortable: true
        }
      }
    ],

    fieldsMap: {
      data: 'list'
    }
  }
}

export const getSearchConfig = (): ICrudSearchProps => {
  return [
    {
      label: '姓名',
      prop: 'name'
    },
    'role',
    'avatar'
  ]
}
