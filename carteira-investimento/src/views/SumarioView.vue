<!-- src/views/SumarioView.vue -->
<template>
    <div class="sumario">
      <h2>Sumário de Ativos</h2>
      <AtivoList />
    </div>
  </template>
  
  <script>
  import AtivoList from '../components/AtivoList.vue';
  
  export default {
    components: {
      AtivoList
    }
  };
  </script>
  
  <style scoped>
   .sumario {
    padding: 20px;
  } 
  
  </style>