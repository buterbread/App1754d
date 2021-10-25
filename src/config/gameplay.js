import directionsDefault from './directionsDefault';
import directionsBobomb from './directionsBobomb';
import directionsLaser from './directionsLaser';

const gameplayConfig = () => ({
  initialDropsCounter: 9999,
  dropPopDuration: 200,
  dropInjectionDelay: 200,
  saveRecordName: '__faraBubbleGame1754__',

  directions: {
    default: directionsDefault,
    bobomb: directionsBobomb,
    laser: directionsLaser,
  },
});

export default gameplayConfig();
