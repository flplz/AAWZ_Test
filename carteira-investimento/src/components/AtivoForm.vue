<!-- src/components/AtivoForm.vue -->
<template>
    <div>
      <h2>{{ isEditing ? "Editar Ativo" : "Adicionar Ativo" }}</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nome">Nome</label>
          <input v-model="ativo.nome" type="text" id="nome" required />
        </div>
        <div>
          <label for="tipo">Tipo</label>
          <input v-model="ativo.tipo" type="text" id="tipo" required />
        </div>
        <div>
          <label for="valor">Valor Investido</label>
          <input v-model="ativo.valor" type="number" id="valor" required />
        </div>
        <button type="submit">{{ isEditing ? "Salvar" : "Adicionar" }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isEditing', 'initialAtivo'],
    data() {
      return {
        ativo: this.initialAtivo || { nome: '', tipo: '', valor: 0 }
      };
    },
    methods: {
      submitForm() {
        this.$emit('submit', this.ativo);
        //Resetar o form após a submissão
        this.ativo = { nome: '', tipo: '', valor: 0 };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aqui você pode adicionar estilo conforme preferir */
  </style>
  