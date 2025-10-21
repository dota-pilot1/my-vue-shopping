# Vue Shopping 프로젝트 - FSD v2 구조# Vue Shopping 프로젝트 - FSD v2 구조



## 📦 현재 프로젝트 구조## � 최종 프로젝트 구조



``````

src/src/

├── app/                          # 앱 엔트리포인트 & 글로벌 설정├── app/                          # 앱 엔트리포인트 & 글로벌 설정

│   ├── index.js                  # 라우터 export│   ├── index.js                  # 라우터 등 앱 레벨 제공자 export

│   └── providers/│   └── providers/

│       └── router/│       └── router/

│           └── index.js          # Vue Router 설정│           └── index.js          # Vue Router 설정

││

├── pages/                        # 라우팅 단위 페이지├── pages/                        # 라우팅 단위 페이지 (route-level components)

│   ├── Home/│   ├── Home/

│   │   └── index.vue│   │   └── index.vue

│   ├── About/│   └── About/

│   │   └── index.vue│       └── index.vue

│   ├── Login/│

│   │   └── index.vue├── features/                     # 비즈니스 기능 모듈 (독립적, 재사용 가능)

│   └── Signup/│   ├── add-to-cart/              # 예: 장바구니 추가

│       └── index.vue│   │   ├── ui/                   # UI 컴포넌트

││   │   ├── model/                # 비즈니스 로직

├── widgets/                      # 비즈니스 로직이 있는 복합 컴포넌트│   │   └── api/                  # API 호출

│   ├── Header.vue                # 헤더 (네비게이션 + 인증)│   ├── search/                   # 예: 검색 기능

│   ├── Footer.vue                # 푸터│   └── ...                       # 다른 기능들

│   ├── AuthButtons.vue           # 인증 상태별 버튼│

│   ├── ProductCard.vue           # 상품 카드├── entities/                     # 주요 비즈니스 엔티티 (user, product, order)

│   └── SearchBar.vue             # 검색바│   ├── user/

││   ├── product/

├── features/                     # 비즈니스 기능 모듈│   └── order/

│   └── (추후 추가 예정)│

│├── processes/                    # 큰 단위 비즈니스 프로세스 (checkout, payment)

├── entities/                     # 주요 비즈니스 엔티티│

│   └── (추후 추가 예정)├── shared/                       # 공용 레이어 (모든 곳에서 사용 가능)

││   ├── ui/                       # 기본 UI 컴포넌트 (Button, Input, Card)

├── processes/                    # 대규모 비즈니스 프로세스│   ├── widgets/                  # 복합 UI 컴포넌트 (SearchBar, ProductCard)

│   └── (추후 추가 예정)│   ├── components/               # 페이지 레벨 공용 컴포넌트 (Header, Footer)

││   ├── lib/                      # 유틸리티 함수들

├── shared/                       # 공용 레이어 (순수 재사용)│   ├── api/                      # API 클라이언트 설정

│   ├── ui/                       # 순수 UI 컴포넌트 (비즈니스 로직 없음)│   └── config/                   # 설정 파일들 (constants, env)

│   │   ├── Button.vue│

│   │   ├── Input.vue├── assets/                       # 이미지, 폰트 등

│   │   └── Card.vue├── App.vue                       # 루트 컴포넌트

│   ├── api/                      # API 클라이언트 설정├── main.js                       # 진입점

│   │   └── (추후 추가 예정)└── style.css                     # 전역 스타일

│   ├── lib/                      # 유틸리티 함수들```

│   │   └── (추후 추가 예정)

│   └── stores/                   # Pinia 전역 상태## 🎯 각 레이어의 역할

│       └── useUserStore.js

│### `app/` - 앱 레벨 설정

├── assets/                       # 이미지, 폰트 등- 라우터, 전역 상태관리(Pinia), i18n 등 앱 초기화

├── App.vue                       # 루트 컴포넌트- `main.js`에서만 import 됨

├── main.js                       # 진입점- 다른 레이어에 의존하지 않음

└── style.css                     # 전역 스타일

