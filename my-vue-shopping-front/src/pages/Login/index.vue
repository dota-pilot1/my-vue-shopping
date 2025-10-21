<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>로그인</h1>
        <p>Vue Shopping에 오신 것을 환영합니다</p>
      </div>

      <form @submit.prevent="onSubmit" class="login-form">
        <Input
          v-model="email"
          type="email"
          placeholder="이메일"
          :error="errors.email"
        />
        
        <Input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          :error="errors.password"
        />

        <Button type="submit" :disabled="isLoading">
          {{ isLoading ? '로그인 중...' : '로그인' }}
        </Button>
      </form>

      <div class="login-footer">
        <p>아직 계정이 없으신가요?</p>
        <router-link to="/test-form" class="signup-link">회원가입</router-link>
      </div>

      <!-- 에러/성공 메시지 -->
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/shared/stores/useUserStore';
import Input from '@/shared/ui/Input.vue';
import Button from '@/shared/ui/Button.vue';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const errors = ref({});
const isLoading = ref(false);
const message = ref('');
const messageType = ref(''); // 'success' or 'error'

const validateForm = () => {
  errors.value = {};
  
  if (!email.value) {
    errors.value.email = '이메일을 입력해주세요';
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = '올바른 이메일 형식이 아닙니다';
  }
  
  if (!password.value) {
    errors.value.password = '비밀번호를 입력해주세요';
  } else if (password.value.length < 6) {
    errors.value.password = '비밀번호는 최소 6자 이상이어야 합니다';
  }
  
  return Object.keys(errors.value).length === 0;
};

const onSubmit = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  message.value = '';
  
  try {
    // TODO: 실제 API 호출로 교체
    // const response = await fetch('http://localhost:3000/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: email.value, password: password.value })
    // });
    // const data = await response.json();
    
    // 임시: 로그인 시뮬레이션 (나중에 실제 API로 교체)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 성공 시뮬레이션
    const mockUser = {
      id: 1,
      name: email.value.split('@')[0],
      email: email.value
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    userStore.setUser(mockUser);
    userStore.setToken(mockToken);
    
    message.value = '로그인 성공!';
    messageType.value = 'success';
    
    // 홈으로 리다이렉트
    setTimeout(() => {
      router.push('/');
    }, 1000);
    
  } catch (error) {
    message.value = '로그인 실패: ' + error.message;
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
}

.login-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
  padding: 3rem;
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
}

.login-footer p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.signup-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s;
}

.signup-link:hover {
  color: #2c3e50;
}

.message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 480px) {
  .login-container {
    padding: 2rem 1.5rem;
  }
  
  .login-header h1 {
    font-size: 1.6rem;
  }
}
</style>
