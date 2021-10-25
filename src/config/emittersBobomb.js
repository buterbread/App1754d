const emittersCfg = {
  default: [
    {
      label: 'left',
      animation: false,
      emissionType: 'affectNearest',
    }, {
      label: 'top',
      animation: false,
      emissionType: 'affectNearest',
    },
    { label: 'right',
      animation: false,
      emissionType: 'affectNearest',
    }, {
      label: 'bottom',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'leftTop',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'topRight',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'rightBottom',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'bottomLeft',
      animation: false,
      emissionType: 'affectNearest',
    },
  ],
  triangle: [
    {
      label: 'triangle_left_top',
      animation: false,
      emissionType: 'affectNearest',
      noseDirection: 'up',
    },
    {
      label: 'triangle_right_top',
      animation: false,
      emissionType: 'affectNearest',
      noseDirection: 'up',
    },
    {
      label: 'triangle_left_bottom',
      animation: false,
      emissionType: 'affectNearest',
      noseDirection: 'down',
    },
    {
      label: 'triangle_right_bottom',
      animation: false,
      emissionType: 'affectNearest',
      noseDirection: 'down',
    },
  ],
  hexagon: [
    {
      label: 'hexagon_left',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'hexagon_top',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'hexagon_right',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'hexagon_bottom',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'hexagon_topLeft',
      animation: false,
      emissionType: 'affectNearest',
    },
    {
      label: 'hexagon_bottomRight',
      animation: false,
      emissionType: 'affectNearest',
    },
  ],
};

function getEmittersConfig(options) {
  const { levelType } = options;

  return JSON.parse(JSON.stringify(emittersCfg[levelType]));
}

export default getEmittersConfig;
