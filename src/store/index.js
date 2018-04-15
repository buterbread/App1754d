import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemsArray: [],
    dropsCount: 0,
    animationsCounter: 0,
    gameStarted: false,
  },
  actions,
  mutations,
  getters,
});
