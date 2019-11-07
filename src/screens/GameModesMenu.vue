<template>
  <div class="scene">
    <header class="home-screen__header">
      <a v-on:click.prevent="onSettingsClick" class="home-screen__settings-link">Settings</a>
    </header>
    <div class="main-menu">
      <ul class="main-menu__list">
        <li class="main-menu__item" v-for="menuItem in roadmap" v-bind:key="menuItem.type">
          <a class="main-menu__item-link"
            v-on:click.prevent="menuItemClick"
            :data-key="menuItem.type">{{menuItem.label}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import roadmap from '../config/roadmap';

export default {
  methods: {
    onSettingsClick() {},

    menuItemClick(event) {
      const { key } = event.target.dataset;

      if (key === 'relax') {
        this.$store.dispatch('startRelax');
      }

      this.$store.dispatch('setGameMode', key);
    },
  },
  data() {
    return {
      roadmap,
    };
  },
};
</script>
