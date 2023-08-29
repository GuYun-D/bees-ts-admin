import { ICrudTabldeFieldMap, IPageQuerySetting, IPageQuery } from '../types'

export const defaultFieldMap: Required<ICrudTabldeFieldMap> = {
  page: 'page',
  size: 'size',
  totalCount: 'totalCount',
  totalPages: 'totalPages',
  data: 'data'
}

export const defaultQuerySetting: IPageQuerySetting = {
  pageField: 'page',
  sizeField: 'size'
}

export const defaultQueryData: IPageQuery = {
  page: 1,
  size: 2
}
