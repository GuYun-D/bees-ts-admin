import { ICrudTableProps, ICrudSearchProps } from '@/components/Crud/index'
import { testCrudComponentsApi } from '@/service/api/login'

export const getTableConfig = (): ICrudTableProps => {
  return {
    requestApi(query) {
      return testCrudComponentsApi(query)
    },
    draggingMemory: false,
    showSetting: true,
    showExcelExport: true,
    name: 'test-column-setting',
    options: {
      height: 600,
      border: true
    },
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
          },
          dynamicLoad() {
            return {
              type: 'info',
              class: 'delete-btn'
            }
          },
          show(rowData) {
            return rowData.role === 1
          }
        }
      ]
    },

    events: {
      currentChange: (currentRow: any) => {
        console.log('单选的结果', currentRow)
      },
      headerDragend: (newWidth) => {
        console.log('列发生了变化', newWidth)
      }
    },

    columns: [
      {
        prop: 'selection',
        type: 'selection',
        label: '多选',
        selectionChage: (info) => {
          console.log('拿到了选中的内容', info)
        },
        options: {
          align: 'center'
        }
      },
      {
        prop: 'index',
        label: '#',
        type: 'index',
        // setIndex: (index) => (index + 'ha1'),
        options: {
          align: 'center'
        }
      },
      {
        prop: 'suoyin',
        label: '索引',
        width: 100,
        defaultValue: (rowData) => rowData.name
      },
      {
        prop: 'name',
        label: '用户姓名',
        width: 100,
        options: {
          showOverflowTooltip: true
        }
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
        prop: 'isDelete',
        label: '是否激活',
        valueType: {
          name: 'switch',
          options: {
            // disabled: true,
            // loading: true
          },
          events: {
            change(value) {
              console.log('来了老丢', value)
              return false
            }
          }
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
      data: 'list',
      size: 'pageSize',
      page: 'pageNo',
      totalCount: 'counts'
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
