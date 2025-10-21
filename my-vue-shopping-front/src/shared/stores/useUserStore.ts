import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/features/auth/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token') || null);

  const isLoggedIn = computed(() => !!user.value);

  function setUser(userData: User) {
    user.value = userData;
  }

  function setToken(tokenValue: string) {
    token.value = tokenValue;
    localStorage.setItem('token', tokenValue);
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  }

  return {
    user,
    token,
    isLoggedIn,
    setUser,
    setToken,
    logout,
  };
});
