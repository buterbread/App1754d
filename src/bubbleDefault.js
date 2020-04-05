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
      rotationIndex: 0,
      rotationsAvailable: 4,
      rotationAngle: 0,
      rotationAnimation: false,
      isWall: false,
      emitters: {
        default: [
          {
            label: 'left',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'top',
            animation: false,
            emissionType: 'tillImpact',
          },
          { label: 'right',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'bottom',
            animation: false,
            emissionType: 'tillImpact',
          },
        ],
        triangle: [
          {
            label: 'triangle_left_top',
            animation: false,
            emissionType: 'tillImpact',
            noseDirection: 'up',
          }, {
            label: 'triangle_right_top',
            animation: false,
            emissionType: 'tillImpact',
            noseDirection: 'up',
          }, {
            label: 'triangle_left_bottom',
            animation: false,
            emissionType: 'tillImpact',
            noseDirection: 'down',
          }, {
            label: 'triangle_right_bottom',
            animation: false,
            emissionType: 'tillImpact',
            noseDirection: 'down',
          },
        ],
        hexagon: [
          {
            label: 'hexagon_left',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'hexagon_top',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'hexagon_right',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'hexagon_bottom',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'hexagon_topLeft',
            animation: false,
            emissionType: 'tillImpact',
          }, {
            label: 'hexagon_bottomRight',
            animation: false,
            emissionType: 'tillImpact',
          },
        ],
      },
    };

    Object.assign(this, defaults, options);

    this.id = Math.random()
      .toString(36)
      .substr(2, 9);
  }
}

export default BubbleDefault;
