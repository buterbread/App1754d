import configModule from '../config/gameplay';

const config = configModule();

const explodeNearest = function explodeNearest(context, options) {
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
    return;
  }

  setTimeout(() => {
    if (items[row][col].value !== 0 && !items[row][col].disabled) {
      commit('INCREASE_ITEM', { row, col, amount: level.maxItemValue }, { root: true });
    }
    dispatch('stopDropPassageAnimation', options, { root: true });
    dispatch('attemptToPopBubble', { row, col, addBonusDrop: true }, { root: true });
  }, config.dropInjectionDelay);
};

export default {
  namespaced: true,

  actions: {
    injectAllDrops(context, options) {
      const { rootState, dispatch, commit } = context;
      const { level } = rootState;
      const { row, col, addBonusDrop } = options;

      if (addBonusDrop === true) {
        commit('ADD_USER_DROP', 1, { root: true });
      }

      const unit = rootState.itemsArray[row][col];

      const unitEmitters = unit.emitters[level.type];

      unitEmitters.forEach((emitter) => {
        commit('INCREASE_ANIMS_COUNTER', null, { root: true });
        dispatch('emitterFire', { row, col, emitter });
      });
    },

    emitterFire(context, options) {
      explodeNearest(context, options);
    },
  },
};
