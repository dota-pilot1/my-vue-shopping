<template>
  <div class="test-form-page">
    <main class="container">
      <h1>회원가입 (테스트)</h1>
      <form @submit.prevent="onSubmit" class="form">
        <label>이메일
          <Input v-model="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>이름
          <Input v-model="name" type="text" placeholder="홍길동" required />
        </label>
        <label>비밀번호
          <Input v-model="password" type="password" placeholder="6자 이상" minlength="6" required />
        </label>
        <div class="actions">
          <button type="submit">제출</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/shared/ui/Input.vue'

const email = ref('')
const name = ref('')
const password = ref('')

function onSubmit() {
  console.log('[test-form] submit', { email: email.value, name: name.value, password: password.value })
  alert('폼 제출 완료 — 콘솔를 확인하세요.')
}
</script>

<style scoped>
.container{max-width:640px;margin:4rem auto;padding:2rem}
.form{display:grid;gap:1rem}
label{display:flex;flex-direction:column;font-size:0.95rem}
input{margin-top:0.4rem;padding:.6rem;border:1px solid #e6eef6;border-radius:6px}
.actions{display:flex;justify-content:center;margin-top:8px}
button{padding:.6rem 1rem;background:#4f46e5;color:#fff;border-radius:6px;border:0;cursor:pointer}
</style>
