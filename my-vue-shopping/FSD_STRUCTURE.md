# Vue Shopping 프로젝트 - FSD v2 구조

## � 최종 프로젝트 구조

```
src/
├── app/                          # 앱 엔트리포인트 & 글로벌 설정
│   ├── index.js                  # 라우터 등 앱 레벨 제공자 export
│   └── providers/
│       └── router/
│           └── index.js          # Vue Router 설정
│
├── pages/                        # 라우팅 단위 페이지 (route-level components)
│   ├── Home/
│   │   └── index.vue
│   └── About/
│       └── index.vue
│
├── features/                     # 비즈니스 기능 모듈 (독립적, 재사용 가능)
│   ├── add-to-cart/              # 예: 장바구니 추가
│   │   ├── ui/                   # UI 컴포넌트
│   │   ├── model/                # 비즈니스 로직
│   │   └── api/                  # API 호출
│   ├── search/                   # 예: 검색 기능
│   └── ...                       # 다른 기능들
│
├── entities/                     # 주요 비즈니스 엔티티 (user, product, order)
│   ├── user/
│   ├── product/
│   └── order/
│
├── processes/                    # 큰 단위 비즈니스 프로세스 (checkout, payment)
│
├── shared/                       # 공용 레이어 (모든 곳에서 사용 가능)
│   ├── ui/                       # 기본 UI 컴포넌트 (Button, Input, Card)
│   ├── widgets/                  # 복합 UI 컴포넌트 (SearchBar, ProductCard)
│   ├── components/               # 페이지 레벨 공용 컴포넌트 (Header, Footer)
│   ├── lib/                      # 유틸리티 함수들
│   ├── api/                      # API 클라이언트 설정
│   └── config/                   # 설정 파일들 (constants, env)
│
├── assets/                       # 이미지, 폰트 등
├── App.vue                       # 루트 컴포넌트
├── main.js                       # 진입점
└── style.css                     # 전역 스타일
```

## 🎯 각 레이어의 역할

### `app/` - 앱 레벨 설정
- 라우터, 전역 상태관리(Pinia), i18n 등 앱 초기화
- `main.js`에서만 import 됨
- 다른 레이어에 의존하지 않음

### `pages/` - 라우팅 페이지
- Vue Router와 1:1 매핑되는 최상위 컴포넌트
- 여러 features와 shared 컴포넌트를 조합
- 페이지별 상태 관리 가능

### `features/` - 비즈니스 기능
- 독립적인 폴더 구조로 각 기능 캡슐화
- 다른 features에는 직접 의존하지 않음 (pages를 통해 조합)
- 예: `add-to-cart/`, `search/`, `auth/`

### `entities/` - 비즈니스 엔티티
- user, product, order 같은 주요 데이터 모델
- API 타입 정의, Pinia store 포함 가능
- 여러 features에서 공유

### `processes/` - 대규모 비즈니스 프로세스
- 여러 features를 조합한 복잡한 프로세스
- 예: checkout (cart + payment + order)

### `shared/` - 공용 레이어
- 모든 곳에서 사용 가능
- 다른 레이어에 의존하지 않음
- 예: Button, Input, API 클라이언트

## 📊 의존성 흐름 (의존하는 방향)

```
main.js
  ↓
App.vue ← app/ (라우터)
  ↓
pages/ ← features/, entities/, shared/
  ↓
features/ ← entities/, shared/ (← shared/만 기본적으로 의존)
  ↓
entities/ ← shared/
  ↓
shared/ (독립적)
```

**규칙:** 
- 위의 레이어는 아래 레이어를 import 가능
- 아래 레이어는 위 레이어를 import 불가능 ❌

## ✅ 이점

1. **명확한 책임**: 각 레이어의 역할이 명확함
2. **확장성**: 새 기능 추가 시 features 폴더만 추가
3. **재사용성**: shared에서 공용 코드 재사용
4. **테스트 용이성**: 레이어별 독립적 테스트
5. **팀 협업**: 명확한 구조로 병렬 개발 가능
6. **마이그레이션**: 다른 프레임워크(React)로 쉽게 이식 가능

## 📝 사용 예시

### 새 기능 추가 (예: 상품 검색)
```
src/features/search/
├── ui/
│  ├── SearchForm.vue
│  └── SearchResults.vue
├── model/
│  └── searchStore.js (Pinia store)
└── api/
   └── searchApi.js
```

### 페이지에서 사용
```vue
<template>
  <SearchForm @search="handleSearch" />
  <SearchResults :results="results" />
</template>

<script setup>
import SearchForm from '@/features/search/ui/SearchForm.vue'
import SearchResults from '@/features/search/ui/SearchResults.vue'
</script>
```

### shared/lib에서 유틸리티 추가
```javascript
// src/shared/lib/formatPrice.js
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price)
}

// 모든 곳에서 import 가능
import { formatPrice } from '@/shared/lib/formatPrice'
```

## 🚀 다음 단계

1. `shared/lib/` 아래에 자주 사용하는 유틸리티 함수 추가
2. `shared/api/` 아래에 API 클라이언트 설정 (axios 등)
3. `features/` 아래에 장바구니, 검색 등 비즈니스 기능 추가
4. `entities/` 아래에 데이터 모델 정의
5. Pinia로 전역 상태 관리 추가

## 🔗 참고자료
- [FSD (Feature-Sliced Design)](https://feature-sliced.design/)
- [Vue 3 공식 문서](https://vuejs.org/)
