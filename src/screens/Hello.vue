<template>
<div>
  <gameModesMenu v-if="showGameModesMenu"></gameModesMenu>
  <ChaptersMenu v-if="showChaptersMenu"></ChaptersMenu>
  <SetsMenu v-if="showSetsMenu"></SetsMenu>
  <div class="scene scene_playground" v-if="gameStarted">
    <div class="playground-header">
      <Drops-counter></Drops-counter>
      <div class="levels-counter">Level: {{ this.$store.state.user.currentLevel.index + 1 }}</div>
      <ComboMonitor v-if="this.$store.state.gameStarted"></ComboMonitor>
    </div>
    <Playground></Playground>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameModesMenu from './GameModesMenu';
import ChaptersMenu from './ChaptersMenu';
import SetsMenu from './SetsMenu';
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
.scene_playground {
  padding-left: 5px;
  padding-right: 5px
}

.home-screen__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-screen__settings-link {
  font-size: 24px;
}

.main-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-menu__list {
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.main-menu__item {
  display: block;
  font-size: 36px;
  line-height: 70px;
  text-transform: uppercase;
}

.main-menu__item-link {
  cursor: pointer;

  &[disabled] {
    opacity: .5;
  }
}

.playground-header {
  display: flex;
  width: 100%;
  align-items: center;
}

</style>
