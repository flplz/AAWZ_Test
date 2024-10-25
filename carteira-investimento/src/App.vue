<template>
  <div id="app">
    <nav>
      <div class="logo-container">
        <img src="@/assets/aawz-logo.png" alt="AAWZ Logo" class="logo">
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/adicionar" class="nav-link">Adicionar Ativo</router-link>
        <router-link to="/sumario" class="nav-link">Sumário de Ativos</router-link>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  max-height: 40px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
}

.nav-link {
  color: #fff;
  padding: 10px 15px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #555;
}

.nav-link.router-link-exact-active {
  background-color: #6a886e;
}
</style>