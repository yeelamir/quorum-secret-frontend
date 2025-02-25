import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue';
import Secrets from '../components/Secrets.vue';
import NewSecret from '../components/NewSecret.vue';
import EditSecret from '../components/EditSecret.vue';

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect the root to /login by default
  },   
  {
    path: '/secrets',
    name: 'Secrets',
    component: Secrets,
  },
  {
    path: '/newSecret',
    name: 'NewSecret',
    component: NewSecret,
  },
  {
    path: '/editSecret',
    name: 'EditSecret',
    component: EditSecret,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
