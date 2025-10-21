import { apiClient } from '@/shared/api/client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';

/**
 * 회원가입
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

/**
 * 로그인
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
};

/**
 * 로그아웃
 */
export const logout = async (): Promise<{ status: string }> => {
  const response = await apiClient.post<{ status: string }>('/auth/logout');
  return response.data;
};

/**
 * 현재 사용자 정보 조회
 */
export const getCurrentUser = async (): Promise<{ user: AuthResponse['user'] }> => {
  const response = await apiClient.get<{ user: AuthResponse['user'] }>('/auth/me');
  return response.data;
};
