<template>
  <div class="home">
    <h1>홈 페이지</h1>
    <p>Vue Router를 사용한 쇼핑 프로젝트입니다.</p>
    <router-link to="/about">About 페이지로 이동</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  padding: 20px;
}
h1 {
  color: #333;
}
a {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #646cff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
a:hover {
  background-color: #535bf2;
}
</style>
