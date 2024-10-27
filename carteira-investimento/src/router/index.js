// Importa as funções necessárias para criar um roteador do Vue e o histórico da web
import { createRouter, createWebHistory } from 'vue-router';
// Importa os componentes que serão usados nas rotas
import HomePage from '../components/HomePage.vue';
import AtivoForm from '../components/AtivoForm.vue';
import SumarioAtivos from '../components/SumarioAtivos.vue';

// Define as rotas do aplicativo
const routes = [
  { path: '/', component: HomePage }, // Rota para a página inicial
  { path: '/adicionar', component: AtivoForm }, // Rota para o formulário de adição de ativos
  { path: '/sumario', component: SumarioAtivos } // Rota para a página de sumário de ativos
];

// Cria uma instância do roteador
const router = createRouter({
  history: createWebHistory(), // Utiliza o histórico da web para navegação
  routes // Registra as rotas definidas
});

// Exporta o roteador para ser usado na aplicação
export default router;
