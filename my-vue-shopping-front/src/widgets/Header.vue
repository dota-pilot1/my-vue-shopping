<template>
  <header class="header">
    <div class="header-container">
      <!-- 왼쪽: 로고 -->
      <div class="logo">
        <router-link to="/">
          <span class="logo-icon">🛒</span>
          <span class="logo-text">Vue Shopping</span>
        </router-link>
      </div>

      <!-- 가운데: 네비게이션 -->
      <nav class="nav">
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/about" class="nav-link">소개</router-link>
      </nav>

      <!-- 오른쪽: 인증 버튼 -->
      <AuthButtons />
    </div>
  </header>
</template>

<script setup>
import AuthButtons from './AuthButtons.vue';
</script>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  width: 100%;
  box-sizing: border-box;
}

.logo {
  flex-shrink: 0;
}

.logo a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.logo a:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: #42b883;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }

  .logo-text {
    display: none;
  }

  .nav {
    gap: 1rem;
  }
}
</style>
