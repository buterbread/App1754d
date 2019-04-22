<template>
  <div v-bind:class="counterClassNames">{{ dropsCount }}</div>
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

<style lang="scss">
.drops-counter {
  font-size: 20px;
  line-height: 60px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #17b6ed;
  color: #ffffff;
  text-align: center;
}

.drops-counter_warning-lvl-1 {
  background-color: #EFBF2E;
}

.drops-counter_warning-lvl-2 {
  background-color: tomato;
}

.drops-counter_warning-lvl-3 {
  background-color: orangered;
  animation: blink 1s infinite;
}

.drops-counter_last-hope {
  background-color: darkgray;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
