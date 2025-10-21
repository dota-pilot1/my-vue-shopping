<template>
  <div class="home-page">
    <div class="coming-soon">
      <p>🚀 구현 예정입니다</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  padding: 2rem 0;
}

.coming-soon {
  text-align: center;
  padding: 6rem 2rem;
  color: #718096;
  font-size: 1.3rem;
  font-weight: 500;
  transition: color 0.3s;
}

:global(.dark) .coming-soon {
  color: #a0aec0;
}
</style>
