import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import user from './user';
import emissions from './emissionTypes';
import sceneController from './sceneController';
import dialog from './dialog';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemsArray: [],
    animationsCounter: 0,
    gameStarted: false,
    dischargesCount: 0,
    comboMultiplierIndex: 0,
    combosCount: 0,
  },
  modules: {
    user,
    emissions,
    sceneController,
    dialog,
  },
  actions,
  mutations,
  getters,
});
