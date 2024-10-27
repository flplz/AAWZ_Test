<!-- InvestimentoChart.vue -->
<template>
  <div class="chart-section">
    <h2 class="invest-title">Investimento por Tipo</h2>
    <div class="chart-container">
      <!-- Elemento canvas onde o gráfico será renderizado -->
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'; // Importa a biblioteca Chart.js para criação de gráficos
import emitter from '@/utils/eventBus'; // Importa um sistema de eventos para comunicação entre componentes

export default {
  // Define as propriedades que o componente receberá
  props: {
    ativos: {
      type: Array, // A propriedade 'ativos' deve ser um array
      required: true // A propriedade é obrigatória
    }
  },
  data() {
    return {
      myChart: null // Variável para armazenar a instância do gráfico
    };
  },
  watch: {
    // Observa mudanças na propriedade 'ativos'
    ativos: {
      handler() {
        this.forceUpdateChart(); // Atualiza o gráfico quando 'ativos' mudar
      },
      deep: true, // Observa mudanças profundas (em objetos dentro do array)
      immediate: true // Executa o handler imediatamente após a inicialização
    }
  },
  created() {
    // Registra um ouvinte para o evento 'ativoAtualizado'
    emitter.on('ativoAtualizado', this.forceUpdateChart);
  },
  beforeUnmount() {
    // Remove o ouvinte do evento antes do componente ser desmontado
    emitter.off('ativoAtualizado', this.forceUpdateChart);
    // Destroi o gráfico se existir
    if (this.myChart) {
      this.myChart.destroy();
    }
  },
  methods: {
    // Método para forçar a atualização do gráfico com os dados mais recentes
    forceUpdateChart() {
      if (this.myChart) {
        // Atualiza os dados do gráfico
        this.myChart.data.datasets[0].data = this.getTotalPorTipo();
        this.myChart.update(); // Atualiza a visualização do gráfico
      }
    },
    // Método para criar o gráfico
    createChart() {
      const ctx = document.getElementById('myChart'); // Obtém o contexto do canvas
      if (!ctx) return; // Verifica se o canvas existe, se não, retorna
      // Inicializa o gráfico com configurações específicas
      this.myChart = new Chart(ctx, {
        type: 'pie', // Tipo de gráfico (pizza)
        data: {
          labels: ['Ação', 'Criptomoeda', 'Fundo Imobiliário', 'Renda Fixa'], // Rótulos dos tipos de investimento
          datasets: [
            {
              label: 'Total Investido', // Rótulo do conjunto de dados
              data: this.getTotalPorTipo(), // Dados que representam o total por tipo
              backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'] // Cores de cada seção do gráfico
            }
          ]
        },
        options: {
          responsive: true, // O gráfico é responsivo
          maintainAspectRatio: false, // Mantém a proporção do gráfico
          plugins: {
            title: {
              display: false // Não exibe o título do gráfico
            }
          }
        }
      });
    },
    // Método para calcular o total investido por tipo
    getTotalPorTipo() {
      return [
        // Calcula o total para cada tipo de ativo
        this.ativos.filter(ativo => ativo.tipo === 'Ação').reduce((total, ativo) => total + ativo.valor, 0),
        this.ativos.filter(ativo => ativo.tipo === 'Criptomoeda').reduce((total, ativo) => total + ativo.valor, 0),
        this.ativos.filter(ativo => ativo.tipo === 'Fundo Imobiliário').reduce((total, ativo) => total + ativo.valor, 0),
        this.ativos.filter(ativo => ativo.tipo === 'Renda Fixa').reduce((total, ativo) => total + ativo.valor, 0)
      ];
    }
  },
  mounted() {
    // Cria o gráfico quando o componente é montado
    this.createChart();
  }
};
</script>

<style src="@/assets/InvestimentoChart.css" scoped></style>
