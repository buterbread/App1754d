<template>
  <div class="playground-box">
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
