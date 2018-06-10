import configModule from '../config/gameplay';

const config = configModule();

export default {
  namespaced: true,

  actions: {
    tryToPopBubble(context, options) {
      const { rootState, dispatch, commit } = context;
      const { row, col } = options;
      const level = rootState.level;

      if (rootState.itemsArray[row][col].value > level.maxItemValue) {
        dispatch('makePopAnimation', options, { root: true });

        setTimeout(() => {
          commit('RESET_ITEM_VALUE', { row, col, value: level.minItemValue }, { root: true });
          dispatch('injectAllDrops', options);
        }, config.dropPopDuration);
      }
    },

    injectAllDrops(context, options) {
      const { rootState, dispatch, commit } = context;

      const { row, col, addBonusDrop } = options;

      if (addBonusDrop === true) {
        commit('ADD_USER_DROP', null, { root: true });
      }

      const emitter = rootState.itemsArray[row][col];

      emitter.directions.forEach((direction) => {
        commit('INCREASE_ANIMS_COUNTER', null, { root: true });
        dispatch('injectSingleDrop', { row, col, direction });
      });
    },

    injectSingleDrop(context, options) {
      const { rootState, dispatch, commit } = context;

      const items = rootState.itemsArray;
      const level = rootState.level;

      const initialItemCords = options.initialItemCords || options;

      const row = options.row + options.direction.top;
      const col = options.col + options.direction.left;

      if (!items[row] || !items[row][col]) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

      dispatch('startDropPassageAnimation', options, { root: true });

      const top = options.direction.top;
      const left = options.direction.left;

      if (items[row][col].value === level.minItemValue || items[row][col].disabled) {
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

      setTimeout(() => {
        if (items[row][col].value !== 0 && !items[row][col].disabled) {
          commit('INCREASE_ITEM', { row, col }, { root: true });
        }
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        dispatch('tryToPopBubble', { row, col, addBonusDrop: true });
      }, config.dropInjectionDelay);
    },
  },
};
