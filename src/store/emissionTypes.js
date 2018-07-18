import configModule from '../config/gameplay';

const config = configModule();

export default {
  namespaced: true,

  actions: {
    explodeNearest(context, options) {
      const { rootState, dispatch, commit } = context;
      const { level, itemsArray: items } = rootState;

      const row = options.row + options.emitter.top;
      const col = options.col + options.emitter.left;

      if (!items[row] || !items[row][col]) {
        dispatch('stopDropPassageAnimation', options, { root: true });
        return;
      }

      dispatch('startDropPassageAnimation', options, { root: true });

      if (items[row][col].disabled) {
        dispatch('stopDropPassageAnimation', options, { root: true });
        return;
      }

      setTimeout(() => {
        if (items[row][col].value !== 0 && !items[row][col].disabled) {
          commit('INCREASE_ITEM', { row, col, amount: level.maxItemValue }, { root: true });
        }
        dispatch('stopDropPassageAnimation', options, { root: true });
        dispatch('attemptToPopBubble', { row, col, addBonusDrop: true }, { root: true });
      }, config.dropInjectionDelay);
    },

    tillImpact(context, options) {
      const { rootState, dispatch, commit } = context;
      const { level, itemsArray: items } = rootState;

      const initialItemCords = options.initialItemCords || options;

      const row = options.row + options.emitter.top;
      const col = options.col + options.emitter.left;

      if (!items[row] || !items[row][col]) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

      dispatch('startDropPassageAnimation', options, { root: true });

      const top = options.emitter.top;
      const left = options.emitter.left;

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
          dispatch('tillImpact', {
            row: options.row,
            col: options.col,
            emitter: {
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
        dispatch('attemptToPopBubble', { row, col, addBonusDrop: true }, { root: true });
      }, config.dropInjectionDelay);
    },
  },
};
