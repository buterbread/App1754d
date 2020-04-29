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
          <Dialog
            v-if="showArmoryDialog"
            v-bind:classNames="'gameplayScene-armoryDialog'"
          />

          <div class="gameplayScene-armoryBox">
            <div class="gameplayScene-armoryItemBox">
              <div class="gameplayScene-armoryItem">
                <Bubble
                  v-bind:item="{ type: 'bobomb', value: 4, maxItemValue: 4, emitters: [] }"
                  v-bind:on-item-click="() => onArmoryItemClick('bobomb')" />
              </div>
              <span class="gameplayScene-armoryItemText">05</span>
            </div>

            <div class="gameplayScene-armoryItemBox">
              <div class="gameplayScene-armoryItem">
                <Bubble
                  v-bind:item="{ type: 'laser', value: 1, maxItemValue: 1, emitters: [] }"
                  v-bind:on-item-click="() => onArmoryItemClick('laser')" />
              </div>
              <span class="gameplayScene-armoryItemText">05</span>
            </div>
          </div>

          <div class="gameplayScene-tools">
            <button class="button gameplayScene-tool" v-on:click="onSwapClick">
              <i class="gameplayScene-toolIcon gameplayScene-toolIcon--swap"></i>
              <span class="gameplayScene-toolText">08</span>
            </button>
            <button class="button gameplayScene-tool" v-on:click="onRotateClick">
              <i class="gameplayScene-toolIcon gameplayScene-toolIcon--rotate"></i>
              <span class="gameplayScene-toolText">08</span>
            </button>
            <button class="button gameplayScene-tool">
              <i class="gameplayScene-toolIcon gameplayScene-toolIcon--move"></i>
              <span class="gameplayScene-toolText">08</span>
            </button>
          </div>
        </footer>
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
import Dialog from '../components/Dialog';
import Bubble from '../components/BubbleComponentRect';

export default {
  components: {
    GameModesMenu,
    ChaptersMenu,
    SetsMenu,
    Playground,
    DropsCounter,
    ComboMonitor,
    Dialog,
    Bubble,
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
    onArmoryItemClick(type) {
      this.$store.commit('user/PUT_ITEM_IN_USER_SLOT', type);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'placement');
      this.$store.commit('sceneController/SHOW_ARMORY_DIALOG');
      this.$store.commit('dialog/SET_YES_ACTION', 'performBubblePlacing');
      this.$store.commit('dialog/SET_NO_ACTION', 'revertBubblePlacing');
    },
    onSwapClick() {
      this.$store.commit('sceneController/SHOW_ARMORY_DIALOG');
      this.$store.commit('user/SET_SELECTION_MAX_LENGTH', 2);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selection');

      this.$store.commit('dialog/SET_YES_ACTION', 'performSwap');
      this.$store.commit('dialog/SET_NO_ACTION', 'revertSwap');
    },
    onRotateClick() {
      this.$store.commit('sceneController/SHOW_ARMORY_DIALOG');
      this.$store.commit('user/SET_SELECTION_MAX_LENGTH', 1);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selection');

      this.$store.commit('dialog/SET_YES_ACTION', 'performRotate');
      this.$store.commit('dialog/SET_NO_ACTION', 'revertRotate');
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
      showArmoryDialog: state => state.sceneController.showArmoryDialog,
      showInventoryDialog: state => state.sceneController.showInventoryDialog,
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
