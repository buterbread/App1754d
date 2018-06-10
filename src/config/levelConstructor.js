import BubbleDefault from '../bubbleDefault';
import BubbleBobomb from '../bubbleBobomb';

class BaseLevel {
  constructor(options) {
    const defaults = {
      type: 'default',
      matrixHeight: 5,
      matrixWidth: 5,
      minItemValue: 0,
      maxItemValue: 4,
    };

    Object.assign(this, defaults, options);
  }

  getValue() {
    return Math.floor(Math.random() *
        ((this.maxItemValue - this.minItemValue) + 1)) + this.minItemValue;
  }

  getMap() {
    const itemsArray = [];
    for (let i = 0; i < this.matrixHeight; i += 1) {
      const itemsRow = [];
      itemsRow.id = Math.random().toString(36).substr(2, 9);
      for (let j = 0; j < this.matrixWidth; j += 1) {
        const col = new BubbleDefault({ value: this.getValue(), row: i, col: j });
        itemsRow.push(col);
      }
      itemsArray.push(itemsRow);
    }

    return itemsArray;
  }
}

class Level extends BaseLevel {
  constructor(options) {
    super(options);

    this.label = options.label;
    this.chapter = options.chapter;
    this.level = options.level;
  }

  getMap() {
    const map = super.getMap();

    map[0][0].disabled = true;
    map[2][2] = new BubbleBobomb({ value: this.getValue(), row: 2, col: 2 });

    return map;
  }
}

const config = [{
  label: 'Level 1-1',
  chapter: 1,
  level: 1,
  matrixHeight: 3,
  matrixWidth: 3,
}, {
  label: 'Level 1-2',
  chapter: 1,
  level: 2,
  matrixHeight: 5,
  matrixWidth: 5,
}, {
  label: 'Level 1-3',
  chapter: 1,
  level: 3,
  matrixHeight: 7,
  matrixWidth: 7,
}];

export default function (options) {
  const levelConfig = config.filter(lvl => lvl.chapter === +options.chapter)
    .find(lvl => lvl.level === +options.level);

  return new Level(levelConfig || {});
}
