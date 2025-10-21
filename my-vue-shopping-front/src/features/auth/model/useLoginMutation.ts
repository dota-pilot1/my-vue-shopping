import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { login } from '../api/auth';
import { useUserStore } from '@/shared/stores/useUserStore';
import type { LoginRequest, AuthResponse } from '../types';

/**
 * 로그인 mutation hook
 * Vue Query를 사용한 로그인 처리
 */
export const useLoginMutation = () => {
  const router = useRouter();
  const userStore = useUserStore();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      console.log('로그인 성공:', response);

      userStore.setUser(response.user);
      if (response.token) {
        userStore.setToken(response.token);
      }

      setTimeout(() => {
        router.push('/');
      }, 1000);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
