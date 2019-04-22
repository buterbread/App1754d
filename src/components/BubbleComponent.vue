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
        <div class="drop-rail vertical to-top" v-if="getDirectionAnimState('top')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>
        <div class="drop-rail horizontal to-right" v-if="getDirectionAnimState('right')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>
        <div class="drop-rail vertical to-bottom" v-if="getDirectionAnimState('bottom')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>
        <div class="drop-rail horizontal to-left" v-if="getDirectionAnimState('left')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>

        <div class="drop-rail diagonal to-top-right" v-if="getDirectionAnimState('topRight')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>

        <div class="drop-rail diagonal to-bottom-right" v-if="getDirectionAnimState('bottomRight')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>

        <div class="drop-rail diagonal to-bottom-left" v-if="getDirectionAnimState('bottomLeft')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>

        <div class="drop-rail diagonal to-top-left" v-if="getDirectionAnimState('topLeft')">
          <div class="drop-platform">
            <span class="drop-box">
              <i class="drop"></i>
            </span>
          </div>
        </div>
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
        let initialOffsetY = 9;
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
      const { level } = this.$store.state;

      const currentDirection =
        this.item.emitters[level.type].find(dir => dir.label === direction);

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
.playground-row {
  .item-box:not(:nth-child(5)) {
    .drop-passage-anim-box {
      display: none;
    }
  }
}

.playground-row:not(:nth-child(9)) {
  .item-box {
    .drop-passage-anim-box {
      display: none;
    }
  }
}

.drop-rail {
  background: rgba(#17b6ed, 0.3);
}
//*/

:root {
  --item-width: 40px;
  --item-height: 40px;
  --matrix-width: 9;
  --matrix-height: 9;
  --drop-passage-delay: 200;
}

.drop-rail {
  position: absolute;

  &.vertical {
    transform-origin: center 0;
    width: var(--item-width);
    height: calc(var(--item-height) * (var(--matrix-height) - 1));

    .drop-platform {
      animation-name: drop-passage-vertical;
      animation-duration: calc(var(--drop-passage-delay) * (var(--matrix-height) - 1) * 1ms);
    }

    .drop-box {
      width: 100%;
      height: 0;
    }
  }

  &.horizontal {
    transform-origin: 0 center;
    width: calc(var(--item-width) * (var(--matrix-width) - 1));
    height: var(--item-height);

    .drop-platform {
      animation-name: drop-passage-horizontal;
      animation-duration: calc(var(--drop-passage-delay) * (var(--matrix-width) - 1) * 1ms);
    }

    .drop-box {
      width: 0;
      height: 100%;
    }
  }

  &.diagonal {
    transform-origin: center 0;
    width: var(--item-width);
    height: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.4142);

    .drop-platform {
      animation-name: drop-passage-vertical;
      animation-duration: calc(var(--drop-passage-delay) * (var(--matrix-height) - 1) * 1ms);
    }

    .drop-box {
      width: 100%;
      height: 0;
    }
  }

  &.to-top {
    top: calc(var(--item-height) / 2);
    left: 0;
    transform: rotate(180deg);
  }

  &.to-right {
    top: 0;
    left: calc(var(--item-width) / 2);
  }

  &.to-left {
    top: 0;
    left: calc(var(--item-width) / 2);
    transform: rotate(180deg);
  }

  &.to-bottom {
    top: calc(var(--item-height) / 2);
    left: 0;
  }

  &.to-top-right {
    top: calc(var(--item-height) / 2);
    left: 0;
    transform: rotate(225deg);
  }

  &.to-bottom-right {
    top: calc(var(--item-height) / 2);
    left: 0;
    transform: rotate(315deg);
  }

  &.to-bottom-left {
    top: calc(var(--item-height) / 2);
    left: 0;
    transform: rotate(45deg);
  }

  &.to-top-left {
    top: calc(var(--item-height) / 2);
    left: 0;
    transform: rotate(135deg);
  }
}

.drop-platform {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  animation-timing-function: linear;
  animation-delay: 0ms;
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
}

.drop {
  display: block;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  background: #EFBF2E;
}

@keyframes drop-passage-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes drop-passage-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
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
  .select {
    background-image: url("../assets/bgr-hexagon-selected.svg");
  }
}

.playground-box.triangle {
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

.playground-box.hexagon {
  --item-width: 40px;
  --item-height: 42px;

  padding: 4px 0;

  .playground-row {
    margin: -4px 0 -4px 0;
  }

  .item-box {
    width: var(--item-width);
    height: var(--item-height);
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

  .drop-rail {
    &.vertical,
    &.diagonal {
      height: calc((var(--item-height) - 4px) * (var(--matrix-height) - 1) * 1.04);
    }

    &.to-top {
      transform: rotate(210.5deg);
    }

    &.to-bottom {
      transform: rotate(30.5deg);
    }

    &.to-top-left {
      transform: rotate(149.5deg);
    }

    &.to-bottom-right {
      transform: rotate(329.5deg);
    }
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
    animation-duration: calc(var(--drop-passage-delay) * 2.2 * (var(--matrix-height) - 1) * 1ms);
  }

  .playground-row {
    &:nth-of-type(odd) {
      .item-box {
        &:nth-of-type(odd) {
          .drop-rail {
            &.to-right {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(59deg) translate(-4px, -8px);
            }

            &.to-left {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(121deg) translate(-4px, 8px);
            }
          }
        }
        &:nth-of-type(even) {
          .drop-rail {
            &.to-right {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(-59deg) translate(-4px, 8px);
            }

            &.to-left {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(-121deg) translate(-4px, -8px);
            }
          }
        }
      }
    }

    &:nth-of-type(even) {
      .item-box {
        &:nth-of-type(odd) {
          .drop-rail {
            &.to-right {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(-59deg) translate(-4px, 8px);
            }

            &.to-left {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(-121deg) translate(-4px, -8px);
            }
          }
        }
        &:nth-of-type(even) {
          .drop-rail {
            &.to-right {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(59deg) translate(-4px, -8px);
            }

            &.to-left {
              width: calc(var(--item-height) * (var(--matrix-height) - 1) * 1.23);
              transform: rotate(121deg) translate(-4px, 8px);
            }
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
