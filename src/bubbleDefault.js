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

      visible: true,
      canReceiveUserInput: true,
      canReceiveImpact: true,
      impactCallback: 'increaseItemValue',
      userInputCallback: '',
      movable: true,
      rotatable: true,
      swappable: true,

      emitters: {
        default: [
          { top: 0, left: -1, label: 'left', animation: false, emissionType: 'tillImpact' },
          { top: -1, left: 0, label: 'top', animation: false, emissionType: 'tillImpact' },
          { top: 0, left: 1, label: 'right', animation: false, emissionType: 'tillImpact' },
          { top: 1, left: 0, label: 'bottom', animation: false, emissionType: 'tillImpact' },
        ],
        triangle: [
          { top: 0, left: -1, label: 'left', animation: false, emissionType: 'tillImpactTriangle' },
          { top: 0, left: 1, label: 'right', animation: false, emissionType: 'tillImpactTriangle' },
        ],
        hexagon: [
          { top: 0, left: -1, label: 'left', animation: false, emissionType: 'tillImpact' },
          { top: -1, left: 0, label: 'top', animation: false, emissionType: 'tillImpact' },
          { top: 0, left: 1, label: 'right', animation: false, emissionType: 'tillImpact' },
          { top: 1, left: 0, label: 'bottom', animation: false, emissionType: 'tillImpact' },
          { top: -1, left: -1, label: 'topLeft', animation: false, emissionType: 'tillImpact' },
          { top: 1, left: 1, label: 'bottomRight', animation: false, emissionType: 'tillImpact' },
        ],
      },
    };

    Object.assign(this, defaults, options);

    this.id = Math.random().toString(36).substr(2, 9);
  }
}

export default BubbleDefault;
