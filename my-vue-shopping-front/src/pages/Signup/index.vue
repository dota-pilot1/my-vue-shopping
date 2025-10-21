<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-header">
        <h1>회원가입</h1>
        <p>Vue Shopping에 오신 것을 환영합니다</p>
      </div>

      <form @submit.prevent="onSubmit" class="signup-form">
        <Input
          v-model="email"
          type="email"
          placeholder="이메일"
          :error="errors.email"
        />
        
        <Input
          v-model="name"
          type="text"
          placeholder="이름"
          :error="errors.name"
        />
        
        <Input
          v-model="password"
          type="password"
          placeholder="비밀번호 (최소 6자)"
          :error="errors.password"
        />

        <Button type="submit" :disabled="isLoading">
          {{ isLoading ? '가입 중...' : '회원가입' }}
        </Button>
      </form>

      <div class="signup-footer">
        <p>이미 계정이 있으신가요?</p>
        <router-link to="/login" class="login-link">로그인</router-link>
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
import Input from '@/shared/ui/Input.vue';
import Button from '@/shared/ui/Button.vue';

const router = useRouter();

const email = ref('');
const name = ref('');
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
  
  if (!name.value) {
    errors.value.name = '이름을 입력해주세요';
  } else if (name.value.length < 2) {
    errors.value.name = '이름은 최소 2자 이상이어야 합니다';
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('회원가입 데이터:', {
      email: email.value,
      name: name.value,
      password: password.value,
    });
    
    message.value = '회원가입 성공! 로그인 페이지로 이동합니다.';
    messageType.value = 'success';
    
    setTimeout(() => {
      router.push('/login');
    }, 1500);
    
  } catch (error) {
    message.value = '회원가입 실패: ' + error.message;
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.signup-page {
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
}

.signup-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e5e5;
  padding: 3rem;
  width: 100%;
  max-width: 420px;
}

.signup-header {
  text-align: center;
  margin-bottom: 2rem;
}

.signup-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.signup-header p {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signup-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
}

.signup-footer p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.login-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s;
}

.login-link:hover {
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
  .signup-container {
    padding: 2rem 1.5rem;
  }
  
  .signup-header h1 {
    font-size: 1.6rem;
  }
}
</style>
