<script setup>
import Header from '@/shared/components/Header.vue'
import Footer from '@/shared/components/Footer.vue'
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

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
