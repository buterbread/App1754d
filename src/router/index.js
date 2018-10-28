import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Hello from '../screens/Hello';
import Gameplay from '../screens/Gameplay';

Vue.use(Router);

export default new Router({
  store,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/start', component: Hello },
    { path: '/', component: Gameplay },
    { path: '*', component: Gameplay },
  ],
});
