<template>
  <div v-bind:class="['item-box', item.type ]"
       v-on:click.prevent="onClick"
       v-bind:disabled="item.disabled"
       v-bind:style="{ width: `${itemDimensions.itemWidth}px`,
       height: `${itemDimensions.itemHeight}px`}">
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
import configModule from '../config/gameplay';

const config = configModule();

const { itemWidth, itemHeight } = config;

export default {
  props: ['item'],
  computed: {
    theValue() {
      return this.$props.item.value;
    },
    itemDimensions() {
      return { itemWidth, itemHeight };
    },
  },
  methods: {
    onClick(event) {
      event.preventDefault();

      if (this.$props.item.disabled || this.$store.getters.animationsInProgress) {
        return;
      }

      const { row, col } = this.$props.item;

      this.$store.dispatch('makeUserMove', { row, col });
    },
    dropPassageHorizontal(el) {
      const level = this.$store.state.level;
      $(el).animate({ width: level.matrixWidth * itemWidth }, level.matrixWidth * config.dropInjectionDelay, 'linear');
    },
    dropPassageVertical(el) {
      const level = this.$store.state.level;
      $(el).animate({ height: level.matrixHeight * itemHeight }, level.matrixHeight * config.dropInjectionDelay, 'linear');
    },
    dropPassageDiagonal(el) {
      const level = this.$store.state.level;
      $(el).animate({ height: Math.floor(level.matrixHeight * itemHeight * 1.41) }, level.matrixHeight * config.dropInjectionDelay, 'linear');
    },
    getDirectionAnimState(direction) {
      return this.$props.item.directions.find(dir => dir.label === direction).animation;
    },
  },
};
</script>

<style lang="scss">
.item-box {
  display: inline-flex;
  align-items: center;
  justify-items: center;

  vertical-align: top;
  position: relative;
  width: 49px;
  height: 49px;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px #2EEFBF inset;
  border-radius: 50%;
  text-align: center;
  font-size: 16px;
  line-height: 48px;
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;

  &[disabled] {
    opacity: 0.3;
    cursor: default;
  }

  &.bobomb {
    .item {
      background-color: chocolate;
    }
  }
}

.item {
  display: block;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #17b6ed;
  border-radius: 50%;
  margin: auto;
  font-size: 0;
  transition: all 0.2s ease 0s;

  &[value="0"] {
    transform: scale(0);
    opacity: 0;
  }

  &[value="1"] {
    transform: scale(0.25);
  }

  &[value="2"] {
    transform: scale(0.5);
  }

  &[value="3"] {
    transform: scale(0.75);
  }

  &[value="4"] {
    transform: scale(1);
  }

  &.pop-animation {
    transform: scale(2);
    opacity: 0;
  }
}

.clear {
  display: block;
  clear: both;
}

.drop-passage-anim-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}

.drop-passage {
  position: absolute;
  margin: auto;
  overflow: visible!important;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #EFBF2E;
  }

  &.left {
    height: 20px;
    width: 0;
    top: 0;
    bottom: 0;
    right: 50%;

    &:before {
      right: 100%;
      margin: 0 -10px 0 0;
      box-shadow: 5px 0 10px 0 #EFBF2E;
    }
  }

  &.top {
    height: 0;
    width: 20px;
    left: 0;
    right: 0;
    bottom: 50%;

    &:before {
      top: 0;
      margin: -10px 0 0 0;
      box-shadow: 0 5px 10px 0 #EFBF2E;
    }
  }

  &.right {
    height: 20px;
    width: 0;
    top: 0;
    bottom: 0;
    left: 50%;

    &:before {
      left: 100%;
      margin: 0 0 0 -10px;
      box-shadow: -5px 0 10px 0 #EFBF2E;
    }
  }

  &.bottom {
    height: 0;
    width: 20px;
    left: 0;
    right: 0;
    top: 50%;

    &:before {
      bottom: 0;
      margin: 0 0 -10px 0;
      box-shadow: 0 -5px 10px 0 #EFBF2E;
    }
  }

  &.top-left {
    height: 0;
    width: 20px;
    left: 0;
    right: 0;
    bottom: 50%;
    transform: rotate(-45deg);
    transform-origin: bottom center;

    &:before {
      top: 0;
      margin: -10px 0 0 0;
      box-shadow: 0 5px 10px 0 #EFBF2E;
    }
  }

  &.top-right {
    height: 0;
    width: 20px;
    left: 0;
    right: 0;
    bottom: 50%;
    transform: rotate(45deg);
    transform-origin: bottom center;

    &:before {
      top: 0;
      margin: -10px 0 0 0;
      box-shadow: 0 5px 10px 0 #EFBF2E;
    }
  }

  &.bottom-right {
    height: 0;
    width: 20px;
    left: 0;
    right: 0;
    top: 50%;
    transform: rotate(-45deg);
    transform-origin: top center;

    &:before {
      bottom: 0;
      margin: 0 0 -10px 0;
      box-shadow: 0 -5px 10px 0 #EFBF2E;
    }
  }

  &.bottom-left {
    height: 0;
    width: 20px;
    left: 0;
    right: 0;
    top: 50%;
    transform: rotate(45deg);
    transform-origin: top center;

    &:before {
      bottom: 0;
      margin: 0 0 -10px 0;
      box-shadow: 0 -5px 10px 0 #EFBF2E;
    }
  }
}
</style>
