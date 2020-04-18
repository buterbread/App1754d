<template>
  <div :class="['item-box', { 'item-box_armed': armed }, item.type ]"
       v-on:click.prevent="onClick"
       :disabled="item.disabled">
    <div v-if="item.isPopAnimationActive" class="item__explosion"></div>
    <div v-if="!item.isPopAnimationActive && item.increaseProgress" class="item__injection"></div>

    <div :class="['item__type', item.type ]"></div>

    <svg class="item__charge" :data-maxvalue="item.maxItemValue">
      <circle class="item__charge-placeholder"></circle>
      <circle class="item__charge-pie" :style="`--chart-angle: ${angle}`"></circle>
    </svg>

    <div class="item__emitter-box">
      <template v-for="(emitter, idx) in emitters">
        <div v-if="emitter.animation" :class="['item__emitter', emitter.label]" v-bind:key="idx">
          <div class="item__emitter-bullet">
            <i class="item__emitter-bullet-mark"/>
          </div>
        </div>
      </template>
      <template v-for="(emitter, idx) in emitters">
        <div :class="['item__emitter-indicator', emitter.label]"
             v-bind:key="idx"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: ['item'],
  computed: {
    emitters() {
      const { item } = this.$props;

      return item.emitters;
    },
    armed() {
      const { item } = this.$props;
      const { value, maxItemValue } = item;

      return value === maxItemValue;
    },
    angle() {
      const { value, maxItemValue } = this.$props.item;
      return (value / maxItemValue) * 360;
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
