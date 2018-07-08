<template>
  <bubbleComponent v-bind:item="item"></bubbleComponent>
</template>

<script>
import bubbleComponent from './BubbleComponent';

export default {
  props: ['item'],
  components: {
    bubbleComponent,
  },
};
</script>

<style lang="scss"></style>
