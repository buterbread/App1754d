<template>
<div class="item" v-bind:value="item.value" v-bind:data-row="item.row" v-bind:data-col="item.col"
     v-on:click.prevent="onClick">
  {{ theValue }}
  <div class="pop-animation" v-if="item.isPopAnimationActive"></div>
  <div class="drop-passage-anim-box">
    <transition v-on:enter="dropPassageHorizontal">
      <div class="drop-passage left" v-if="item.dropPassageAnimation.left"></div>
    </transition>
    <transition v-on:enter="dropPassageVertical">
      <div class="drop-passage top" v-if="item.dropPassageAnimation.top"></div>
    </transition>
    <transition v-on:enter="dropPassageHorizontal">
      <div class="drop-passage right" v-if="item.dropPassageAnimation.right"></div>
    </transition>
    <transition v-on:enter="dropPassageVertical">
      <div class="drop-passage bottom" v-if="item.dropPassageAnimation.bottom"></div>
    </transition>
  </div>
</div>
</template>

<script>
import $ from 'jquery';
import configModule from '../config/gameplay';

const config = configModule();

export default {
  props: ['item'],
  computed: {
    theValue() {
      return this.$store.state.itemsArray[this.$props.item.row][this.$props.item.col].value;
    },
  },
  methods: {
    onClick(event) {
      const row = +event.currentTarget.getAttribute('data-row');
      const col = +event.currentTarget.getAttribute('data-col');

      this.$store.dispatch('makeUserMove', { row, col });
    },
    dropPassageHorizontal(el) {
      $(el).animate({ width: (config.arrayWidth - 1) * 50 }, (config.arrayWidth - 1) * config.dropInjectionDelay, 'linear');
    },
    dropPassageVertical(el) {
      $(el).animate({ height: (config.arrayHeight - 1) * 50 }, (config.arrayHeight - 1) * config.dropInjectionDelay, 'linear');
    },
  },
};
</script>

<style lang="scss">
.item {
  display: inline-block;
  vertical-align: top;
  position: relative;
  border: 1px solid #cccccc;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 16px;
  line-height: 48px;
  cursor: pointer;

  box-sizing: border-box;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.item[value="0"] {
  font-size: 0;
}

.clear {
  display: block;
  clear: both;
}

.pop-animation {
  background: #333333;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
}

.drop-passage-anim-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

@keyframes passage {
  from { width: 0; }
  to { width: 200px; }
}

.drop-passage {
  position: absolute;
  margin: auto;
  background: #f00;
  opacity: 0.5;

  &.left {
    height: 10px;
    width: 0;
    top: 0;
    bottom: 0;
    right: 50%;
  }

  &.top {
    height: 0;
    width: 10px;
    left: 0;
    right: 0;
    bottom: 50%;
  }

  &.right {
    height: 10px;
    width: 0;
    top: 0;
    bottom: 0;
    left: 50%;
  }

  &.bottom {
    height: 0;
    width: 10px;
    left: 0;
    right: 0;
    top: 50%;
  }
}
</style>
