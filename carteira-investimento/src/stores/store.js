import { createStore } from 'vuex';

export default createStore({
  state: {
    ativos: []  // Lista de ativos
  },
  mutations: {
    // Adiciona um novo ativo
    ADD_ATIVO(state, ativo) {
      // Adiciona um id único a cada ativo
      ativo.id = Date.now();
      state.ativos.push(ativo);
    },
    // Edita um ativo existente
    EDIT_ATIVO(state, { id, ativoAtualizado }) {
      const index = state.ativos.findIndex(ativo => ativo.id === id);
      if (index !== -1) {
        state.ativos[index] = { ...state.ativos[index], ...ativoAtualizado };
      }
    },
    // Remove um ativo da lista
    DELETE_ATIVO(state, id) {
      state.ativos = state.ativos.filter(ativo => ativo.id !== id);
    }
  },
  actions: {
    // Ação para adicionar um ativo
    addAtivo({ commit }, ativo) {
      commit('ADD_ATIVO', ativo);
    },
    // Ação para editar um ativo
    editAtivo({ commit }, payload) {
      commit('EDIT_ATIVO', payload);
    },
    // Ação para deletar um ativo
    deleteAtivo({ commit }, id) {
      commit('DELETE_ATIVO', id);
    }
  },
  getters: {
    // Retorna a lista de ativos
    getAtivos: (state) => state.ativos,
    
    // Calcula o total investido somando os valores de todos os ativos
    totalInvestido: (state) => {
      return state.ativos.reduce((total, ativo) => total + ativo.valor, 0);
    }
  }
});
