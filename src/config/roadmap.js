import BubbleDefault from '../bubbleDefault';
import BubbleBobomb from '../bubbleBobomb';

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

export default config;
