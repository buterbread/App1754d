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
    context.dispatch('attemptToPopBubble', options);
  },

  attemptToPopBubble(context, options) {
    const { itemsArray: items, level } = context.state;
    const { row, col } = options;

    if (items[row][col].value > level.maxItemValue) {
      context.dispatch('makePopAnimation', options, { root: true });

      setTimeout(() => {
        context.commit('RESET_ITEM_VALUE', { row, col, value: level.minItemValue }, { root: true });

        const dropType = items[row][col].type;

        context.dispatch('getBubbleEmitAction', { dropType, ...options })
          .then(action => action(context, options));
      }, config.dropPopDuration - 1);
    }
  },

  getBubbleEmitAction(context, options) {
    const { row, col, dropType } = options;

    return {
      default: () => context.dispatch('moduleBubbleDefault/injectAllDrops', { row, col }),
      bobomb: () => context.dispatch('moduleBubbleBobomb/injectAllDrops', { row, col }),
    }[dropType];
  },

  startDropPassageAnimation(context, options) {
    const { itemsArray: items, level } = context.state;
    const { row, col, emitter } = options;

    if (!items[row] || !items[row][col]) {
      return;
    }

    const dropCurrentDirection =
        items[row][col].emitters[level.type].find(dir => dir.label === emitter.label);

    if (dropCurrentDirection && !dropCurrentDirection.animation) {
      dropCurrentDirection.animation = true;
    }
  },

  stopDropPassageAnimation(context, options) {
    context.commit('DECREASE_ANIMS_COUNTER');
    const { itemsArray: items, level } = context.state;
    const { row, col, emitter } = options;

    const dropCurrentDirection =
        items[row][col].emitters[level.type].find(dir => dir.label === emitter.label);

    if (dropCurrentDirection && dropCurrentDirection.animation) {
      dropCurrentDirection.animation = false;
    }
  },

  makePopAnimation(context, options) {
    const { row, col } = options;

    context.commit('INCREASE_ANIMS_COUNTER');
    context.commit('TOGGLE_ITEM_ANIMATION_STATE', { row, col, value: true });

    setTimeout(() => {
      context.commit('DECREASE_ANIMS_COUNTER');
      context.commit('TOGGLE_ITEM_ANIMATION_STATE', { row, col, value: false });
    }, config.dropPopDuration);
  },
};
