import config from '../config/gameplay';

export default {
  namespaced: true,

  actions: {
    affectNearest(context, options) {
      const { rootState, dispatch, commit } = context;
      const { itemsArray: items } = rootState;

      const offset = options.offsets[0];
      const row = options.row + offset.top;
      const col = options.col + offset.left;

      if (!items[row] || !items[row][col] || items[row][col].isWall || items[row][col].disabled) {
        dispatch('stopDropPassageAnimation', options, { root: true });
        return;
      }

      const unit = items[row][col];

      dispatch('startDropPassageAnimation', options, { root: true });

      setTimeout(() => {
        if (items[row][col].value !== 0 && !items[row][col].disabled) {
          commit('INCREASE_ITEM', { row, col, amount: unit.maxItemValue }, { root: true });
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

      if (!items[row] || !items[row][col] || items[row][col].isWall) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

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
    },

    laserImpact(context, options) {
      const { rootState, dispatch } = context;
      const { itemsArray: items } = rootState;

      const initialItemCords = options.initialItemCords || options;
      const iteration = options.iteration || 0;

      const offset = options.offsets[iteration % options.offsets.length];
      const row = options.row + offset.top;
      const col = options.col + offset.left;

      if (!items[row] || !items[row][col] || items[row][col].isWall) {
        dispatch('stopDropPassageAnimation', initialItemCords, { root: true });
        return;
      }

      const unit = items[row][col];
      const { type } = unit;

      dispatch('startDropPassageAnimation', options, { root: true });

      setTimeout(() => {
        if (type === 'laser' && items[row][col].value !== 0) {
          dispatch('increaseItemValue', {
            row,
            col,
          }, { root: true });

          dispatch('stopDropPassageAnimation', initialItemCords, { root: true });

          dispatch('attemptToPopBubble', {
            row,
            col,
            addBonusDrop: true,
          }, {
            root: true,
          });
          return;
        }

        dispatch('desintegrateBubble', { row, col }, { root: true });

        dispatch('laserImpact', {
          row,
          col,
          offsets: options.offsets,
          initialItemCords,
          iteration: iteration + 1,
        });
      }, config.dropInjectionDelay);
    },
  },
};
