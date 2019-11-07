import config from '../config/gameplay';

export default {
  namespaced: true,

  actions: {
    tillImpact(context, options) {
      const { rootState, dispatch } = context;
      const { itemsArray: items } = rootState;

      const initialItemCords = options.initialItemCords || options;
      const iteration = options.iteration || 0;

      const currentOffsets = options.offsets[iteration % options.offsets.length];

      const row = options.row + currentOffsets.top;
      const col = options.col + currentOffsets.left;

      if (!items[row] || !items[row][col] || items[row][col].isWall) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

      const item = items[row][col];

      dispatch('startDropPassageAnimation', options, { root: true });

      if (item.value === item.minItemValue || !item.canReceiveImpact) {
        setTimeout(() => {
          dispatch('tillImpact', {
            row,
            col,
            offsets: options.offsets,
            initialItemCords,
            iteration: iteration + 1,
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

    explodeNearest(context, options) {
      const { rootState, dispatch, commit } = context;
      const { itemsArray: items } = rootState;

      const row = options.row + options.offsets.top;
      const col = options.col + options.offsets.left;

      if (!items[row] || !items[row][col] || items[row][col].isWall) {
        dispatch('stopDropPassageAnimation', options, { root: true });
        return;
      }

      const item = items[row][col];

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
  },
};
