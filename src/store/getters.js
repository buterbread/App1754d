export default {
  youLost(state, getters) {
    const { level } = state;
    return state.gameStarted && !getters.animationsInProgress && level.lost(state);
  },
  youWin(state, getters) {
    const { level } = state;
    return state.gameStarted && !getters.animationsInProgress && level.win(state);
  },
  animationsInProgress(state) {
    return state.animationsCounter > 0;
  },
};
