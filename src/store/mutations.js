import configModule from '../config/gameplay';

const config = configModule();

function Bubble(options) {
  this.value = options.value;
  this.row = options.row;
  this.col = options.col;
  this.isPopAnimationActive = false;
  this.directions = config.directions.slice();
  this.dropPassageAnimation = {
    left: false,
    top: false,
    right: false,
    bottom: false,
    topLeft: false,
    bottomRight: false,
  };
}

export default {
  GENERATE_ITEMS_ARRAY(state) {
    const itemsArray = [];

    for (let i = 0; i < config.arrayHeight; i += 1) {
      const itemsRow = [];

      itemsRow.id = Math.random().toString(36).substr(2, 9);

      for (let j = 0; j < config.arrayWidth; j += 1) {
        const col = new Bubble({
          value: Math.floor(Math.random() *
              ((config.maxItemValue - config.minItemValue) + 1)) + config.minItemValue,
          row: i,
          col: j,
          id: Math.random().toString(36).substr(2, 9),
        });
        itemsRow.push(col);
      }
      itemsArray.push(itemsRow);
    }

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
