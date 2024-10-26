<!-- InvestimentoChart.vue -->
<template>
    <div class="chart-section">
      <h2 class="invest-title">Investimento por Tipo</h2>
      <div class="chart-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  import emitter from '@/utils/eventBus';
  
  export default {
    props: {
      ativos: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        myChart: null
      };
    },
    watch: {
      ativos: {
        handler() {
          this.updateChart();
        },
        deep: true,
        immediate: true
      }
    },
    created() {
        emitter.on('ativoAtualizado', this.updateChart);
    },
    beforeUnmount() {
        emitter.off('ativoAtualizado', this.updateChart);
        if (this.myChart) {
            this.myChart.destroy(); // Limpa o grafico antes de desmontar o componente
        }
    },
    methods: {
      updateChart() {
        if (this.myChart) {
          this.myChart.data.datasets[0].data = this.getTotalPorTipo();
          this.myChart.update();
        }
      },
      createChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Ação', 'Criptomoeda', 'Fundo Imobiliário', 'Renda Fixa'],
            datasets: [
              {
                label: 'Total Investido',
                data: this.getTotalPorTipo(),
                backgroundColor: [
                  '#007bff',
                  '#dc3545',
                  '#ffc107',
                  '#28a745'
                ]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false
              }
            }
          }
        });
      },
      getTotalPorTipo() {
        return [
          this.ativos.filter(ativo => ativo.tipo === 'Ação').reduce((total, ativo) => total + ativo.valor, 0),
          this.ativos.filter(ativo => ativo.tipo === 'Criptomoeda').reduce((total, ativo) => total + ativo.valor, 0),
          this.ativos.filter(ativo => ativo.tipo === 'Fundo Imobiliário').reduce((total, ativo) => total + ativo.valor, 0),
          this.ativos.filter(ativo => ativo.tipo === 'Renda Fixa').reduce((total, ativo) => total + ativo.valor, 0)
        ];
      }
    },
    mounted() {
      this.createChart();
    }
  };
  </script>

<style src="@/assets/InvestimentoChart.css" scoped></style>