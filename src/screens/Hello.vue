<template>
<div>
  <GameModesMenu v-if="showGameModesMenu"></GameModesMenu>
  <ChaptersMenu v-if="showChaptersMenu"></ChaptersMenu>
  <SetsMenu v-if="showSetsMenu"></SetsMenu>
  <div class="scene scene_gameplay" v-if="gameStarted">
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

        <footer class="gameplayScene-footer">
          <Inventory />
        </footer>
      </div>
    </div>
  </div>
  <YouLost v-if="youLost"></YouLost>
  <YouWin v-if="youWin"></YouWin>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import GameModesMenu from './MenuGameModes';
import ChaptersMenu from './MenuChapters';
import SetsMenu from './MenuSets';
import YouLost from './YouLost';
import YouWin from './YouWin';

import Playground from '../components/Playground';
import DropsCounter from '../components/DropsCounter';
import ComboMonitor from '../components/ComboMonitor';
import Inventory from '../components/Inventory';

export default {
  components: {
    GameModesMenu,
    ChaptersMenu,
    SetsMenu,
    Playground,
    DropsCounter,
    ComboMonitor,
    Inventory,
    YouLost,
    YouWin,
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
  computed: {
    ...mapState({
      showGameModesMenu: state => state.sceneController.showGameModesMenu,
      showChaptersMenu: state => state.sceneController.showChaptersMenu,
      showSetsMenu: state => state.sceneController.showSetsMenu,
      showArmoryDialog: state => state.sceneController.showArmoryDialog,
      showInventoryDialog: state => state.sceneController.showInventoryDialog,
      gameStarted: state => state.gameStarted,
      currentGame: state => state.user.currentGame,
      currentChapter: state => state.user.currentChapter,
      currentSet: state => state.user.currentSet,
      user: state => state.user,
      isRotationActive: state => state.user.isRotationActive,
    }),
    ...mapGetters([
      'levelPassed',
      'youLost',
      'youWin',
    ]),
  },
};
</script>

<style lang="scss">
.gameplay {
  padding-left: 5px;
  padding-right: 5px
}

.scene_gameplay {
  background: url("../assets/bgr--playground.jpg") top center no-repeat;
  background-size: cover;
}

.playground-header {
  display: flex;
  width: 100%;
  align-items: center;
}

</style>
