import type { ButtonProps, TableColumnCtx, ImageEmits, AvatarEmits, tagProps, avatarProps, imageProps, TableProps, SwitchEmits } from 'element-plus'
import type { IPageQuery } from './request'

type HandleFixPosition = 'left' | 'right'
type HandleMulitChoose = (rowList?: any[]) => void
type ColumnFixed = Boolean | 'right' | 'left'
type ValueTypeName = 'tag' | 'img' | 'avatar' | 'switch'

interface DynamicLoadOptions {
  [key: string]: any
}

type DynamicLoadFn<T = any> = (rowData: T, staticOptions: Partial<ButtonProps>) => DynamicLoadOptions

interface IValueTypeEvents extends Partial<ImageEmits>, Partial<AvatarEmits> {
  click?: (evt: MouseEvent) => boolean
  change?: SwitchEmits['change']
}

type IValueTypeOptions = Partial<typeof avatarProps> & Partial<typeof imageProps> & Partial<typeof tagProps>

interface IValueType {
  /* TODO: 参数动态化 */
  name: ValueTypeName
  options?: any
  events?: IValueTypeEvents
}

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

interface ICrudHandleItems<T = any> {
  /* 操作按钮名称 */
  name: string
  /* 点击操作之后执行的回调函数，回调参数是当前列的数据 */
  click: (rowData: T) => void
  /* 要绑定到按钮上的属性 */
  options?: Partial<ButtonProps>
  /* 动态修改button的属性 */
  dynamicLoad?: DynamicLoadFn<T>
  /* 是否显示该按钮 */
  show?: boolean | ((rowData: T) => boolean)
}

interface ICrudTableColumnDicts {
  label: string
  value: string | number
  color?: string
}

interface ICrudTableColumn<T = any> {
  /* 列类型 */
  type?: 'index' | 'selection'
  /* 自定义索引, 当type = index时有效 */
  setIndex?: (index: number) => void
  /* 选择列后触发的回调 */
  selectionChage?: HandleMulitChoose
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
  defaultValue?: number | string | boolean | null | undefined | symbol | bigint | ((rowData: T) => void)
  /* 是否固定列 */
  fixed?: ColumnFixed
  /* value-type options */
  valueTypeOption?: any
  /* valueType Name */
  valueType?: ValueTypeName | IValueType
}

/* 列设置类型 */
interface IColumnSettingColumn extends ICrudTableColumn {
  /* 是否选中,是否在列表中显示 */
  columVisible?: boolean
  /* 是否导出该字段 */
  excelExportVisible?: boolean
  /* 原始的index */
  originIndex: number
  /* 排序后的index */
  currentIndex: number
}

type IColumnSettingItem = Pick<IColumnSettingColumn, 'label' | 'columVisible' | 'excelExportVisible' | 'type' | 'prop' | 'fixed' | 'currentIndex' | 'originIndex' | 'width'>

interface ICrudTableHandle<T = any> {
  options: {
    width?: number
    fix?: HandleFixPosition
  }

  /* 列名字 */
  label?: string
  items: ICrudHandleItems<T>[]
}

interface ITableEvents {
  currentChange?: (currentRow: any, oldCurrentRow: any) => void
  headerDragend?: (newWidth: number, oldWidth: number, column: any, event: MouseEvent) => void
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
  handle?: ICrudTableHandle<T>

  /* 表格列设置 */
  columns: ICrudTableColumn<T>[]

  /* element-plus 表格事件 */
  events?: ITableEvents

  /* table 配置 */
  options?: Omit<Partial<TableProps<any>>, 'data'>

  /* 是否开启标头拖拽记忆功能 */
  draggingMemory?: boolean

  /* 显示刷新按钮 */
  showRefresh?: boolean
}

export type {
  ICrudTableColumnDicts,
  ValueTypeName,
  ColumnFixed,
  ICrudTableProps,
  ICrudTabldeFieldMap,
  ICrudTableColumn,
  ICrudTableHandle,
  ITableEvents,
  IColumnSettingColumn,
  HandleMulitChoose,
  IColumnSettingItem,
  IValueTypeEvents,
  IValueTypeOptions,
  DynamicLoadFn
}
