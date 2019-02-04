import config from '../config/gameplay';

export default {
  namespaced: true,

  state: {
    currentLevel: null,
    currentCount: config.initialDropsCounter,
    currentGame: null,
    currentChapter: null,
    currentSet: null,
  },

  actions: {},

  mutations: {
    SET_CURRENT_GAME(state, game) {
      state.currentGame = game;
    },

    SET_CURRENT_CHAPTER(state, chapter) {
      state.currentChapter = chapter;
    },

    SET_CURRENT_SET(state, set) {
      state.currentSet = set;
    },

    SET_CURRENT_LEVEL(state, level) {
      state.currentLevel = level;
    },
  },

  getters: {},
};
