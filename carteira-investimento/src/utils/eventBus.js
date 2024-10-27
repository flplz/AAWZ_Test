// src/utils/eventBus.js
import mitt from 'mitt';

// Cria uma instância do emitter usando mitt, que será usada para gerenciar eventos
const emitter = mitt();

// Exporta o emitter para que possa ser utilizado em outros componentes ou arquivos do projeto
export default emitter;