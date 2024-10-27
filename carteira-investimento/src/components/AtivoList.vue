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
        <!-- Itera sobre a lista de ativos e cria uma linha para cada ativo -->
        <tr v-for="ativo in ativos" :key="ativo.id">
          <td>
            <!-- Exibe o nome do ativo ou um campo de entrada para edição -->
            <div v-if="!isEditing || ativo.id !== ativoAtualizado.id">
              {{ ativo.nome }}
            </div>
            <div v-else>
              <!-- Liga o campo de entrada ao modelo ativoAtualizado -->
              <input
                v-model="ativoAtualizado.nome" 
                type="text"
                class="form-control"
                placeholder="Nome" 
              />
            </div>
          </td>
          <td>
            <!-- Exibe o tipo do ativo ou um seletor para edição -->
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
            <!-- Exibe o valor do ativo formatado ou um campo de entrada para edição -->
            <div v-if="!isEditing || ativo.id !== ativoAtualizado.id">
              {{ formatCurrency(ativo.valor) }}
            </div>
            <div v-else>
              <!-- Liga o campo de entrada ao modelo ativoAtualizado -->
              <input
                v-model="ativoAtualizado.valor" 
                type="number"
                min="1"
                max="1000000"
                step="1"
                class="form-control"
                placeholder="Valor Investido" 
              />
            </div>
          </td>
          <td>
            <!-- Exibe botões de ação dependendo se está editando ou não -->
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
        <!-- Exibe o total investido filtrado por tipo -->
        <p>Total para "{{ tipoSelecionado || 'Todos' }}": {{ formatCurrency(totalPorTipo) }}</p>
      </div>
      <!-- Componente de gráfico que exibe os investimentos -->
      <InvestimentoChart ref="chart" :ativos="ativos" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import emitter from '@/utils/eventBus';
import InvestimentoChart from '@/components/InvestimentoChart.vue';

export default {
  components: {
    InvestimentoChart // Importa o componente de gráfico de investimentos
  },
  data() {
    return {
      ativoAtualizado: {
        id: null,
        nome: '',
        tipo: '',
        valor: 0
      },
      ativoOriginal: null, // Nova propriedade para armazenar dados originais do ativo
      tipoSelecionado: '', // Armazena o tipo de ativo selecionado para filtragem
      isEditing: null, // Armazena o ID do ativo que está sendo editado
    };
  },
  computed: {
    ...mapGetters(['getAtivos']), // Mapeia getters do Vuex
    ativos() {
      return this.getAtivos; // Retorna a lista de ativos do estado Vuex
    },
    totalPorTipo() {
      // Calcula o total investido por tipo, se um tipo estiver selecionado
      if (this.tipoSelecionado) {
        return this.ativos
          .filter(ativo => ativo.tipo === this.tipoSelecionado) // Filtra ativos pelo tipo selecionado
          .reduce((total, ativo) => total + ativo.valor, 0); // Soma os valores filtrados
      } else {
        // Se nenhum tipo for selecionado, soma todos os valores
        return this.ativos.reduce((total, ativo) => total + ativo.valor, 0);
      }
    }
  },
  methods: {
    ...mapActions(['editAtivo', 'deleteAtivo']), // Mapeia ações do Vuex para edição e exclusão de ativos
    
    formatCurrency(value) {
      // Formata o valor para o padrão monetário brasileiro
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },

    startEditing(ativo) {
      // Inicia o modo de edição para o ativo selecionado
      this.isEditing = ativo.id; // Armazena o ID do ativo que está sendo editado
      this.ativoOriginal = { ...ativo }; // Armazena os dados originais do ativo
      this.ativoAtualizado = { ...ativo }; // Prepara os dados do ativo para edição
    },

    async saveEdit() {
      // Salva as edições feitas no ativo
      if (this.ativoAtualizado.id) {
        await this.editAtivo({
          id: this.ativoAtualizado.id, // ID do ativo que está sendo editado
          ativoAtualizado: { 
            nome: this.ativoAtualizado.nome,
            tipo: this.ativoAtualizado.tipo,
            valor: this.ativoAtualizado.valor
          }
        });

        this.isEditing = null; // Reseta o ID do ativo que está sendo editado
        this.ativoAtualizado = { id: null, nome: '', tipo: '', valor: 0 }; // Reseta o objeto de ativo atualizado
        this.ativoOriginal = null; // Limpa os dados originais
        this.updateChart(); // Atualiza o gráfico de investimentos
      }
    },

    cancelEdit() {
      // Cancela o modo de edição e restaura os dados originais
      this.isEditing = null; // Reseta o ID do ativo que está sendo editado
      this.ativoAtualizado = { ...this.ativoOriginal }; // Restaura os dados originais do ativo
      this.ativoOriginal = null; // Limpa os dados originais
    },

    confirmDelete(id) {
      // Confirma a exclusão do ativo
      if (confirm("Tem certeza que deseja deletar este ativo?")) {
        this.deleteAtivo(id); // Executa a ação de deletar o ativo
        this.updateChart(); // Atualiza o gráfico após a exclusão
      }
    },

    updateChart() {
      // Atualiza o gráfico de investimentos
      if (this.$refs.chart) {
        this.$refs.chart.updateChart(); // Chama o método de atualização do componente gráfico
      }
    }
  },
  created() {
    // Registra um evento para atualizar o gráfico quando um ativo é atualizado
    emitter.on('ativoAtualizado', this.updateChart);
  },
  beforeUnmount() {
    // Remove o evento registrado ao desmontar o componente
    emitter.off('ativoAtualizado', this.updateChart);
  }
};
</script>

<style src="@/assets/AtivoList.css" scoped></style>
