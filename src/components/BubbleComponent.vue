<template>
  <div
    :class="['item-box', item.type ]"
    :disabled="item.disabled">
    <div class="effector" v-on:click.prevent="onClick">
      <div class="effector__field"></div>
    </div>
    <div class="item-bgr-box">
      <div class="item-bgr"></div>
    </div>
    <div class="item-wrapper">
      <div :value="item.value"
           :class="{ item, 'pop-animation': item.isPopAnimationActive }"
           :style="itemStyle"
      >
      </div>
    </div>

    <div class="drop-passage-anim-wrapper">
      <div class="drop-passage-anim-box">
        <div
          :class="['drop-rail', emitter.label]"
          v-for="(emitter, idx) in item.emitters"
          v-bind:key="idx"
          v-if="emitter.animation"
        >
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>
        <i :class="itemDirections"></i>
      </div>
    </div>

    <div class="select-wrapper" v-if="item.selected">
      <div class="select"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['row', 'col'],
  computed: {
    itemStyle() {
      const { row, col } = this.$props;
      const { maxItemValue, value } = this.item;
      const { level } = this.$store.state;

      let style = {
        transform: `scale(${(value / maxItemValue)})`,
      };

      if (level.type === 'triangle') {
        let initialOffsetY = 10;
        let offsetY;

        if (row % 2 === 0) {
          initialOffsetY = (col % 2 === 0) ? initialOffsetY * -1 : initialOffsetY;
        } else {
          initialOffsetY = (col % 2 !== 0) ? initialOffsetY * -1 : initialOffsetY;
        }

        if (value === maxItemValue) {
          offsetY = 0;
        } else {
          offsetY = initialOffsetY / value;
        }

        style = {
          transform: `translateY(${offsetY}%) scale(${(value / maxItemValue)})`,
        };
      }

      if (value === 0) {
        style = {
          transform: 'scale(0)',
          opacity: 0,
        };
      }

      return style;
    },

    item() {
      const { row, col } = this.$props;
      return this.$store.state.itemsArray[row][col];
    },

    itemDirections() {
      const { row, col } = this.$props;

      const { emitters } = this.$store.state.itemsArray[row][col];

      const classNames = [];

      emitters.forEach(emitter => classNames.push(emitter.label));

      return `direction-arrow ${classNames.join(' ')}`;
    },
  },
  methods: {
    onClick(event) {
      const { row, col } = event.currentTarget.parentNode.dataset;
      const { shiftKey, altKey } = event;

      this.$store.dispatch('executeUserAction', {
        row: +row,
        col: +col,
        shiftKey,
        altKey,
      });
    },

    getDirectionAnimState(direction) {
      const currentDirection =
        this.item.emitters.find(dir => dir.label === direction);

      if (!currentDirection || !this.$el) {
        return false;
      }

      return currentDirection.animation;
    },
  },
};
</script>

<style lang="scss">
/*
.playground-row:not(:nth-child(1)) {
  .item-box {
    .drop-rail {
      display: none;
    }
  }
}

.playground-row {
  .item-box:not(:nth-child(2)) {
    .drop-rail {
      display: none;
    }
  }
}

.drop-rail {
  width: 1px;
  background: rgba(#17b6ed, 1);
}
//*/

:root {
  --item-width: 40px;
  --item-height: 40px;
  --matrix-width: 9;
  --matrix-height: 9;
  --drop-passage-delay: 200;
}

.direction-arrow {
  position: absolute;
  border: 3px solid transparent;
  width: 0;
  height: 0;
  margin: auto;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.3;
  transition: transform 0.2s ease;
}

.direction-arrow.triangle_bottom_left.triangleNoseUp_left {
  transform: rotate(-120deg);
}

.direction-arrow.triangleNoseUp_right.triangle_bottom_right {
  transform: rotate(120deg);
}

.direction-arrow.triangle_top_left.triangleNoseDown_left {
  transform: rotate(150deg);
}

.direction-arrow.triangleNoseDown_right.triangle_top_right {
  transform: rotate(-150deg);
}

.triangle {
  .playground-row {
    &:nth-of-type(odd) {
      .item-box {
        &:nth-of-type(odd) {
          .direction-arrow {
            border-top: 10px solid #000;
          }
        }

        &:nth-of-type(even) {
          .direction-arrow {
            border-bottom: 10px solid #000;
          }
        }
      }
    }

    &:nth-of-type(even) {
      .item-box {
        &:nth-of-type(odd) {
          .direction-arrow {
            border-bottom: 10px solid #000;
          }
        }

        &:nth-of-type(even) {
          .direction-arrow {
            border-top: 10px solid #000;
          }
        }
      }
    }
  }
}

.triangle {
  .drop-rail {
    --angle-coefficient: 1.17;

    .drop-platform {
      animation-duration: calc(var(--drop-passage-delay) * (var(--matrix-height) - 1) * 1ms);
    }

    .drop-box {
      animation-duration: calc(var(--drop-passage-delay) * 2 * 1ms);
      animation-iteration-count: calc(var(--matrix-height) - 1);
    }
  }
}

