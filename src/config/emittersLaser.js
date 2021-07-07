const emittersCfg = {
  default: [
    {
      label: 'top',
      animation: false,
      emissionType: 'laserImpact',
    },
  ],
  triangle: [
    {
      label: 'triangle_left_top',
      animation: false,
      emissionType: 'laserImpact',
      noseDirection: 'up',
    },
  ],
  hexagon: [
    {
      label: 'hexagon_top',
      animation: false,
      emissionType: 'laserImpact',
    },
  ],
};

function getEmittersConfig(options) {
  const { levelType } = options;

  return JSON.parse(JSON.stringify(emittersCfg[levelType]));
}

export default getEmittersConfig;
