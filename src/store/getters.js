export default {
  youLost(state) {
    return state.gameStarted && (state.dropsCount === 0);
  },
  youWin(state, getters) {
    return state.gameStarted && getters.isArrayEmpty && !getters.animationsInProgress;
  },
  animationsInProgress(state) {
    return state.animationsCounter > 0;
  },
  isArrayEmpty(state) {
    for (let i = 0; i < state.itemsArray.length; i += 1) {
      for (let j = 0; j < state.itemsArray[i].length; j += 1) {
        if (state.itemsArray[i][j].value > 0) {
          return false;
        }
      }
    }

    return true;
  },
};
