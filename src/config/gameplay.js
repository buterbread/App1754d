const gameplayConfig = () => ({
  initialDropsCounter: 1000,
  dropPopDuration: 200,
  dropInjectionDelay: 200,
  saveRecordName: '__faraBubbleGame1754__',
  inventory: {
    bobombs: 1,
    swaps: 1,
    moves: 0,
    rotates: Infinity,
  },
  directions: {
    triangle_left_top: {
      prev: 'triangle_bottom_left',
      next: 'triangleNoseUp_right',
      offsets: [
        { top: 0, left: -1 },
        { top: -1, left: 0 },
      ],
    },
    triangle_right_top: {
      prev: 'triangleNoseUp_left',
      next: 'triangle_bottom_right',
      offsets: [
        { top: 0, left: 1 },
        { top: -1, left: 0 },
      ],
    },
    triangle_bottom_right: {
      prev: 'triangle_right_top',
      next: 'triangleNoseUp_left',
      offsets: [
        { top: 1, left: 0 },
        { top: 0, left: 1 },
      ],
    },
    triangle_bottom_left: {
      prev: 'triangleNoseUp_right',
      next: 'triangle_left_top',
      offsets: [
        { top: 1, left: 0 },
        { top: 0, left: -1 },
      ],
    },
    triangleNoseUp_left: {
      prev: 'triangle_bottom_right',
      next: 'triangle_right_top',
      offsets: [
        { top: 0, left: -1 },
        { top: 0, left: -1 },
      ],
    },
    triangleNoseUp_right: {
      prev: 'triangle_left_top',
      next: 'triangle_bottom_left',
      offsets: [
        { top: 0, left: 1 },
        { top: 0, left: 1 },
      ],
    },

    triangle_left_bottom: {
      prev: 'triangleNoseDown_right',
      next: 'triangle_top_left',
      offsets: [
        { top: 0, left: -1 },
        { top: 1, left: 0 },
      ],
    },
    triangle_right_bottom: {
      prev: 'triangle_top_right',
      next: 'triangleNoseDown_left',
      offsets: [
        { top: 0, left: 1 },
        { top: 1, left: 0 },
      ],
    },
    triangle_top_left: {
      prev: 'triangle_left_bottom',
      next: 'triangleNoseDown_right',
      offsets: [
        { top: -1, left: 0 },
        { top: 0, left: -1 },
      ],
    },
    triangle_top_right: {
      prev: 'triangleNoseDown_left',
      next: 'triangle_right_bottom',
      offsets: [
        { top: -1, left: 0 },
        { top: 0, left: 1 },
      ],
    },
    triangleNoseDown_left: {
      prev: 'triangle_right_bottom',
      next: 'triangle_top_right',
      offsets: [
        { top: 0, left: -1 },
        { top: 0, left: -1 },
      ],
    },
    triangleNoseDown_right: {
      prev: 'triangle_top_left',
      next: 'triangle_left_bottom',
      offsets: [
        { top: 0, left: 1 },
        { top: 0, left: 1 },
      ],
    },

    hexagon_topOdd: {
      prev: 'hexagon_topLeft_left',
      next: 'hexagon_topRight_right',
      offsets: [
        { top: -1, left: 0 },
      ],
    },
    hexagon_topRight_right: {
      prev: 'hexagon_topOdd',
      next: 'hexagon_right_bottomRight',
      offsets: [
        { top: -1, left: 1 },
        { top: 0, left: 1 },
      ],
    },
    hexagon_right_bottomRight: {
      prev: 'hexagon_topRight_right',
      next: 'hexagon_bottomOdd',
      offsets: [
        { top: 0, left: 1 },
        { top: 1, left: 1 },
      ],
    },
    hexagon_bottomOdd: {
      prev: 'hexagon_right_bottomRight',
      next: 'hexagon_left_bottomLeft',
      offsets: [
        { top: 1, left: 0 },
      ],
    },
    hexagon_left_bottomLeft: {
      prev: 'hexagon_bottomOdd',
      next: 'hexagon_topLeft_left',
      offsets: [
        { top: 0, left: -1 },
        { top: 1, left: -1 },
      ],
    },
    hexagon_topLeft_left: {
      prev: 'hexagon_left_bottomLeft',
      next: 'hexagon_topOdd',
      offsets: [
        { top: -1, left: -1 },
        { top: 0, left: -1 },
      ],
    },


    hexagon_topEven: {
      prev: 'hexagon_left_topLeftTop',
      next: 'hexagon_right_topRight',
      offsets: [
        { top: -1, left: 0 },
      ],
    },
    hexagon_right_topRight: {
      prev: 'hexagon_topEven',
      next: 'hexagon_bottomRight_right',
      offsets: [
        { top: 0, left: 1 },
        { top: -1, left: 1 },
      ],
    },
    hexagon_bottomRight_right: {
      prev: 'hexagon_right_topRight',
      next: 'hexagon_bottomEven',
      offsets: [
        { top: 1, left: 1 },
        { top: 0, left: 1 },
      ],
    },
    hexagon_bottomEven: {
      prev: 'hexagon_bottomRight_right',
      next: 'hexagon_bottomLeft_left',
      offsets: [
        { top: 1, left: 0 },
      ],
    },
    hexagon_bottomLeft_left: {
      prev: 'hexagon_bottomEven',
      next: 'hexagon_left_topLeftTop',
      offsets: [
        { top: 1, left: -1 },
        { top: 0, left: -1 },
      ],
    },
    hexagon_left_topLeftTop: {
      prev: 'hexagon_bottomLeft_left',
      next: 'hexagon_topEven',
      offsets: [
        { top: 0, left: -1 },
        { top: -1, left: -1 },
      ],
    },


    left: {
      prev: '',
      next: '',
      offsets: [
        {
          top: 0,
          left: -1,
        },
      ],
    },

    top: {
      prev: '',
      next: '',
      offsets: [
        {
          top: -1,
          left: 0,
        },
      ],
    },

    right: {
      prev: '',
      next: '',
      offsets: [
        {
          top: 0,
          left: 1,
        },
      ],
    },

    bottom: {
      prev: '',
      next: '',
      offsets: [
        {
          top: 1,
          left: 0,
        },
      ],
    },
  },
});

export default gameplayConfig();
