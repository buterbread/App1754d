<template>
<div>
  <drops-counter></drops-counter>
  <playground></playground>
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
      this.$router.push({ path: '/you-win' });
    },
  },

  beforeMount() {
    this.$store.dispatch('startNewGame');
  },
};
</script>

<style lang="scss">

</style>
