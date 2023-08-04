<template>
  <el-menu :unique-opened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <!-- 子集  -->
    <el-submenu index="1">
      <template #title>
        <i class="el-iocn-location"></i>
        <span>导航一</span>
      </template>

      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
      <el-menu-item index="1-3">选项三</el-menu-item>
    </el-submenu>

    <!-- 具体的菜单 -->
    <el-menu-item index="2">菜单4</el-menu-item>
    <el-menu-item index="3">菜单4</el-menu-item>
  </el-menu>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss"></style>
