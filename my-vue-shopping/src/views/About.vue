<template>
  <div class="about">
    <h1>About 페이지</h1>
    <p>이것은 About 페이지입니다.</p>
    <router-link to="/">홈으로 돌아가기</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about {
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
