import type { CSSProperties } from 'vue'
import type { ElForm } from 'element-plus'
import type { ICrudTableColumnDicts } from './table'

type SeachComponents = 'input' | 'select' | 'date'

interface ISearch {
  prop: string
  label: string
  component?: SeachComponents
  width?: number
  placeholder?: string
}

type ICurdSearchItem = string | ISearch

interface ICrudSearch {
  style?: CSSProperties
  options?: typeof ElForm
  items: ICurdSearchItem[]
}

interface IRenderSearchConfig extends ISearch {
  dicts?: ICrudTableColumnDicts[]
}

type ICrudSearchProps = ICurdSearchItem[] | ICrudSearch
export type { ICrudSearchProps, ICurdSearchItem, IRenderSearchConfig }
