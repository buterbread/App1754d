import BubbleDefault from './bubbleDefault';

export default class BubbleInvisibleWall extends BubbleDefault {
  constructor(options) {
    super(options);

    this.type = 'invisible-wall';

    this.value = 0;
    this.visible = false;
    this.canReceiveUserInput = false;
    this.canReceiveImpact = true;
    this.isWall = true;
    this.impactCallback = 'wallImpact';
    this.movable = false;
    this.rotatable = false;
    this.swappable = false;
    this.emitters = {
      default: [],
      triangle: [],
      hexagon: [],
    };
  }
}
