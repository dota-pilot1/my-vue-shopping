<template>
  <div class="about-page">
    <h1>소개</h1>
    
    <section>
      <h2>Vue Shopping</h2>
      <p>
        Vue 3, Vite, Vue Router, Tailwind CSS를 활용한 현대적인 쇼핑 애플리케이션입니다.
        FSD(Feature-Sliced Design) 아키텍처로 설계되어 확장성과 유지보수성을 중시합니다.
      </p>
    </section>

    <section>
      <h2>기술 스택</h2>
      <ul>
        <li>Vue 3 - 프로그레시브 JavaScript 프레임워크</li>
        <li>Vite - 고성능 빌드 도구</li>
        <li>Vue Router - SPA 라우팅</li>
        <li>Tailwind CSS - 유틸리티 CSS 프레임워크</li>
        <li>FSD - Feature-Sliced Design 아키텍처</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  padding: 2rem 0;
  max-width: 800px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  border-bottom: 3px solid #667eea;
  padding-bottom: 1rem;
}

h2 {
  color: #667eea;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

section {
  margin-bottom: 2rem;
}

p {
  color: #555;
  line-height: 1.8;
  font-size: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.6rem 0;
  padding-left: 1.5rem;
  color: #555;
  position: relative;
  line-height: 1.8;
}

li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}
</style>
