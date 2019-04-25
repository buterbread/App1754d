import config from '../config/gameplay';
import roadmap from '../config/roadmap';
import levelConstructor from '../levelConstructor';
import BubbleBobomb from '../bubbleBobomb';

const { saveRecordName } = config;

export default {
  startRelax(context) {
    context.commit('RESET_DROPS_COUNTER');
    context.commit('user/SET_FINISHED_LEVELS_COUNT', 0);
    context.commit('inventory/INIT');

    context.dispatch('setGameMode', 'relax');
    context.dispatch('startChapter', { chapterIndex: 0, setIndex: 0, levelIndex: 0 });
  },

  startNewGame(context, gameMode) {
    context.commit('RESET_DROPS_COUNTER');
    context.commit('user/SET_FINISHED_LEVELS_COUNT', 0);
    context.commit('inventory/INIT');

    context.dispatch('setGameMode', gameMode);
    context.dispatch('startChapter', { chapterIndex: 0, setIndex: 0, levelIndex: 0 });
  },

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

  startChapter(context, options) {
    const defaults = { chapterIndex: 0, setIndex: 0, levelIndex: 0 };
    const opts = { ...defaults, ...options };

    const { chapterIndex } = opts;
    const { user } = context.state;
    const game = user.currentGame;
    const chapter = game.chapters.find(item => item.index === chapterIndex);
    context.dispatch('setChapter', chapter.id);
    context.commit('sceneController/HIDE_CHAPTERS_MENU');
    context.dispatch('startSet', opts);
  },

  startSet(context, options) {
    const { setIndex } = options;
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
    context.dispatch('startPlay', options);
  },

  startPlay(context, options) {
    const { levelIndex } = options;
    const { levels } = context.state.user.currentSet;

    context.commit('user/SET_CURRENT_LEVEL', levels[levelIndex]);
    context.dispatch('startLevel');
  },

  startLevel(context) {
    const { user } = context.state;

    context.commit('GENERATE_ITEMS_ARRAY', levelConstructor(user.currentLevel));
    const { level } = context.state;

    context.dispatch('resetComboMonitor');

    context.commit('SET_GAME_STARTED', true);

    document.documentElement.style.setProperty('--matrix-width', level.matrixWidth, '');
    document.documentElement.style.setProperty('--matrix-height', level.matrixHeight, '');
  },

  startNextLevel(context) {
    const { user } = context.state;
    const { levels } = user.currentSet;
    const nextLevelIndex = user.currentLevel.index + 1;

    context.commit('user/INCREASE_FINISHED_LEVELS_COUNT', 1);

    context.commit('user/SET_CURRENT_LEVEL', levels[nextLevelIndex]);
    context.dispatch('startLevel');
    context.dispatch('saveProgress');
  },

  applyLevelReward(context) {
    const { level } = context.state;
    level.winReward(context);
  },

  applyLevelPenalty(context) {
    const { level } = context.state;
    level.lostPenalty(context);
  },

  stopGame(context) {
    context.commit('SET_GAME_STARTED', false);
  },

  saveProgress(context) {
    localStorage.setItem(saveRecordName, JSON.stringify({
      date: +Date.now(),
      user: context.state.user,
      inventory: context.state.inventory,
    }));
  },

  restoreProgress(context) {
    const { user, inventory } = JSON.parse(localStorage.getItem(saveRecordName));

    const { currentCount, totalFinishedLevelsCount } = user;

    context.commit('SET_DROPS_COUNTER', currentCount);
    context.commit('user/SET_FINISHED_LEVELS_COUNT', totalFinishedLevelsCount);
    context.commit('inventory/INIT', inventory);

    context.dispatch('setGameMode', user.currentGame.type);
    context.dispatch('startChapter', {
      chapterIndex: user.currentChapter.index,
      setIndex: user.currentSet.index,
      levelIndex: user.currentLevel.index,
    });
  },

  dropSave() {
    localStorage.removeItem(saveRecordName);
  },

  resetComboMonitor(context) {
    context.commit('RESET_DISCHARGES_COUNT');
    context.commit('RESET_COMBOS_COUNT');
    context.commit('RESET_MULTIPLIER_INDEX');
  },

  executeUserAction(context, options) {
    const { row, col, shiftKey, altKey } = options;

    const { itemsArray: items } = context.state;
    const item = items[row][col];
    const { inputMode, inputLocked } = context.state.user;

    if (inputLocked || !item.canReceiveUserInput || context.getters.animationsInProgress) {
      return;
    }

    const inputModes = {
      default: () => {
        if (shiftKey) { ///DEV_MODE
          item.value = item.maxItemValue;
          return;
        }

        if (altKey) { ///DEV_MODE
          item.value = 0;
          return;
        }

        context.dispatch('makeUserMove', { row, col });
      },
      selectionMode: () => {
        const { continuousSelectionMode } = context.state.user;
        const { selectedItemsCache } = context.state;

        const sameitemClick = !!selectedItemsCache[`item-${row}-${col}`];

        if (continuousSelectionMode && !sameitemClick) {
          context.dispatch('clearSelection');
        }

        context.dispatch('itemToggleSelected', { row, col });
      },
    };

    inputModes[inputMode]();
  },

  itemToggleSelected(context, options) {
    const { row, col } = options;
    const { selectedItemsLimit, selectedItemsCache } = context.state;

    if (selectedItemsCache[`item-${row}-${col}`] !== undefined) {
      context.commit('DESELECT_ITEM', { row, col });
      context.commit('REMOVE_ITEM_FROM_SELECTION_CACHE', { row, col });
      return;
    }

    if (Object.keys(selectedItemsCache).length >= selectedItemsLimit) {
      return;
    }
    context.commit('SELECT_ITEM', { row, col });
    context.commit('ADD_ITEM_TO_SELECTION_CACHE', { row, col });
  },

  clearSelection(context) {
    const { selectedItemsCache } = context.state;

    Object.keys(selectedItemsCache).forEach((cacheItem) => {
      const { row, col } = selectedItemsCache[cacheItem];
      context.commit('DESELECT_ITEM', { row, col });
      context.commit('REMOVE_ITEM_FROM_SELECTION_CACHE', { row, col });
    });
  },

  executeDialogConfirmAction(context) {
    const { dialogOnConfirmAction } = context.state;

    if (dialogOnConfirmAction !== null) {
      context.dispatch(dialogOnConfirmAction);
      context.commit('CLEAR_DIALOG_CONFIRM_ACTION');
    }
  },

  executeDialogCancelAction(context) {
    const { dialogOnCancelAction } = context.state;

    if (dialogOnCancelAction !== null) {
      context.dispatch(dialogOnCancelAction);
      context.commit('CLEAR_DIALOG_CONFIRM_ACTION');
    }
  },

  placeUsersBobobmb(context) {
    const { itemsArray: items } = context.state;
    const { selectedItemsCache } = context.state;

    Object.keys(selectedItemsCache).forEach((cacheItem) => {
      const { row, col } = selectedItemsCache[cacheItem];

      const unit = items[row][col];

      const newItem = new BubbleBobomb({ row, col });

      newItem.value = newItem.maxItemValue;

      Object.keys(newItem).forEach((key) => {
        unit[key] = newItem[key]; // REMOVE THIS ASAP
      });

      context.commit('inventory/REMOVE_BOBOMB');
    });
  },

  swapSelectedItems(context) {
    const { itemsArray: items } = context.state;
    const { selectedItemsCache } = context.state;
    const cacheKeys = Object.keys(selectedItemsCache);

    if (cacheKeys.length < 2) {
      return;
    }

    const from = selectedItemsCache[cacheKeys[0]];
    const to = selectedItemsCache[cacheKeys[1]];

    const buffer = Object.assign({}, items[to.row][to.col]);

    Object.keys(items[from.row][from.col]).forEach((key) => {
      items[to.row][to.col][key] = items[from.row][from.col][key];
    });

    Object.keys(items[from.row][from.col]).forEach((key) => {
      items[from.row][from.col][key] = buffer[key];
    });

    context.commit('inventory/REMOVE_SWAP');
  },

  makeUserMove(context, options) {
    const { row, col } = options;

    context.dispatch('resetComboMonitor');

    context.commit('REMOVE_USER_DROP');
    context.commit('INCREASE_ITEM', { row, col });
    context.dispatch('attemptToPopBubble', options);
  },

  attemptToPopBubble(context, options) {
    const { itemsArray: items } = context.state;
    const { row, col } = options;
    const unit = items[row][col];

    if (unit.value > unit.maxItemValue) {
      context.dispatch('makePopAnimation', options, { root: true });

      if (unit.injectionInProgress === true) {
        return;
      }

      unit.injectionInProgress = true;

      setTimeout(() => {
        context.commit('RESET_ITEM_VALUE', { row, col, value: unit.minItemValue });

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
