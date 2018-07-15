export default {
  youLost(state) {
    return state.gameStarted && (state.user.currentCount === 0);
  },
  youWin(state, getters) {
    return state.gameStarted && !getters.animationsInProgress && getters.isArrayEmpty;
  },
  animationsInProgress(state) {
    return state.animationsCounter > 0;
  },
  isArrayEmpty(state) {
    for (let i = 0; i < state.itemsArray.length; i += 1) {
      for (let j = 0; j < state.itemsArray[i].length; j += 1) {
        if (state.itemsArray[i][j].value > 0 && !state.itemsArray[i][j].disabled) {
          return false;
        }
      }
    }
    return true;
  },
};
