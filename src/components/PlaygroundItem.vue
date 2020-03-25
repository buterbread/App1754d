<template>
  <BubbleComponentQuad v-bind:item="item"></BubbleComponentQuad>
</template>

<script>
import BubbleComponentQuad from './BubbleComponentRect';

export default {
  props: ['item'],
  components: {
    BubbleComponentQuad,
  },
};
</script>

<style lang="scss"></style>
