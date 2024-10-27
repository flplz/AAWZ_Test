<!-- src/components/AtivoForm.vue -->

<template>
  <div class="ativo-form">
    <!-- Exibe o título do formulário, que muda dependendo se estamos editando ou adicionando um ativo -->
    <h2>{{ isEditing ? "Editar Ativo" : "Adicionar Ativo" }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome</label>
        <!-- Campo de entrada para o nome do ativo, com vinculação de modelo -->
        <input v-model="ativo.nome" type="text" id="nome" required maxlength="30" />
        <!-- Mensagem de erro exibida se o nome for inválido -->
        <small v-if="nomeInvalido" class="error-text">{{ nomeErrorMessage }}</small>
      </div>
      <div class="form-group">
        <label for="tipo">Tipo</label>
        <!-- Seleção do tipo de ativo, com opções definidas -->
        <select v-model="ativo.tipo" id="tipo" required>
          <option value="" disabled>Selecione um tipo</option>
          <option value="Ação">Ação</option>
          <option value="Fundo Imobiliário">Fundo Imobiliário</option>
          <option value="Renda Fixa">Renda Fixa</option>
          <option value="Criptomoeda">Criptomoeda</option>
        </select>
      </div>
      <div class="form-group">
        <label for="valor">Valor Investido</label>
        <!-- Campo de entrada para o valor investido, aceitando apenas números -->
        <input v-model.number="ativo.valor" type="number" id="valor" min="1" max="1000000" step="1" required />
        <!-- Mensagem de erro exibida se o valor for inválido -->
        <small v-if="valorInvalido" class="error-text">Por favor, insira um valor entre 1 e 1,000,000.</small>
      </div>
      <!-- Botão de submissão que muda conforme o modo (edição ou adição) -->
      <button type="submit" class="submit-btn">
        {{ isEditing ? "Salvar" : "Adicionar" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import emitter from '@/utils/eventBus';

export default {
  props: ['isEditing', 'initialAtivo'], // Props para controlar o modo de edição e o ativo inicial
  data() {
    return {
      // Objeto que representa o ativo sendo adicionado ou editado
      ativo: this.initialAtivo || { nome: '', tipo: '', valor: 0 },
      nomeInvalido: false, // Flag para indicar se o nome é inválido
      nomeErrorMessage: '' // Mensagem de erro para o nome
    };
  },
  methods: {
    ...mapActions(['addAtivo']), // Mapeia a ação 'addAtivo' do Vuex para uso neste componente
    submitForm() {
      // Validação do nome do ativo
      this.nomeInvalido = false; // Reseta a flag de nome inválido
      this.nomeErrorMessage = ''; // Reseta a mensagem de erro

      // Verifica se o nome está vazio
      if (!this.ativo.nome.trim()) {
        this.nomeInvalido = true;
        this.nomeErrorMessage = 'O nome não pode estar vazio.';
        return; // Encerra a execução da função se a validação falhar
      }

      // Verifica se o nome excede o comprimento máximo
      if (this.ativo.nome.length > 30) {
        this.nomeInvalido = true;
        this.nomeErrorMessage = 'O nome deve ter no máximo 30 caracteres.';
        return; // Encerra a execução da função se a validação falhar
      }

      // Adicionar novo ativo no Vuex
      this.addAtivo(this.ativo);

      // Emitir um evento para notificar os outros componentes sobre a adição do ativo
      emitter.emit('ativoAdicionado', this.ativo);

      // Resetar o formulário após a submissão para permitir a adição de um novo ativo
      this.ativo = { nome: '', tipo: '', valor: 0 };
    }
  }
};
</script>

<style src="@/assets/AtivoForm.css" scoped>
.error-text {
  color: red; 
  font-size: 0.9em; 
}
</style>
