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
        <template v-if="!showConfirmationDialog">
          <button
            :disabled="!bobomsAvailable"
            v-on:click="onAddBobombClick"
            class="btn btn_add-bobomb"
          >Add Bobomb {{bobombs}}</button>
          <button
            :disabled="!swapsAvailable"
            v-on:click="onSwapItemsClick"
            class="btn btn_swap-items"
          >Swap Items {{swaps}}</button>
        </template>
        <template v-if="showConfirmationDialog">
          <button
            v-on:click="onDialogCancel"
            class="btn btn_cancel"
          >Nooo!..</button>
          <button
            v-on:click="onDialogConfirm"
            class="btn btn_ok"
          >Yeah Baby</button>
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
      this.$store.commit('user/SET_CONTINUOUS_SELECTION_MODE', true);
      this.$store.commit('SET_SELECTED_ITEMS_LIMIT', 1);
      this.$store.commit('sceneController/SHOW_CONFIRMATION_DIALOG');
      this.$store.commit('SET_DIALOG_CONFIRM_ACTION', 'placeUsersBobobmb');
    },
    onSwapItemsClick() {
      this.$store.commit('user/SET_USER_INPUT_MODE', 'selectionMode');
      this.$store.commit('SET_SELECTED_ITEMS_LIMIT', 2);
      this.$store.commit('sceneController/SHOW_CONFIRMATION_DIALOG');
      this.$store.commit('SET_DIALOG_CONFIRM_ACTION', 'swapSelectedItems');
    },

    onDialogCancel() {
      this.$store.dispatch('executeDialogCancelAction');
      this.$store.commit('sceneController/HIDE_CONFIRMATION_DIALOG');
      this.$store.dispatch('clearSelection');
      this.$store.commit('user/SET_CONTINUOUS_SELECTION_MODE', false);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'default');
    },

    onDialogConfirm() {
      this.$store.dispatch('executeDialogConfirmAction');
      this.$store.commit('sceneController/HIDE_CONFIRMATION_DIALOG');
      this.$store.dispatch('clearSelection');
      this.$store.commit('user/SET_CONTINUOUS_SELECTION_MODE', false);
      this.$store.commit('user/SET_USER_INPUT_MODE', 'default');
    },
  },
  computed: {
    ...mapState({
      user: state => state.user,
      bobombs: state => state.inventory.bobombs,
      swaps: state => state.inventory.swaps,
      showConfirmationDialog: state => state.sceneController.showConfirmationDialog,
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
    padding: 0 10px;
    justify-content: center;

    .btn {
      flex: 1 1 0;
      margin: auto 10px;
      max-width: 50%;
    }
  }

  .btn_add-bobomb {
    display: block;
    padding: 10px 20px;
    border-radius: 9999px;
    background-color: chocolate;
    color: #ffffff;
    margin: auto;
    font-size: 14px;
    border: none;
  }

  .btn_swap-items {
    display: block;
    padding: 10px 20px;
    border-radius: 9999px;
    background-color: chocolate;
    color: #ffffff;
    margin: auto;
    font-size: 14px;
    border: none;
  }

  .btn_cancel {
    display: block;
    padding: 10px 20px;
    border-radius: 9999px;
    background-color: #ffffff;
    color: chocolate;
    margin: auto;
    font-size: 14px;
    border: 3px solid #ff8040;
  }

  .btn_ok {
    display: block;
    padding: 10px 20px;
    border-radius: 9999px;
    background-color: #ffffff;
    color: #1f991f;
    margin: auto;
    font-size: 14px;
    border: 3px solid #1f991f;
  }

  .btn[disabled] {
    opacity: 0.5;
  }
</style>
