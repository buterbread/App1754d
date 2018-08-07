<template>
  <div>
    <div class="gameplay-screen">
      <drops-counter></drops-counter>
      <comboMonitor v-if="this.$store.state.gameStarted"></comboMonitor>
      <playground></playground>
      <br />
      Level: {{ this.$store.state.user.currentLevel }}
      Discharges: {{ this.$store.state.dischargesCount }}
    </div>

    <div class="hello-screen" v-if="showHelloScreen">
      <a href="#" v-on:click.prevent="startNewGame" class="start-new-game">Start New Game</a>
      <br />
      <a href="#" v-on:click.prevent="continueGame" v-if="saveRecord" class="start-new-game">Continue Game</a>
    </div>
    <div class="you-lost" v-if="showLostScreen">
      <h1>Game Over</h1>
      <a href="#" v-on:click.prevent="restart" class="restart">Restart</a>
    </div>
    <div class="you-win" v-if="showWinScreen">
      <a href="#"
         v-on:click.prevent="nextLevel"
         class="next-level">Level {{ this.$store.state.user.currentLevel + 1}}</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dropsCounter from '../components/DropsCounter';
import playground from '../components/Playground';
import comboMonitor from '../components/ComboMonitor';

const saveRecordName = '__faraBubbleGame1754__';

export default {
  name: 'ScreenGameplay',
  components: {
    dropsCounter,
    playground,
    comboMonitor,
  },

  data() {
    return {
      showHelloScreen: true,
      showWinScreen: false,
      showLostScreen: false,
      saveRecord: this.getSaveRecord(),
    };
  },

  computed: {
    ...mapGetters([
      'youLost',
      'youWin',
    ]),
  },

  watch: {
    youLost(value) {
      if (!value) {
        return;
      }

      this.$store.dispatch('stopGame');
      setTimeout(() => { this.showLostScreen = true; }, 1000);
    },
    youWin(value) {
      if (!value) {
        return;
      }
      this.$store.commit('ADD_USER_DROP', 1);
      this.$store.dispatch('stopGame');
      this.$store.dispatch('saveProgress');
      setTimeout(() => { this.showWinScreen = true; }, 500);
    },
  },

  methods: {
    startNewGame() {
      this.showHelloScreen = false;
      this.$store.dispatch('startNewGame');
      localStorage.removeItem(saveRecordName);
    },

    restart() {
      this.showLostScreen = false;
      this.$store.dispatch('startNewGame');
    },

    nextLevel() {
      this.showWinScreen = false;
      this.$store.dispatch('startNextLevel');
    },

    getSaveRecord() {
      const saveRecord = localStorage.getItem(saveRecordName);
      if (saveRecord) {
        return JSON.parse(saveRecord);
      }

      return false;
    },

    continueGame() {
      this.showHelloScreen = false;
      this.$store.dispatch('continueGame', this.getSaveRecord());
    }
  },
};
</script>

<style lang="scss">
  .gameplay-screen {
    width: 375px;
    min-width: 320px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: auto;

    &:before,
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }

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

  .you-win {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
    z-index: 9999;
    background: #fafafa;
    font-size: 36px;
    color: mediumseagreen;
  }

  .next-level {
    text-decoration: none;
  }

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
