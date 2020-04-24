<template>
  <div :class="['dialog', classNames]">
    <div class="dialog-buttonsBox">
      <button class="button dialog-button" v-on:click="onNoClick">N</button>
      <button class="button dialog-button" v-on:click="onYesClick">Y</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classNames: String,
    onYes: Function,
    onNo: Function,
  },

  methods: {
    onYesClick() {
      const { onYes } = this.$props;
      if (onYes) {
        onYes();
      }
    },
    onNoClick() {
      const { onNo } = this.$props;
      if (onNo) {
        onNo();
      }
    },
  },
};
</script>

<style lang="scss">
  .dialog {
    background-color: rgba(3, 6, 19, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .dialog-buttonsBox {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .dialog-button {
    max-width: 70px;
    display: block;
    flex: 1 1 0;
    color: #fff;
    background-color: #403f5b;
    border-radius: 65536px;
    margin: 0 15px;
    border: 1px solid transparent;
    padding: 11px 10px 9px 10px;
  }
</style>
