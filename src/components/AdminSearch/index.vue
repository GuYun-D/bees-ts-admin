<template>
  <div class="bee-admin-search-container" id="guide-search" :class="{ show: searchSelectVisible }">
    <BeeIcon v-bind="$attrs" className="search-icon" icon="s-search" @click.stop="handleToggleSeachVisible"></BeeIcon>

    <el-select
      ref="adminSearchSelectRef"
      v-model="searchValue"
      class="bee-admin-search"
      filterable
      :filter-method="handleSearchRoutes"
      :placeholder="$t('sys.searchPlaceholder')"
      @change="handleChooseItem"
    >
      <el-option v-for="searchOption in searchOptions" :key="searchOption.item.path" :value="searchOption.item">
        <div v-html="searchOption.item.title.join(' -> ').replaceAll(searchValue, `<span style='color: #f40'>${searchValue}</span>`)"></div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type Fuse from 'fuse.js'
import type { ElSelect } from 'element-plus'
import { filterRoutes } from '@/utils/route'
import BeeIcon from '../BeeIcon/index.vue'
import { generateSearchData, ISearchData } from './utils'
import useFuse, { IFuseKey } from './hooks'
import useLanguageSwtch from '@/hooks/useLanguageSwitch'

const router = useRouter()
const watchLanguageChange = useLanguageSwtch()
const searchOptions = ref<Fuse.FuseResult<ISearchData>[]>()
const searchValue = ref<string>('')
const searchSelectVisible = ref<boolean>(false)
const adminSearchSelectRef = ref<InstanceType<typeof ElSelect> | null>(null)
const fuseKeys: IFuseKey[] = [
  {
    name: 'title',
    weight: 0.7
  },
  {
    name: 'path',
    weight: 0.3
  }
]

const handleToggleSeachVisible = () => {
  searchSelectVisible.value = !searchSelectVisible.value
  if (searchSelectVisible.value) {
    adminSearchSelectRef.value?.blur()
  }
}

let searchPool = computed(() => {
  const filterRoutesData = filterRoutes(JSON.parse(JSON.stringify(router.getRoutes())))
  return generateSearchData(filterRoutesData)
})

let fuse = useFuse(searchPool.value, fuseKeys)
const handleSearchRoutes = (searchValue: string) => {
  searchOptions.value = searchValue ? fuse.value?.search(searchValue) : []
}

const handleCloseSearch = () => {
  adminSearchSelectRef.value?.blur()
  searchSelectVisible.value = false
  searchOptions.value = []
}

// 点击搜索结果项目
const handleChooseItem = (item: ISearchData) => {
  router.push(item.path)
  handleCloseSearch()
}

// 点击其他地方关闭
watch(
  () => searchSelectVisible.value,
  (isShow: boolean) => {
    if (isShow) {
      adminSearchSelectRef.value?.focus()
      document.addEventListener('click', handleCloseSearch)
    } else {
      document.removeEventListener('click', handleCloseSearch)
    }
  },
  {
    immediate: true
  }
)

// 监听语言切换
watchLanguageChange(() => {
  searchPool = computed(() => {
    const filterRoutesData = filterRoutes(JSON.parse(JSON.stringify(router.getRoutes())))
    return generateSearchData(filterRoutesData)
  })

  fuse = useFuse(searchPool.value, fuseKeys)
})
</script>

<style scoped lang="scss">
::v-deep .el-select-dropdown__item.selected {
  color: #000 !important;
}

.bee-admin-search-container {
  ::v-deep .search-icon {
    position: relative;
    top: 3px;
    font-size: 26px !important;
    padding: 0;
  }

  .bee-admin-search {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input--suffix.is-focus {
      .el-input__wrapper {
        box-shadow: none !important;
      }
    }

    ::v-deep .el-input__wrapper {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      box-shadow: none !important;
    }

    ::v-deep .el-input__suffix-inner {
      display: none;
    }
  }

  &.show {
    .bee-admin-search {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
