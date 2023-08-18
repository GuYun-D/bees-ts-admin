<template>
  <div class="bee-app-main-view">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.bee-app-main-view {
  min-height: calc(100vh);
  width: 100%;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 239, 246);
}
</style>
