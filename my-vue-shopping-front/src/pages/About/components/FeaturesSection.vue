<template>
  <section id="features" class="features-section">
    <div class="section-header" ref="headerRef">
      <h2 :class="{ 'visible': headerVisible }">주요 기능</h2>
      <p :class="{ 'visible': headerVisible }">Vue Shopping이 제공하는 특별한 경험</p>
    </div>

    <div class="features-grid">
      <div
        v-for="(feature, index) in features"
        :key="index"
        ref="featureRefs"
        :class="['feature-card', { 'visible': featureVisibility[index] }]"
        :style="{ transitionDelay: `${index * 0.1}s` }"
      >
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '🚀',
    title: '빠른 성능',
    description: 'Vite 기반 번들링으로 초고속 개발 환경과 최적화된 프로덕션 빌드를 제공합니다.',
  },
  {
    icon: '🎨',
    title: '모던한 디자인',
    description: 'Tailwind CSS를 활용한 반응형 디자인으로 모든 디바이스에서 완벽한 경험을 제공합니다.',
  },
  {
    icon: '🔒',
    title: '안전한 인증',
    description: 'JWT 기반 인증 시스템으로 사용자 정보를 안전하게 보호합니다.',
  },
  {
    icon: '📦',
    title: '확장 가능한 구조',
    description: 'FSD 아키텍처로 기능별 모듈화된 구조를 통해 쉬운 유지보수와 확장이 가능합니다.',
  },
  {
    icon: '⚡',
    title: '실시간 업데이트',
    description: 'Vue 3의 Composition API와 Reactivity 시스템으로 빠른 상태 관리를 제공합니다.',
  },
  {
    icon: '🌐',
    title: 'RESTful API',
    description: 'NestJS 기반 백엔드와 체계적인 API 통신으로 안정적인 서비스를 제공합니다.',
  },
];

const headerRef = ref<HTMLElement | null>(null);
const featureRefs = ref<HTMLElement[]>([]);
const featureVisibility = ref<boolean[]>(new Array(features.length).fill(false));

const { hasBeenVisible: headerVisible } = useIntersectionObserver(headerRef, {
  threshold: 0.3,
});

onMounted(() => {
  featureRefs.value.forEach((el, index) => {
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              featureVisibility.value[index] = true;
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
.features-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  border: 1px solid #e5e7eb;
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

.feature-card:hover .feature-icon {
  animation: spin 0.6s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-section {
    padding: 4rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
}
</style>
