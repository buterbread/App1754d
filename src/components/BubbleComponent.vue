<template>
  <div v-bind:class="['item-box', item.type ]"
       v-on:click.prevent="onClick"
       v-bind:disabled="item.disabled">
    <div class="item-bgr"></div>
    <div v-bind:value="item.value"
         v-bind:class="{ item, 'pop-animation': item.isPopAnimationActive }">
    </div>

    <div class="drop-passage-anim-box">
      <transition v-on:enter="dropPassageHorizontal">
        <div class="drop-passage left" v-if="getDirectionAnimState('left')"></div>
      </transition>
      <transition v-on:enter="dropPassageDiagonal">
        <div class="drop-passage top-left" v-if="getDirectionAnimState('topLeft')"></div>
      </transition>
      <transition v-on:enter="dropPassageVertical">
        <div class="drop-passage top" v-if="getDirectionAnimState('top')"></div>
      </transition>
      <transition v-on:enter="dropPassageDiagonal">
        <div class="drop-passage top-right" v-if="getDirectionAnimState('topRight')"></div>
      </transition>
      <transition v-on:enter="dropPassageHorizontal">
        <div class="drop-passage right" v-if="getDirectionAnimState('right')"></div>
      </transition>
      <transition v-on:enter="dropPassageDiagonal">
        <div class="drop-passage bottom-right" v-if="getDirectionAnimState('bottomRight')"></div>
      </transition>
      <transition v-on:enter="dropPassageVertical">
        <div class="drop-passage bottom" v-if="getDirectionAnimState('bottom')"></div>
      </transition>
      <transition v-on:enter="dropPassageDiagonal">
        <div class="drop-passage bottom-left" v-if="getDirectionAnimState('bottomLeft')"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import config from '../config/gameplay';

export default {
  props: ['item'],
  computed: {
    theValue() {
      return this.$props.item.value;
    },
  },
  data: () => ({
    itemWidth: 0,
    itemHeight: 0,
  }),
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
    dropPassageHorizontal(el) {
      const level = this.$store.state.level;
      $(el).animate({ width: level.matrixWidth * this.itemWidth }, level.matrixWidth * config.dropInjectionDelay, 'linear');
    },
    dropPassageVertical(el) {
      const level = this.$store.state.level;
      $(el).animate({ height: level.matrixHeight * this.itemHeight }, level.matrixHeight * config.dropInjectionDelay, 'linear');
    },
    dropPassageDiagonal(el) {
      const level = this.$store.state.level;
      $(el).animate({ height: Math.floor(level.matrixHeight * this.itemHeight * 1.41) }, level.matrixHeight * config.dropInjectionDelay, 'linear');
    },
    getDirectionAnimState(direction) {
      const { level } = this.$store.state;

      const currentDirection =
          this.$props.item.emitters[level.type].find(dir => dir.label === direction);

      if (!currentDirection || !this.$el) {
        return false;
      }

      if (level.type === 'triangle') {
        const cellIsOdd = !!((+this.$el.dataset.col + 1) % 2);

        if (cellIsOdd) {
          return currentDirection.forOddCell && currentDirection.animation;
        }

        return currentDirection.forEvenCell && currentDirection.animation;
      }

      return currentDirection.animation;
    },
  },
  mounted() {
    this.itemHeight = this.$el.offsetHeight;
    this.itemWidth = this.$el.offsetWidth;
  },
};
</script>

<style lang="scss">

</style>
