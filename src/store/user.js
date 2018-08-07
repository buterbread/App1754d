import configModule from '../config/gameplay';

const config = configModule();

export default {
  namespaced: true,

  state: {
    currentLevel: 1,
    currentCount: config.initialDropsCounter,
  },

  actions: {},

  mutations: {
    SET_CURRENT_LEVEL(state, level) {
      state.currentLevel = level;
    },
  },

  getters: {},
};
