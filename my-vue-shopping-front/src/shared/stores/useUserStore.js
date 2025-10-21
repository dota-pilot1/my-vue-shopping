import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);

  const isLoggedIn = computed(() => !!user.value);

  function setUser(userData) {
    user.value = userData;
  }

  function setToken(tokenValue) {
    token.value = tokenValue;
    if (tokenValue) {
      localStorage.setItem('token', tokenValue);
    } else {
      localStorage.removeItem('token');
    }
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
