<template>
  <div class="drops-counter">{{ dropsCount }}</div>
</template>

<script>
export default {
  computed: {
    dropsCount() {
      return this.$store.state.dropsCount;
    },
  },
};
</script>

<style lang="scss">
.drops-counter {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 20px;
    line-height: 50px;
    width: 50px;
    height: 50px;
    border: 1px solid #0c82df;
    border-radius: 5px;
    text-align: center;
}
</style>
