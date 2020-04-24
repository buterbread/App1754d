const emittersCfg = {
  default: [
    {
      label: 'top',
      animation: false,
      emissionType: 'desintegrate',
    },
  ],
  triangle: [
    {
      label: 'triangle_left_top',
      animation: false,
      emissionType: 'desintegrate',
      noseDirection: 'up',
    },
  ],
  hexagon: [
    {
      label: 'hexagon_top',
      animation: false,
      emissionType: 'desintegrate',
    },
  ],
};

function getEmittersConfig(options) {
  const { levelType } = options;

  return JSON.parse(JSON.stringify(emittersCfg[levelType]));
}

export default getEmittersConfig;
