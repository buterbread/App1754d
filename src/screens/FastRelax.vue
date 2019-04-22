<template>
  <div class="hello-screen">
    <a href="#"
       v-on:click.prevent="startNewGame"
       class="start-new-game">Start New Game</a>
    <br />
    <a href="#"
       v-on:click.prevent="continueGame"
       class="start-new-game"
       v-if="saveAvailable">Continue Game</a>
  </div>
</template>

<script>
import gameplayConfig from '../config/gameplay';

const { saveRecordName } = gameplayConfig;

export default {
  name: 'ScreenGameplay',

  computed: {
    saveAvailable() {
      return localStorage.getItem(saveRecordName) !== null;
    },
  },

  methods: {
    startNewGame() {
      this.$store.commit('sceneController/TEMP_HIDE_FASTRELAX');
      this.$store.dispatch('dropSave');
      this.$store.dispatch('startNewGame', 'relax');
    },

    continueGame() {
      this.$store.dispatch('restoreProgress');
    },
  },
};
</script>

<style lang="scss">
  .hello-screen {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
