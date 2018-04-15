<template>
  <div class="playground-box">
    <div v-for="itemRow in itemsArray" v-bind:key="itemRow.id">
      <item v-for="item in itemRow" v-bind:item="item" v-bind:key="item.id"></item>
    </div>
  </div>
</template>

<script>
import item from '../components/PlaygroundItem';

export default {
  components: {
    item,
  },
  computed: {
    itemsArray() {
      return this.$store.state.itemsArray;
    },
  },
};
</script>

<style lang="scss">
.playground-box {
  display: table;
  margin: 100px auto 0;
  text-align: center;
  font-size: 0;
}
</style>
