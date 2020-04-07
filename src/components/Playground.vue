<template>
  <div class="playground-box">
    <svg style="width: 0; height: 0">
      <defs>
        <path id="item__charge-delimiters-2"
          d="M36,19V36H-0.007V19H36ZM36,0V17H-0.007V0H36Z"/>
        <path id="item__charge-delimiters-3"
          d="M17,36V18.577L1.046,9.366,0,10V36H17Zm2,0V18.577L34.955,9.366,36,10V36H19ZM33.955,7.634L18,16.845,2.046,7.634,0,6V0H36V6Z"/>
        <path id="item__charge-delimiters-4"
          d="M-8.87,18L3.86,5.27,16.591,18,3.86,30.73ZM5.272,3.858L18-8.872l12.73,12.73L18,16.588Zm0,28.284L18,19.412l12.73,12.73L18,44.873ZM19.414,18L32.145,5.27,44.875,18,32.145,30.73Z"/>
        <path id="item__charge-delimiters-5"
          d="M30.565,2.407L19.618,17.474,37.33,23.229,38,22V2H32Zm6.147,22.724L19,19.376V38H38V26ZM17,38V19.376L-0.712,25.131-2,26V38H17ZM5.435,2.407L16.382,17.474-1.33,23.229-2,22V2H4ZM28.947,1.232L18,16.3,7.053,1.232,7,0H29Z"/>
        <path id="item__charge-delimiters-6"
          d="M19.732,17L29.547,0H36V17H19.732Zm-3.464,0H0V0H6.453Zm0,2L6.453,36H0V19H16.268ZM27.238,0L18,16,8.762,0H27.238ZM8.762,36L18,20l9.238,16H8.762Zm10.97-17H36V36H29.547Z"/>
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
      <clipPath id="item__charge-delimiters-mask-5">
        <use xlink:href="#item__charge-delimiters-5" />
      </clipPath>
      <clipPath id="item__charge-delimiters-mask-6">
        <use xlink:href="#item__charge-delimiters-6" />
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
