<script setup>
import Header from './widgets/Header.vue'
import Footer from './widgets/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  color: #2c3e50;
  transition: background-color 0.3s, color 0.3s;
}

.dark #app {
  background-color: #0f0f0f;
  color: #e5e5e5;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
}
</style>
