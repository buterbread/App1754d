import configModule from '../config/gameplay';

const config = configModule();

export default {
  namespaced: true,

  state: {
    currentCount: config.initialDropsCounter,
  },
};
