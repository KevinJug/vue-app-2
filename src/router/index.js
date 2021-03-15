import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/price',
    name: 'Price',
    component: () => import('../views/Price.vue')
  },
  {
    path: '/mastermind',
    name: 'Mastermind',
    component: () => import('../views/Mastermind.vue')
  },
  {
    path: '/pendu',
    name: 'Pendu',
    component: () => import('../views/Pendu.vue')
  },
  {
    path: '/classement',
    name: 'Classement',
    component: () => import('../views/Classement.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router
