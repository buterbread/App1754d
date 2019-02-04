<template>
  <div :class="['playground-box', levelType]">
    <div :class="['playground-row']"
        v-for="(itemRow, rowIndex) in itemsArray"
        v-bind:key="itemRow.id">
      <item v-for="(item, colIndex) in itemRow"
        :item="item"
        :key="item.id"
        :data-row="rowIndex"
        :data-col="colIndex"></item>
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
  computed: {
    ...mapState({
      itemsArray: state => state.itemsArray,
      levelType: state => state.user.currentLevel.type,
    }),
  },
};
</script>

<style lang="scss">
.playground-box {
  position: relative;
  margin: 0 auto;
  font-size: 0;
  display: flex;
  flex-direction: column;
}

.playground-row {
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
