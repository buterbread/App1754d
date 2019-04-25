import config from '../config/gameplay';

const { inventory: defaults } = config;

export default {
  namespaced: true,

  getters: {
    bobomsAvailable(state) {
      const { bobombs } = state;
      return bobombs > 0;
    },

    swapsAvailable(state) {
      const { swaps } = state;
      return swaps > 0;
    },
  },

  state: {
    bobombs: null,
    swaps: null,
  },

  actions: {},

  mutations: {
    INIT(state, params = defaults) {
      Object.keys(defaults).forEach(item => {
        state[item] = params[item];
      });
    },

    ADD_BOBOMB(state, value = 1) {
      state.bobombs += value;
    },

    REMOVE_BOBOMB(state, value = 1) {
      state.bobombs -= value;
    },

    ADD_SWAP(state, value = 1) {
      state.swaps += value;
    },

    REMOVE_SWAP(state, value = 1) {
      state.swaps -= value;
    },

    SET_SELECTED_ITEM(state, value) {
      state.selectedItem = value;
    },
  },
};
