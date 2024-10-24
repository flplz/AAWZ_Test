<!-- src/App.vue -->
<template>
  <div id="app">
    <AtivoForm
      :isEditing="isEditing"
      :initialAtivo="editingAtivo"
      @submit="handleFormSubmit"
    />
    <AtivoList
      :ativos="ativos"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <h3>Total Investido: {{ totalInvestido }}</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AtivoForm from './components/AtivoForm.vue';
import AtivoList from './components/AtivoList.vue';

export default {
  components: {
    AtivoForm,
    AtivoList
  },
  data() {
    return {
      isEditing: false,
      editingAtivo: null
    };
  },
  computed: {
    ...mapGetters(['ativos', 'totalInvestido'])
  },
  methods: {
    ...mapActions(['addAtivo', 'updateAtivo', 'deleteAtivo']),
    handleFormSubmit(ativo) {
      /* console.log(ativo); */
      if (this.isEditing) {
        this.updateAtivo(ativo);
      } else {
        this.addAtivo(ativo);
      }
      this.isEditing = false;
      this.editingAtivo = null;
    },
    handleEdit(ativo) {
      this.isEditing = true;
      this.editingAtivo = { ...ativo };
    },
    handleDelete(id) {
      this.deleteAtivo(id);
    }
  }
};
</script>

<style>
/* Adicione estilos conforme preferir */
</style>
