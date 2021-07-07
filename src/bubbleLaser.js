import BubbleDefault from './bubbleDefault';
import getEmittersConfig from './config/emittersLaser';

class BubbleLaser extends BubbleDefault {
  constructor(options) {
    super(options);

    this.type = 'laser';
    this.emitters = getEmittersConfig({ levelType: options.levelType });
  }
}

export default BubbleLaser;
