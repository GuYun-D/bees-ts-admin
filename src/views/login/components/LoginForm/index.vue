<template>
  <div class="login-fofrm-wrapper">
    <h1>bees-ts-admin <LangSelect class="login-lang-select"></LangSelect></h1>

    <el-form ref="loginFormRef" :rules="loginRules" :model="form">
      <el-form-item prop="username">
        <el-input @keydown.enter="handleConfirmLogin" :placeholder="$t('login.usernamePlaceholder')" clearable v-model="form.username">
          <template #prefix>
            <BeeIcon class-name="icon" icon="el-icon-user" color="#409eff"></BeeIcon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input @keydown.enter="handleConfirmLogin" v-model="form.password" :type="passwordStatus" :placeholder="$t('login.passwordPlaceholder')">
          <template #prefix>
            <BeeIcon class-name="icon" :icon="passwordPrefixIocnName" color="#409eff"></BeeIcon>
          </template>

          <template #suffix>
            <BeeIcon @click="toggleInputType" class-name="icon view" icon="el-View" color="#409eff"></BeeIcon>
          </template>
        </el-input>
      </el-form-item>

      <!-- <el-form-item>
        <div class="code-wrapper">
          <el-input v-model="form.password" :type="passwordStatus" placeholder="请输入验证码">
            <template #prefix>
              <BeeIcon class-name="icon" icon="el-Picture" color="#409eff"></BeeIcon>
            </template>
            <template #suffix>
              <BeeIcon class-name="icon view" icon="el-RefreshRight" color="#409eff"></BeeIcon>
            </template>
          </el-input>
          <img src="https://img1.baidu.com/it/u=3115200608,3390489788&fm=253&fmt=auto&app=138&f=JPEG?w=686&h=225" alt="" class="code-image" />
        </div>
      </el-form-item> -->

      <div class="tip">
        <div class="save-pd">
          <el-checkbox v-model="isSavePd" :label="$t('login.savePassword')" size="large" />
        </div>
      </div>

      <el-button :loading="loginLoading" type="primary" block @click="handleConfirmLogin">{{ $t('login.loginBtn') }}</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BeeIcon from '@/components/BeeIcon/index.vue'
import type { ElForm } from 'element-plus'
import type { PasswordPrefixIconName, PasswordStatus, ILoginForm } from '@/model/login'
import LangSelect from '@/components/LangSelect/index.vue'
import { loginRules } from './rules'

const emits = defineEmits<{(e: 'login', ILoginForm: ILoginForm, loginSuccessCb?: () => void): void }>()

const isSavePd = ref<boolean>(true)
const loginLoading = ref<boolean>(false)
const passwordStatus = ref<PasswordStatus>('password')
const loginFormRef = ref<InstanceType<typeof ElForm>>()
const passwordPrefixIocnName = computed<PasswordPrefixIconName>(() => {
  return passwordStatus.value === 'password' ? 'el-icon-lock' : 'el-icon-unlock'
})

const form = ref<ILoginForm>({
  username: 'super-admin',
  password: '123456'
})

const toggleInputType = () => {
  passwordStatus.value = passwordStatus.value === 'password' ? 'text' : 'password'
}

const handleConfirmLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (!valid) return
    loginLoading.value = true
    emits('login', form.value, () => {
      loginLoading.value = false
    })
  })
}
</script>

<style scoped lang="scss">
.login-form-wrapper {
  * {
    user-select: none;
  }

  .login-lang-select {
    font-size: 28px;
  }

  h1 {
    color: rgba(1, 61, 139, 1);
    font-size: 2vw;
    margin: 0;
    text-align: center;
    margin-bottom: 2.7vw;
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .bee-icon {
      font-size: 0.7813vw;
    }
  }

  ::v-deep .icon {
    position: relative;
    top: 2px;
    vertical-align: text-top;
    margin-left: 5px;

    &.view {
      cursor: pointer;
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  .code-wrapper {
    display: flex;
    align-items: center;

    .code-image {
      width: 6.9vw;
      flex-shrink: 0;
      margin-left: 1vw;
    }
  }

  .tip {
    margin-bottom: 20px;
  }

  ::v-deep .el-button--primary {
    width: 100%;
    /* letter-spacing: 1em; */
  }

  ::v-deep .el-icon-loading {
    letter-spacing: normal;
    margin-right: 1em;
  }
}
</style>
