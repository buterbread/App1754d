import BubbleDefault from './bubbleDefault';

class BubbleBobomb extends BubbleDefault {
  constructor(options) {
    super(options);

    this.type = 'bobomb';

    this.directions = this.directions.concat([
      { top: -1, left: -1, label: 'topLeft', animation: false },
      { top: -1, left: 1, label: 'topRight', animation: false },
      { top: 1, left: 1, label: 'bottomLeft', animation: false },
      { top: 1, left: -1, label: 'bottomRight', animation: false },
    ]);
  }
}

export default BubbleBobomb;
