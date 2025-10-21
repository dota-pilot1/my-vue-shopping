import { ref, watch, onMounted } from 'vue';

/**
 * 다크모드 상태 관리 composable
 */
export function useDarkMode() {
  const isDark = ref(false);

  // localStorage에서 설정 불러오기
  const loadTheme = () => {
    const saved = localStorage.getItem('theme');

    if (saved) {
      isDark.value = saved === 'dark';
    } else {
      // 시스템 설정 확인
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

  // HTML에 클래스 적용
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 테마 토글
  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  // 테마 변경 감지 및 저장
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
    applyTheme(newValue);
  });

  // 시스템 설정 변경 감지
  onMounted(() => {
    loadTheme();
    applyTheme(isDark.value);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      // 사용자가 수동으로 설정한 경우는 무시
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches;
      }
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  });

  return {
    isDark,
    toggleDark,
  };
}
