<template>
  <div :class="['combo-monitor']">
    Combo: X{{combosCount}}
    <br>
    {{ combos }}
    of
    {{ comboMultipliers[comboMultiplierIndex] }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    combos() {
      return this.dischargesCount % this.comboMultipliers[this.comboMultiplierIndex];
    },
    ...mapState({
      combosCount: state => state.combosCount,
      dischargesCount: state => state.dischargesCount,
      comboMultipliers: state => state.comboMultipliers,
      comboMultiplierIndex: state => state.comboMultiplierIndex,
    }),
  },
};
</script>

<style lang="scss">
.combo-monitor {
  position: relative;
  display: table;
  margin: 30px auto 0;
  text-align: center;
}
</style>
