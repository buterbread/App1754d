export default () => ({
  minItemValue: 0,
  maxItemValue: 4,
  arrayWidth: 15,
  arrayHeight: 5,
  initialDropsCounter: 1000,
  dropPopDelay: 500,
  dropInjectionDelay: 200,

  directions: [
    { top: 0, left: -1, label: 'left' },
    { top: -1, left: 0, label: 'top' },
    { top: 0, left: 1, label: 'right' },
    { top: 1, left: 0, label: 'bottom' },
    // { top: -1, left: -1, label: 'topLeft' },
    // { top: 1, left: 1, label: 'bottomRight' }
  ],
});
