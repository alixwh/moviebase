import { createRouter, createWebHistory } from 'vue-router';
import {
  Layout, Login, Register,
} from '@/views/account';
import HomeView from '../views/HomeView.vue';
import GenreView from '../views/GenreView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/genre/:id',
    name: 'genre',
    component: GenreView,
  },
  {
    path: '/account',
    component: Layout,
    children: [
      { path: '', redirect: 'login' },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },

    ],

  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
