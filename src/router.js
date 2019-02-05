import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/episode/:id',
      name: 'episode',
      component: () => import('./views/Episode.vue'),
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('./views/NotFound.vue'),
    },
  ],
});
