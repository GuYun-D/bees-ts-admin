<template>
  <div class="login-page">
    <LoginForm class="login-form-wrapper"> </LoginForm>
    <Pane></Pane>
    <PersonPane></PersonPane>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm/index.vue'
import Pane from './components/Pane/index.vue'
import PersonPane from './components/PersonPane/index.vue'
</script>

<style scoped lang="scss">
.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/image/login-bg.png') no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25.42vw;
    height: 28.03vw;
    /* border: 1px solid #f40; */
  }
}
</style>
