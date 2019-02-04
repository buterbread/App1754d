import BubbleDefault from './bubbleDefault';
import BubbleBobomb from './bubbleBobomb';
import InvisibleWall from './invisibleWall';

const constructorsMap = () => ({
  BubbleDefault,
  BubbleBobomb,
  InvisibleWall,
});

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
      comboMultipliers: [9, 8, 7, 6, 5],
      win: (state) => {
        const { itemsArray } = state;
        return this.isArrayEmpty(itemsArray);
      },
      lost: (state) => {
        const { itemsArray } = state;
        return (state.user.currentCount === 0) && !this.isArrayEmpty(itemsArray);
      },
    };
  }

  static isArrayEmpty(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[i].length; j += 1) {
        if (array[i][j].value > 0 && !array[i][j].disabled) {
          return false;
        }
      }
    }
    return true;
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

      const Constructor = constructorsMap()[customDrop.unitConstructor] || BubbleDefault;

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
  generateRandomDefaultArray() {
    const itemsArray = super.generateRandomDefaultArray();

    for (let i = 0; i < itemsArray.length; i += 1) {
      const threshold = Math.floor(itemsArray[i].length / 2) - i;
      for (let j = 0; j < threshold; j += 1) {
        itemsArray[i][j] = new InvisibleWall();
        itemsArray[i][itemsArray[i].length - j - 1] = new InvisibleWall();
      }
    }

    return itemsArray;
  }
}

class HexagonalLevel extends BaseLevel {
  constructor(options) {
    super(options);

    Object.assign(this, this.defaults, { cornerSize: 4 }, options);
  }

  getMap() {
    const map = super.getMap();

    for (let i = 0; i < this.cornerSize; i += 1) {
      for (let j = this.cornerSize - i; j > 0; j -= 1) {
        map[i][this.matrixWidth - j] = new InvisibleWall();
      }
    }

    for (let i = 0; i < this.cornerSize; i += 1) {
      for (let j = this.cornerSize - i; j > 0; j -= 1) {
        map[this.matrixHeight - 1 - i][j - 1] = new InvisibleWall();
      }
    }

    return map;
  }
}

export default function (options) {
  const Level = {
    default: BaseLevel,
    triangle: TriangularLevel,
    hexagon: HexagonalLevel,
  }[options.type || 'default'];

  return new Level(options);
}
