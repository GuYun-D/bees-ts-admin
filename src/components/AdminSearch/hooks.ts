import Fuse from 'fuse.js'
import { ref } from 'vue'
import type { ISearchData } from './utils'

export interface IFuseKey {
  name: string
  weight: number
}

export default (searchPool: ISearchData[], keys: IFuseKey[]) => {
  const fuse = ref<Fuse<ISearchData>>()
  fuse.value = new Fuse(searchPool, {
    shouldSort: true, // 按照优先级进行搜索
    minMatchCharLength: 1, // 匹配超过几个字符算搜索到了
    keys
  })

  return fuse
}
