# Input 상태 관리: Vue vs React (실무 관점 정리)

이 문서는 Vue의 `v-model`(특히 커스텀 입력 컴포넌트에서의 `modelValue`/`update:modelValue`) 패턴과 React의 controlled input 패턴을 짧게 비교합니다.

## 핵심 요약
- Vue: `v-model`은 문법적 설탕으로 `:value` 바인딩과 `@input` 이벤트(또는 자식 컴포넌트의 `modelValue`/`update:modelValue`)를 결합합니다.
- React: `value` + `onChange`를 사용한 controlled component 패턴이 일반적입니다.

## 예제 비교

- Vue - 커스텀 입력 컴포넌트 (실무권장)
```vue
<!-- src/shared/ui/Input.vue -->
<template>
  <input
    class="input"
    :class="{ 'input-error': error }"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <span v-if="error" class="error-message">{{ error }}</span>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>
```

- 부모 사용
```vue
<MyInput v-model="email" placeholder="you@example.com" />
```

- React (동일 목적)
```jsx
const [email, setEmail] = useState('')
<input value={email} onChange={e => setEmail(e.target.value)} />
```

## 동작 원리(핵심)
- Vue: `v-model`는 내부적으로 `:value="modelValue"`와 `@input` 이벤트 핸들러를 결합합니다. 자식은 `modelValue` prop을 읽고, 변경 발생 시 `update:modelValue` 이벤트를 emit하여 부모가 실제 상태를 갱신하도록 합니다.
- React: 부모가 상태를 가지고 있고 `onChange`에서 setter를 호출해 상태를 갱신합니다.

## 실무 권장 패턴 & 팁
- 규약 따르기: Vue에서 재사용 입력 컴포넌트는 `modelValue` prop과 `update:modelValue` emit을 준수하면 `v-model`로 자연스럽게 사용됩니다.
- $attrs 전달: placeholder/type/class 등 추가 속성을 자동으로 전달하려면 `<input v-bind="$attrs" />` 사용.
- computed getter/setter: 내부 포맷/validation/trim 처리를 위해 computed의 getter/setter로 로직 캡슐화 가능.
- Modifiers: Vue는 `.trim`, `.number`, `.lazy` 같은 편의 modifier 제공.
- 테스트: 컴포넌트가 `update:modelValue`를 정확히 emit 하는지 단위 테스트로 검증.

## 결론
`@input="$emit('update:modelValue', $event.target.value)"`는 React의 `onChange` + `setState`와 역할이 동일합니다. Vue의 `v-model` 규약을 따르면 재사용성, 테스트 용이성, API 일관성을 얻을 수 있어 실무에서 권장되는 패턴입니다.

---

작성 완료했습니다.
