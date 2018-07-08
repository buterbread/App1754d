<template>
  <div class="you-win">
    <router-link :to=nextLvlLink>Next Level &gt;</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      nextLvlLink: `gameplay/${this.getLevel()}`,
    };
  },
  methods: {
    getLevel() {
      return +this.$route.params.level + 1;
    },
  },
};
</script>

<style lang="scss">
  .you-win {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 50px 20px;
    z-index: 9999;
    background: #fafafa;
    font-size: 36px;
    color: mediumseagreen;
  }
</style>
