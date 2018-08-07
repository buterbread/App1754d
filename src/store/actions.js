import configModule from '../config/gameplay';
import levelConstructor from '../config/levelConstructor';

const config = configModule();

export default {
  startNewGame(context) {
    context.commit('user/SET_CURRENT_LEVEL', 1);
    context.commit('GENERATE_ITEMS_ARRAY', levelConstructor({ index: 1 }));
    context.commit('RESET_DROPS_COUNTER');
    context.commit('SET_GAME_STARTED', true);
  },

  startNextLevel(context) {
    const { user } = context.state;

    context.commit('user/SET_CURRENT_LEVEL', user.currentLevel += 1);
    context.commit('GENERATE_ITEMS_ARRAY', levelConstructor({ index: user.currentLevel }));
    context.commit('SET_GAME_STARTED', true);
  },

  continueGame(context, options) {
    const { user } = context.state;
    
    context.commit('user/SET_CURRENT_LEVEL', options.user.currentLevel + 1);
    context.commit('GENERATE_ITEMS_ARRAY', levelConstructor({ index: user.currentLevel }));
    context.commit('SET_DROPS_COUNTER', options.user.currentCount);
    context.commit('SET_GAME_STARTED', true);
  },

  stopGame(context) {
    context.commit('SET_GAME_STARTED', false);
  },

  saveProgress(context) {
    const saveRecordName = '__faraBubbleGame1754__';
    
    localStorage.setItem(saveRecordName, JSON.stringify({
      date: +Date.now(),
      user: context.state.user,
    }));
  },

  makeUserMove(context, options) {
    const { row, col } = options;

    context.commit('RESET_DISCHARGES_COUNT');
    context.commit('RESET_COMBOS_COUNT');
    context.commit('RESET_MULTIPLIER_INDEX');

    context.commit('REMOVE_USER_DROP');
    context.commit('INCREASE_ITEM', { row, col });
    context.dispatch('attemptToPopBubble', options);
  },

  attemptToPopBubble(context, options) {
    const { itemsArray: items, level } = context.state;
    const { row, col } = options;
    const unit = items[row][col];

    if (unit.value > level.maxItemValue) {
      context.dispatch('makePopAnimation', options, { root: true });

      if (unit.injectionInProgress === true) {
        return;
      }

      unit.injectionInProgress = true;

      setTimeout(() => {
        context.commit('RESET_ITEM_VALUE', { row, col, value: level.minItemValue });

        const dropType = unit.type;

        context.dispatch('dischargeAllEmitters', { dropType, ...options });
        unit.injectionInProgress = false;
      }, config.dropPopDuration - 1);
    }
  },

  dischargeAllEmitters(context, options) {
    const { itemsArray: items, level } = context.state;
    const { row, col, addBonusDrop } = options;
    const unit = items[row][col];

    const unitEmitters = unit.emitters[level.type];

    unitEmitters.forEach((emitter) => {
      context.commit('INCREASE_ANIMS_COUNTER', null, { root: true });
      context.dispatch('emitterDischarge', { row, col, emitter });
    });

    if (addBonusDrop === true) {
      context.dispatch('increaseCombo');
    }
  },

  increaseCombo(context) {
    context.commit('INCREASE_DISCHARGES_COUNT', 1);
    const { dischargesCount, comboMultiplierIndex: index } = context.state;
    const { comboMultipliers } = context.state.level;
    const multiplier = comboMultipliers[index];

    if (dischargesCount % multiplier === 0) {
      context.commit('ADD_USER_DROP', 1);
      context.commit('INCREASE_COMBOS_COUNT', 1);
      context.commit('SHIFT_MULTIPLIER_INDEX');
    }
  },

  emitterDischarge(context, options) {
    const { emissionType } = options.emitter;

    context.dispatch(`emissions/${emissionType}`, options);
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
    const unit = items[row][col];

    const dropCurrentDirection =
        unit.emitters[level.type].find(dir => dir.label === emitter.label);

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
