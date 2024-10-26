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
              <select v-model="ativoAtualizado.tipo" class="form-control">
                <option disabled value="">Selecione um tipo</option>
                <option value="Ação">Ação</option>
                <option value="Criptomoeda">Criptomoeda</option>
                <option value="Fundo Imobiliário">Fundo Imobiliário</option>
                <option value="Renda Fixa">Renda Fixa</option>
              </select>
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
    <div class="total-and-chart">
      <div class="total-investido">
        <h3 class="section-title">Total Investido</h3>
        <div class="filter">
          <label for="tipo">Filtrar por Tipo:</label>
          <select v-model="tipoSelecionado" @change="calcularTotalPorTipo" id="tipo">
            <option value="">Todos</option>
            <option value="Ação">Ação</option>
            <option value="Criptomoeda">Criptomoeda</option>
            <option value="Fundo Imobiliário">Fundo Imobiliário</option>
            <option value="Renda Fixa">Renda Fixa</option>
          </select>
        </div>
        <p>Total para "{{ tipoSelecionado || 'Todos' }}": {{ formatCurrency(totalPorTipo) }}</p>
      </div>
      <InvestimentoChart  ref= "chart" :ativos="ativos" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import emitter from '@/utils/eventBus';
import InvestimentoChart from '@/components/InvestimentoChart.vue';

export default {
  components: {
    InvestimentoChart
  },
  data() {
    return {
      isEditing: false,
      ativoAtualizado: {
        id: null,
        nome: '',
        tipo: '',
        valor: 0
      },
      tipoSelecionado: '',
    };
  },
  computed: {
    ...mapGetters(['getAtivos']),
    ativos() {
      return this.getAtivos;
    },
    totalPorTipo() {
      if (this.tipoSelecionado) {
        return this.ativos
          .filter(ativo => ativo.tipo === this.tipoSelecionado)
          .reduce((total, ativo) => total + ativo.valor, 0);
      } else {
        return this.ativos.reduce((total, ativo) => total + ativo.valor, 0);
      }
    }
  },
  methods: {
    ...mapActions(['editAtivo', 'deleteAtivo']),
    formatCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

    startEditing(ativo) {
      this.isEditing = true;
      this.ativoAtualizado = { ...ativo };
    },

    // Função para salvar as mudanças
    saveEdit() {
      if (this.ativoAtualizado.id) {
        this.editAtivo({
          id: this.ativoAtualizado.id,
          ativoAtualizado: { ...this.ativoAtualizado }
        });
        
        this.isEditing = false;
        this.ativoAtualizado = { id: null, nome: '', tipo: '', valor: 0 };
        emitter.emit('ativoAtualizado'); // Emite o evento de atualização de ativo
      }
    },


    // Função para cancelar a edição
    cancelEdit() {
      this.isEditing = false;
      this.ativoAtualizado = { id: null, nome: '', tipo: '', valor: 0 };
    },

    // Função de confirmação de exclusão
    confirmDelete(id) {
      if (confirm("Tem certeza que deseja deletar este ativo?")) {
        this.deleteAtivo(id);
        emitter.emit('ativoAtualizado'); // Emite o evento de atualização de ativo
      }
    }
  },
  created() {
    emitter.on('ativoAdicionado', this.onAtivoAdicionado);
  },
  
  beforeUnmount() {
    emitter.off('ativoAdicionado', this.onAtivoAdicionado);
  }
};
</script>

<style src="@/assets/AtivoList.css" scoped></style>