<template>
  <div :class="['item-box', { 'item-box_armed': armed }, item.type ]"
       v-on:click="onItemClick"
       :disabled="item.disabled"
       :data-value="value"
  >
    <div v-if="item.isPopAnimationActive" class="item__explosion"></div>
    <div v-if="!item.isPopAnimationActive && item.increaseProgress" class="item__injection"></div>
    <div v-if="item.selected" class="item__selection"></div>

    <BubbleIndicator v-bind:type="item.type"></BubbleIndicator>

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
             v-bind:key="`indicator-${idx}`"></div>
      </template>
    </div>
  </div>
</template>

<script>
import BubbleIndicator from './BubbleIndicator';

export default {
  components: {
    BubbleIndicator,
  },
  props: {
    item: Object,
    onItemClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    value() {
      const { item } = this.$props;
      const { value } = item;

      return value;
    },
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
  },
};
</script>

<style lang="scss"></style>
