import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Hello from '../screens/Hello';

Vue.use(Router);

export default new Router({
  store,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: Hello },
  ],
});
