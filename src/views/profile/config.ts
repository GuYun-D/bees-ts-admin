import { ICrudTableProps } from '@/components/Crud/index'
import { testCrudComponentsApi } from '@/service/api/login'

export const getTableConfig = (): ICrudTableProps => {
  return {
    requestApi(query) {
      return testCrudComponentsApi(query)
    },

    showSetting: true,
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
        defaultValue: 'prop'
      },
      {
        prop: 'name',
        label: '用户姓名',
        width: 100
      },
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
