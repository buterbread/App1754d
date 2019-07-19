function isOdd(index) {
  return ((index + 1) % 2) > 0;
}

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
      userInputCallback: null,
      movable: true,
      rotatable: true,
      swappable: true,
      selected: false,
      selectable: true,
      emitters: [],
    };

    Object.assign(this, defaults, options);

    this.emitters = this.getEmittersConfig(options).map(item => Object.assign({}, item));

    if (!options || !options.value) {
      this.value = Math.floor(Math.random() * ((this.maxItemValue - this.minItemValue) + 1))
        + this.minItemValue;
    }

    this.id = Math.random().toString(36).substr(2, 9);
  }

  emittersConfig = {
    default: [
      { label: 'left', animation: false, emissionType: 'tillImpact' },
      { label: 'top', animation: false, emissionType: 'tillImpact' },
      { label: 'right', animation: false, emissionType: 'tillImpact' },
      { label: 'bottom', animation: false, emissionType: 'tillImpact' },
    ],
    triangle: [
      { label: 'triangle_left_top', animation: false, emissionType: 'tillImpact', noseDirection: 'up' },
      { label: 'triangle_right_top', animation: false, emissionType: 'tillImpact', noseDirection: 'up' },
      { label: 'triangle_left_bottom', animation: false, emissionType: 'tillImpact', noseDirection: 'down' },
      { label: 'triangle_right_bottom', animation: false, emissionType: 'tillImpact', noseDirection: 'down' },
    ],
    hexagon: [
      { label: 'hexagon_topOdd', animation: false, emissionType: 'tillImpact', odd: true },
      //{ label: 'hexagon_topRight_right', animation: false, emissionType: 'tillImpact', odd: true },
      // { label: 'hexagon_right_bottomRight', animation: false, emissionType: 'tillImpact', odd: true },
      // { label: 'hexagon_bottomOdd', animation: false, emissionType: 'tillImpact', odd: true },
      // { label: 'hexagon_left_bottomLeft', animation: false, emissionType: 'tillImpact', odd: true },
      // { label: 'hexagon_topLeft_left', animation: false, emissionType: 'tillImpact', odd: true },

      { label: 'hexagon_topEven', animation: false, emissionType: 'tillImpact', odd: false },
      // { label: 'hexagon_right_topRight', animation: false, emissionType: 'tillImpact', odd: false },
      // { label: 'hexagon_bottomRight_right', animation: false, emissionType: 'tillImpact', odd: false },
      // { label: 'hexagon_bottomEven', animation: false, emissionType: 'tillImpact', odd: false },
      // { label: 'hexagon_bottomLeft_left', animation: false, emissionType: 'tillImpact', odd: false },
      // { label: 'hexagon_left_topLeftTop', animation: false, emissionType: 'tillImpact', odd: false },
    ],
  }

  getEmittersConfig = (options = {}) => {
    const { levelType: type } = options;

    if (type === 'triangle') {
      const { row, col } = options;
      let noseDirection;

      if (isOdd(row)) {
        noseDirection = isOdd(col) ? 'down' : 'up';
      } else {
        noseDirection = isOdd(col) ? 'up' : 'down';
      }

      return this.emittersConfig.triangle.filter(direction =>
        direction.noseDirection === noseDirection);
    }

    if (type === 'hexagon') {
      const { col } = options;

      return this.emittersConfig.hexagon.filter(direction => direction.odd === isOdd(col));
    }

    return this.emittersConfig[type || 'default'];
  }
}

export default BubbleDefault;
