import config from '../config/gameplay';

export default {
  namespaced: true,

  state: {
    currentLevel: 1,
    currentCount: config.initialDropsCounter,
    currentGame: null,
    currentChapter: null,
    currentSet: null,
    inputLocked: false,
    inputMode: 'default',
    isRotationActive: false,
    activeSlot: '',
    levelStash: null,
    itemStash: null,
    selectionMaxLength: 1,
    selection: [],
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

    LOCK_USER_INPUT(state) {
      state.inputLocked = true;
    },

    UNLOCK_USER_INPUT(state) {
      state.inputLocked = false;
    },

    SET_USER_INPUT_MODE(state, mode) {
      state.inputMode = mode;
    },

    PUT_ITEM_IN_USER_SLOT(state, item) {
      state.activeSlot = item;
    },

    PUT_LEVEL_IN_STASH(state, level) {
      state.levelStash = level;
    },

    CLEAR_LEVEL_STASH(state) {
      state.levelStash = null;
    },

    PUT_ITEM_IN_STASH(state, item) {
      state.itemStash = item;
    },

    CLEAR_ITEM_STASH(state) {
      state.itemStash = null;
    },

    SET_SELECTION_MAX_LENGTH(state, value) {
      state.selectionMaxLength = value;
    },

    SET_SELECTION(state, value) {
      state.selection = value;
    },

    ENABLE_ROTATION_MODE(state) {
      state.isRotationActive = true;
    },

    DISABLE_ROTATION_MODE(state) {
      state.isRotationActive = false;
    },
  },

  getters: {},
};
