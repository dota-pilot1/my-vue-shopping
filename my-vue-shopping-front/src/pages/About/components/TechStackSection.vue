<template>
  <section class="tech-stack-section">
    <div class="section-header" ref="headerRef">
      <h2 :class="{ 'visible': headerVisible }">기술 스택</h2>
      <p :class="{ 'visible': headerVisible }">최신 기술로 구축된 안정적인 쇼핑 플랫폼</p>
    </div>

    <div class="tech-categories">
      <div
        v-for="(category, catIndex) in techStack"
        :key="catIndex"
        class="tech-category"
        ref="categoryRefs"
        :class="{ 'visible': categoryVisibility[catIndex] }"
      >
        <h3>{{ category.name }}</h3>
        <div class="tech-items">
          <div
            v-for="(tech, techIndex) in category.items"
            :key="techIndex"
            class="tech-item"
            :style="{ transitionDelay: `${techIndex * 0.1}s` }"
          >
            <div class="tech-logo">{{ tech.logo }}</div>
            <div class="tech-info">
              <h4>{{ tech.name }}</h4>
              <p>{{ tech.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

interface Tech {
  logo: string;
  name: string;
  description: string;
}

interface TechCategory {
  name: string;
  items: Tech[];
}

const techStack: TechCategory[] = [
  {
    name: '프론트엔드',
    items: [
      { logo: '⚡', name: 'Vue 3', description: 'Composition API를 활용한 현대적 UI' },
      { logo: '🚀', name: 'Vite', description: '초고속 개발 환경' },
      { logo: '🎨', name: 'Tailwind CSS', description: '유틸리티 기반 스타일링' },
      { logo: '🗺️', name: 'Vue Router', description: 'SPA 라우팅' },
      { logo: '📦', name: 'Pinia', description: '직관적인 상태 관리' },
    ],
  },
  {
    name: '백엔드',
    items: [
      { logo: '🐱', name: 'NestJS', description: 'TypeScript 기반 서버 프레임워크' },
      { logo: '🗄️', name: 'Prisma', description: '타입 안전한 ORM' },
      { logo: '🔐', name: 'JWT', description: '안전한 인증 시스템' },
      { logo: '📚', name: 'Swagger', description: 'API 문서화' },
    ],
  },
  {
    name: '개발 도구',
    items: [
      { logo: '📘', name: 'TypeScript', description: '타입 안전성 보장' },
      { logo: '🎯', name: 'ESLint', description: '코드 품질 관리' },
      { logo: '💅', name: 'Prettier', description: '일관된 코드 스타일' },
    ],
  },
];

const headerRef = ref<HTMLElement | null>(null);
const categoryRefs = ref<HTMLElement[]>([]);
const categoryVisibility = ref<boolean[]>(new Array(techStack.length).fill(false));

const { hasBeenVisible: headerVisible } = useIntersectionObserver(headerRef, {
  threshold: 0.3,
});

onMounted(() => {
  categoryRefs.value.forEach((el, index) => {
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              categoryVisibility.value[index] = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    }
  });
});
</script>

<style scoped>
.tech-stack-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.section-header h2.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-header p {
  font-size: 1.2rem;
  color: #7f8c8d;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.2s;
}

.section-header p.visible {
  opacity: 1;
  transform: translateY(0);
}

.tech-categories {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.tech-category {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s ease;
}

.tech-category.visible {
  opacity: 1;
  transform: translateX(0);
}

.tech-category h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.tech-category h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.tech-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.tech-item {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  cursor: pointer;
}

.tech-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.tech-logo {
  font-size: 3rem;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}

.tech-item:hover .tech-logo {
  transform: rotate(360deg) scale(1.2);
}

.tech-info {
  flex: 1;
}

.tech-info h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.tech-info p {
  font-size: 0.95rem;
  color: #7f8c8d;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .tech-stack-section {
    padding: 4rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .tech-categories {
    padding: 0 1rem;
  }

  .tech-category h3 {
    font-size: 1.5rem;
  }

  .tech-items {
    grid-template-columns: 1fr;
  }
}
</style>
