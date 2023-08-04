<template>
  <div class="bee-app-container">
    <SideBar class="sidebar"></SideBar>
    <div class="bee-main-area">
      <div class="bee-fixed-header">
        <NavBar></NavBar>
        <TagView></TagView>
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
</script>

<style scoped lang="scss"></style>
