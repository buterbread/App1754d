class Bubble {
  constructor(options) {
    const defaults = {
      type: 'default',
      value: null,
      row: null,
      col: null,
      isPopAnimationActive: false,
      disabled: false,
      directions: [
        { top: 0, left: -1, label: 'left', animation: false },
        { top: -1, left: 0, label: 'top', animation: false },
        { top: 0, left: 1, label: 'right', animation: false },
        { top: 1, left: 0, label: 'bottom', animation: false },
      ],
    };

    Object.assign(this, defaults, options);

    this.id = Math.random().toString(36).substr(2, 9);
  }
}

export default Bubble;