.drop-rail {
  position: absolute;
  transform-origin: center top;

  &.triangle_left_top {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 34px) rotate(-211deg);

    .drop-box {
      animation-name: triangle-wave-left;
    }
  }

  &.triangle_right_top {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 34px) rotate(-149deg);

    .drop-box {
      animation-name: triangle-wave-right;
    }
  }

  &.triangle_left_bottom {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 16px) rotate(31deg);

    .drop-box {
      animation-name: triangle-wave-right;
    }
  }

  &.triangle_right_bottom {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 16px) rotate(-31deg);

    .drop-box {
      animation-name: triangle-wave-left;
    }
  }

  &.triangleNoseUp_left {
    height: calc(var(--item-width) / 2 * (var(--matrix-width) - 1));
    transform: translate(30px, 34px) rotate(90deg);

    .drop-box {
      animation-name: triangle-wave-right;
    }
  }

  &.triangleNoseUp_right {
    height: calc(var(--item-width) / 2 * (var(--matrix-width) - 1));
    transform: translate(30px, 34px) rotate(-90deg);

    .drop-box {
      animation-name: triangle-wave-left;
    }
  }

  &.triangle_bottom_right {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 34px) rotate(-31deg);

    .drop-box {
      animation-name: triangle-wave-right;
    }
  }

  &.triangle_bottom_left {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 34px) rotate(31deg);

    .drop-box {
      animation-name: triangle-wave-left;
    }
  }

  &.triangle_top_left {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 16px) rotate(-211deg);

    .drop-box {
      animation-name: triangle-wave-right;
    }
  }

  &.triangle_top_right {
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * var(--angle-coefficient));
    transform: translate(30px, 16px) rotate(211deg);

    .drop-box {
      animation-name: triangle-wave-left;
    }
  }

  &.triangleNoseDown_left {
    height: calc(var(--item-width) / 2 * (var(--matrix-width) - 1));
    transform: translate(30px, 16px) rotate(90deg);

    .drop-box {
      animation-name: triangle-wave-left;
    }
  }

  &.triangleNoseDown_right {
    height: calc(var(--item-width) / 2 * (var(--matrix-width) - 1));
    transform: translate(30px, 16px) rotate(-90deg);

    .drop-box {
      animation-name: triangle-wave-right;
    }
  }

  &.top {
    height: calc(var(--item-height) * (var(--matrix-height) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(-180deg);
  }

  &.right {
    height: calc(var(--item-width) * (var(--matrix-width) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(-90deg);
  }

  &.left {
    height: calc(var(--item-width) * (var(--matrix-width) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(90deg);
  }

  &.bottom {
    height: calc(var(--item-height) * (var(--matrix-height) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
  }

  &.hexagon_topLeft_left,
  &.hexagon_left_topLeftTop {
    height: calc(var(--item-height) * (var(--matrix-width) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(120.15deg);
  }

  &.hexagon_topOdd,
  &.hexagon_topEven {
    height: calc(var(--item-height) * (var(--matrix-height) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(-180deg);
  }

  &.hexagon_topRight_right,
  &.hexagon_right_topRight {
    height: calc(var(--item-height) * (var(--matrix-width) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(-120.15deg);
  }

  &.hexagon_right_bottomRight,
  &.hexagon_bottomRight_right {
    height: calc(var(--item-height) * (var(--matrix-width) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(-59.85deg);
  }

  &.hexagon_bottomOdd,
  &.hexagon_bottomEven {
    height: calc(var(--item-height) * (var(--matrix-height) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
  }

  &.hexagon_left_bottomLeft,
  &.hexagon_bottomLeft_left {
    height: calc(var(--item-height) * (var(--matrix-width) - 1));
    top: calc(var(--item-height) / 2);
    left: calc(var(--item-width) / 2);
    transform: rotate(59.85deg);
  }
}

.drop-platform {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  animation-name: drop-passage;
  animation-timing-function: linear;
  animation-delay: 0ms;
  animation-duration: calc(var(--drop-passage-delay) * (var(--matrix-height) - 1) * 1ms);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  backface-visibility: hidden;

  will-change: transform;
}

.drop-box {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
}

.drop {
  display: block;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  background: #EFBF2E;
}

@keyframes drop-passage {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes triangle-wave-left {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(17px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes triangle-wave-right {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-17px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.item-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  vertical-align: top;
  position: relative;
  width: var(--item-width);
  height: var(--item-height);
  border-radius: 50%;
  box-sizing: border-box;
  user-select: none;

  &.invisible-wall {
    display: none;
  }
}

.effector {
  position: relative;
  width: 0;
  height: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}

.effector__field {
  width: var(--item-width);
  height: var(--item-height);
  min-width: var(--item-width);
  min-height: var(--item-height);
  cursor: pointer;
}

.item-bgr-box {
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-bgr {
  position: absolute;
  z-index: 1;
  width: var(--item-width);
  height: var(--item-height);
  min-width: var(--item-width);
  min-height: var(--item-height);
  background-image: url("../assets/bgr-rectangle.svg");
  margin: auto;
}

.item-wrapper {
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  display: block;
  z-index: 1;
  width: var(--item-width);
  height: var(--item-height);
  min-width: var(--item-width);
  min-height: var(--item-height);
  background-image: url("../assets/img-rectangle-item.svg");
  transition: transform 0.2s, opacity 0.2s;

  &.pop-animation {
    transform: scale(2)!important;
    opacity: 0!important;
    will-change: transform;
  }
}

.drop-passage-anim-wrapper {
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-passage-anim-box {
  width: var(--item-width);
  height: var(--item-height);
  min-width: var(--item-width);
  min-height: var(--item-height);
  z-index: 15;
  position: relative;
}

.select-wrapper {
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select {
  width: var(--item-width);
  height: var(--item-height);
  min-width: var(--item-width);
  min-height: var(--item-height);
  z-index: 10;
  position: relative;

  background: url("../assets/bgr-rectangle-select.svg");
}

.playground-box.hexagon {
  --item-width: 50px;
  --item-height: 44px;

  .item-box {
    width: var(--item-width);
    height: var(--item-height);
    margin: 0 -6px;

    &:nth-child(even) {
      top: calc(var(--item-height) / 2);
    }
  }

  .item-bgr {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    border: none;
    background-image: url("../assets/bgr-hexagon.svg");
    background-size: 100% 100%;
  }

  .item {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    background-color: transparent;
    background-image: url("../assets/img-hexagon-item.svg");
    background-size: 100% 100%;
  }

  .select {
    background-image: url("../assets/bgr-hexagon-selected.svg");
  }
}

.playground-box.triangle {
  --item-height: 50px;
  --item-width: 60px;

  .playground-row {
    &:nth-of-type(odd) {
      .item-box {
        &:nth-of-type(odd) {
          .effector {
            transform: scaleY(2) rotate(180deg);
            top: var(--item-height);
          }

          .item-bgr {
            background-position: center bottom;
          }

          .item {
            background-position: center bottom;
          }
        }
      }
    }

    &:nth-of-type(even) {
      .item-box {
        &:nth-of-type(even) {
          .effector {
            transform: scaleY(2) rotate(180deg);
            top: var(--item-height);
          }

          .item-bgr {
            background-position: center bottom;
          }

          .item {
            background-position: center bottom;
          }
        }
      }
    }
  }

  .item-box {
    width: 0;
    margin: 0 calc(var(--item-width) / 4);
  }

  .item-bgr {
    z-index: -1;
    border: none;
    border-radius: 0;
    background-image: url("../assets/bgr-triangle.svg");
    background-position: center top;
    background-repeat: no-repeat;
  }

  .item {
    z-index: -1;
    border-radius: 0;
    background-color: transparent;
    background-image: url("../assets/img-item-triangle.svg");
    background-position: center top;
    background-repeat: no-repeat;
  }

  .effector {
    transform: scaleY(2);
    margin-bottom: auto;
  }

  .effector__field {
    height: var(--item-height);
    width: var(--item-width);
    min-height: var(--item-height);
    min-width: var(--item-width);
    transform: perspective(24px) rotateX(45deg) scaleY(30);
    transform-origin: center bottom;
  }

  .drop-platform {
    animation-duration: calc(var(--drop-passage-delay) * 2 * (var(--matrix-height) - 1) * 1ms);
  }

  .select {
    background-image: url("../assets/bgr-triangle-selected.svg");
  }

  .playground-row {
    &:nth-of-type(odd) {
      .item-box {
        &:nth-of-type(odd) {
          .select {
            background-position: 0 bottom;
          }
        }
        &:nth-of-type(even) {
          .select {
            background-position: 0 0;
          }
        }
      }
    }
    &:nth-of-type(even) {
      .item-box {
        &:nth-of-type(odd) {
          .select {
            background-position: 0 0;
          }
        }
        &:nth-of-type(even) {
          .select {
            background-position: 0 bottom;
          }
        }
      }
    }
  }
}

.default {
  .item-box {
    &.bobomb {
      .item-bgr {
        background-image: url("../assets/bgr-rectangle-bobomb.svg");
      }
      .item {
        background-image: url("../assets/img-rectangle-item-bobomb.svg");
      }
    }
  }
}

.hexagon {
  .item-box {
    &.bobomb {
      .item-bgr {
        background-image: url("../assets/bgr-hexagon-bobomb.svg");
      }
      .item {
        background-image: url("../assets/img-hexagon-item-bobomb.svg");
      }
    }
  }
}

.triangle {
  .item-box {
    &.bobomb {
      .item-bgr {
        background-image: url("../assets/bgr-triangle-bobomb.svg");
      }
      .item {
        background-image: url("../assets/img-item-triangle-bobomb.svg");
      }
    }
  }
}

</style>
