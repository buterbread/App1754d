import configModule from '../config/gameplay';

const config = configModule();

export default {
  startNewGame(context) {
    context.commit('GENERATE_ITEMS_ARRAY');
    context.commit('RESET_DROPS_COUNTER');
    context.commit('SET_GAME_STARTED', true);
  },

  stopGame(context) {
    context.commit('SET_GAME_STARTED', false);
  },

  makeUserMove(context, options) {
    const { row, col } = options;

    this.commit('REMOVE_USER_DROP');

    this.commit('INCREASE_ITEM', { row: options.row, col: options.col });

    this.dispatch('popBubble', { row, col, addBonusDrop: true });
  },

  injectAllDrops(context, options) {
    const { row, col, addBonusDrop } = options;

    if (addBonusDrop === true) {
      this.commit('ADD_USER_DROP');
    }

    const emitter = context.state.itemsArray[row][col];

    emitter.directions.forEach((direction) => {
      context.commit('INCREASE_ANIMS_COUNTER');
      context.dispatch('injectSingleDrop', { row, col, direction });
    });
  },

  injectSingleDrop(context, options) {
    const items = context.state.itemsArray;

    const initialItemCords = options.initialItemCords || options;

    const row = options.row + options.direction.top;
    const col = options.col + options.direction.left;

    if (!items[row] || !items[row][col]) {
      context.dispatch('stopDropPassageAnimation', initialItemCords);
      return;
    }

    context.dispatch('startDropPassageAnimation', options);

    const top = options.direction.top;
    const left = options.direction.left;

    if (items[row][col].value === 0) {
      let newTop;
      let newLeft;

      if (top === 0) {
        newTop = top;
      } else if (top < 0) {
        newTop = top - 1;
      } else {
        newTop = top + 1;
      }

      if (left === 0) {
        newLeft = left;
      } else if (left < 0) {
        newLeft = left - 1;
      } else {
        newLeft = left + 1;
      }

      setTimeout(() => {
        context.dispatch('injectSingleDrop', {
          row: options.row,
          col: options.col,
          direction: {
            top: newTop,
            left: newLeft,
          },
          initialItemCords,
        });
      }, config.dropInjectionDelay);
      return;
    }

    context.commit('INCREASE_ITEM', { row, col });

    setTimeout(() => {
      context.dispatch('stopDropPassageAnimation', initialItemCords);
    }, config.dropInjectionDelay);

    context.dispatch('popBubble', { row, col, addBonusDrop: true });
  },

  startDropPassageAnimation(context, options) {
    const items = context.state.itemsArray;
    const { row, col, direction } = options;

    if (!items[row] || !items[row][col]) {
      return;
    }

    if (!items[row][col].dropPassageAnimation[direction.label]) {
      items[row][col].dropPassageAnimation[direction.label] = true;
    }
  },

  stopDropPassageAnimation(context, options) {
    context.commit('DECREASE_ANIMS_COUNTER');
    const { row, col, direction } = options;
    const items = context.state.itemsArray;

    if (items[row][col].dropPassageAnimation[direction.label]) {
      items[row][col].dropPassageAnimation[direction.label] = false;
    }
  },

  popBubble(context, options) {
    const { row, col } = options;

    if (context.state.itemsArray[row][col].value > config.maxItemValue) {
      context.dispatch('makePopAnimation', options);

      setTimeout(() => {
        context.dispatch('injectAllDrops', options).then(() => {
          context.commit('RESET_ITEM_VALUE', { row, col, value: config.minItemValue });
        });
      }, config.dropPopDelay);
    }
  },
  makePopAnimation(context, options) {
    const { row, col } = options;

    context.commit('TOGGLE_ITEM_ANIMATION_STATE', { row, col, value: true });

    setTimeout(() => {
      context.commit('TOGGLE_ITEM_ANIMATION_STATE', { row, col, value: false });
    }, config.dropPopDelay);
  },
};
