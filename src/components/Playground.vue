<template>
  <div :class="['playground-box']">
    <div :class="['playground-row']" v-for="(itemRow, rowIndex) in itemsArray"
         v-bind:key="itemRow.id">
      <item v-for="(item, colIndex) in itemRow"
            v-bind:item="item"
            v-bind:key="item.id"
            v-bind:data-row="rowIndex"
            v-bind:data-col="colIndex"></item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import item from '../components/PlaygroundItem';

export default {
  components: {
    item,
  },
  computed: mapState({
    itemsArray: state => state.itemsArray,
    levelType: state => state.level.type,
  }),
};
</script>

<style lang="scss">
.playground-box {
  position: relative;
  width: 100%;
  margin: auto;
  font-size: 0;
}

.playground-row {
  display: flex;
  justify-content: center;
}

.item-box {
  display: inline-flex;
  align-items: center;
  justify-items: center;

  vertical-align: top;
  position: relative;
  width: 39px;
  height: 39px;
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
    box-shadow: 0 0 0 1px chocolate inset;

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

.playground-box.triangle {
  text-align: center;

  .item-box {
    width: 76px;
    height: 66px;
    border: none;
    box-shadow: none;
    margin: 0 -19px;

    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 1px;
      left: 0;
      right: 0;
      width: 0;
      height: 0;
      border-left: 36px solid transparent;
      border-right: 36px solid transparent;
      border-bottom: 62px solid #e5e5e5;
    }

    &:nth-child(even) {
      &:before {
        border-bottom: none;
        border-top: 62px solid #e5e5e5;
        top: 1px;
        bottom: auto;
      }

      .item, .drop-passage-anim-box {
        top: 0;
        bottom: 23px;
      }
    }
  }

  .item, .drop-passage-anim-box {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 0;
    top: 23px;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .drop-passage {
    &.left {
      transform: rotate(0deg);
    }

    &.right {
      transform: rotate(0deg);
    }

    &.top-left {
      transform: rotate(0deg);
    }

    &.bottom-right {
      transform: rotate(0deg);
    }
  }
}
</style>
