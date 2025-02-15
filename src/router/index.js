import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Secrets from '../components/Secrets.vue';
import NewSecret from '../components/NewSecret.vue';

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
  {
    path: '/newSecret',
    name: 'NewSecret',
    component: NewSecret,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
