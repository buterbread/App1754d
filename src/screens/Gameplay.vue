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
      this.$store.dispatch('stopGame');
      const { chapter = 1, level = 1 } = this.$route.params;
      this.$router.push({ name: 'YouWin', params: { chapter, level } });
    },
  },

  beforeMount() {
    const { chapter = 1, level = 1 } = this.$route.params;
    this.$store.dispatch('startNewGame', { chapter, level });
  },
};
</script>

<style lang="scss">
  .gameplay-screen {
    width: 320px;
    height: 480px;
    box-shadow: 0 0 30px 3px rgba(0, 0, 0, 0.1);
    position: relative;
    margin: 20px auto;

    &:before,
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }
</style>
