import BubbleDefault from '../bubbleDefault';
import BubbleBobomb from '../bubbleBobomb';

class BaseLevel {
  constructor(options) {
    Object.assign(this, BaseLevel.defaults(), options);
  }

  static defaults() {
    return {
      type: 'default',
      matrixHeight: 9,
      matrixWidth: 9,
      minItemValue: 0,
      maxItemValue: 4,
      customDrops: [],
    };
  }

  getRandomValue() {
    return Math.floor(Math.random() *
        ((this.maxItemValue - this.minItemValue) + 1)) + this.minItemValue;
  }

  getMap() {
    const array = this.generateRandomDefaultArray();
    return this.injectCustomDrops(array);
  }

  injectCustomDrops(array) {
    const map = array;

    this.customDrops.forEach((customDrop) => {
      const {
        row = Math.floor(Math.random() * this.matrixHeight),
        col = Math.floor(Math.random() * this.matrixWidth),
        options = {},
      } = customDrop;

      if (!options.value) {
        options.value = this.getRandomValue();
      }

      const Constructor = customDrop.unitConstructor || BubbleDefault;

      map[row][col] = new Constructor(options);
    });

    return map;
  }

  generateRandomDefaultArray() {
    const itemsArray = [];
    for (let i = 0; i < this.matrixHeight; i += 1) {
      const itemsRow = [];
      itemsRow.id = Math.random().toString(36).substr(2, 9);
      for (let j = 0; j < this.matrixWidth; j += 1) {
        const col = new BubbleDefault({ value: this.getRandomValue() });
        itemsRow.push(col);
      }
      itemsArray.push(itemsRow);
    }

    return itemsArray;
  }
}

class TriangularLevel extends BaseLevel {
  constructor(options) {
    super(options);
    this.matrixWidth = (this.matrixHeight * 2) - 1;
  }
  generateRandomDefaultArray() {
    const itemsArray = [];
    for (let i = 0; i < this.matrixHeight; i += 1) {
      const itemsRow = [];
      itemsRow.id = Math.random().toString(36).substr(2, 9);
      for (let j = 0; j < ((i * 2) + 1); j += 1) {
        const col = new BubbleDefault({ value: this.getRandomValue() });
        itemsRow.push(col);
      }
      itemsArray.push(itemsRow);
    }

    return itemsArray;
  }
}

class HexagonalLevel extends BaseLevel {
  constructor(options) {
    super(options);

    Object.assign(this, this.defaults, options);
  }

  getMap() {
    const map = super.getMap();

    for (let i = 0; i < this.cornerSize; i += 1) {
      for (let j = this.cornerSize - i; j > 0; j -= 1) {
        map[i][this.matrixWidth - j].disabled = true;
      }
    }

    for (let i = 0; i < this.cornerSize; i += 1) {
      for (let j = this.cornerSize - i; j > 0; j -= 1) {
        map[this.matrixHeight - 1 - i][j - 1].disabled = true;
      }
    }

    return map;
  }
}

const config = [{
  label: 'Level 1-1',
  index: 1,
  matrixHeight: 5,
  matrixWidth: 5,
  type: 'default',
  customDrops: [{
    unitConstructor: BubbleDefault,
    col: 0,
    row: 0,
    options: {
      disabled: true,
    },
  }, {
    unitConstructor: BubbleBobomb,
    col: 1,
    row: 0,
  }],
}, {
  label: 'Level 1-2',
  index: 2,
  matrixHeight: 5,
  type: 'triangle',
  customDrops: [
    {
      unitConstructor: BubbleBobomb,
      col: 2,
      row: 2,
    },
    {
      unitConstructor: BubbleBobomb,
      col: 1,
      row: 1,
    },
  ],
}, {
  label: 'Level 1-3',
  index: 3,
  matrixHeight: 7,
  matrixWidth: 7,
  type: 'hexagon',
  cornerSize: 3,
  customDrops: [
    {
      unitConstructor: BubbleBobomb,
      col: 6,
      row: 6,
    },
    {
      unitConstructor: BubbleBobomb,
      col: 0,
      row: 6,
    },
  ],
}, {
  label: 'Level 1-3',
  index: 4,
  matrixHeight: 3,
  matrixWidth: 3,
  type: 'default',
}];

export default function (options) {
  const levelConfig = config.find(level => level.index === +options.index) || {};

  const Level = {
    default: BaseLevel,
    triangle: TriangularLevel,
    hexagon: HexagonalLevel,
  }[levelConfig.type || 'default'];

  return new Level(levelConfig || {});
}
