<template>
  <div :class="['combo-monitor']">
    <div class="combo-counter">
      <template v-if="dischargesCount > 0 && combosCount === 0">Bonus</template>
      <template v-if="combosCount > 0">+{{combosCount}}</template>
    </div>
    <svg :width="chartRadius * 2" :height="chartRadius * 2" class="combo-chart">
      <circle :r="chartRadius" :cx="chartRadius" :cy="chartRadius" class="combo-chart__pie"
        :style="`stroke-dasharray: ${chart.dash}, ${chart.gap};`"></circle>
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const CHART_RADIUS = 30;
const CHART_PERIMETER = Math.PI * (CHART_RADIUS * 2);
const CHART_ANGLE_SIZE = CHART_PERIMETER / 360;

export default {
  data() {
    return {
      multiplier: this.$store.state.level.comboMultipliers[0],
      chartRadius: CHART_RADIUS,
      chart: {
        dash: 0,
        gap: CHART_PERIMETER,
      },
    };
  },
  computed: {
    ...mapState({
      combosCount: state => state.combosCount,
      comboMultipliers: state => state.level !== {} && state.level.comboMultipliers,
      dischargesCount: state => state.dischargesCount,
      comboMultiplierIndex: state => state.comboMultiplierIndex,
    }),
  },
  watch: {
    dischargesCount() {
      const combos = (this.dischargesCount % this.multiplier);
      const angle = (combos / (this.multiplier - 1)) * 360;

      this.chart = {
        dash: CHART_ANGLE_SIZE * angle,
        gap: CHART_ANGLE_SIZE * (360 - angle),
      };

      if (this.resetter) {
        clearTimeout(this.resetter);
      }

      this.resetter = setTimeout(() => {
        this.$store.commit('RESET_DISCHARGES_COUNT');
        this.$store.commit('RESET_COMBOS_COUNT');
        this.$store.commit('RESET_MULTIPLIER_INDEX');
      }, 3000);
    },

    comboMultiplierIndex() {
      this.multiplier = this.comboMultipliers[this.comboMultiplierIndex];
    },
  },
};
</script>

<style lang="scss">
  .combo-monitor {
    position: relative;
    margin: 20px 20px 20px auto;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .combo-counter {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    margin: auto;
    display: block;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }

  .combo-counter-box {
    width: 180px;
    height: 15px;
    display: flex;
    flex-direction: row;
    justify-items: center;
    position: relative;
    background-color: #ffffff;
  }

  .combo-counter__bar {
    position: absolute;
    left: 0;
    top: 1px;
    bottom: 1px;
    z-index: 1;
    width: 0;
    background-color: #EFBF2E;
    transition: width 0.2s ease 0s;
    border-radius: 2px;
  }

  .combo-counter__item {
    display: block;
    position: relative;
    z-index: 5;
    width: 16px;
    flex-grow: 1;
    flex-basis: 0;
    height: 100%;
    border: 1px solid #EFBF2E;
    border-radius: 3px;

    &.active {
      background-color: #EFBF2E;
    }
  }

  .combo-chart {
    margin: 0 auto;
    transform: rotate(-90deg);
    background: #ffffff;
    border-radius: 50%;
    display: block;
  }

  .combo-chart__pie {
    fill: #EFBF2E;
    stroke: #17b6ed;
    stroke-width: 10;
    stroke-dasharray: 0 128;
    transition: stroke-dasharray .3s ease;
  }

</style>
