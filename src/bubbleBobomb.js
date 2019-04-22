import BubbleDefault from './bubbleDefault';

class BubbleBobomb extends BubbleDefault {
  constructor(options) {
    super(options);

    this.type = 'bobomb';

    this.emitters = {
      default: [
        { top: 0, left: -1, label: 'left', animation: false, emissionType: 'explodeNearest' },
        { top: -1, left: 0, label: 'top', animation: false, emissionType: 'explodeNearest' },
        { top: 0, left: 1, label: 'right', animation: false, emissionType: 'explodeNearest' },
        { top: 1, left: 0, label: 'bottom', animation: false, emissionType: 'explodeNearest' },
        { top: -1, left: -1, label: 'topLeft', animation: false, emissionType: 'explodeNearest' },
        { top: -1, left: 1, label: 'topRight', animation: false, emissionType: 'explodeNearest' },
        { top: 1, left: -1, label: 'bottomLeft', animation: false, emissionType: 'explodeNearest' },
        { top: 1, left: 1, label: 'bottomRight', animation: false, emissionType: 'explodeNearest' },
      ],
      triangle: [
        { top: 0, left: -1, label: 'left', animation: false, emissionType: 'explodeNearest' },
        { top: 0, left: 1, label: 'right', animation: false, emissionType: 'explodeNearest' },
      ],
      hexagon: [
        { top: 0, left: -1, label: 'left', animation: false, emissionType: 'explodeNearest' },
        { top: -1, left: 0, label: 'top', animation: false, emissionType: 'explodeNearest' },
        { top: 0, left: 1, label: 'right', animation: false, emissionType: 'explodeNearest' },
        { top: 1, left: 0, label: 'bottom', animation: false, emissionType: 'explodeNearest' },
        { top: -1, left: -1, label: 'topLeft', animation: false, emissionType: 'explodeNearest' },
        { top: 1, left: 1, label: 'bottomRight', animation: false, emissionType: 'explodeNearest' },
      ],
    };
  }
}

export default BubbleBobomb;
