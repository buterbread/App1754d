class Bubble {
  constructor(options) {
    const defaults = {
      type: 'default',
      value: 0,
      isPopAnimationActive: false,
      disabled: false,
      minItemValue: 0,
      maxItemValue: 4,
      emitters: {
        default: [
          { top: 0, left: -1, label: 'left', animation: false, injectionType: 'tillImpact' },
          { top: -1, left: 0, label: 'top', animation: false, injectionType: 'tillImpact' },
          { top: 0, left: 1, label: 'right', animation: false, injectionType: 'tillImpact' },
          { top: 1, left: 0, label: 'bottom', animation: false, injectionType: 'tillImpact' },
        ],
        triangle: [
          { top: 0, left: -1, label: 'left', animation: false, injectionType: 'tillImpact', forOddCell: true, forEvenCell: true },
          { top: 0, left: 1, label: 'right', animation: false, injectionType: 'tillImpact', forOddCell: true, forEvenCell: true },
          { top: -1, left: -1, label: 'topLeft', animation: false, injectionType: 'tillImpact', forOddCell: false, forEvenCell: true },
          { top: 1, left: 1, label: 'bottomRight', animation: false, injectionType: 'tillImpact', forOddCell: true, forEvenCell: false },
        ],
        hexagon: [
          { top: 0, left: -1, label: 'left', animation: false, injectionType: 'tillImpact' },
          { top: -1, left: 0, label: 'top', animation: false, injectionType: 'tillImpact' },
          { top: 0, left: 1, label: 'right', animation: false, injectionType: 'tillImpact' },
          { top: 1, left: 0, label: 'bottom', animation: false, injectionType: 'tillImpact' },
        ],
      },
    };

    Object.assign(this, defaults, options);

    this.id = Math.random().toString(36).substr(2, 9);
  }
}

export default Bubble;
