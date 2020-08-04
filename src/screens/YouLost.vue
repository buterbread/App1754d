<template>
<div class="you-lost">
  <h1>Game Over</h1>
  <a v-on:click.prevent="onRestartClick" class="restart">Restart</a>
  <a v-on:click.prevent="onMainMenuClick" class="restart">Main menu</a>
</div>
</template>

<script>
export default {
  methods: {
    onRestartClick() {
      this.$store.dispatch('stopGame');
      this.$store.commit('RESET_DROPS_COUNTER');
      this.$store.dispatch('startGame');
    },
    onMainMenuClick() {
      this.$store.dispatch('stopGame');

      this.$store.commit('RESET_DROPS_COUNTER');
      this.$store.commit('sceneController/SHOW_GAME_MODES_MENU');
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
