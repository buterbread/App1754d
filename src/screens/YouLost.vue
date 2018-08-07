<template>
<div class="you-lost">
  <h1>Game Over</h1>
  <router-link to="gameplay" class="restart">Restart</router-link>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.you-lost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 50px 20px;
  z-index: 9999;
  background: #333;
  font-size: 36px;
  color: coral;
}

.restart {
  color: #ffffff;
}
</style>
