<template>
    <div>
      <h2>Sumário de Ativos</h2>
      <AtivoList />
    </div>
  </template>
  
  <script>
  import AtivoList from './AtivoList.vue';
  
  export default {
    name: 'SumarioAtivos',
    components: {
      AtivoList
    }
  };
  </script>
  