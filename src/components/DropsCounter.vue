<template>
  <div v-bind:class="counterClassNames">Score {{ dropsCount }}</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    counterClassNames() {
      return {
        'drops-counter': true,
        'drops-counter_warning-lvl-1': this.warningLvl1,
        'drops-counter_warning-lvl-2': this.warningLvl2,
        'drops-counter_warning-lvl-3': this.warningLvl3,
        'drops-counter_last-hope': this.lastHope,
      };
    },
    ...mapState({
      dropsCount() {
        return this.$store.state.user.currentCount;
      },
      warningLvl1() {
        return this.$store.state.user.currentCount === 3;
      },
      warningLvl2() {
        return this.$store.state.user.currentCount === 2;
      },
      warningLvl3() {
        return this.$store.state.user.currentCount === 1;
      },
      lastHope() {
        return this.$store.state.user.currentCount === 0;
      },
    }),
  },
};
</script>

<style lang="scss"></style>
