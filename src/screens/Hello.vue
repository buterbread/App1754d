<template>
<div class="hello-screen">
  <router-link to="gameplay/new">Start New Game</router-link>
  <br>
  <router-link to="gameplay/1">Level 1 - 1</router-link>
  <br>
  <router-link to="gameplay/2">Level 1 - 2</router-link>
  <br>
  <router-link to="gameplay/3">Level 1 - 3</router-link>
  <br>
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
