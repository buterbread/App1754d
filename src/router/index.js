import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Hello from '../screens/Hello';
import YouWin from '../screens/YouWin';
import YouLost from '../screens/YouLost';
import Gameplay from '../screens/Gameplay';

Vue.use(Router);

export default new Router({
  store,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Hello },
    { path: '/gameplay', component: Gameplay },
    { path: '/gameplay/:chapter/:level', component: Gameplay },
    { path: '/you-win', component: YouWin },
    { path: '/you-lost', component: YouLost },
  ],
});
