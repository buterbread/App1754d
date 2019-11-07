import config from '../config/gameplay';

export default {
  namespaced: true,

  state: {
    totalFinishedLevelsCount: null,
    currentCount: config.initialDropsCounter,
    currentGame: null,
    currentChapter: null,
    currentSet: null,
    currentLevel: null,
    inputLocked: false,
    inputMode: 'default',
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

    INCREASE_FINISHED_LEVELS_COUNT(state, value) {
      state.totalFinishedLevelsCount += value;
    },

    SET_FINISHED_LEVELS_COUNT(state, value) {
      state.totalFinishedLevelsCount = value;
    },

    LOCK_USER_INPUT(state) {
      state.inputLocked = true;
    },

    UNLOCK_USER_INPUT(state) {
      state.inputLocked = false;
    },

    SET_USER_INPUT_MODE(state, value) {
      state.inputMode = value;
    },
  },

  getters: {},
};
