<!-- src/components/AtivoList.vue -->
<template>
  <div class="ativo-list">
    <h2 class="section-title">Lista de Ativos</h2>
    <table class="ativo-table">
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
          <td>
            <div v-if="!isEditing || ativo.id !== ativoAtualizado.id">
              {{ ativo.nome }}
            </div>
            <div v-else>
              <input
                v-model="ativoAtualizado.nome"
                type="text"
                class="form-control"
                placeholder="Nome" 
              />
            </div>
          </td>
          <td>
            <div v-if="!isEditing || ativo.id !== ativoAtualizado.id">
              {{ ativo.tipo }}
            </div>
            <div v-else>
              <input
                v-model="ativoAtualizado.tipo"
                type="text"
                class="form-control"
                placeholder="Tipo" 
              />
            </div>
          </td>
          <td>
            <div v-if="!isEditing || ativo.id !== ativoAtualizado.id">
              {{ formatCurrency(ativo.valor) }}
            </div>
            <div v-else>
              <input
                v-model="ativoAtualizado.valor"
                type="number"
                min="0.01"
                step="0.01"
                class="form-control"
                placeholder="Valor Investido" 
              />
            </div>
          </td>
          <td>
            <div v-if="!isEditing || ativo.id !== ativoAtualizado.id">
              <button class="btn btn-primary" @click="startEditing(ativo)">Editar</button>
              <button class="btn btn-danger" @click="confirmDelete(ativo.id)">Deletar</button>
            </div>
            <div v-else>
              <button class="btn btn-primary" @click="saveEdit">Salvar</button>
              <button class="btn btn-secondary" @click="cancelEdit">Cancelar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Exibição do Total Investido -->
    <div class="total-investido">
      <h3 class="section-title">Total Investido: {{ formatCurrency(totalInvestido) }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import emitter from '@/utils/eventBus';

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
    ...mapGetters(['getAtivos', 'totalInvestido']),
    ativos() {
      return this.getAtivos;
    }
  },
  methods: {
    ...mapActions(['editAtivo', 'deleteAtivo']),
    formatCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

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
        this.ativoAtualizado = { id: null, nome: '', tipo: '', valor: 0 }; // Resetar o objeto
      }
    },

    // Função para cancelar a edição
    cancelEdit() {
      this.isEditing = false; // Apenas fecha o formulário
      this.ativoAtualizado = { id: null, nome: '', tipo: '', valor: 0 }; // Resetar o objeto
    },

    // Função de confirmação de exclusão
    confirmDelete(id) {
      if (confirm("Tem certeza que deseja deletar este ativo?")) {
        this.deleteAtivo(id);
      }
    },

    created() {
      // Escuta o evento 'ativoAdicionado' emitido pelo AtivoForm
      emitter.on('ativoAdicionado', this.onAtivoAdicionado);
    },

    beforeDestroy() {
      // Limpa o event listener antes que o componente seja destruído
      emitter.off('ativoAdicionado', this.onAtivoAdicionado);
    }
  }
};
</script>

<style src="@/assets/AtivoList.css" scoped></style>