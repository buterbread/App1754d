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

    hexagon_top: {
      prev: '',
      next: '',
      offsets: [
        { top: -1, left: 0 },
      ],
    },
    hexagon_bottom: {
      prev: '',
      next: '',
      offsets: [
        { top: 1, left: 0 },
      ],
    },
    hexagon_leftTop_left: {
      prev: '',
      next: '',
      offsets: [
        { top: -1, left: -1 },
        { top: 0, left: -1 },
      ],
    },
    hexagon_rightTop_right: {
      prev: '',
      next: '',
      offsets: [
        { top: -1, left: 1 },
        { top: 0, left: 1 },
      ],
    },
    hexagon_right_rightBottom: {
      prev: '',
      next: '',
      offsets: [
        { top: 0, left: 1 },
        { top: 1, left: 1 },
      ],
    },
    hexagon_left_leftBottom: {
      prev: '',
      next: '',
      offsets: [
        { top: 0, left: -1 },
        { top: 1, left: -1 },
      ],
    },

    hexagon_left_leftTop: {
      prev: '',
      next: '',
      offsets: [
        { top: 0, left: -1 },
        { top: -1, left: -1 },
      ],
    },

    hexagon_right_rightTop: {
      prev: '',
      next: '',
      offsets: [
        { top: 0, left: 1 },
        { top: -1, left: 1 },
      ],
    },

    hexagon_rightBottom_right: {
      prev: '',
      next: '',
      offsets: [
        { top: 1, left: 1 },
        { top: 0, left: 1 },
      ],
    },

    hexagon_leftBottom_left: {
      prev: '',
      next: '',
      offsets: [
        { top: 1, left: -1 },
        { top: 0, left: -1 },
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
