export default {
  defaultSet: {
    available: false,
    levelsLength: 12,
    levels: [],
  },
  endlessChapter1: {
    index: 0,
    label: 'Bring it on',
    key: 'bringItOn',
    setsLength: 2,
    available: true,
    setsList: [
      {
        id: 'set0',
        label: 'Set 1 my',
        index: 0,
        available: false,
        levelsLength: 1,
        levels: [
          {
            index: 0,
            id: 'level0',
            type: 'hexagon',
            matrixHeight: 9,
            matrixWidth: 9,
            cornerSize: 4,
          },
          {
            index: 3,
            id: 'level1',
            type: 'triangle',
            matrixHeight: 5,
            matrixWidth: 5,
          },
          {
            index: 1,
            id: 'level2',
            type: 'default',
            matrixHeight: 3,
            matrixWidth: 3,
          },
        ],
      },
      {
        id: 'set1',
        label: 'Set 3 my',
        index: 1,
        available: false,
        levelsLength: 1,
        levels: [
          {
            index: 0,
            id: 'level0',
            type: 'default',
            matrixHeight: 2,
          },
          {
            index: 1,
            id: 'level1',
            type: 'triangle',
            matrixHeight: 3,
            matrixWidth: 3,
          },
          {
            index: 2,
            id: 'level2',
            type: 'hexagon',
            matrixHeight: 5,
            matrixWidth: 5,
          },
        ],
      },
    ],
  },
  endlessChapter2: {
    index: 1,
    label: 'Let them try',
    key: 'letThemTry',
    setsLength: 1,
    available: true,
    setsList: [
      {
        id: 'set2',
        label: 'Set 2',
        index: 0,
        available: false,
        levelsLength: 1,
        levels: [
          {
            index: 0,
            id: 'level0',
            type: 'hexagon',
            matrixHeight: 5,
            matrixWidth: 5,
            cornerSize: 2,
          },
        ],
      },
    ],
  },
};