```### `pages/` - 라우팅 페이지

- Vue Router와 1:1 매핑되는 최상위 컴포넌트

## 🎯 각 레이어의 역할- 여러 features와 shared 컴포넌트를 조합

- 페이지별 상태 관리 가능

### `app/` - 앱 레벨 설정

- 라우터, Pinia 등 앱 초기화### `features/` - 비즈니스 기능

- `main.js`에서만 import- 독립적인 폴더 구조로 각 기능 캡슐화

- 다른 features에는 직접 의존하지 않음 (pages를 통해 조합)

### `pages/` - 라우팅 페이지- 예: `add-to-cart/`, `search/`, `auth/`

- Vue Router와 1:1 매핑

- widgets, features, shared를 조합### `entities/` - 비즈니스 엔티티

- user, product, order 같은 주요 데이터 모델

### `widgets/` - 복합 컴포넌트- API 타입 정의, Pinia store 포함 가능

- 비즈니스 로직 포함된 UI- 여러 features에서 공유

- 여러 entities, features, shared를 조합

- 예: Header (AuthButtons + Navigation)### `processes/` - 대규모 비즈니스 프로세스

- 여러 features를 조합한 복잡한 프로세스

### `features/` - 비즈니스 기능- 예: checkout (cart + payment + order)

- 독립적인 사용자 시나리오

- 예: 장바구니 추가, 상품 검색### `shared/` - 공용 레이어

- 모든 곳에서 사용 가능

### `entities/` - 비즈니스 엔티티- 다른 레이어에 의존하지 않음

- 데이터 모델 (User, Product, Order)- 예: Button, Input, API 클라이언트

- API 타입 정의, store 포함 가능

## 📊 의존성 흐름 (의존하는 방향)

### `shared/` - 공용 레이어

- **ui/**: 순수 UI 컴포넌트 (Button, Input, Card)```

- **api/**: API 클라이언트main.js

- **lib/**: 유틸리티 함수  ↓

- **stores/**: 전역 상태App.vue ← app/ (라우터)

  ↓

## 📊 의존성 규칙pages/ ← features/, entities/, shared/

  ↓

```features/ ← entities/, shared/ (← shared/만 기본적으로 의존)

app → pages → widgets → features → entities → shared  ↓

```entities/ ← shared/

  ↓

✅ 상위 → 하위 import 가능shared/ (독립적)

❌ 하위 → 상위 import 불가```



## 🔄 최근 리팩토링 (2025-10-21)**규칙:** 

- 위의 레이어는 아래 레이어를 import 가능

### Before (잘못된 구조):- 아래 레이어는 위 레이어를 import 불가능 ❌

```

shared/## ✅ 이점

  ├── components/  ❌ Header, Footer, AuthButtons

  └── ui/          ✅ Button, Input, Card1. **명확한 책임**: 각 레이어의 역할이 명확함

```2. **확장성**: 새 기능 추가 시 features 폴더만 추가

3. **재사용성**: shared에서 공용 코드 재사용

### After (FSD v2 준수):4. **테스트 용이성**: 레이어별 독립적 테스트

```5. **팀 협업**: 명확한 구조로 병렬 개발 가능

widgets/           ✅ Header, Footer, AuthButtons6. **마이그레이션**: 다른 프레임워크(React)로 쉽게 이식 가능

shared/

  └── ui/          ✅ Button, Input, Card## 📝 사용 예시

```

### 새 기능 추가 (예: 상품 검색)

**이유**: Header, Footer, AuthButtons는 비즈니스 로직(인증 상태, 라우팅)을 포함하므로 `widgets`가 적합합니다.```

src/features/search/

## 📝 다음 단계├── ui/

│  ├── SearchForm.vue

1. ✅ FSD v2 구조 리팩토링 완료│  └── SearchResults.vue

2. ⏳ API 클라이언트 생성 (`shared/api/client.js`)├── model/

3. ⏳ 인증 API 함수 (`shared/api/auth.js`)│  └── searchStore.js (Pinia store)

4. ⏳ 회원가입/로그인 실제 API 연동└── api/

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
