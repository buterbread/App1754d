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
  left: 30px;
  margin: auto;
  font-size: 20px;
  line-height: 60px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #17b6ed;
  color: #ffffff;
  text-align: center;
}
</style>
