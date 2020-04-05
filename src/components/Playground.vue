<template>
  <div class="playground-box">
    <svg style="width: 0; height: 0">
      <defs>
        <path id="item__charge-delimiters-2"
          d="M19,0H36V36.007H19V0ZM0,0H17V36.007H0V0Z"/>
        <path id="item__charge-delimiters-3"
          d="M17,0V17.423L1.046,26.634,0,26V0H17Zm2,0V17.423l15.955,9.211L36,26V0H19ZM33.955,28.366L18,19.155,2.046,28.366,0,30v6H36V30Z"/>
        <path id="item__charge-delimiters-4"
          d="M-8.87,18L3.86,5.27,16.591,18,3.86,30.73ZM5.272,3.858L18-8.872l12.73,12.73L18,16.588Zm0,28.284L18,19.412l12.73,12.73L18,44.873ZM19.414,18L32.145,5.27,44.875,18,32.145,30.73Z"/>
      </defs>
      <clipPath id="item__charge-delimiters-mask-2">
        <use xlink:href="#item__charge-delimiters-2" />
      </clipPath>
      <clipPath id="item__charge-delimiters-mask-3">
        <use xlink:href="#item__charge-delimiters-3" />
      </clipPath>
      <clipPath id="item__charge-delimiters-mask-4">
        <use xlink:href="#item__charge-delimiters-4" />
      </clipPath>
    </svg>
    <div class="playground-row" v-for="(itemRow, rowIndex) in itemsArray"
         v-bind:key="itemRow.id">
      <PlaygroundItem v-for="(item, colIndex) in itemRow"
            v-bind:item="item"
            v-bind:key="item.id"
            v-bind:data-row="rowIndex"
            v-bind:data-col="colIndex"></PlaygroundItem>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlaygroundItem from '../components/PlaygroundItem';

export default {
  components: {
    PlaygroundItem,
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
