import { IPageQuery, IPageQuerySetting } from '../types'

export class PageQuery {
  queryBase: IPageQuery
  pageQuerySetting: IPageQuerySetting
  constructor(queryConfig: IPageQuery, pageQuerySetting: IPageQuerySetting) {
    this.queryBase = queryConfig
    this.pageQuerySetting = pageQuerySetting
  }

  setQueryConfig(newQuery: IPageQuery) {
    this.queryBase = newQuery
  }

  getQueryConfig(): IPageQuery {
    return this.queryBase
  }

  setQuerySetting(newQuerySetting: IPageQuerySetting) {
    this.pageQuerySetting = newQuerySetting
  }

  getQuerySetting(): IPageQuerySetting {
    return this.pageQuerySetting
  }
}
