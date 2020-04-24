export default {
  namespaced: true,

  state: {
    showGameModesMenu: true,
    showChaptersMenu: false,
    showSetsMenu: false,
    showArmoryDialog: false,
  },

  actions: {},

  mutations: {
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

    SHOW_ARMORY_DIALOG(state) {
      state.showArmoryDialog = true;
    },

    HIDE_ARMORY_DIALOG(state) {
      state.showArmoryDialog = false;
    },
  },

  getters: {},
};
