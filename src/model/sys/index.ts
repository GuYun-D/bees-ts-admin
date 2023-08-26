import type { LocationQuery, RouteParams, RouteRecordName, useRouter } from 'vue-router'

type RemoveTag = 'index' | 'other' | 'right' | 'left' | 'refresh'

interface IRemoveTag {
  index: number
  type: RemoveTag
  fullPath: string
  router: ReturnType<typeof useRouter>
}

interface ITagMeta {
  title?: string
  icon?: string
  [key: string]: any
}

interface ITag {
  meta?: ITagMeta
  name: RouteRecordName | null | undefined
  query?: LocationQuery
  fullPath: string
  params: RouteParams
  path: string
  title?: string
}

interface ISysStore {
  sidebarOpened: boolean
  language: string
  tagViewList: ITag[]
  currentActiveRoute: string
}
export type { ITag, ISysStore, RemoveTag, IRemoveTag }
