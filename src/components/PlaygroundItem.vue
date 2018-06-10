<template>
  <bubbleDefault v-if="(item.type === 'default')" v-bind:item="item"></bubbleDefault>
  <bubbleBobomb v-else-if="(item.type === 'bobomb')" v-bind:item="item"></bubbleBobomb>
</template>

<script>
import bubbleDefault from './BubbleDefault';
import bubbleBobomb from './BubbleBobomb';

export default {
  props: ['item'],
  components: {
    bubbleDefault,
    bubbleBobomb,
  },
};
</script>

<style lang="scss"></style>
