# Vue Shopping 프로젝트 - FSD 구조

## 📁 폴더 구조 설명

```
src/
├── shared/              # 공유 자산 (모든 레이어에서 사용 가능)
│  ├── components/       # Header, Footer 등 공통 컴포넌트
│  ├── ui/               # 버튼, 모달, 카드 등 재사용 UI 컴포넌트
│  ├── utils/            # 유틸리티 함수들
│  └── styles/           # 전역 스타일
│
├── features/            # 비즈니스 기능 모듈
│  ├── cart/             # 장바구니 기능
│  │  ├── components/
│  │  ├── store/
│  │  └── api/
│  ├── search/           # 검색 기능
│  │  ├── components/
│  │  └── api/
│  └── ...               # 다른 기능들
│
├── pages/               # 페이지 컴포넌트 (라우트와 1:1 매핑)
│  ├── HomePage.vue
│  ├── AboutPage.vue
│  └── ...
│
├── router/              # 라우팅 설정
│  └── index.js
│
├── App.vue              # 루트 컴포넌트
├── main.js              # 진입점
└── style.css            # 전역 CSS
```

## 🎯 각 레이어의 역할

### `shared/` - 공유 레이어
- 프로젝트 전체에서 재사용 가능한 컴포넌트, UI, 유틸리티
- 다른 레이어에 의존하지 않음
- 예: Header, Footer, 버튼, 모달

### `features/` - 기능 모듈
- 비즈니스 로직과 기능을 담당
- 독립적인 폴더 구조로 각 기능을 캡슐화
- 다른 features에 의존할 수 있음
- 예: 장바구니, 검색, 결제

### `pages/` - 페이지 레이어
- 라우트와 매핑되는 최상위 컴포넌트
- 여러 features와 shared 컴포넌트를 조합
- 페이지별 레이아웃 담당

### `router/` - 라우팅
- 애플리케이션의 URL 경로와 컴포넌트 매핑

## ✅ 장점

1. **확장성**: 새 기능 추가 시 폴더만 추가하면 됨
2. **유지보수성**: 각 기능이 독립적으로 관리됨
3. **재사용성**: shared에서 공통 코드 재사용
4. **테스트 용이성**: 레이어별 독립적인 테스트 가능
5. **팀 협업**: 명확한 구조로 병렬 개발 가능

## 📝 사용 예시

### 새 기능 추가 (예: 상품 검색)
```
src/features/search/
├── components/
│  ├── SearchForm.vue
│  └── SearchResults.vue
├── api/
│  └── searchApi.js
└── store/
   └── searchStore.js
```

### 페이지에서 사용
```vue
<template>
  <SearchForm />
  <SearchResults />
</template>

<script setup>
import SearchForm from '@/features/search/components/SearchForm.vue'
import SearchResults from '@/features/search/components/SearchResults.vue'
</script>
```

## 🚀 다음 단계

1. `features/` 폴더 아래에 각 기능별로 모듈 생성
2. `shared/ui/` 아래에 자주 사용하는 UI 컴포넌트 추가
3. 필요시 `shared/utils/` 아래에 유틸리티 함수 추가
4. 복잡한 상태 관리는 Pinia를 사용해 feature별 store 구성
