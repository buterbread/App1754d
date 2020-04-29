import config from '../config/gameplay';
import roadmap from '../config/roadmap';
import levelConstructor from '../config/levelConstructor';
import BubbleBobomb from '../bubbleBobomb';
import BubbleLaser from '../bubbleLaser';

const { saveRecordName } = config;

function cloneItem(item) {
  const { emitters } = item;

  const clone = {
    options: {},
  };

  Object.keys(item).forEach((key) => {
    clone.options[key] = item[key];
  });

  clone.options.emitters = emitters.map(emitter => ({ ...emitter }));

  return clone;
}

function cloneLevel(itemsArray) {
  const newArray = [];

  itemsArray.forEach((newRow, rowIdx) => {
    newRow.forEach((item, colIdx) => {
      const clone = cloneItem(item);

      clone.row = rowIdx;
      clone.col = colIdx;

      newArray.push(clone);
    });
  });

  return newArray;
}

function cloneStash(stash) {
  return stash.map((item) => {
    const { options } = item;
    const optionsClone = { ...options };
    optionsClone.emitters = options.emitters.map(emitter => ({ ...emitter }));

    return {
      ...item,
      options: { ...options },
    };
  });
}

function generateNewBubble(itemType, levelType) {
  const Constructor = {
    bobomb: BubbleBobomb,
    laser: BubbleLaser,
  }[itemType];

  return new Constructor({ levelType, value: 4 });
}

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
    const { state } = context;
    const { user } = state;
    const { inputMode } = user;

    const actions = {
      default: 'increaseBubble',
      placement: 'placeBubble',
      selection: 'selectBubble',
    };

    context.dispatch(actions[inputMode], options);
  },

  placeBubble(context, options) {
    const { user, level } = context.state;
    const { activeSlot, levelStash } = user;
    const { type } = level;

    const { itemsArray } = context.state;
    const { row, col } = options;

    let newArray;

    if (levelStash !== null) {
      newArray = cloneStash(levelStash);
    } else {
      newArray = cloneLevel(itemsArray);
      context.commit('user/PUT_LEVEL_IN_STASH', cloneLevel(itemsArray));
    }

    const newItem = generateNewBubble(activeSlot, type);

    const newItemIndex = newArray.findIndex(item => item.row === row && item.col === col);

    newArray[newItemIndex].options = newItem;

    const newLevel = levelConstructor({
      customDrops: newArray,
    });

    context.commit('GENERATE_ITEMS_ARRAY', newLevel);
  },

  revertLevel(context) {
    const { user } = context.state;
    const { levelStash } = user;

    if (!levelStash) {
      return;
    }

    const newLevel = levelConstructor({ customDrops: levelStash });

    context.commit('GENERATE_ITEMS_ARRAY', newLevel);
  },

  selectBubble(context, options) {
    const { itemsArray: items, user } = context.state;
    const { selection, selectionMaxLength } = user;
    const { row, col } = options;
    const unit = items[row][col];

    const selectionBuffer = [...selection];

    if (selectionBuffer.indexOf(`${row}/${col}`) === -1) {
      if (selectionBuffer.length < selectionMaxLength) {
        selectionBuffer.push(`${row}/${col}`);
      } else {
        const lastSelectedItem = selectionBuffer[selectionBuffer.length - 1];

        const [lastSelectedItemRow, lastSelectedItemCol] = lastSelectedItem.split('/');

        items[+lastSelectedItemRow][+lastSelectedItemCol].selected = false;
        selectionBuffer[selectionBuffer.length - 1] = `${row}/${col}`;
      }

      unit.selected = true;
    } else {
      unit.selected = false;
      const selectedIdx = selectionBuffer.indexOf(`${row}/${col}`);
      selectionBuffer[selectedIdx] = null;
    }

    selection.length = 0;
    selectionBuffer.filter(Boolean).forEach(item => selection.push(item));
  },

  removeSelection(context) {
    const { itemsArray: items, user } = context.state;
    const { selection } = user;

    selection.forEach((selectionItem) => {
      const [row, col] = selectionItem.split('/');
      items[row][col].selected = false;
    });

    selection.length = 0;
  },

  performBubblePlacing(context) {
    context.commit('user/CLEAR_LEVEL_STASH', 'default');
    context.commit('user/SET_USER_INPUT_MODE', 'default');
    context.commit('sceneController/HIDE_ARMORY_DIALOG');
  },

  revertBubblePlacing(context) {
    context.dispatch('revertLevel');
    context.commit('user/CLEAR_LEVEL_STASH', 'default');
    context.commit('user/SET_USER_INPUT_MODE', 'default');
    context.commit('sceneController/HIDE_ARMORY_DIALOG');
  },

  performSwap(context) {
    const { itemsArray: items, user } = context.state;
    const { selection } = user;

    const newArray = cloneLevel(items);

    const [from, to] = selection;

    const [fromRow, fromCol] = from.split('/');
    const [toRow, toCol] = to.split('/');

    const itemFrom = newArray.find(({ row, col }) => +fromRow === row && +fromCol === col);
    const itemTo = newArray.find(({ row, col }) => +toRow === row && +toCol === col);

    itemFrom.row = toRow;
    itemFrom.col = toCol;

    itemTo.row = fromRow;
    itemTo.col = fromCol;

    const newLevel = levelConstructor({
      customDrops: newArray,
    });

    context.commit('GENERATE_ITEMS_ARRAY', newLevel);

    context.dispatch('removeSelection');
    context.commit('user/SET_USER_INPUT_MODE', 'default');
    context.commit('sceneController/HIDE_ARMORY_DIALOG');
  },

  revertSwap(context) {
    context.dispatch('removeSelection');
    context.commit('user/SET_USER_INPUT_MODE', 'default');
    context.commit('sceneController/HIDE_ARMORY_DIALOG');
  },

  performRotate(context) {
    const { itemsArray: items, user } = context.state;
    const { selection } = user;
    const [row, col] = selection[0].split('/');

    const unit = items[row][col];
    const { emitters, type: unitType } = unit;

    emitters.forEach((emitter, idx) => {
      const { label } = emitter;
      emitters[idx].label = config.directions[unitType][label].next;
    });
  },

  revertRotate(context) {
    context.dispatch('removeSelection');
    context.commit('user/CLEAR_LEVEL_STASH', 'default');
    context.commit('user/SET_USER_INPUT_MODE', 'default');
    context.commit('sceneController/HIDE_ARMORY_DIALOG');
  },

  increaseBubble(context, options) {
    const { row, col } = options;

    context.commit('RESET_DISCHARGES_COUNT');
    context.commit('RESET_COMBOS_COUNT');
    context.commit('RESET_MULTIPLIER_INDEX');

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

  desintegrateBubble(context, options) {
    const { itemsArray: items } = context.state;
    const { row, col } = options;
    const unit = items[row][col];

    unit.injectionInProgress = true;

    setTimeout(() => {
      context.commit('RESET_ITEM_VALUE', { row, col, value: unit.minItemValue });

      unit.injectionInProgress = false;
    }, 1);
  },

  dischargeAllEmitters(context, options) {
    const { itemsArray: items } = context.state;
    const { row, col, addBonusDrop } = options;
    const unit = items[row][col];
    const { type, emitters } = unit;

    emitters.forEach((emitter) => {
      context.commit('INCREASE_ANIMS_COUNTER', null, { root: true });

      const { label } = emitter;

      const { offsets } = config.directions[type][label];

      context.dispatch('emitterDischarge', { row, col, emitter, offsets });
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

  increaseItemValue(context, options) {
    const { row, col } = options;

    context.commit('INCREASE_ITEM', { row, col });
    context.commit('TOGGLE_ITEM_INCREASE_STATE', { row, col, value: true });

    setTimeout(() => {
      context.commit('TOGGLE_ITEM_INCREASE_STATE', { row, col, value: false });
    }, 200);
  },

  startDropPassageAnimation(context, options) {
    const { itemsArray: items } = context.state;
    const { row, col, emitter } = options;

    if (!items[row] || !items[row][col]) {
      return;
    }

    const dropCurrentDirection =
        items[row][col].emitters.find(dir => emitter && dir.label === emitter.label);

    if (dropCurrentDirection && !dropCurrentDirection.animation) {
      dropCurrentDirection.animation = true;
    }
  },

  stopDropPassageAnimation(context, options) {
    context.commit('DECREASE_ANIMS_COUNTER');
    const { itemsArray: items } = context.state;
    const { row, col, emitter } = options;
    const unit = items[row][col];

    const dropCurrentDirection =
        unit.emitters.find(dir => dir.label === emitter.label);

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
