<template>
  <div class="scene scene_playground">
    <div class="gameplay-screen">
      <div class="gameplay-screen__top">
        <drops-counter></drops-counter>
        <div class="levels-counter">
          Level: {{ this.user.totalFinishedLevelsCount + 1 }}
        </div>
        <comboMonitor></comboMonitor>
      </div>
      <div class="gameplay-screen__middle">
        <playground></playground>
      </div>
      <div class="gameplay-screen__bottom">
        <template v-if="showInventory">
          <button
            :disabled="!bobomsAvailable"
            v-on:click="onAddBobombClick"
            class="btn btn_add-bobomb"
          ><i class="btn-icon fas fa-bomb"></i> {{bobombs}}</button>
          <button
            v-on:click="onRotateClick"
            class="btn">
            <i class="btn-icon fa fa-sync"></i>
          </button>
          <button
            :disabled="!swapsAvailable"
            v-on:click="onSwapItemsClick"
            class="btn btn_swap-items"
          ><i class="btn-icon fas fa-exchange-alt"></i> {{swaps}}</button>
        </template>
        <template v-if="showRotationDialog">
          <button
            v-on:click="onRotateLeftClick"
            class="btn">
            <i class="btn-icon fa fa-undo"></i>
          </button>
          <button
            v-on:click="onRotateRightClick"
            class="btn">
            <i class="btn-icon fa fa-redo"></i>
          </button>
          <button
            v-on:click="onRotateFinishedClick"
            class="btn btn_ok"
          ><i class="btn-icon fa fa-check"></i></button>
        </template>
        <template v-if="showConfirmationDialog">
          <button
            v-on:click="onDialogCancel"
            class="btn btn_cancel"
          ><i class="btn-icon fa fa-times"></i></button>
          <button
            v-on:click="onDialogConfirm"
            class="btn btn_ok"
          ><i class="btn-icon fa fa-check"></i></button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import dropsCounter from '../components/DropsCounter';
import comboMonitor from '../components/ComboMonitor';
import playground from '../components/Playground';

export default {
  components: {
    dropsCounter,
    comboMonitor,
    playground,
  },
  methods: {
    onAddBobombClick() {
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selectionMode');
      this.$store.commit('SET_SELECTED_ITEMS_LIMIT', 1);
      this.$store.commit('sceneController/HIDE_INVENTORY');
      this.$store.commit('sceneController/SHOW_CONFIRMATION_DIALOG');
      this.$store.commit('SET_DIALOG_CONFIRM_ACTION', { id: 'placeUsersBobobmb' });
    },
    onSwapItemsClick() {
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selectionMode');
      this.$store.commit('SET_SELECTED_ITEMS_LIMIT', 2);
      this.$store.commit('sceneController/HIDE_INVENTORY');
      this.$store.commit('sceneController/SHOW_CONFIRMATION_DIALOG');
      this.$store.commit('SET_DIALOG_CONFIRM_ACTION', { id: 'swapSelectedItems' });
    },
    onRotateClick() {
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selectionMode');
      this.$store.commit('SET_SELECTED_ITEMS_LIMIT', 1);
      this.$store.commit('sceneController/HIDE_INVENTORY');
      this.$store.commit('sceneController/SHOW_ROTATION_DIALOG');
    },
    onRotateLeftClick() {
      this.$store.dispatch('rotateSelectedItems', { direction: 'ccv' });
    },
    onRotateRightClick() {
      this.$store.dispatch('rotateSelectedItems', { direction: 'cv' });
    },
    onRotateFinishedClick() {
      this.$store.commit('sceneController/HIDE_ROTATION_DIALOG');
      this.$store.commit('sceneController/SHOW_INVENTORY');
      this.$store.dispatch('clearSelection');
      this.$store.commit('user/SET_USER_INPUT_MODE', 'default');
    },

    onDialogCancel() {
      this.$store.dispatch('executeDialogCancelAction');
      this.$store.commit('sceneController/HIDE_CONFIRMATION_DIALOG');
      this.$store.commit('sceneController/SHOW_INVENTORY');
      this.$store.dispatch('clearSelection');
      this.$store.commit('user/SET_USER_INPUT_MODE', 'default');
    },

    onDialogConfirm() {
      this.$store.dispatch('executeDialogConfirmAction');
      this.$store.commit('sceneController/HIDE_CONFIRMATION_DIALOG');
      this.$store.commit('sceneController/SHOW_INVENTORY');
      this.$store.dispatch('clearSelection');
      this.$store.commit('user/SET_USER_INPUT_MODE', 'default');
    },
  },
  computed: {
    ...mapState({
      user: state => state.user,
      bobombs: state => state.inventory.bobombs,
      swaps: state => state.inventory.swaps,
      showConfirmationDialog: state => state.sceneController.showConfirmationDialog,
      showRotationDialog: state => state.sceneController.showRotationDialog,
      showInventory: state => state.sceneController.showInventory,
    }),
    ...mapGetters({
      bobomsAvailable: 'inventory/bobomsAvailable',
      swapsAvailable: 'inventory/swapsAvailable',
    }),
  },
};
</script>

<style lang="scss">
  .gameplay-screen__bottom {
    padding: 0 5px;
    justify-content: center;
    justify-items: stretch;
  }

  .btn {
    display: block;
    flex: 1 1 0;
    margin: 0 5px;
    padding: 10px 20px;
    border-radius: 9999px;
    background-color: chocolate;
    color: #ffffff;
    font-size: 14px;
    border: 3px solid transparent;
  }

  .btn-icon {
    font-size: 25px;
  }

  .btn_add-bobomb {}

  .btn_rotate {}

  .btn_swap-items {}

  .btn_cancel {
    background-color: #ffffff;
    color: chocolate;
    border: 3px solid #ff8040;
  }

  .btn_ok {
    background-color: #ffffff;
    color: #1f991f;
    border: 3px solid #1f991f;
  }

  .btn[disabled] {
    opacity: 0.5;
  }
</style>
