import directionsDefault from './directionsDefault';
import directionsBobomb from './directionsBobomb';

const gameplayConfig = () => ({
  initialDropsCounter: 10,
  dropPopDuration: 200,
  dropInjectionDelay: 200,
  saveRecordName: '__faraBubbleGame1754__',
  inventory: {
    bobombs: 1,
    swaps: 1,
    moves: 1,
    rotates: Infinity,
  },

  directions: {
    default: directionsDefault,
    bobomb: directionsBobomb,
  },
});

export default gameplayConfig();
