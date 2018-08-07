<template>
<div class="hello-screen">
  <router-link to="gameplay/new">New Game</router-link>
  <router-link to="gameplay/new">Continue</router-link>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.hello-screen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 50px 20px;
  z-index: 9999;
  background: #ffffff;
  font-size: 36px;
  color: cornflowerblue;
}
</style>
