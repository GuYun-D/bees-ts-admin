<template>
  <div class="nav-bar">
    <Hamburger class="hamburger-container"></Hamburger>

    <Breadcrumb class="breadcrumb-container"></Breadcrumb>

    <!-- 右侧栏目 -->
    <div class="right-menu">
      <!-- 切换语言 -->
      <LangSelect class="right-menu-item hover"></LangSelect>

      <!-- 皮肤切换 -->
      <ThemeSelect class="right-menu-item hover"></ThemeSelect>

      <!-- 头像和操作菜单 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :src="'http://t15.baidu.com/it/u=3485859598,14054287&fm=224&app=112&f=JPEG?w=500&h=500'"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('sys.home') }}</el-dropdown-item>
            </router-link>
            <a href="" target="__blank">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item @click="handleLogout" divided>{{ $t('sys.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'

import useUserStore from '@/stores/modules/user'
import useTheme from '@/stores/modules/theme'

const userStore = useUserStore()
const themeStore = useTheme()

const handleLogout = () => {
  userStore.logout()
}

const hoverColor = ref<string>(themeStore.variables.menuBg)
</script>

<style scoped lang="scss">
.nav-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover {
        cursor: pointer;
        color: v-bind(hoverColor);
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
