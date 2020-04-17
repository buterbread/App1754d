import getEmittersConfig from './config/emittersDefault';

class BubbleDefault {
  constructor(options) {
    const defaults = {
      type: 'default',
      levelType: null,
      value: 0,
      isPopAnimationActive: false,
      injectionInProgress: false,
      increaseProgress: false,
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
      emitters: getEmittersConfig({ levelType: options.levelType }),
    };

    Object.assign(this, defaults, options);

    this.id = Math.random()
      .toString(36)
      .substr(2, 9);
  }
}

export default BubbleDefault;
