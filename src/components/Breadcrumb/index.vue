<template>
  <el-breadcrumb class="breadcrumb"  separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(route, index) in breadcrumbData" :key="index">
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="(!route.children || !route.children.length) && route.meta">{{ route.meta.title }}</span>
        <!-- 可点击 -->
        <span class="redirect" @click="handleClickBreadcrumb(route)" v-else-if="route.meta && route.children && route.children.length">{{ route.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import useTheme from '@/stores/modules/theme'

const router = useRouter()
const route = useRoute()
const theme = useTheme()

const breadcrumbData = ref<RouteRecordRaw[]>()
const linkHoverColor = ref(theme.variables.menuBg)

const generateBreadcrumd = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title)
}

const handleClickBreadcrumb = (item: RouteRecordRaw) => {
  if (item.path) {
    router.push(item.path)
  }
}

watch(route, generateBreadcrumd, {
  immediate: true,
  deep: true
})
</script>

<style scoped lang="scss">
@import '../../assets/css/transition.scss';

.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8upx;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    transition: color 280ms;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
