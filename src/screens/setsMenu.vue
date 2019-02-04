<template>
  <div class="scene">
    <header class="chapters-screen__header">
      <h1 class="chapters-screen__header-title">{{ title }}</h1>
    </header>
    <div class="chapters-menu">
      <h2>{{ chapterTitle }}</h2>
      <ul class="sets-menu__list">
        <li class="sets-menu__item" v-for="(set, idx) in sets"
          v-bind:key="set.id">
          <a :data-idx="idx" class="sets-menu__item-link"
            v-on:click.prevent="onSetClick">{{(1 + idx)}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    onSetClick(event) {
      const { idx } = event.target.dataset;

      this.$store.dispatch('startSet', idx);
    },
  },
  created() {
    if (this.chapter.sets.length === 1) {
      this.$store.dispatch('startSet', 0);
    }
  },
  computed: {
    title() {
      return this.game.label;
    },
    chapterTitle() {
      return this.chapter.label;
    },
    sets() {
      return this.chapter.sets;
    },
    ...mapState({
      game: state => state.user.currentGame,
      chapter: state => state.user.currentChapter,
    }),
  },
};
</script>

<style lang="scss">
.chapters-screen__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.chapters-screen__header-title {
  font-size: 36px;
  line-height: 48px;
  text-transform: uppercase;
  font-weight: normal
}

.sets-menu__list {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  margin: auto;
  padding: 0;
  width: 264px;
}

.sets-menu__item {
  display: inline-block;
  margin: 8px;

  &:nth-child(7n + 1) {
    margin-left: 20px;
  }

  &:nth-child(7n - 4) {
    margin-right: 20px;
  }
}

.sets-menu__item-link {
  display: block;
  cursor: pointer;
  border: 1px solid #46b9ea;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 18px;
  line-height: 48px;
  padding: 0 10px;
  white-space: nowrap;

  &:hover {
    background-color: #46b9ea;
    color: #fff;
  }
}

</style>
