export default {
  namespaced: true,

  state: {
    showFastRelax: true,
    showGameModesMenu: true,
    showChaptersMenu: false,
    showSetsMenu: false,
    showLostScreen: false,
    showWinScreen: false,
    showConfirmationDialog: false,
    showRotationDialog: false,
    showInventory: true,
  },

  actions: {},

  mutations: {
    TEMP_SHOW_FASTRELAX(state) {
      state.showFastRelax = true;
    },
    TEMP_HIDE_FASTRELAX(state) {
      state.showFastRelax = false;
    },

    SHOW_LOST_SCREEN(state) {
      state.showLostScreen = true;
    },

    HIDE_LOST_SCREEN(state) {
      state.showLostScreen = false;
    },

    SHOW_WIN_SCREEN(state, value) {
      state.showWinScreen = value;
    },

    SHOW_GAME_MODES_MENU(state) {
      state.showGameModesMenu = true;
    },

    HIDE_GAME_MODES_MENU(state) {
      state.showGameModesMenu = false;
    },

    SHOW_CHAPTERS_MENU(state) {
      state.showChaptersMenu = true;
    },

    HIDE_CHAPTERS_MENU(state) {
      state.showChaptersMenu = false;
    },

    SHOW_SETS_MENU(state) {
      state.showSetsMenu = true;
    },

    HIDE_SETS_MENU(state) {
      state.showSetsMenu = false;
    },

    HIDE_CONFIRMATION_DIALOG(state) {
      state.showConfirmationDialog = false;
    },

    SHOW_CONFIRMATION_DIALOG(state) {
      state.showConfirmationDialog = true;
    },

    HIDE_ROTATION_DIALOG(state) {
      state.showRotationDialog = false;
    },

    SHOW_ROTATION_DIALOG(state) {
      state.showRotationDialog = true;
    },

    HIDE_INVENTORY(state) {
      state.showInventory = false;
    },

    SHOW_INVENTORY(state) {
      state.showInventory = true;
    },
  },

  getters: {},
};
