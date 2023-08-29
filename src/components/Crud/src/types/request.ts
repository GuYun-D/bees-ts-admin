export type BeeQuery = string | number
export interface IPageQuery {
  page: BeeQuery
  size: BeeQuery
  [key: string]: any
}

export interface IPageQuerySetting {
  pageField: string
  sizeField: string
}
