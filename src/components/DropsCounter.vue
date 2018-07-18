<template>
  <div class="drops-counter">{{ dropsCount }}</div>
</template>

<script>
export default {
  computed: {
    dropsCount() {
      return this.$store.state.user.currentCount;
    },
  },
};
</script>

<style lang="scss">
.drops-counter {
  margin: 30px auto 0 auto;
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
