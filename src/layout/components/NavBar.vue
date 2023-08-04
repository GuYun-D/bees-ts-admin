<template>
  <div class="nav-bar">
    <!-- 右侧栏目 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :src="'http://t15.baidu.com/it/u=3485859598,14054287&fm=224&app=112&f=JPEG?w=500&h=500'"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a href="" target="__blank">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided>登出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia'
// import useUserStore from '@/stores/modules/user'
// const userStore = useUserStore()
// const { userInfo } = storeToRefs(userStore)
</script>

<style scoped lang="scss">
.nav-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    padding-right: 16px;

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
