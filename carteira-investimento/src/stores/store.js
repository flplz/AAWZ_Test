// src/store.js
import { createStore } from 'vuex'; // Importa a função para criar um store do Vuex
import { v4 as uuidv4 } from 'uuid'; // Importa uma função para gerar IDs únicos
import emitter from '@/utils/eventBus'; // Importa um sistema de eventos para comunicação entre componentes

// Cria e exporta um novo store do Vuex
export default createStore({
  state: {
    ativos: []  // Armazena a lista de ativos
  },
  mutations: {
    // Adiciona um novo ativo ao estado
    ADD_ATIVO(state, ativo) {
      ativo.id = uuidv4(); // Gera um ID único para o novo ativo
      state.ativos.push(ativo); // Adiciona o ativo à lista de ativos
      emitter.emit('ativoAtualizado'); // Emite um evento informando que um ativo foi atualizado
    },
    // Edita um ativo existente no estado
    EDIT_ATIVO(state, { id, ativoAtualizado }) {
      // Encontra o índice do ativo a ser editado
      const index = state.ativos.findIndex(ativo => ativo.id === id);
      if (index !== -1) {
        // Substitui o ativo existente com as novas informações
        state.ativos.splice(index, 1, { ...state.ativos[index], ...ativoAtualizado });
        emitter.emit('ativoAtualizado'); // Emite um evento informando que um ativo foi atualizado
      }
    },
    // Remove um ativo da lista
    DELETE_ATIVO(state, id) {
      // Filtra a lista de ativos para remover o ativo com o ID especificado
      state.ativos = state.ativos.filter(ativo => ativo.id !== id);
      emitter.emit('ativoAtualizado'); // Emite um evento informando que um ativo foi atualizado
    }
  },
  actions: {
    // Ação para adicionar um ativo, que chama a mutação correspondente
    addAtivo({ commit }, ativo) {
      commit('ADD_ATIVO', ativo);
    },
    // Ação para editar um ativo, que chama a mutação correspondente
    editAtivo({ commit }, payload) {
      commit('EDIT_ATIVO', payload);
    },
    // Ação para deletar um ativo, que chama a mutação correspondente
    deleteAtivo({ commit }, id) {
      commit('DELETE_ATIVO', id);
    }
  },
  getters: {
    // Getter para obter a lista de ativos do estado
    getAtivos: (state) => state.ativos,
    // Getter para calcular o total investido
    totalInvestido: (state) => {
      // Soma o valor de todos os ativos na lista
      return state.ativos.reduce((total, ativo) => total + ativo.valor, 0);
    }
  }
});
