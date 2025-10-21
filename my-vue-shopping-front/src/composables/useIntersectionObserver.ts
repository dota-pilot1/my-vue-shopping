import { ref, onMounted, onUnmounted, type Ref } from 'vue';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
 * IntersectionObserver를 사용하여 요소가 뷰포트에 진입했는지 감지하는 composable
 */
export function useIntersectionObserver(
  target: Ref<Element | null>,
  options: UseIntersectionObserverOptions = {}
) {
  const isVisible = ref(false);
  const hasBeenVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
  } = options;

  onMounted(() => {
    if (!target.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting;
          if (entry.isIntersecting) {
            hasBeenVisible.value = true;
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(target.value);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    isVisible,
    hasBeenVisible,
  };
}
