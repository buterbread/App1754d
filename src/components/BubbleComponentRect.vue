<template>
  <div :class="['item-box', item.type ]"
       v-on:click.prevent="onClick"
       :disabled="item.disabled">
    <svg class="item__charge">
      <path style="fill: #d0d0ee; fill-rule: evenodd; opacity: 0.2"
        d="M18,0A18,18,0,1,1,0,18,18,18,0,0,1,18,0Zm0,6A12,12,0,1,1,6,18,12,12,0,0,1,18,6Z"/>
      <defs>
        <path id="item__charge-delimiters"
         d="M0,0H17V17H0V0ZM19,0H36V17H19V0ZM0,19H17V36H0V19Zm19,0H36V36H19V19Z"/>
      </defs>
      <clipPath id="item__charge-delimiters-mask">
        <use xlink:href="#item__charge-delimiters" style="overflow:visible;" />
      </clipPath>
      <circle class="item__charge-pie"
        :style="`stroke-dasharray: ${chart.dash}, ${chart.gap};`"></circle>
    </svg>
  </div>
</template>

<script>
const CHART_RADIUS = 15;
const CHART_PERIMETER = Math.PI * (CHART_RADIUS * 2);
const CHART_ANGLE_SIZE = CHART_PERIMETER / 360;

export default {
  props: ['item'],
  computed: {
    theValue() {
      return this.$props.item.value;
    },
    chart() {
      const { value, maxItemValue } = this.$props.item;
      const angle = (value / maxItemValue) * 360;

      return {
        dash: CHART_ANGLE_SIZE * angle,
        gap: CHART_ANGLE_SIZE * (360 - angle),
      };
    },
  },
  methods: {
    onClick(event) {
      if (!this.$store.state.gameStarted
          || this.$props.item.disabled
          || this.$store.getters.animationsInProgress) {
        return;
      }

      const { row, col } = event.currentTarget.dataset;

      if (event.shiftKey) {
        this.$store.state.itemsArray[row][col].value = 4;
        return;
      }

      if (event.altKey) {
        this.$store.state.itemsArray[row][col].value = 0;
        return;
      }

      this.$store.dispatch('makeUserMove', { row: +row, col: +col });
    },
  },
};
</script>

<style lang="scss"></style>
