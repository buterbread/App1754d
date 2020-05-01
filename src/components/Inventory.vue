<template>
  <div class="inventory">
    <Dialog
      v-if="showArmoryDialog"
      v-bind:classNames="'gameplayScene-armoryDialog'"
    >
      <div class="rotateCtrl" v-if="isRotationActive">
        <button
          class="button rotateCtrl-button"
          v-on:click="() => onRotateClick('ccv')">CCV</button>
        <button
          class="button rotateCtrl-button"
          v-on:click="() => onRotateClick('cv')">CV</button>
      </div>
    </Dialog>

    <div class="gameplayScene-armory">
      <div class="gameplayScene-armoryItemBox">
        <div class="gameplayScene-armoryItem">
          <Bubble
            v-bind:item="{ type: 'bobomb', value: 4, maxItemValue: 4, emitters: [] }"
            v-bind:on-item-click="() => onArmoryItemClick('bobomb')" />
        </div>
        <span class="gameplayScene-armoryItemText">{{bobomb}}</span>
      </div>

      <div class="gameplayScene-armoryItemBox">
        <div class="gameplayScene-armoryItem">
          <Bubble
            v-bind:item="{ type: 'laser', value: 1, maxItemValue: 1, emitters: [] }"
            v-bind:on-item-click="() => onArmoryItemClick('laser')" />
        </div>
        <span class="gameplayScene-armoryItemText">{{laser}}</span>
      </div>
    </div>

    <div class="gameplayScene-tools">
      <button
        class="button gameplayScene-tool"
        v-on:click="onSwapClick"
        :disabled="swap <= 0">
        <i class="gameplayScene-toolIcon gameplayScene-toolIcon--swap"></i>
        <span class="gameplayScene-toolText">{{swap}}</span>
      </button>
      <button
        class="button gameplayScene-tool"
        v-on:click="onRotationClick"
        :disabled="rotate <= 0"
      >
        <i class="gameplayScene-toolIcon gameplayScene-toolIcon--rotate"></i>
        <span class="gameplayScene-toolText">{{rotate}}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Bubble from './BubbleComponentRect';
import Dialog from './Dialog';

export default {
  data() {
    return {};
  },
  components: {
    Dialog,
    Bubble,
  },
  methods: {
    onArmoryItemClick(type) {
      this.$store.commit('user/PUT_ITEM_IN_USER_SLOT', type);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'placement');
      this.$store.commit('sceneController/SHOW_ARMORY_DIALOG');
      this.$store.commit('dialog/SET_YES_ACTION', 'applyBubblePlacing');
      this.$store.commit('dialog/SET_NO_ACTION', 'revertBubblePlacing');
    },
    onSwapClick() {
      this.$store.commit('sceneController/SHOW_ARMORY_DIALOG');
      this.$store.commit('user/SET_SELECTION_MAX_LENGTH', 2);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selection');

      this.$store.commit('dialog/SET_YES_ACTION', 'applySwap');
      this.$store.commit('dialog/SET_NO_ACTION', 'revertSwap');
    },
    onRotationClick() {
      this.$store.commit('sceneController/SHOW_ARMORY_DIALOG');
      this.$store.commit('user/ENABLE_ROTATION_MODE');
      this.$store.commit('user/SET_SELECTION_MAX_LENGTH', 1);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selection');

      this.$store.commit('dialog/SET_YES_ACTION', 'applyRotate');
      this.$store.commit('dialog/SET_NO_ACTION', 'revertRotate');
    },
    onRotateClick(direction) {
      this.$store.dispatch('rotate', direction);
    },
  },
  computed: {
    ...mapState({
      showArmoryDialog: state => state.sceneController.showArmoryDialog,
      showInventoryDialog: state => state.sceneController.showInventoryDialog,
      user: state => state.user,
      isRotationActive: state => state.user.isRotationActive,
      bobomb: state => state.inventory.bobomb,
      laser: state => state.inventory.laser,
      rotate: state => state.inventory.rotate,
      swap: state => state.inventory.swap,
    }),
  },
};
</script>

<style lang="scss">

</style>
