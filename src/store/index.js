import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import user from './user';
import emissions from './emissionTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemsArray: [],
    dropsCount: 0,
    animationsCounter: 0,
    gameStarted: false,
    dischargesCount: 0,
    comboMultipliers: [7, 5, 3, 2],
    comboMultiplierIndex: 0,
  },
  modules: {
    user,
    emissions,
  },
  actions,
  mutations,
  getters,
});
