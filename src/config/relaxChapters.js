import BubbleBobomb from '../bubbleBobomb';
import BubbleLaser from '../bubbleLaser';

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
            type: 'default',
            customDrops: [
              {
                row: 0,
                col: 0,
                options: {
                  maxItemValue: 1,
                  value: 1,
                },
              },
              {
                row: 1,
                col: 1,
                unitConstructor: BubbleBobomb,
                options: {
                  maxItemValue: 1,
                  value: 1,
                },
              },
              {
                row: 0,
                col: 1,
                options: {
                  maxItemValue: 2,
                  value: 2,
                },
              },
              {
                row: 0,
                col: 2,
                options: {
                  maxItemValue: 3,
                  value: 3,
                },
              },
              {
                row: 0,
                col: 3,
                options: {
                  maxItemValue: 4,
                  value: 4,
                },
              },
              {
                row: 0,
                col: 4,
                options: {
                  maxItemValue: 5,
                  value: 5,
                },
              },
              {
                row: 0,
                col: 5,
                options: {
                  maxItemValue: 6,
                  value: 6,
                },
              },
              {
                row: 0,
                col: 4,
                unitConstructor: BubbleLaser,
                options: {
                  maxItemValue: 5,
                  value: 3,
                },
              },
              {
                row: 6,
                col: 4,
                unitConstructor: BubbleLaser,
                options: {
                  maxItemValue: 1,
                  value: 1,
                },
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
