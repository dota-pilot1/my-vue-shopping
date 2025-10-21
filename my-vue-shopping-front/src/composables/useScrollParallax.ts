import { ref, onMounted, onUnmounted } from 'vue';

interface UseScrollParallaxOptions {
  speed?: number;
}

/**
 * 스크롤 위치에 따라 패럴랙스 효과를 적용하는 composable
 */
export function useScrollParallax(options: UseScrollParallaxOptions = {}) {
  const { speed = 0.5 } = options;
  const scrollY = ref(0);
  const parallaxOffset = ref(0);

  const handleScroll = () => {
    scrollY.value = window.scrollY;
    parallaxOffset.value = scrollY.value * speed;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    scrollY,
    parallaxOffset,
  };
}
