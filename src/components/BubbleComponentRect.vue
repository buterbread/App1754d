<template>
  <div :class="['item-box', item.type ]"
       v-on:click.prevent="onClick"
       :disabled="item.disabled">
    <svg class="item__charge" :data-maxvalue="item.maxItemValue">
      <path class="item__charge-placeholder"
        d="M18,0A18,18,0,1,1,0,18,18,18,0,0,1,18,0Zm0,6A12,12,0,1,1,6,18,12,12,0,0,1,18,6Z" />
      <circle
        class="item__charge-pie"
        :style="`stroke-dasharray: ${chart.dash}, ${chart.gap};`"></circle>
    </svg>
    <div class="item__emitter-box">
      <template v-for="(emitter, idx) in emitters">
        <div v-if="emitter.animation" :class="['item__emitter', emitter.label]" v-bind:key="idx">
          <div class="item__emitter-bullet">
            <i class="item__emitter-bullet-mark"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

const CHART_RADIUS = 15;
const CHART_PERIMETER = Math.PI * (CHART_RADIUS * 2);
const CHART_ANGLE_SIZE = CHART_PERIMETER / 360;

export default {
  props: ['item'],
  computed: {
    emitters() {
      const { currentLevel } = this.user;
      const { type } = currentLevel;
      const { item } = this.$props;

      return item.emitters[type];
    },
    chart() {
      const { value, maxItemValue } = this.$props.item;
      const angle = (value / maxItemValue) * 360;

      return {
        dash: CHART_ANGLE_SIZE * angle,
        gap: CHART_ANGLE_SIZE * (360 - angle),
      };
    },
    ...mapState({
      user: state => state.user,
      itemsArray: state => state.itemsArray,
      gameStarted: state => state.gameStarted,
    }),
    ...mapGetters([
      'animationsInProgress',
    ]),
  },
  methods: {
    onClick(event) {
      const { item } = this.$props;

      if (!this.gameStarted
          || item.disabled
          || this.animationsInProgress) {
        return;
      }

      const { row, col } = event.currentTarget.dataset;

      if (event.shiftKey) {
        this.itemsArray[row][col].value
          = this.itemsArray[row][col].maxItemValue;
        return;
      }

      if (event.altKey) {
        this.itemsArray[row][col].value
          = this.itemsArray[row][col].minItemValue;
        return;
      }

      this.$store.dispatch('makeUserMove', { row: +row, col: +col });
    },
  },
};
</script>

<style lang="scss"></style>
