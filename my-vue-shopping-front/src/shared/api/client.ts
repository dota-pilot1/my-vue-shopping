import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버 응답이 있는 경우
      const { status, data } = error.response;
      
      if (status === 401) {
        // 인증 실패 - 로그아웃 처리
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // 에러 메시지 반환
      throw new Error(data.message || '서버 오류가 발생했습니다.');
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      throw new Error('서버에 연결할 수 없습니다.');
    } else {
      // 요청 설정 중 에러
      throw new Error('요청 중 오류가 발생했습니다.');
    }
  }
);
