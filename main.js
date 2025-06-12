import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Import the router
import './assets/main.css'; // Make sure this line is included

createApp(App)
  .use(router) // Use the router
  .mount('#app');
