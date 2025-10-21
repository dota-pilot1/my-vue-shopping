# Vue vs React: 주요 차이점

## 1. **템플릿 문법**
- **React**: JSX 사용 (JavaScript + XML 혼합)
- **Vue**: HTML 기반 템플릿 (`<template>` 태그)
  - Vue가 직관적이고 배우기 쉬움

## 2. **상태 관리 (State)**
- **React**: `useState` 훅으로 상태 관리
- **Vue**: `ref()`, `reactive()` 또는 `data()` 객체
  - Vue는 반응성이 자동으로 작동

## 3. **스타일 스코핑**
- **React**: CSS-in-JS 라이브러리 필요 (styled-components, tailwind 등)
- **Vue**: `<style scoped>` 태그로 자동 스코핑
  - Vue가 기본 지원으로 더 간단

## 4. **컴포넌트 파일 형식**
- **React**: `.jsx` 또는 `.js` 파일 (JSX 코드)
- **Vue**: `.vue` 파일 (Single File Component - 템플릿 + 스크립트 + 스타일 한곳)
  - Vue가 구조적으로 명확하고 조직화됨

## 5. **Props 전달**
- **React**: Props는 객체, 구조분해 필요
- **Vue**: Props 자동 언팩, `defineProps()` 또는 `props` 옵션
  - Vue가 보일러플레이트 코드 적음

## 6. **이벤트 핸들링**
- **React**: `onClick`, `onChange` 등 카멜케이스
- **Vue**: `@click`, `@change` 등 @ 디렉티브
  - Vue가 HTML과 더 유사해 직관적

## 7. **조건부 렌더링**
- **React**: 삼항연산자, && 연산자 사용
- **Vue**: `v-if`, `v-else-if`, `v-else` 디렉티브
  - Vue가 명시적이고 가독성 좋음

## 8. **리스트 렌더링**
- **React**: `map()` 함수 사용
- **Vue**: `v-for` 디렉티브
  - Vue가 더 간결하고 선언적

## 9. **양방향 바인딩**
- **React**: 단방향 데이터 흐름 (명시적 setState 필요)
- **Vue**: `v-model`로 양방향 바인딩 가능
  - Vue가 폼 처리 시 더 간편

## 10. **성능 및 번들 크기**
- **React**: 번들 크기 약 42KB (gzipped)
- **Vue**: 번들 크기 약 34KB (gzipped)
  - Vue가 더 가볍고 빠름

---

## 다음 단계 로드맵

### ✅ 완료
- [x] Vue 3 + Vite 프로젝트 설정
- [x] FSD v2 아키텍처 구현
- [x] Header, Footer, UI 컴포넌트 완성
- [x] 기본 라우팅 (Home, About)

### 📋 예정
1. **백엔드 연동** - REST API 설정
2. **로그인 구현** - 사용자 인증 및 토큰 관리
3. **장바구니 기능** - 상품 추가/삭제/결제
4. **상품 페이지** - 상품 목록, 상세 페이지
5. **결제 시스템** - 결제 모듈 통합

