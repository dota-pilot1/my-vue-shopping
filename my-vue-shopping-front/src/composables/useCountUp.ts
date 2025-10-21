import { ref, watch } from 'vue';

interface UseCountUpOptions {
  duration?: number;
  start?: number;
  decimals?: number;
}

/**
 * 숫자 카운터 애니메이션을 제공하는 composable
 */
export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
) {
  const {
    duration = 2000,
    start = 0,
    decimals = 0,
  } = options;

  const current = ref(start);
  const isAnimating = ref(false);

  const animate = (endValue: number) => {
    isAnimating.value = true;
    const startValue = current.value;
    const diff = endValue - startValue;
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic 이징 함수
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      current.value = Number(
        (startValue + diff * easedProgress).toFixed(decimals)
      );

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        current.value = endValue;
        isAnimating.value = false;
      }
    };

    requestAnimationFrame(update);
  };

  const reset = () => {
    current.value = start;
    isAnimating.value = false;
  };

  const start = (shouldAnimate = true) => {
    if (shouldAnimate) {
      animate(target);
    }
  };

  return {
    current,
    isAnimating,
    start,
    reset,
  };
}
