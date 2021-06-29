<template>
  <div class="you-win">
    <a v-on:click.prevent="onNextClick">Next Level &gt;</a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    isLastLevel() {
      return (this.user.currentLevel.index + 1) === this.user.currentSet.levelsLength;
    },

    isLastSet() {
      return (this.user.currentSet.index + 1) === this.user.currentChapter.setsLength;
    },

    isLastChapter() {
      return (this.currentChapter.index + 1) === this.user.currentGame.chaptersMap.length;
    },

    onNextClick() {
      if (this.user.currentSet.loop && this.currentSet.levelsLength === 0) {
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
    z-index: 9999;
    background: var(--bgColor);
    font-size: 36px;
    color: mediumseagreen;
  }
</style>
