<template>
  <div class="you-lost">
    <h1>Game Over</h1>
    <a v-on:click.prevent="restart" class="restart">Start New Game</a>
  </div>
</template>

<script>
export default {
  methods: {
    restart() {
      this.$store.commit('sceneController/HIDE_LOST_SCREEN');
      this.$store.commit('user/UNLOCK_USER_INPUT');
      this.$store.dispatch('startRelax');
    },
  },
};
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
