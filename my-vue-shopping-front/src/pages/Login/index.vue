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

        <Button type="submit" :disabled="loginLoading">
          {{ loginLoading ? '로그인 중...' : '로그인' }}
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

<script setup lang="ts">
import { ref } from 'vue';
import { useLogin } from '@/features/auth';
import Input from '@/shared/ui/Input.vue';
import Button from '@/shared/ui/Button.vue';

const { handleLogin, isLoading: loginLoading, error: loginError } = useLogin();

const email = ref('');
const password = ref('');
const errors = ref<Record<string, string>>({});
const message = ref('');
const messageType = ref<'success' | 'error' | ''>('');

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
  
  message.value = '';
  
  const result = await handleLogin({
    email: email.value,
    password: password.value,
  });
  
  if (result.success) {
    message.value = '로그인 성공!';
    messageType.value = 'success';
  } else {
    message.value = result.error;
    messageType.value = 'error';
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
