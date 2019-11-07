<template>
  <div class="you-win">
    <a v-on:click.prevent="startNextLevel">Next Level &gt;</a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
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

    startNextLevel() {
      this.$store.commit('sceneController/SHOW_WIN_SCREEN', false);

      if (this.user.currentSet.loop && this.isLastLevel()) {
        this.$store.commit('user/INCREASE_FINISHED_LEVELS_COUNT', 1);
        this.$store.dispatch('startSet', { setIndex: 0, levelIndex: 0 });
        return;
      }

      if (this.isLastChapter() && this.isLastSet() && this.isLastLevel()) {
        this.$store.dispatch('startChapter', { chapterIndex: 0 });
        return;
      }

      if (this.isLastSet() && this.isLastLevel()) {
        this.$store.dispatch('startChapter', { chapterIndex: this.currentChapter.index + 1 });
        return;
      }

      if (this.isLastLevel()) {
        this.$store.dispatch('startSet', { setIndex: this.currentSet.index + 1, levelIndex: 0 });
        return;
      }

      this.$store.dispatch('startNextLevel');
    },
  },
  computed: {
    ...mapState({
      currentGame: state => state.user.currentGame,
      currentChapter: state => state.user.currentChapter,
      currentSet: state => state.user.currentSet,
      user: state => state.user,
    }),
  },
};
</script>

<style lang="scss">
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
    z-index: 10000;
    background: #fafafa;
    font-size: 36px;
    color: mediumseagreen;
  }
</style>
