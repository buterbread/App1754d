import BubbleBobomb from '../bubbleBobomb';

export default {
  defaultSet: {
    available: false,
    levelsLength: 1,
    levels: [],
  },
  relaxChapter1: {
    index: 0,
    label: 'Just relax',
    key: 'justRelax',
    setsLength: 1,
    available: true,
    loop: true,
    setsList: [
      {
        id: 'set0',
        label: 'Relax set',
        index: 0,
        available: false,
        levelsLength: 1,
        loop: true,
        levels: [
          {
            index: 0,
            id: 'level1',
            type: 'triangle',
            customDrops: [
              {
                unitConstructor: BubbleBobomb,
                col: 1,
                row: 1,
              },
            ],
          },
          {
            index: 1,
            id: 'level2',
            type: 'triangle',
          },
          {
            index: 2,
            id: 'level3',
            type: 'hexagon',
          },
        ],
      },
    ],
  },
};
