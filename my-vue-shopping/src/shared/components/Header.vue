<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">🛒 Vue Shopping</router-link>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.logo a:hover {
  color: #42b883;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #42b883;
}

.nav-link.router-link-active {
  background-color: #42b883;
  color: white;
}
</style>
