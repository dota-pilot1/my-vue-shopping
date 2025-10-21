# React useState vs Vue ref - 문법 차이 (간단 정리)

목적: 상태(state)를 선언, 읽기, 쓰기 하는 기본 문법 비교 (간단 예제 포함)

---

## 1) 선언

- React (useState)
```jsx
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
}
```

- Vue (ref)
```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  }
}
```

---

## 2) 읽기/사용

- React: 상태 값 그대로 사용
```jsx
<p>{count}</p>
<button onClick={() => setCount(count + 1)}>증가</button>
```

- Vue: `.value`로 읽거나 템플릿에서는 자동 언래핑
```js
// setup 내 JS
console.log(count.value)
count.value++

// 템플릿
<p>{{ count }}</p>
<button @click="count++">증가</button>
```

---

## 3) 업데이트

- React: 상태를 직접 변경하지 않고 setter 호출
```jsx
setCount(prev => prev + 1)
```

- Vue: `ref`의 `.value`를 직접 변경 가능
```js
count.value = count.value + 1
// 또는 템플릿에서: @click="count++"
```

---

## 4) 객체/배열 다루기

- React (불변성 유지 권장)
```jsx
const [user, setUser] = useState({ name: 'A' })
setUser(prev => ({ ...prev, name: 'B' }))
```

- Vue (reactive 또는 ref) - 반응성 유지
```js
import { reactive } from 'vue'
const user = reactive({ name: 'A' })
user.name = 'B' // 반응적으로 업데이트 됨

// 또는 ref로 객체를 감싸기
const userRef = ref({ name: 'A' })
userRef.value.name = 'B'
```

---

## 5) 실무 팁
- React: 불변성(immutable)을 유지해 불필요한 리렌더를 방지
- Vue: `.value` 접근 기억, 템플릿에서는 자동 언래핑
- 둘 다: 상태가 많아지면 전역 상태관리(Pinia/Redux 등) 고려

---

간단한 비교 위주로 정리했습니다. 더 자세한 예시(컴포넌트 예제, 성능 차이, 메모이제이션 등) 원하시면 추가로 정리해 드릴게요.
