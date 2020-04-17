import BubbleDefault from './bubbleDefault';
import getEmittersConfig from './config/emittersBobomb';

class BubbleBobomb extends BubbleDefault {
  constructor(options) {
    super(options);

    this.type = 'bobomb';
    this.emitters = getEmittersConfig({ levelType: options.levelType });
  }
}

export default BubbleBobomb;
