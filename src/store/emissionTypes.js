import config from '../config/gameplay';

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
      const { rootState, dispatch } = context;
      const { itemsArray: items } = rootState;

      const initialItemCords = options.initialItemCords || options;
      const iteration = options.iteration || 0;

      const offset = options.offsets[iteration % options.offsets.length];
      const row = options.row + offset.top;
      const col = options.col + offset.left;

      if (items[row] && items[row][col] && !items[row][col].isWall) {
        const unit = items[row][col];

        dispatch('startDropPassageAnimation', options, { root: true });

        if (unit.value !== unit.minItemValue && unit.canReceiveImpact) {
          setTimeout(() => {
            if (items[row][col].value !== 0) {
              dispatch(items[row][col].impactCallback, {
                row,
                col,
              }, { root: true });
            }

            dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
            dispatch('attemptToPopBubble', {
              row,
              col,
              addBonusDrop: true,
            }, {
              root: true,
            });
          }, config.dropInjectionDelay);
        } else {
          setTimeout(() => {
            dispatch('tillImpact', {
              row,
              col,
              offsets: options.offsets,
              initialItemCords,
              iteration: iteration + 1,
            });
          }, config.dropInjectionDelay);
        }

        return;
      }

      dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
    },
  },
};
