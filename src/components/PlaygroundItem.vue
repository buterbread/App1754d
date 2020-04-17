<template>
  <BubbleComponentRect v-bind:item="item"></BubbleComponentRect>
</template>

<script>
import BubbleComponentRect from './BubbleComponentRect';

export default {
  props: ['item'],
  components: {
    BubbleComponentRect,
  },
};
</script>

<style lang="scss"></style>
