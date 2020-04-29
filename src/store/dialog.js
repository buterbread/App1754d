export default {
  namespaced: true,

  state: {
    yesAction: null,
    noAction: null,
  },

  actions: {},

  mutations: {
    SET_YES_ACTION(state, action) {
      state.yesAction = action;
    },

    SET_NO_ACTION(state, action) {
      state.noAction = action;
    },
  },

  getters: {},
};
