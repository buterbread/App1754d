<template>
  <div class="scene">
    <header class="chapters-screen__header">
      <h1 class="chapters-screen__header-title">{{title}}</h1>
    </header>
    <div class="chapters-menu">
      <ul class="chapters-menu__list">
        <li class="chapters-menu__item" v-for="chapter in chapters" v-bind:key="chapter.id">
          <a class="chapters-menu__item-link" v-on:click.prevent="onChapterClick"
            :disabled=!chapter.available :data-id="chapter.id">{{chapter.label}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    onChapterClick(event) {
      const { id } = event.target.dataset;

      this.$store.dispatch('setChapter', id);
      this.$store.commit('sceneController/SHOW_SETS_MENU');
      this.$store.commit('sceneController/HIDE_CHAPTERS_MENU');
    },
  },
  created() {
    if (this.chapters.length === 1) {
      this.$store.dispatch('setChapter', this.game.chapters[0].id);
      this.$store.commit('sceneController/SHOW_SETS_MENU');
      this.$store.commit('sceneController/HIDE_CHAPTERS_MENU');
    }
  },
  computed: {
    chapters() {
      return this.game.chapters;
    },
    title() {
      return this.game.label;
    },
    ...mapState({
      game: state => state.user.currentGame,
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

.chapters-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.chapters-menu__list {
  list-style-type: none;
  display: block;
  margin: auto;
  padding: 0;
}

.chapters-menu__item {
  display: block;
}

.chapters-menu__item-link {
  cursor: pointer;
  font-size: 30px;
  line-height: 42px;
  text-transform: uppercase;

  &[disabled] {
    opacity: 0.5;
  }
}

</style>
