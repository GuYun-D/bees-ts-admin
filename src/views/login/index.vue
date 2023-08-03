<template>
  <div class="login-page">
    <LoginForm @login="hanldeUserLogin" class="login-form-wrapper"> </LoginForm>
    <Pane></Pane>
    <PersonPane></PersonPane>
  </div>
</template>

<script setup lang="ts">
import { ILoginForm } from '@/model/login'
import useUserStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import LoginForm from './components/LoginForm/index.vue'
import Pane from './components/Pane/index.vue'
import PersonPane from './components/PersonPane/index.vue'

const userStore = useUserStore()

const hanldeUserLogin = (loginForm: ILoginForm, successCb?: () => void) => {
  userStore
    .fetchUserLogin(loginForm)
    .then(() => {
      ElMessage.success('登录成功')
      successCb && typeof successCb === 'function' && successCb()
    })
    .catch(() => {
      successCb && typeof successCb === 'function' && successCb()
    })
}
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
