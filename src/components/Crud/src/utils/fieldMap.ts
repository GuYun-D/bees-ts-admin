import type { ICrudTabldeFieldMap } from '../types'

export class FieldMap {
  protected page = 'page'
  protected size = 'size'
  protected totalCount = 'totalCount'
  protected totalPages = 'totalPages'
  protected data = 'list'

  constructor(defualtFieldMap: Required<ICrudTabldeFieldMap>) {
    this.page = defualtFieldMap.page
    this.size = defualtFieldMap.size
    this.totalCount = defualtFieldMap.totalCount
    this.totalPages = defualtFieldMap.totalPages
    this.data = defualtFieldMap.data
  }

  setPageField(pageField: string) {
    this.page = pageField
  }

  getPageField(): string {
    return this.page
  }

  setSizeField(sizeField: string) {
    this.size = sizeField
  }

  getSizeField(): string {
    return this.size
  }

  setTotalCountField(totalCountField: string) {
    this.totalCount = totalCountField
  }

  getTotalCountField(): string {
    return this.totalCount
  }

  setTotalPagesField(totalPagesField: string) {
    this.totalPages = totalPagesField
  }

  getTotalPagesField(): string {
    return this.totalPages
  }

  setDataField(dataField: string) {
    this.data = dataField
  }

  getDataField(): string {
    return this.data
  }

  setField(config: ICrudTabldeFieldMap) {
    config.page && (this.page = config.page)
    config.size && (this.size = config.size)
    config.totalCount && (this.totalCount = config.totalCount)
    config.totalPages && (this.totalPages = config.totalPages)
    config.data && (this.data = config.data)
  }

  getField(): ICrudTabldeFieldMap {
    return {
      page: this.page,
      size: this.size,
      totalCount: this.totalCount,
      totalPages: this.totalPages,
      data: this.data
    }
  }
}
