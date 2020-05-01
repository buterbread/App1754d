export default {
  namespaced: true,

  state: {
    bobomb: 5,
    laser: 5,
    portal: 5,
    swap: 5,
    rotate: 5,
  },

  actions: {},

  mutations: {
    ADD_INVENTORY_ITEM(state, options) {
      const { item, value = 1 } = options;
      state[item] += value;
    },

    REMOVE_INVENTORY_ITEM(state, options) {
      const { item, value = 1 } = options;
      state[item] -= value;
    },
  },

  getters: {},
};
