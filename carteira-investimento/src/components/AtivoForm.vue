<!-- src/components/AtivoForm.vue -->

<template>
  <div class="ativo-form">
    <h2>{{ isEditing ? "Editar Ativo" : "Adicionar Ativo" }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input v-model="ativo.nome" type="text" id="nome" required />
      </div>
      <div class="form-group">
        <label for="tipo">Tipo</label>
        <select v-model="ativo.tipo" id="tipo" required>
          <option value="" disabled>Selecione um tipo</option>
          <option value="Ação">Ação</option>
          <option value="Fundo Imobiliário">Fundo Imobiliário</option>
          <option value="Renda Fixa">Renda Fixa</option>
          <option value="Criptomoeda">Criptomoeda</option>
          <!-- Adicione mais opções conforme necessário -->
        </select>
      </div>
      <div class="form-group">
        <label for="valor">Valor Investido</label>
        <input v-model="ativo.valor" type="number" id="valor" min="0" required />
      </div>
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
  props: ['isEditing', 'initialAtivo'],
  data() {
    return {
      ativo: this.initialAtivo || { nome: '', tipo: '', valor: 0 }
    };
  },
  methods: {
    ...mapActions(['addAtivo']),
    submitForm(event) {
      event.preventDefault();
      event.stopPropagation();

      // Verificar valor é correto
      if (this.ativo.valor <= 0) {
        alert("Por favor, insira um valor válido maior que 0.");
        return;
      }

      // Adicionar novo ativo no Vuex
      this.addAtivo(this.ativo);

      // Emitir um evento para notificar os outros componentes
      emitter.emit('ativoAdicionado', this.ativo);

      // Resetar o form após a submissão
      this.ativo = { nome: '', tipo: '', valor: 0 };
    }
  }
};
</script>

<style src="@/assets/AtivoForm.css" scoped></style>
