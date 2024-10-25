import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AtivoForm from '../components/AtivoForm.vue';
import SumarioAtivos from '../components/SumarioAtivos.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/adicionar', component: AtivoForm },
  { path: '/sumario', component: SumarioAtivos }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
