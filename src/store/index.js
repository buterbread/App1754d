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
  },
  modules: {
    user,
    emissions,
  },
  actions,
  mutations,
  getters,
});
