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
        levelsLength: 6,
        loop: true,
        levels: [
          {
            index: 2,
            id: 'level1',
            type: 'default',
            matrixHeight: 9,
            matrixWidth: 9,
          },
          {
            index: 4,
            id: 'level2',
            type: 'default',
          },
          {
            index: 5,
            id: 'level2',
            type: 'default',
          },
          {
            index: 0,
            id: 'level3',
            type: 'hexagon',
          },
          {
            index: 1,
            id: 'level3',
            type: 'hexagon',
            winReward: (context) => {
              context.commit('inventory/ADD_BOBOMB');
            },
          },
          {
            index: 3,
            id: 'level2',
            type: 'triangle',
            matrixHeight: 6,
            matrixWidth: 11,
            winReward: (context) => {
              context.commit('inventory/ADD_SWAP');
            },
          },
        ],
      },
    ],
  },
};
