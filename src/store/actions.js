import config from '../config/gameplay';
import roadmap from '../config/roadmap';
import levelConstructor from '../levelConstructor';

const { saveRecordName } = config;

export default {
  setGameMode(context, gameMode) {
    const game = roadmap.find(item => item.type === gameMode);
    game.chapters = [];

    game.chaptersMap.forEach((chapter) => {
      game.chapters.push({ ...game.chaptersConfig[chapter.id], ...chapter });
    });

    context.commit('user/SET_CURRENT_GAME', game);
    context.commit('sceneController/HIDE_GAME_MODES_MENU');
    context.commit('sceneController/SHOW_CHAPTERS_MENU');
  },

  setChapter(context, chapterId) {
    const { user } = context.state;
    const game = user.currentGame;
    const chapter = game.chapters.find(item => item.id === chapterId);

    chapter.sets = [];

    for (let i = 0; i < game.chaptersConfig[chapterId].setsLength; i += 1) {
      const currentSet = game.chaptersConfig[chapterId].setsList.find(set => set.index === i);

      if (currentSet) {
        chapter.sets.push(currentSet);
      } else {
        chapter.sets.push({ ...game.chaptersConfig.defaultSet, id: `set${i}`, label: `Set ${1 + i}` });
      }
    }

    context.commit('user/SET_CURRENT_CHAPTER', chapter);
  },

  startChapter(context, index) {
    const { user } = context.state;
    const game = user.currentGame;
    const chapter = game.chapters.find(item => item.index === index);
    context.dispatch('setChapter', chapter.id);
    context.dispatch('startSet', 0);
  },

  startSet(context, setIndex) {
    const { user } = context.state;
    const chapter = user.currentChapter;
    const gameSet = chapter.sets[setIndex];

    const levels = [];

    for (let i = 0; i < gameSet.levelsLength; i += 1) {
      const customLevel = gameSet.levels.find(level => level.index === i);

      if (customLevel) {
        levels.push(customLevel);
      } else {
        levels.push({ id: `level${i}`, type: 'default', index: i });
      }
    }

    gameSet.levels = levels;

    context.commit('user/SET_CURRENT_SET', gameSet);
    context.commit('sceneController/HIDE_SETS_MENU');
    context.dispatch('startGame');
  },

  startGame(context) {
    const { levels } = context.state.user.currentSet;
    context.commit('user/SET_CURRENT_LEVEL', levels[0]);
    context.dispatch('startLevel');
    context.commit('SET_GAME_STARTED', true);
  },

  startLevel(context) {
    const { user } = context.state;
    context.commit('GENERATE_ITEMS_ARRAY', levelConstructor(user.currentLevel));
    const { level } = context.state;

    document.documentElement.style.setProperty('--matrix-width', level.matrixWidth, '');
    document.documentElement.style.setProperty('--matrix-height', level.matrixHeight, '');
  },

  startNextLevel(context) {
    const { user } = context.state;
    const { levels } = user.currentSet;
    const nextLevelIndex = user.currentLevel.index + 1;
    context.commit('user/SET_CURRENT_LEVEL', levels[nextLevelIndex]);
    context.dispatch('startLevel');
  },

  stopGame(context) {
    context.commit('SET_GAME_STARTED', false);
  },

  saveProgress(context) {
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

  increaseItemValue(context, options) {
    context.commit('INCREASE_ITEM', options);
  },

  wallImpact() {},

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
