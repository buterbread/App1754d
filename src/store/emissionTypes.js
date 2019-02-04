import config from '../config/gameplay';

function isIndexEven(entity) {
  return ((entity + 1) % 2) > 0;
}

export default {
  namespaced: true,

  actions: {
    explodeNearest(context, options) {
      const { rootState, dispatch, commit } = context;
      const { itemsArray: items } = rootState;

      const row = options.row + options.emitter.top;
      const col = options.col + options.emitter.left;

      const item = items[row][col];

      if (!items[row] || !item || item.isWall) {
        dispatch('stopDropPassageAnimation', options, { root: true });
        return;
      }

      dispatch('startDropPassageAnimation', options, { root: true });

      if (item.disabled) {
        dispatch('stopDropPassageAnimation', options, { root: true });
        return;
      }

      setTimeout(() => {
        if (item.value !== 0) {
          commit('INCREASE_ITEM', { row, col, amount: item.maxItemValue }, { root: true });
        }
        dispatch('stopDropPassageAnimation', options, { root: true });
        dispatch('attemptToPopBubble', { row, col, addBonusDrop: true }, { root: true });
      }, config.dropInjectionDelay);
    },

    tillImpact(context, options) {
      const { rootState, dispatch } = context;
      const { itemsArray: items } = rootState;

      const initialItemCords = options.initialItemCords || options;

      const row = options.row + options.emitter.top;
      const col = options.col + options.emitter.left;

      if (!items[row] || !items[row][col] || items[row][col].isWall) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

      const item = items[row][col];

      dispatch('startDropPassageAnimation', options, { root: true });

      const { top, left } = options.emitter;

      if (item.value === item.minItemValue || !item.canReceiveImpact) {
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
        if (items[row][col].value !== 0) {
          dispatch(items[row][col].impactCallback, { row, col }, { root: true });
        }
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        dispatch('attemptToPopBubble', { row, col, addBonusDrop: true }, { root: true });
      }, config.dropInjectionDelay);
    },

    tillImpactTriangle(context, options) {
      const { rootState, dispatch } = context;
      const { itemsArray: items } = rootState;

      const initialItemCords = options.initialItemCords || options;

      const row = options.row + options.emitter.top;
      const col = options.col + options.emitter.left;

      if (!items[row] || !items[row][col] || items[row][col].isWall) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

      const item = items[row][col];

      dispatch('startDropPassageAnimation', options, { root: true });

      const { top, left } = options.emitter;

      if (item.value === item.minItemValue || !item.canReceiveImpact) {
        let newTop;
        let newLeft;
        const newShift = !options.emitter.shift;

        if (newShift) {
          newLeft = left;

          if (isIndexEven(options.row)) {
            newTop = isIndexEven(options.col) ? top + 1 : top - 1;
          } else {
            newTop = isIndexEven(options.col) ? top - 1 : top + 1;
          }
        } else {
          newTop = top;

          if (left === 0) {
            newLeft = left;
          } else if (left < 0) {
            newLeft = left - 1;
          } else {
            newLeft = left + 1;
          }
        }

        setTimeout(() => {
          dispatch('tillImpactTriangle', {
            row: options.row,
            col: options.col,
            emitter: {
              top: newTop,
              left: newLeft,
              shift: newShift,
            },
            initialItemCords,
          });
        }, config.dropInjectionDelay);
        return;
      }

      setTimeout(() => {
        if (items[row][col].value !== 0) {
          dispatch(items[row][col].impactCallback, { row, col }, { root: true });
        }
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        dispatch('attemptToPopBubble', { row, col, addBonusDrop: true }, { root: true });
      }, config.dropInjectionDelay);
    },
  },
};
