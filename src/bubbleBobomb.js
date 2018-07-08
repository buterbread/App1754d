import BubbleDefault from './bubbleDefault';

class BubbleBobomb extends BubbleDefault {
  constructor(options) {
    super(options);

    this.type = 'bobomb';

    this.emitters = {
      default: [
        { top: 0, left: -1, label: 'left', animation: false, injectionType: 'explodeNearest' },
        { top: -1, left: 0, label: 'top', animation: false, injectionType: 'explodeNearest' },
        { top: 0, left: 1, label: 'right', animation: false, injectionType: 'explodeNearest' },
        { top: 1, left: 0, label: 'bottom', animation: false, injectionType: 'explodeNearest' },
        { top: -1, left: -1, label: 'topLeft', animation: false, injectionType: 'explodeNearest' },
        { top: -1, left: 1, label: 'topRight', animation: false, injectionType: 'explodeNearest' },
        { top: 1, left: -1, label: 'bottomLeft', animation: false, injectionType: 'explodeNearest' },
        { top: 1, left: 1, label: 'bottomRight', animation: false, injectionType: 'explodeNearest' },
      ],
      triangle: [
        { top: 0, left: -1, label: 'left', animation: false, injectionType: 'explodeNearest', forOddCell: true, forEvenCell: true },
        { top: 0, left: 1, label: 'right', animation: false, injectionType: 'explodeNearest', forOddCell: true, forEvenCell: true },
        { top: -1, left: -1, label: 'topLeft', animation: false, injectionType: 'explodeNearest', forOddCell: false, forEvenCell: true },
        { top: 1, left: 1, label: 'bottomRight', animation: false, injectionType: 'explodeNearest', forOddCell: true, forEvenCell: false },
      ],
      hexagon: [
        { top: 0, left: -1, label: 'left', animation: false, injectionType: 'explodeNearest' },
        { top: -1, left: 0, label: 'top', animation: false, injectionType: 'explodeNearest' },
        { top: 0, left: 1, label: 'right', animation: false, injectionType: 'explodeNearest' },
        { top: 1, left: 0, label: 'bottom', animation: false, injectionType: 'explodeNearest' },
        { top: -1, left: -1, label: 'topLeft', animation: false, injectionType: 'explodeNearest' },
        { top: 1, left: -1, label: 'bottomRight', animation: false, injectionType: 'explodeNearest' },
      ],
    };
  }
}

export default BubbleBobomb;
