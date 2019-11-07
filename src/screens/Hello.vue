<template>
<div>
  <you-lost v-if="showLostScreen"></you-lost>
  <you-win v-if="showWinScreen"></you-win>
  <template v-if="!gameStarted">
    <game-modes-menu v-if="showGameModesMenu"></game-modes-menu>
    <chapters-menu v-if="showChaptersMenu"></chapters-menu>
    <sets-menu v-if="showSetsMenu"></sets-menu>
  </template>
  <gameplay v-if="gameStarted"></gameplay>
  <fast-relax v-if="showFastRelax"></fast-relax>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import gameModesMenu from './GameModesMenu';
import chaptersMenu from './ChaptersMenu';
import setsMenu from './SetsMenu';
import youWin from './YouWin';
import youLost from './YouLost';
import gameplay from './Gameplay';
import fastRelax from './FastRelax';

export default {
  components: {
    youLost,
    youWin,
    gameplay,
    gameModesMenu,
    chaptersMenu,
    setsMenu,
    fastRelax,
  },
  watch: {
    levelPassed(value) {
      if (!value) {
        return;
      }

      this.$store.dispatch('applyLevelReward');
      this.$store.commit('sceneController/SHOW_WIN_SCREEN', true);
    },
    noMoreMoves(value) {
      if (!value) {
        return;
      }

      this.$store.commit('user/LOCK_USER_INPUT');
      this.$store.dispatch('applyLevelPenalty');
      this.$store.dispatch('dropSave');

      setTimeout(() => {
        this.$store.dispatch('stopGame');
        this.$store.commit('sceneController/SHOW_LOST_SCREEN');
      }, 1000);
    },
  },
  computed: {
    ...mapState({
      showWinScreen: state => state.sceneController.showWinScreen,
      showLostScreen: state => state.sceneController.showLostScreen,
      showGameModesMenu: state => state.sceneController.showGameModesMenu,
      showChaptersMenu: state => state.sceneController.showChaptersMenu,
      showSetsMenu: state => state.sceneController.showSetsMenu,
      gameStarted: state => state.gameStarted,
      user: state => state.user,
      showFastRelax: state => state.sceneController.showFastRelax,
    }),
    ...mapGetters([
      'levelPassed',
      'noMoreMoves',
    ]),
  },
};
</script>

<style lang="scss">
  .scene_playground {
    padding-left: 0;
    padding-right: 0;
  }

  .gameplay-screen {
    width: 375px;
    min-width: 320px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: auto;
  }

  .gameplay-screen__top {
    display: flex;
    width: 100%;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }

  .gameplay-screen__middle {
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .gameplay-screen__bottom {
    height: 60px;
    width: 100%;
    display: flex;
  }

  .levels-counter {
    font-size: 14px;
    color: #333;
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
</style>
