class BubbleDefault {
  constructor(options) {
    const defaults = {
      type: 'default',
      value: 0,
      isPopAnimationActive: false,
      injectionInProgress: false,
      disabled: false,
      affectsWinning: true,
      minItemValue: 0,
      maxItemValue: 4,
      emitters: {
        default: [
          { top: 0, left: -1, label: 'left', animation: false, emissionType: 'tillImpact' },
          { top: -1, left: 0, label: 'top', animation: false, emissionType: 'tillImpact' },
          { top: 0, left: 1, label: 'right', animation: false, emissionType: 'tillImpact' },
          { top: 1, left: 0, label: 'bottom', animation: false, emissionType: 'tillImpact' },
        ],
        triangle: [
          { top: 0, left: -1, label: 'left', animation: false, emissionType: 'tillImpact', forOddCell: true, forEvenCell: true },
          { top: 0, left: 1, label: 'right', animation: false, emissionType: 'tillImpact', forOddCell: true, forEvenCell: true },
          { top: -1, left: -1, label: 'topLeft', animation: false, emissionType: 'tillImpact', forOddCell: false, forEvenCell: true },
          { top: 1, left: 1, label: 'bottomRight', animation: false, emissionType: 'tillImpact', forOddCell: true, forEvenCell: false },
        ],
        hexagon: [
          { top: 0, left: -1, label: 'left', animation: false, emissionType: 'tillImpact' },
          { top: -1, left: 0, label: 'top', animation: false, emissionType: 'tillImpact' },
          { top: 0, left: 1, label: 'right', animation: false, emissionType: 'tillImpact' },
          { top: 1, left: 0, label: 'bottom', animation: false, emissionType: 'tillImpact' },
        ],
      },
    };

    Object.assign(this, defaults, options);

    this.id = Math.random().toString(36).substr(2, 9);
  }
}

export default BubbleDefault;
