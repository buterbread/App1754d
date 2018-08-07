import configModule from '../config/gameplay';

const config = configModule();

export default {
  GENERATE_ITEMS_ARRAY(state, level) {
    state.level = level;
    state.itemsArray = level.getMap();
  },

  SET_DROPS_COUNTER(state, value) {
    state.user.currentCount = value;
  },

  RESET_DROPS_COUNTER(state) {
    state.user.currentCount = config.initialDropsCounter;
  },

  SET_GAME_STARTED(state, status) {
    state.gameStarted = status;
  },

  INCREASE_ITEM(state, options) {
    const { row, col, amount = 1 } = options;
    state.itemsArray[row][col].value += amount;
  },

  RESET_ITEM_VALUE(state, options) {
    const { row, col, value } = options;
    state.itemsArray[row][col].value = value;
  },

  TOGGLE_ITEM_ANIMATION_STATE(state, options) {
    const { row, col, value } = options;
    state.itemsArray[row][col].isPopAnimationActive = value;
  },

  INCREASE_ANIMS_COUNTER(state) {
    state.animationsCounter += 1;
  },

  DECREASE_ANIMS_COUNTER(state) {
    state.animationsCounter -= 1;
  },

  REMOVE_USER_DROP(state, amount = 1) {
    state.user.currentCount -= amount;
  },

  ADD_USER_DROP(state, amount = 1) {
    state.user.currentCount += amount;
  },

  INCREASE_DISCHARGES_COUNT(state, amount = 1) {
    state.dischargesCount += amount;
  },

  RESET_DISCHARGES_COUNT(state) {
    state.dischargesCount = 0;
  },

  INCREASE_COMBOS_COUNT(state, amount = 1) {
    state.combosCount += amount;
  },

  RESET_COMBOS_COUNT(state) {
    state.combosCount = 0;
  },

  SHIFT_MULTIPLIER_INDEX(state) {
    if (state.level.comboMultipliers[state.comboMultiplierIndex + 1]) {
      state.comboMultiplierIndex += 1;
    }
  },

  RESET_MULTIPLIER_INDEX(state) {
    state.comboMultiplierIndex = 0;
  },
};
