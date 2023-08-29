import type { ButtonProps, TableColumnCtx } from 'element-plus'
import type { IPageQuery } from './request'

type HandleFixPosition = 'left' | 'right'

interface ICrudTabldeFieldMap {
  /* table 数据列表 */
  data?: string
  /* 当前第一页 */
  page?: string
  /* 每页数据量 */
  size?: string
  /* 总页数 */
  totalPages?: string
  /* 数据总条数 */
  totalCount?: string
}

interface ICrudHandleItems {
  /* 操作按钮名称 */
  name: string
  /* 点击操作之后执行的回调函数，回调参数是当前列的数据 */
  // TODO: 列数据的类型？
  click: (rowData: any) => void
  /* 要绑定到按钮上的属性 */
  options?: Partial<ButtonProps>
  /* 动态修改button的属性 */
  // TODO: 列数据的类型？
  dynamicLoad?: (rowData: any) => void
  /* 是否显示该按钮 */
  // TODO: 列数据的类型？
  show?: boolean | ((rowData: any) => boolean)
}

interface ICrudTableColumnDicts {
  label: string
  value: string | number
  color?: string
}

interface ICrudTableColumn {
  /* 列类型 */
  type?: 'index' | 'selection'
  /* 自定义索引, 当type = index时有效 */
  setIndex?: (index: number) => void
  /* 选择列后触发的回调 */
  selectionChage?: (rowList: any[]) => void
  /* table 列显示的数据prop */
  prop: string
  /* 表头 */
  label: string
  /* 列宽度 */
  width?: number
  /* 枚举类型的数组 */
  dicts?: ICrudTableColumnDicts[]
  /* element-plus 原生的props  */
  options?: Partial<TableColumnCtx<any>>
  /* 值不存在时显示的值 */
  // TODO: 列数据的类型？
  defaultValue?: number | string | boolean | null | undefined | symbol | bigint | ((rowData: any) => void)
}

interface ICrudTableHandle {
  options: {
    width?: number
    fix?: HandleFixPosition
  }

  items: ICrudHandleItems[]
}

interface ITableEvents {
  currentChange?: (currentRow: any, oldCurrentRow: any) => void
}

interface ICrudTableProps<T = any> {
  /**
   * table name
   */
  name?: string

  /**
   * 获取table数据的api
   * @param qyery 请求参数，由crud组件提供，你可以在请求发送之前进行修改
   * @returns 返回一个promise
   */
  requestApi: (qyery: IPageQuery) => Promise<T>

  /**
   * 告知crud组件获取对应数据的key
   */
  fieldsMap?: ICrudTabldeFieldMap

  /**
   * 是否显示excel导出按钮
   */
  showExcelExport?: boolean

  /* 是否显示表格设置按钮 */
  showSetting?: boolean

  /* 表格操作列设置 */
  handle?: ICrudTableHandle

  /* 表格列设置 */
  columns: ICrudTableColumn[]

  /* element-plus 表格事件 */
  events?: ITableEvents
}

export type { ICrudTableProps, ICrudTabldeFieldMap, ICrudTableColumn, ICrudTableHandle, ITableEvents }
