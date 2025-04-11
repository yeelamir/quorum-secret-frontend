import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue';
import Secrets from '../components/Secrets.vue';
import NewSecret from '../components/NewSecret.vue';
import EditSecret from '../components/EditSecret.vue';
import SecretDetails from '@/components/SecretDetails.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth', // Redirect the root to /login by default
  },
  {
    path: '/secrets',
    name: 'Secrets',
    component: Secrets,
  },
  {
    path: '/SecretDetails/:secretId',
    name: 'SecretDetails',
    component: SecretDetails,
    props: true, // Pass route params as props to the component
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
