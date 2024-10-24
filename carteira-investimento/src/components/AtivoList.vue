<!-- src/components/AtivoList.vue -->
<template>
  <div>
    <h2>Lista de Ativos</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Valor Investido</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ativo in ativos" :key="ativo.id">
          <td>{{ ativo.nome }}</td>
          <td>{{ ativo.tipo }}</td>
          <td>{{ ativo.valor }}</td>
          <td>
            <button @click="startEditing(ativo)">Editar</button>
            <button @click="confirmDelete(ativo.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulário de Edição -->
    <div v-if="isEditing">
      <h3>Editar Ativo</h3>
      <form @submit.prevent="saveEdit">
        <div>
          <label>Nome:</label>
          <input v-model="ativoAtualizado.nome" type="text" />
        </div>
        <div>
          <label>Tipo:</label>
          <input v-model="ativoAtualizado.tipo" type="text" />
        </div>
        <div>
          <label>Valor Investido:</label>
          <input v-model="ativoAtualizado.valor" type="number" min="0.01" step="0.01"/>
        </div>
        <button type="submit">Salvar</button>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isEditing: false, // Controle de exibição do formulário de edição
      ativoAtualizado: {
        id: null,
        nome: '',
        tipo: '',
        valor: 0
      }
    };
  },
  computed: {
    ...mapGetters(['getAtivos']),
    ativos() {
      return this.getAtivos;
    }
  },
  methods: {
    ...mapActions(['editAtivo', 'deleteAtivo']),

    // Função para começar a editar um ativo
    startEditing(ativo) {
      this.isEditing = true;
      this.ativoAtualizado = { ...ativo }; // Clonar o ativo selecionado para editar
    },

    // Função para salvar as mudanças
    saveEdit() {
      if (this.ativoAtualizado.id) {
        this.editAtivo({
          id: this.ativoAtualizado.id,
          ativoAtualizado: { ...this.ativoAtualizado }
        });
        this.isEditing = false; // Fechar o formulário após salvar
      }
    },

    // Função para cancelar a edição
    cancelEdit() {
      this.isEditing = false; // Apenas fecha o formulário
    },

    // Função de confirmação de exclusão
    confirmDelete(id) {
      if (confirm("Tem certeza que deseja deletar este ativo?")) {
        this.deleteAtivo(id);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos do formulário de edição */
form {
  margin-top: 20px;
}
form div {
  margin-bottom: 10px;
}
</style>
