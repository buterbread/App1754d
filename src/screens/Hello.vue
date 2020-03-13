<template>
<div>
  <GameModesMenu v-if="showGameModesMenu"></GameModesMenu>
  <ChaptersMenu v-if="showChaptersMenu"></ChaptersMenu>
  <SetsMenu v-if="showSetsMenu"></SetsMenu>
  <div class="scene" v-if="gameStarted">
    <div class="container">
      <div class="gameplayScene">
        <div class="gameplayScene-header">
          <div class="gameplayScene-headerCol">
            <button class="button gameplayScene-buttonMenu"></button>
          </div>
          <div class="gameplayScene-headerCol gameplayScene-headerCol--progress">
            <div class="gameplayScene-gameProgress">
              <div class="gameplayScene-gameProgressLevels">
                Level {{ this.$store.state.user.currentLevel.index + 1 }}
              </div>
              <div class="gameplayScene-gameProgressRooms">
                Room {{ this.$store.state.user.currentLevel.index + 1 }}/12
              </div>
            </div>
            <Drops-counter></Drops-counter>
          </div>
          <div class="gameplayScene-headerCol">
            <button class="button gameplayScene-buttonReset"></button>
          </div>
          <ComboMonitor v-if="false && this.$store.state.gameStarted"></ComboMonitor>
        </div>
        <Playground></Playground>
        <div class="gameplayScene-armoryBox">
          <div class="gameplayScene-armoryItemBox">
            <div class="gameplayScene-armoryItem"></div>
            <span class="gameplayScene-armoryItemText">05</span>
          </div>

          <div class="gameplayScene-armoryItemBox">
            <div class="gameplayScene-armoryItem"></div>
            <span class="gameplayScene-armoryItemText">05</span>
          </div>

          <div class="gameplayScene-armoryItemBox">
            <div class="gameplayScene-armoryItem"></div>
            <span class="gameplayScene-armoryItemText">05</span>
          </div>

          <div class="gameplayScene-armoryItemBox">
            <div class="gameplayScene-armoryItem"></div>
            <span class="gameplayScene-armoryItemText">05</span>
          </div>
        </div>

        <div class="gameplayScene-tools">
          <button class="button gameplayScene-tool">
            <i class="gameplayScene-toolIcon"></i>
            <span class="gameplayScene-toolText">08</span>
          </button>
          <button class="button gameplayScene-tool">
            <i class="gameplayScene-toolIcon"></i>
            <span class="gameplayScene-toolText">08</span>
          </button>
          <button class="button gameplayScene-tool">
            <i class="gameplayScene-toolIcon"></i>
            <span class="gameplayScene-toolText">08</span>
          </button>
          <button class="button gameplayScene-tool">
            <i class="gameplayScene-toolIcon"></i>
            <span class="gameplayScene-toolText">08</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameModesMenu from './MenuGameModes';
import ChaptersMenu from './MenuChapters';
import SetsMenu from './MenuSets';
import Playground from '../components/Playground';
import DropsCounter from '../components/DropsCounter';
import ComboMonitor from '../components/ComboMonitor';

export default {
  components: {
    GameModesMenu,
    ChaptersMenu,
    SetsMenu,
    Playground,
    DropsCounter,
    ComboMonitor,
  },
  methods: {
    isLastLevel() {
      return this.user.currentLevel.index + 1 === this.user.currentSet.levelsLength;
    },

    isLastSet() {
      return this.user.currentSet.index + 1 === this.user.currentChapter.setsLength;
    },

    isLastChapter() {
      return this.currentChapter.index + 1 === this.currentGame.chaptersMap.length;
    },
  },
  watch: {
    levelPassed(value) {
      if (!value) {
        return;
      }

      if (this.user.currentSet.loop) {
        this.$store.dispatch('startSet', this.currentSet.index);
        return;
      }

      if (this.isLastChapter() && this.isLastSet() && this.isLastLevel()) {
        this.$store.dispatch('startChapter', 0);
        return;
      }

      if (this.isLastSet() && this.isLastLevel()) {
        this.$store.dispatch('startChapter', this.currentChapter.index + 1);
        return;
      }

      if (this.isLastLevel()) {
        this.$store.dispatch('startSet', this.currentSet.index + 1);
        return;
      }

      this.$store.dispatch('startNextLevel');
    },
  },
  computed: {
    ...mapState({
      showGameModesMenu: state => state.sceneController.showGameModesMenu,
      showChaptersMenu: state => state.sceneController.showChaptersMenu,
      showSetsMenu: state => state.sceneController.showSetsMenu,
      gameStarted: state => state.gameStarted,
      currentGame: state => state.user.currentGame,
      currentChapter: state => state.user.currentChapter,
      currentSet: state => state.user.currentSet,
      user: state => state.user,
    }),
    ...mapGetters([
      'levelPassed',
    ]),
  },
};
</script>

<style lang="scss">
.gameplay {
  padding-left: 5px;
  padding-right: 5px
}

.playground-header {
  display: flex;
  width: 100%;
  align-items: center;
}

</style>
