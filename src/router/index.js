import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Secrets from '../components/Secrets.vue';

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect the root to /login by default
  },    
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/secrets',
    name: 'Secrets',
    component: Secrets,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
