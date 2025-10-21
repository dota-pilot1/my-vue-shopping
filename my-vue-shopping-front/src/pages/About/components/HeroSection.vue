<template>
  <section class="hero-section">
    <div class="hero-background" :style="{ transform: `translateY(${parallaxOffset}px)` }"></div>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="gradient-text">Vue Shopping</span>
      </h1>
      <p class="hero-subtitle">
        {{ displayedText }}<span class="cursor">|</span>
      </p>
      <div class="hero-cta">
        <router-link to="/" class="cta-button primary">쇼핑 시작하기</router-link>
        <router-link to="#features" class="cta-button secondary">더 알아보기</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useScrollParallax } from '@/composables/useScrollParallax';

const { parallaxOffset } = useScrollParallax({ speed: 0.3 });

const fullText = '현대적인 쇼핑 경험을 제공합니다';
const displayedText = ref('');
let typingInterval: number;

onMounted(() => {
  let currentIndex = 0;
  typingInterval = window.setInterval(() => {
    if (currentIndex <= fullText.length) {
      displayedText.value = fullText.slice(0, currentIndex);
      currentIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);
});

onUnmounted(() => {
  if (typingInterval) {
    clearInterval(typingInterval);
  }
});
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: -2rem -2rem 4rem -2rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  z-index: 0;
}

.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s ease-out;
}

.gradient-text {
  background: linear-gradient(45deg, #fff, #f0f0f0, #fff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  animation: fadeInUp 1s ease-out 0.3s both;
  min-height: 2rem;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.cta-button.primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  backdrop-filter: blur(10px);
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 500px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-cta {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
