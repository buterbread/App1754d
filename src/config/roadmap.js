const roadmap = [
  { id: 'chapter1', available: true },
  { id: 'chapter2', available: false },
  { id: 'chapter3', available: false },
];

const chapters = {
  chapter1: {
    label: 'Chapter 1',
    available: false,
    length: 12,
    sets: [
      {
        id: 'set1',
        label: 'Set 1',
        available: false,
        length: 12,
        levels: [{
          index: 1,
          id: 'level1',
          available: false,
        },
        {
          index: 2,
          id: 'level1',
          available: false,
        },
        {
          index: 3,
          id: 'level1',
          available: false,
        }],
      },
    ],
  },
};

export default roadmap;
