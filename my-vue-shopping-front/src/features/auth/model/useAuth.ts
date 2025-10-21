import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { register, login } from '../api/auth';
import { useUserStore } from '@/shared/stores/useUserStore';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../types';

interface UseRegisterReturn {
  handleRegister: (data: RegisterRequest) => Promise<{ success: boolean; data?: AuthResponse; error?: string }>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
}

interface UseLoginReturn {
  handleLogin: (data: LoginRequest) => Promise<{ success: boolean; data?: AuthResponse; error?: string }>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
}

interface UseLogoutReturn {
  handleLogout: () => void;
}

/**
 * 회원가입 composable
 */
export const useRegister = (): UseRegisterReturn => {
  const router = useRouter();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const handleRegister = async (data: RegisterRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await register(data);
      console.log('회원가입 성공:', response);
      
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      
      return { success: true, data: response };
    } catch (err) {
      console.error('회원가입 실패:', err);
      const errorMessage = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    handleRegister,
    isLoading,
    error,
  };
};

/**
 * 로그인 composable
 */
export const useLogin = (): UseLoginReturn => {
  const router = useRouter();
  const userStore = useUserStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const handleLogin = async (data: LoginRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await login(data);
      console.log('로그인 성공:', response);
      
      userStore.setUser(response.user);
      if (response.token) {
        userStore.setToken(response.token);
      }
      
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
      return { success: true, data: response };
    } catch (err) {
      console.error('로그인 실패:', err);
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    handleLogin,
    isLoading,
    error,
  };
};

/**
 * 로그아웃 composable
 */
export const useLogout = (): UseLogoutReturn => {
  const router = useRouter();
  const userStore = useUserStore();

  const handleLogout = () => {
    userStore.logout();
    router.push('/');
  };

  return {
    handleLogout,
  };
};
