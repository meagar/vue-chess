import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import BoardViewer from '@/components/BoardViewer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/board',
      name: 'Board',
      component: BoardViewer,
    },
    {
      path: '/board/:fen*',
      name: 'Board',
      component: BoardViewer,
    },
  ],
});
