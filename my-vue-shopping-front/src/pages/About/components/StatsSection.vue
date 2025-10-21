<template>
  <section class="stats-section">
    <div class="stats-background"></div>
    <div class="stats-content">
      <div class="section-header" ref="headerRef">
        <h2 :class="{ 'visible': headerVisible }">우리의 성과</h2>
        <p :class="{ 'visible': headerVisible }">숫자로 보는 Vue Shopping</p>
      </div>

      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          ref="statRefs"
          :class="['stat-card', { 'visible': statVisibility[index] }]"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-number">
            <span v-if="statVisibility[index]">{{ animatedValues[index] }}</span>
            <span v-else>0</span>
            <span class="stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';

interface Stat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: '👥', value: 10000, suffix: '+', label: '활성 사용자' },
  { icon: '📦', value: 5000, suffix: '+', label: '등록된 상품' },
  { icon: '⭐', value: 98, suffix: '%', label: '고객 만족도' },
  { icon: '🚀', value: 50, suffix: 'ms', label: '평균 응답 속도' },
];

const headerRef = ref<HTMLElement | null>(null);
const statRefs = ref<HTMLElement[]>([]);
const statVisibility = ref<boolean[]>(new Array(stats.length).fill(false));
const animatedValues = ref<number[]>(new Array(stats.length).fill(0));

const { hasBeenVisible: headerVisible } = useIntersectionObserver(headerRef, {
  threshold: 0.3,
});

const animateValue = (index: number, start: number, end: number, duration: number) => {
  const startTime = Date.now();

  const update = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    animatedValues.value[index] = Math.floor(start + (end - start) * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      animatedValues.value[index] = end;
    }
  };

  requestAnimationFrame(update);
};

onMounted(() => {
  statRefs.value.forEach((el, index) => {
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !statVisibility.value[index]) {
              statVisibility.value[index] = true;
              // 카운터 애니메이션 시작
              setTimeout(() => {
                animateValue(index, 0, stats[index].value, 2000);
              }, index * 150);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
    }
  });
});
</script>

<style scoped>
.stats-section {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
}

.stats-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.95;
}

.stats-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.stats-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  color: white;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 800;
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
  opacity: 0.9;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.2s;
}

.section-header p.visible {
  opacity: 0.9;
  transform: translateY(0);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.8) translateY(30px);
}

.stat-card.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.stat-card:hover {
  transform: scale(1.05) translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  font-family: 'Arial', sans-serif;
  letter-spacing: -1px;
}

.stat-suffix {
  font-size: 2rem;
  margin-left: 0.2rem;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .stats-section {
    padding: 4rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    padding: 2rem 1.5rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
