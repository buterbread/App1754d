import configModule from '../config/gameplay';

const config = configModule();

export default {
  GENERATE_ITEMS_ARRAY(state, level) {
    state.level = level;
    state.itemsArray = level.getMap();
  },

  RESET_DROPS_COUNTER(state) {
    state.dropsCount = config.initialDropsCounter;
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
    state.dropsCount -= amount;
  },

  ADD_USER_DROP(state, amount = 1) {
    state.dropsCount += amount;
  },
};
