<template>
  <BubbleComponentRect v-bind:item="item" v-bind:on-item-click="onClick"></BubbleComponentRect>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import BubbleComponentRect from './BubbleComponentRect';

export default {
  props: ['item'],
  components: {
    BubbleComponentRect,
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
  computed: {
    ...mapState({
      itemsArray: state => state.itemsArray,
      gameStarted: state => state.gameStarted,
    }),
    ...mapGetters([
      'animationsInProgress',
    ]),
  },
};
</script>

<style lang="scss"></style>
