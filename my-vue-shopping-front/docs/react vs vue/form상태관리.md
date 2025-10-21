# Form 상태 관리: React vs Vue (간단 정리)

## Vue의 `v-model`과 폼 매핑 (간단 설명)

- 개념: `v-model`은 Vue 템플릿에서 양방향 바인딩을 제공하는 디렉티브입니다. 폼 입력(input, textarea, select 등)의 값과 컴포넌트의 반응형 상태(예: `ref`, `reactive`)를 자동으로 연결(mapping)합니다.

- 기본 사용법
```vue
<script setup>
import { ref } from 'vue'
const email = ref('')
</script>

<template>
  <input v-model="email" type="email" />
  <p>입력값: {{ email }}</p>
</template>
```
- 동작: 사용자가 입력하면 `email.value`가 자동으로 갱신되고, 반대로 코드에서 `email.value`를 변경하면 입력값이 업데이트 됩니다.

- `v-model`의 내부 작동 (간략)
  - `v-model`은 사실상 `:value` 및 `@input` (또는 `update:modelValue` 이벤트)을 결합한 문법적 설탕입니다.
  - 예: `<input v-model="email" />`은 내부적으로 `<input :value="email" @input="e => email = e.target.value" />`와 유사하게 동작합니다.

- Modifiers (유용한 변형자)
  - `.trim` : 입력 앞뒤 공백 제거 (`v-model.trim="name"`)
  - `.number` : 숫자 변환 (`v-model.number="age"`)
  - `.lazy` : change 이벤트에서 업데이트 (`v-model.lazy="text"`)

- 컴포넌트에서의 사용
  - 자식 커스텀 컴포넌트에서 `v-model`을 사용하려면 `modelValue` prop과 `update:modelValue` 이벤트를 사용해 연결합니다.

```vue
// 자식 컴포넌트
<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
function onInput(e) { emit('update:modelValue', e.target.value) }
</script>
<template>
  <input :value="modelValue" @input="onInput" />
</template>

// 부모 컴포넌트
<MyInput v-model="someValue" />
```

- 요약
  - `v-model`은 폼 입력과 상태를 자동으로 동기화해 빠르게 폼을 구성할 수 있게 해줍니다.
  - 내부적으로는 value 바인딩과 input 이벤트 처리를 합친 것이다.
  - Modifiers와 커스텀 컴포넌트 지원으로 유연하게 확장 가능.

---

간단한 설명 추가해 드렸습니다. 더 깊은 예시(폼 유효성, composition API에서의 Form handling, third-party 폼 라이브러리 연동 등)가 필요하시면 알려주세요.
