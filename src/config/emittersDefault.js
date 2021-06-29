const emittersCfg = {
  default: [
    {
      label: 'left',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'top',
      animation: false,
      emissionType: 'tillImpact',
    },
    { label: 'right',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'bottom',
      animation: false,
      emissionType: 'tillImpact',
    },
  ],
  triangle: [
    {
      label: 'triangle_left_top',
      animation: false,
      emissionType: 'tillImpact',
      noseDirection: 'up',
    }, {
      label: 'triangle_right_top',
      animation: false,
      emissionType: 'tillImpact',
      noseDirection: 'up',
    }, {
      label: 'triangle_left_bottom',
      animation: false,
      emissionType: 'tillImpact',
      noseDirection: 'down',
    }, {
      label: 'triangle_right_bottom',
      animation: false,
      emissionType: 'tillImpact',
      noseDirection: 'down',
    },
  ],
  hexagon: [
    {
      label: 'hexagon_left',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'hexagon_top',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'hexagon_right',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'hexagon_bottom',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'hexagon_topLeft',
      animation: false,
      emissionType: 'tillImpact',
    }, {
      label: 'hexagon_bottomRight',
      animation: false,
      emissionType: 'tillImpact',
    },
  ],
};

function getEmittersConfig(options) {
  const { levelType, row, col } = options;

  return JSON.parse(JSON.stringify(emittersCfg[levelType]));
}

export default getEmittersConfig;
