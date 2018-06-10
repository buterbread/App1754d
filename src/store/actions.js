import configModule from '../config/gameplay';
import levelConstructor from '../config/levelConstructor';

const config = configModule();

export default {
  startNewGame(context, options) {
    context.commit('GENERATE_ITEMS_ARRAY', levelConstructor(options));
    context.commit('RESET_DROPS_COUNTER');
    context.commit('SET_GAME_STARTED', true);
  },

  stopGame(context) {
    context.commit('SET_GAME_STARTED', false);
  },

  makeUserMove(context, options) {
    const { row, col } = options;

    context.commit('REMOVE_USER_DROP');
    context.commit('INCREASE_ITEM', { row, col });
    context.dispatch('userMoveCallback', options);
  },

  userMoveCallback(context, options) {
    const items = context.state.itemsArray;
    const { row, col } = options;
    const dropType = items[row][col].type;

    const emittingFunctionPromise = context.dispatch('getBubbleEmitAction', { dropType, ...options });

    emittingFunctionPromise.then(action => action(context, options));
  },

  getBubbleEmitAction(context, options) {
    const { row, col, dropType } = options;

    return {
      default: () => context.dispatch('moduleBubbleDefault/tryToPopBubble', { row, col }),
      bobomb: () => context.dispatch('moduleBubbleBobomb/tryToPopBubble', { row, col }),
    }[dropType];
  },

  startDropPassageAnimation(context, options) {
    const items = context.state.itemsArray;
    const { row, col, direction } = options;

    if (!items[row] || !items[row][col]) {
      return;
    }

    const dropCurrentDirection =
        items[row][col].directions.find(dir => dir.label === direction.label);

    if (dropCurrentDirection && !dropCurrentDirection.animation) {
      dropCurrentDirection.animation = true;
    }
  },

  stopDropPassageAnimation(context, options) {
    context.commit('DECREASE_ANIMS_COUNTER');
    const { row, col, direction } = options;
    const items = context.state.itemsArray;

    const dropCurrentDirection =
        items[row][col].directions.find(dir => dir.label === direction.label);

    if (dropCurrentDirection && dropCurrentDirection.animation) {
      dropCurrentDirection.animation = false;
    }
  },

  makePopAnimation(context, options) {
    const { row, col } = options;

    context.commit('TOGGLE_ITEM_ANIMATION_STATE', { row, col, value: true });

    setTimeout(() => {
      context.commit('TOGGLE_ITEM_ANIMATION_STATE', { row, col, value: false });
    }, config.dropPopDuration);
  },
};
