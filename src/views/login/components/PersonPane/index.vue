<template>
  <div class="bee-login-left">
    <img src="@/assets/image/login-broad.png" class="bee-login-broad" alt="" />
    <img src="@/assets/image/login-person.png" class="bee-login-person" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bee-login-left {
  position: absolute;
  left: 2.11vw;
  bottom: 7.81vw;

  .bee-login-broad {
    width: 21.48vw;
    height: 18.65vw;
  }

  .bee-login-person {
    position: absolute;
    width: 6.56vw;
    height: 23.41vw;
    left: 4.48vw;
    bottom: -12vw;
  }
}
</style>
