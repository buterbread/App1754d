const emittersCfg = {
  default: [
    {
      label: 'left',
      animation: false,
      emissionType: 'explodeNearest',
    }, {
      label: 'top',
      animation: false,
      emissionType: 'explodeNearest',
    },
    { label: 'right',
      animation: false,
      emissionType: 'explodeNearest',
    }, {
      label: 'bottom',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'leftTop',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'topRight',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'rightBottom',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'bottomLeft',
      animation: false,
      emissionType: 'explodeNearest',
    },
  ],
  triangle: [
    {
      label: 'triangle_left_top',
      animation: false,
      emissionType: 'explodeNearest',
      noseDirection: 'up',
    },
    {
      label: 'triangle_right_top',
      animation: false,
      emissionType: 'explodeNearest',
      noseDirection: 'up',
    },
    {
      label: 'triangle_left_bottom',
      animation: false,
      emissionType: 'explodeNearest',
      noseDirection: 'down',
    },
    {
      label: 'triangle_right_bottom',
      animation: false,
      emissionType: 'explodeNearest',
      noseDirection: 'down',
    },
  ],
  hexagon: [
    {
      label: 'hexagon_left',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'hexagon_top',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'hexagon_right',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'hexagon_bottom',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'hexagon_topLeft',
      animation: false,
      emissionType: 'explodeNearest',
    },
    {
      label: 'hexagon_bottomRight',
      animation: false,
      emissionType: 'explodeNearest',
    },
  ],
};

function getEmittersConfig(options) {
  const { levelType } = options;

  return JSON.parse(JSON.stringify(emittersCfg[levelType]));
}

export default getEmittersConfig;
