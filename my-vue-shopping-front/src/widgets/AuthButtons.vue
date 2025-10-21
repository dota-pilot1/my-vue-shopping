<template>
  <div class="auth-buttons">
    <!-- 로그인한 경우 -->
    <div v-if="userStore.isLoggedIn" class="user-info">
      <span class="user-name">{{ userStore.user?.name }}님</span>
      <button @click="handleLogout" class="logout-btn">로그아웃</button>
    </div>

    <!-- 로그인하지 않은 경우 -->
    <div v-else class="auth-links">
      <router-link to="/login" class="auth-link">로그인</router-link>
      <span class="divider">|</span>
      <router-link to="/signup" class="auth-link">회원가입</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/shared/stores/useUserStore';
import { useLogout } from '@/features/auth';

const userStore = useUserStore();
const { handleLogout } = useLogout();
</script>

<style scoped>
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-name {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
}

.logout-btn {
  padding: 0.4rem 1rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.auth-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.auth-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.divider {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}
</style>
