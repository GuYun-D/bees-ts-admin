<template>
  <div class="bee-app-container" :class="app.sidebarOpened ? 'hideSidebar' : 'openSidebar'">
    <SideBar id="guide-sidebar" class="sidebar" :style="{ backgroundColor: themeStore.mainColor }"></SideBar>
    <div class="bee-main-area">
      <div class="bee-fixed-header">
        <NavBar></NavBar>
        <TagView id="guide-tags"></TagView>
      </div>

      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TagView from '../components/TagView/index.vue'
import AppMain from './components/AppMain.vue'
import SideBar from './components/Sidebar/index.vue'
import useApp from '@/stores/modules/app'
import useTheme from '@/stores/modules/theme'

const app = useApp()
const themeStore = useTheme()
</script>

<style scoped lang="scss">
@import '../assets/css/variables.module.scss';
@import '../assets/css/mixin.scss';

.bee-app-container {
  position: relative;
  height: 100%;
  width: 100%;

  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.bee-fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width $sidebarDuration;
}

.bee-app-container.hideSidebar .bee-fixed-header {
  width: calc(100% - #{$hideSidebarWidth});
}
</style>
