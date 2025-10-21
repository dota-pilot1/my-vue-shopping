<template>
  <div class="about-page">
    <h1>About 페이지</h1>
    <div class="about-content">
      <section>
        <h2>📚 프로젝트 소개</h2>
        <p>
          이 프로젝트는 Vue 3, Vite, Vue Router, Tailwind CSS를 활용한 현대적인 쇼핑 애플리케이션입니다.
          FSD(Feature-Sliced Design) 아키텍처를 따르며, 확장성과 유지보수성을 최우선으로 설계되었습니다.
        </p>
      </section>

      <section>
        <h2>🛠️ 기술 스택</h2>
        <ul>
          <li><strong>Vue 3:</strong> 프로그레시브 JavaScript 프레임워크</li>
          <li><strong>Vite:</strong> 고성능 빌드 도구</li>
          <li><strong>Vue Router:</strong> SPA 라우팅</li>
          <li><strong>Tailwind CSS:</strong> 유틸리티 기반 CSS 프레임워크</li>
          <li><strong>FSD:</strong> 확장 가능한 프로젝트 구조</li>
        </ul>
      </section>

      <section>
        <h2>📁 프로젝트 구조 (FSD)</h2>
        <pre><code>src/
├── shared/        # 공유 컴포넌트, UI, 유틸리티
│  ├── components/ # Header, Footer 등
│  └── ui/         # 버튼, 모달 등 재사용 UI
├── features/      # 기능 모듈 (장바구니, 검색 등)
├── pages/         # 페이지 컴포넌트
├── router/        # 라우팅 설정
└── App.vue        # 루트 컴포넌트</code></pre>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-page {
  padding: 2rem 0;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  border-bottom: 3px solid #42b883;
  padding-bottom: 1rem;
}

h2 {
  color: #667eea;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

section {
  margin-bottom: 3rem;
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
  padding: 0.5rem 0;
  color: #555;
  border-bottom: 1px solid #eee;
  line-height: 1.8;
}

li:last-child {
  border-bottom: none;
}

pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  border-left: 4px solid #667eea;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #2c3e50;
}
</style>
