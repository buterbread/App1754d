import configModule from '../config/gameplay';
import BubbleDefault from '../bubbleDefault';
import BubbleBobomb from '../bubbleBobomb';

const config = configModule();

export default {
  GENERATE_DEFAULT_ITEMS_ARRAY(state) {
    const itemsArray = [];

    for (let i = 0; i < config.arrayHeight; i += 1) {
      const itemsRow = [];

      itemsRow.id = Math.random().toString(36).substr(2, 9);

      for (let j = 0; j < config.arrayWidth; j += 1) {
        const col = new BubbleDefault({
          value: Math.floor(Math.random() *
              ((config.maxItemValue - config.minItemValue) + 1)) + config.minItemValue,
          row: i,
          col: j,
          id: Math.random().toString(36).substr(2, 9),
        });
        itemsRow.push(col);
      }
      itemsRow[i].disabled = true;
      itemsArray.push(itemsRow);
    }

    itemsArray[0][1] = new BubbleBobomb({
      value: Math.floor(Math.random() *
          ((config.maxItemValue - config.minItemValue) + 1)) + config.minItemValue,
      row: 0,
      col: 1,
      id: Math.random().toString(36).substr(2, 9),
    });

    state.itemsArray = itemsArray;
  },

  RESET_DROPS_COUNTER(state) {
    state.dropsCount = config.initialDropsCounter;
  },

  SET_GAME_STARTED(state, status) {
    state.gameStarted = status;
  },

  INCREASE_ITEM(state, options) {
    const { row, col } = options;
    state.itemsArray[row][col].value += 1;
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
