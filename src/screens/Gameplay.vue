<template>
  <div>
    <div class="gameplay-screen">
      <drops-counter></drops-counter>
      <playground></playground>
    </div>
  </div>
</template>

<script>
import dropsCounter from '../components/DropsCounter';
import playground from '../components/Playground';

export default {
  name: 'ScreenGameplay',
  components: {
    dropsCounter,
    playground,
  },

  computed: {
    youLost() {
      return this.$store.getters.youLost;
    },

    youWin() {
      return this.$store.getters.youWin;
    },
  },

  watch: {
    youLost() {
      this.$store.dispatch('stopGame');
      this.$router.push({ path: '/you-lost' });
    },
    youWin() {
      this.$store.commit('ADD_USER_DROP', 1);
      this.$store.dispatch('stopGame');
      const { level = 1 } = this.$route.params;
      this.$router.push({ name: 'YouWin', params: { level } });
    },
  },

  beforeMount() {
    let { level = 'new' } = this.$route.params;

    if (level === 'new') {
      level = 1;
      this.$store.dispatch('startNewGame', { index: level });
    } else {
      this.$store.dispatch('startNextLevel', { index: level });
    }
  },
};
</script>

<style lang="scss">
  .gameplay-screen {
    min-width: 320px;
    height: 100%;
    position: relative;

    &:before,
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }
</style>
