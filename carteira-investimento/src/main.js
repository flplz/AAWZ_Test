
import { createApp } from 'vue'
import './assets/style.css' 

// Importa o componente principal do aplicativo
import App from './App.vue';

// Importa o roteador configurado para gerenciar as rotas do aplicativo
import router from './router';

// Importa a loja Vuex para gerenciar o estado global do aplicativo
import store from './stores/store';

// Cria uma nova instância do aplicativo Vue passando o componente App como argumento
const app = createApp(App);

// Adiciona o store (gerenciamento de estado) à instância do aplicativo
app.use(store);

// Adiciona o router (gerenciamento de rotas) à instância do aplicativo
app.use(router);

// Monta a instância do aplicativo no elemento HTML com o ID 'app'
app.mount('#app');